import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("GET /api/v1/invitation", () => {
  describe("Anonymous user", () => {
    test("trying to get the invite list", async () => {
      const response = await fetch(`http://localhost:3000/api/v1/invitation`);
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action: 'Verifique se seu usuário possui a feature "read:invitations".',
        status_code: 403,
      });
    });
  });
  describe("Default user", () => {
    test("Get all invitations", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "read:invitations",
      ]);

      const response = await fetch("http://localhost:3000/api/v1/invitation", {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response.status).toBe(200);
    });
  });
});
