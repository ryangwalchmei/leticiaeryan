import orchestrator from "tests/orchestrator";

const invitationDefaultParams = {
  name: "Ryan e Família",
  status: "pendente",
};

let invitationCreated = null;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.runMigrationsPending();
});

describe("POST /api/v1/invitation", () => {
  let responseBody;
  test("Create new invitation", async () => {
    const response = await fetch("http://localhost:3000/api/v1/invitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invitationDefaultParams),
    });

    expect(response.status).toBe(201);
    responseBody = await response.json();
  });

  test("Verifica integridade dos dados cadastrados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");

    expect(responseBody.name).toBe(invitationDefaultParams.name);

    expect(responseBody).toHaveProperty("status");
    expect(typeof responseBody.status).toBe("string");

    invitationCreated = responseBody;
  });

  test("Falha ao criar um convite sem nome", async () => {
    const response = await fetch("http://localhost:3000/api/v1/invitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "pendente" }), // Sem nome
    });

    expect(response.status).toBe(400);
  });

  test("Verifica se PINs são únicos", async () => {
    const response1 = await fetch("http://localhost:3000/api/v1/invitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Teste 1", status: "pendente" }),
    });

    const response2 = await fetch("http://localhost:3000/api/v1/invitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Teste 2", status: "pendente" }),
    });

    const body1 = await response1.json();
    const body2 = await response2.json();

    expect(body1.pin_code).not.toBe(body2.pin_code);
  });

  test("Falha ao criar convite com nome muito longo", async () => {
    const response = await fetch("http://localhost:3000/api/v1/invitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "A".repeat(51), status: "pendente" }), // Nome muito longo
    });

    expect(response.status).toBe(400);
  });
});

describe("GET /api/v1/invitation", () => {
  let responseBody;

  test("Verifica se a API retorna status 200", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/invitation`);
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica estrutura dos invitation", async () => {
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    const firstInvitation = responseBody[0];
    expect(firstInvitation).toHaveProperty("id");
    expect(firstInvitation).toHaveProperty("name");
    expect(firstInvitation).toHaveProperty("pin_code");
    expect(firstInvitation).toHaveProperty("shipping_date");
    expect(firstInvitation).toHaveProperty("status");
    expect(firstInvitation.pin_code).toMatch(/^\d{4,5}$/);
  });
});

describe("GET /api/v1/invitation/:id", () => {
  let responseBody;
  test("Get invitation by ID", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
    );

    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica estrutura do invitation", async () => {
    expect(typeof responseBody).toBe("object");
    expect(responseBody).toStrictEqual(invitationCreated);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("name");
    expect(responseBody).toHaveProperty("pin_code");
    expect(responseBody).toHaveProperty("shipping_date");
    expect(responseBody).toHaveProperty("status");
    expect(responseBody.id).toBe(invitationCreated.id);
  });

  test("Falha ao buscar um convite inexistente", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/invitation/99999999",
    );

    expect(response.status).toBe(404);
  });
});

describe("PUT /api/v1/invitation/:id", () => {
  let responseBody;
  test("Update a invitation by ID", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Letícia e Família",
          status: "confirmado",
        }),
      },
    );
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica integridade dos dados atualizados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");
    expect(responseBody.name).toBe("Letícia e Família");
    expect(responseBody.status).toBe("confirmado");
  });

  test("Falha ao alterar PIN de um convite", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin_code: "12345" }), // Tentando modificar o PIN
      },
    );

    expect(response.status).toBe(400);
  });

  test("Erro ao atualizar convite com ID inexistente", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/invitation/999999",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Letícia e Família",
          status: "confirmado",
        }),
      },
    );

    expect(response.status).toBe(404);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("Invalid ID");
  });

  test("Erro ao atualizar convite com nome vazio", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", status: "confirmado" }),
      },
    );

    expect(response.status).toBe(400);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("Name is required");
  });

  test("Erro ao atualizar convite sem especificar id", async () => {
    const response = await fetch("http://localhost:3000/api/v1/invitation/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Letícia e Família", status: "confirmado" }),
    });

    expect(response.status).toBe(400);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("invitation_id is required");
  });

  test("Erro ao tentar atualizar ID do convite", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "1234",
          name: "Letícia e Família",
          status: "confirmado",
        }),
      },
    );

    expect(response.status).toBe(400);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("ID cannot be changed");
  });
});

describe("DELETE /api/v1/invitation/:id", () => {
  test("Delete a invitation by ID", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
      { method: "DELETE" },
    );
    expect(response.status).toBe(204);
  });
  test("Verifica se o convite foi deletado", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
    );
    expect(response.status).toBe(404);
  });

  test("Erro ao deletar convite com ID inexistente", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/invitation/999999",
      { method: "DELETE" },
    );

    expect(response.status).toBe(404);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("Invalid ID");
  });

  test("Erro ao deletar convite sem especificar id", async () => {
    const response = await fetch("http://localhost:3000/api/v1/invitation/", {
      method: "DELETE",
    });

    expect(response.status).toBe(400);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("invitation_id is required");
  });

  test("Erro ao deletar convite com ID inválido", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/invitation/1234",
      { method: "DELETE" },
    );

    expect(response.status).toBe(404);
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("Invalid ID");
  });
});
