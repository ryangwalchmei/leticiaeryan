import orchestrator from "tests/orchestrator";

const notificationDefaultParams = {
  title: "Presença Confirmada",
  message: "Fulando confirmou presença no convite tal",
  type: "Info",
  is_read: false,
};

let notificationCreated = null;
let invitationExample = null;
let guestExample = null;

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

  const guestDb = await fetch("http://localhost:3000/api/v1/guests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
    }),
  });

  if (!guestDb.ok) {
    throw new Error("Falha ao criar convidado.");
  }

  guestExample = await guestDb.json();
});

describe("CRUD /api/v1/notifications", () => {
  describe("POST", () => {
    test("Cria uma nova notificação", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/notifications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...notificationDefaultParams,
            guest_id: guestExample.id,
          }),
        },
      );

      expect(response.status).toBe(201);
      notificationCreated = await response.json();

      expect(notificationCreated).toHaveProperty("id");
      expect(notificationCreated.title).toBe(notificationDefaultParams.title);
    });
  });

  describe("GET", () => {
    test("Listar todas as notificações", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/notifications",
        {
          method: "GET",
        },
      );

      expect(response.status).toBe(200);
      const allNotifications = await response.json();
      expect(Array.isArray(allNotifications)).toBe(true);
      expect(allNotifications.length).toBeGreaterThan(0);
    });
  });
  describe("PUT", () => {
    test("Ler uma notificação e marcar como lida", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/notifications/${notificationCreated.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
      );

      expect(response.status).toBe(200);
      const updated = await response.json();
      expect(updated.is_read).toBe(true);
      expect(updated.dateread).toBeTruthy();
    });

    test("Falha ao ler notificação com ID inválido (formato)", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/notifications/abc",
        { method: "PUT", headers: { "Content-Type": "application/json" } },
      );

      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.message).toBe("Invalid ID");
    });

    test("Falha ao ler notificação inexistente", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/notifications/999999",
        { method: "PUT", headers: { "Content-Type": "application/json" } },
      );

      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.message).toBe("Invalid ID");
    });

    test("Falha ao tentar alterar o ID da notificação", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/notifications/${notificationCreated.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: 123 }),
        },
      );

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.message).toBe("ID cannot be changed");
    });

    test("Falha ao atualizar com título vazio", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/notifications/${notificationCreated.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "" }),
        },
      );

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.message).toBe("Title is required");
    });
  });
});
