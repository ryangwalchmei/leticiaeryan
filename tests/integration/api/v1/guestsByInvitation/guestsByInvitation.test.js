/* eslint-disable jest/no-conditional-expect */
import orchestrator from "tests/orchestrator";

let invitationExample = null;
let guestsList = [];

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();

  // Criando um convite
  const invitationDb = await fetch("http://localhost:3000/api/v1/invitation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Família Souza",
      status: "pendente",
    }),
  });

  if (!invitationDb.ok) {
    throw new Error("Falha ao criar convite.");
  }

  invitationExample = await invitationDb.json();

  // Criando convidados associados a esse convite
  const guestsData = [
    {
      name: "Carlos Souza",
      email: "carlos.souza@example.com",
      cell: "+55 11 99999-9999",
      invitation_id: invitationExample.id,
    },
    {
      name: "Ana Souza",
      email: "ana.souza@example.com",
      cell: "+55 11 98888-8888",
      invitation_id: invitationExample.id,
    },
  ];

  for (const guest of guestsData) {
    const response = await fetch("http://localhost:3000/api/v1/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guest),
    });

    if (response.ok) {
      const guestCreated = await response.json();
      guestsList.push(guestCreated);
    } else {
      throw new Error("Falha ao criar convidados.");
    }
  }
});

describe("GET /api/v1/guestsByInvitation", () => {
  test("Buscar convidados sem um invitation_id", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/guestsByInvitation/`,
    );

    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
  });
});

describe("GET /api/v1/guestsByInvitation/:id", () => {
  let responseBody = null;

  test("Busca convidados por invitation_id", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/guestsByInvitation/${invitationExample.id}`,
    );

    expect(response.status).toBe(200);
    responseBody = await response.json();

    // Garantindo que responseBody seja uma array
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBe(guestsList.length);
  });

  test("Verifica estrutura dos convidados retornados", async () => {
    expect(responseBody).not.toBeNull(); // Agora garantimos que responseBody foi preenchido

    responseBody.forEach((guest, index) => {
      expect(guest).toHaveProperty("id");
      expect(guest).toHaveProperty("name");
      expect(guest.name).toBe(guestsList[index].name);
      expect(guest.email).toBe(guestsList[index].email);
      expect(guest.invitation_id).toBe(invitationExample.id);
    });
  });

  test("Erro ao buscar convidados com invitation_id inexistente", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/guestsByInvitation/999999`,
    );

    expect(response.status).toBe(400); // Mudando de 400 para 404, se aplicável

    const errorBody = await response.json();
    expect(errorBody).toHaveProperty("message");
    expect(errorBody.message).toContain("Invalid invitation_id");
  });

  test("Busca convidados com invitation_id válido mas que não existe no banco", async () => {
    const uuid = crypto.randomUUID();
    const response = await fetch(
      `http://localhost:3000/api/v1/guestsByInvitation/${uuid}`,
    );

    expect(response.status).toBe(404);
    responseBody = await response.json();

    const isObject =
      typeof responseBody === "object" &&
      responseBody !== null &&
      !Array.isArray(responseBody);

    expect(isObject).toBe(true);
    expect(responseBody.name).toBe("NotFoundError");
    expect(responseBody.message).toBe("Not found invitation associated");
  });
});
