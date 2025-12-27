import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("POST /api/v1/guests", () => {
  describe("Anonymous user", () => {
    test("With invitation valid", async () => {
      const invitationCreated = await orchestrator.createInvitation();
      const response = await fetch("http://localhost:3000/api/v1/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Lucas Almeida",
          invitation_id: invitationCreated.id,
        }),
      });
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action: 'Verifique se seu usuário possui a feature "create:guests".',
        status_code: 403,
      });
    });
  });
  describe("Default user", () => {
    test("Create new guests", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      const invitationCreated = await orchestrator.createInvitation();

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "create:guests",
      ]);

      const response = await fetch("http://localhost:3000/api/v1/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({
          name: "Lucas Almeida",
          invitation_id: invitationCreated.id,
        }),
      });

      const responseBody = await response.json();

      expect(response.status).toBe(201);
      expect(responseBody).toEqual({
        id: responseBody.id,
        name: "Lucas Almeida",
        email: null,
        cell: null,
        is_family: null,
        is_friend: null,
        is_musician: null,
        is_witness: null,
        is_bridesmaid: null,
        is_bestman: null,
        is_bride: null,
        is_groom: null,
        guest_of: null,
        invitation_id: invitationCreated.id,
        confirmation_status: null,
        confirmation_date: null,
      });
    });

    test("Without name", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);
      const guestCreated = await orchestrator.createGuest();

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "create:guests",
      ]);

      const invalidParams = { ...guestCreated, name: "" };
      const response = await fetch("http://localhost:3000/api/v1/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify(invalidParams),
      });

      expect(response.status).toBe(400);
      const errorBody = await response.json();
      expect(errorBody).toEqual({
        name: "BadRequestError",
        message: "Name is required",
        status_code: 400,
      });
    });

    test("Erro ao criar convidado com invitation_id inválido", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "create:guests",
      ]);

      const response = await fetch("http://localhost:3000/api/v1/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({
          name: "Lucas Almeida",
          invitation_id: "e7148d3f-d79e-453c-a8ba-4312d159b811",
        }),
      });

      const errorBody = await response.json();

      expect(errorBody).toEqual({
        name: "NotFoundError",
        message: "Invitation not found",
        action: "Verifique se os parâmetros enviados na consulta estão certos.",
        status_code: 404,
      });
    });
  });
});
