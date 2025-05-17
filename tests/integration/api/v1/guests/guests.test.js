/* eslint-disable jest/no-conditional-expect */
import orchestrator from "tests/orchestrator";

let guestCreated = null;
let invitationExample = null;
let guestsDefaultParams = null;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.runMigrationsPending();

  const invitationDb = await fetch("http://localhost:3000/api/v1/invitation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Ryan e Família",
      status: "pendente",
    }),
  });

  if (!invitationDb.ok) {
    throw new Error("Falha ao criar convite.");
  }

  invitationExample = await invitationDb.json();
  guestsDefaultParams = {
    name: "Lucas Almeida",
    email: "lucas.almeida@example.com",
    cell: "+55 11 98765-4321",
    is_family: true,
    is_friend: false,
    is_musician: false,
    is_witness: false,
    is_bridesmaid: false,
    is_bestman: false,
    is_bride: false,
    is_groom: false,
    guest_of: null,
    invitation_id: invitationExample.id,
  };
});

describe("POST /api/v1/guests", () => {
  let responseBody;

  test("Create new guests", async () => {
    const response = await fetch("http://localhost:3000/api/v1/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guestsDefaultParams),
    });

    expect(response.status).toBe(201);
    responseBody = await response.json();
    guestCreated = responseBody;
  });

  test("Verifica integridade dos dados cadastrados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");
    expect(responseBody.name).toBe(guestsDefaultParams.name);
    expect(responseBody.email).toBe(guestsDefaultParams.email);
    expect(responseBody.cell).toBe(guestsDefaultParams.cell);
    expect(responseBody.invitation_id).toBe(guestsDefaultParams.invitation_id);
  });

  test("Erro ao criar convidado sem nome", async () => {
    const invalidParams = { ...guestsDefaultParams, name: "" };
    const response = await fetch("http://localhost:3000/api/v1/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidParams),
    });

    expect(response.status).toBe(400);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("Name is required");
  });

  test("Erro ao criar convidado com invitation_id inválido", async () => {
    const invalidParams = {
      ...guestsDefaultParams,
      invitation_id: "e7148d3f-d79e-453c-a8ba-4312d159b811",
    };
    const response = await fetch("http://localhost:3000/api/v1/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidParams),
    });

    expect(response.status).toBe(404);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("Invitation not found");
  });
});

describe("GET /api/v1/guests", () => {
  let responseBody;

  test("Verifica se a API retorna status 200", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/guests`);
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica estrutura dos guests", async () => {
    expect(Array.isArray(responseBody)).toBe(true);
    if (responseBody.length > 0) {
      const firstGuest = responseBody[0];
      expect(firstGuest).toHaveProperty("id");
      expect(firstGuest).toHaveProperty("name");
    }
  });
});

describe("GET /api/v1/guests/:id", () => {
  let responseBody;
  test("Get guests by ID", async () => {
    if (!guestCreated) {
      throw new Error(
        "Nenhum convidado foi criado para testar GET /guests/:id.",
      );
    }
    const response = await fetch(
      `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
    );
    expect(response.status).toBe(200);
    responseBody = await response.json();
    expect(responseBody).toStrictEqual(guestCreated);
  });

  test("Verifica estrutura do guests", async () => {
    expect(typeof responseBody).toBe("object");
    expect(responseBody).toStrictEqual(guestCreated);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("name");
  });

  test("Erro ao buscar convidado com ID inexistente", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/guests/999999`);
    expect(response.status).toBe(503);

    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain(
      "Um erro interno não esperado aconteceu.",
    );
  });
});

describe("PUT /api/v1/guests/:id", () => {
  let responseBody;
  test("Update a guests by ID", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Letícia Vitória",
          confirmation_status: "confirmado",
        }),
      },
    );
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica integridade dos dados atualizados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");
    expect(responseBody.name).toBe("Letícia Vitória");
    expect(responseBody.confirmation_status).toBe("confirmado");
  });

  test("Erro ao atualizar convidado com ID inexistente", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/guests/999999`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Letícia Vitória",
        confirmation_status: "confirmado",
      }),
    });

    expect(response.status).toBe(503);

    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain(
      "Um erro interno não esperado aconteceu.",
    );
  });

  test("Erro ao atualizar convidado com nome vazio", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          confirmation_status: "confirmado",
        }),
      },
    );
    expect(response.status).toBe(400);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("Name is required");
  });

  test("Erro ao atualizar convidado sem especificar id", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/guests/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Leticia",
        confirmation_status: "confirmado",
      }),
    });
    expect(response.status).toBe(405);
  });

  test("Erro ao tentar atualizar ID do convidado", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "e7148d3f-d79e-453c-a8ba-4312d159b811",
          name: "Leticia",
          confirmation_status: "confirmado",
        }),
      },
    );
    expect(response.status).toBe(400);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("ID cannot be changed");
  });
});

describe("DELETE /api/v1/guests/:id", () => {
  test("Delete a guest by ID", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
      { method: "DELETE" },
    );
    expect(response.status).toBe(204);
  });
  test("Verifica se o convidado foi deletado", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
    );
    expect(response.status).toBe(404);
  });

  test("Erro ao deletar convidado com ID inexistente", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/guests/999999`, {
      method: "DELETE",
    });

    const errorBody = await response.json();
    expect(response.status).toBe(503);
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain(
      "Um erro interno não esperado aconteceu.",
    );
  });

  test("Erro ao deletar convidado com ID inválido", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/guests/abc`, {
      method: "DELETE",
    });
    expect(response.status).toBe(503);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain(
      "Um erro interno não esperado aconteceu.",
    );
  });

  test("Erro ao deletar convidado com ID vazio", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/guests/`, {
      method: "DELETE",
    });
    expect(response.status).toBe(405);
  });
});
