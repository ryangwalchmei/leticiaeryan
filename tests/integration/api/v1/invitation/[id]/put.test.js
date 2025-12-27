import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("PUT /api/v1/invitation/:id", () => {
  describe("Anonymous user", () => {
    test("with invitation id valid", async () => {
      const invitationCreated = await orchestrator.createInvitation();
      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          method: "PUT",
        },
      );
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action:
          'Verifique se seu usuário possui a feature "update:invitations".',
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("Update a invitation by ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:invitations",
      ]);

      const invitationCreated = await orchestrator.createInvitation();

      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            name: "Invite name changed",
            status: "confirmado",
          }),
        },
      );
      expect(response.status).toBe(200);
      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: "Invite name changed",
        status: "confirmado",
        pin_code: invitationCreated.pin_code,
        shipping_date: invitationCreated.shipping_date,
      });
      expect(responseBody.pin_code).toBe(invitationCreated.pin_code);
    });

    test("When entering PIN code", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:invitations",
      ]);
      const invitationCreated = await orchestrator.createInvitation();

      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({ pin_code: "12345" }), // Tentando modificar o PIN
        },
      );

      expect(response.status).toBe(403);
    });

    test("With non-existent ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:invitations",
      ]);

      const response = await fetch(
        "http://localhost:3000/api/v1/invitation/999999",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            name: "Letícia e Família",
            status: "confirmado",
          }),
        },
      );

      expect(response.status).toBe(400);

      const errorBody = await response.json();

      expect(errorBody).toHaveProperty("message");
      expect(errorBody).toEqual({
        name: "BadRequestError",
        message: "invalid input syntax for type uuid",
        status_code: 400,
      });
    });

    test("Without name", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:invitations",
      ]);

      const invitationCreated = await orchestrator.createInvitation();

      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({ name: "", status: "confirmado" }),
        },
      );

      expect(response.status).toBe(400);
      const errorBody = await response.json();
      expect(errorBody).toHaveProperty("message");
      expect(errorBody.message).toContain("Name is required");
    });

    test("Without specifying ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:invitations",
      ]);

      const response = await fetch("http://localhost:3000/api/v1/invitation/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({
          name: "Letícia e Família",
          status: "confirmado",
        }),
      });

      expect(response.status).toBe(405);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "O método HTTP PUT não é permitido para este endpoint.",
        action: "Use um dos métodos permitidos: GET, POST",
        status_code: 405,
        method: "PUT",
        allowed_methods: ["GET", "POST"],
      });
    });

    test("when trying to update invitation ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:invitations",
      ]);
      const invitationCreated = await orchestrator.createInvitation();

      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
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
});
