import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("DELETE /api/v1/guests/:id", () => {
  describe("Anonymous user", () => {
    test("With guest id valid", async () => {
      const guestCreated = await orchestrator.createGuest();

      const response = await fetch(
        `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
        {
          method: "DELETE",
        },
      );
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action: 'Verifique se seu usuário possui a feature "delete:guests".',
        status_code: 403,
      });
    });
  });
  describe("Default user", () => {
    test("Delete a guest by ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "delete:guests",
        "read:guests",
      ]);

      const guestCreated = await orchestrator.createGuest();
      const response = await fetch(
        `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
        {
          method: "DELETE",
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );
      expect(response.status).toBe(204);

      const response2 = await fetch(
        `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );
      expect(response2.status).toBe(404);
    });

    test("Erro ao deletar convidado com ID inexistente", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "delete:guests",
      ]);

      const response = await fetch(
        `http://localhost:3000/api/v1/guests/999999`,
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
          method: "DELETE",
        },
      );

      const errorBody = await response.json();
      expect(response.status).toBe(400);
      expect(errorBody).toEqual({
        name: "BadRequestError",
        message: "invalid input syntax for type uuid",
        status_code: 400,
      });
    });

    test("Erro ao deletar convidado com ID inválido", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "delete:guests",
      ]);

      const response = await fetch(`http://localhost:3000/api/v1/guests/abc`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
        method: "DELETE",
      });
      const errorBody = await response.json();
      expect(response.status).toBe(400);
      expect(errorBody).toEqual({
        name: "BadRequestError",
        message: "invalid input syntax for type uuid",
        status_code: 400,
      });
    });

    test("Erro ao deletar convidado com ID vazio", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "delete:guests",
      ]);

      const response = await fetch(`http://localhost:3000/api/v1/guests/`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
        method: "DELETE",
      });
      expect(response.status).toBe(405);
    });
  });
});
