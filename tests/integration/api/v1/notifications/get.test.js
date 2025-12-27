import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("GET /api/v1/notifications", () => {
  describe("Anonymous user", () => {
    test("Trying to get the notifications list", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/notifications`,
      );
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action:
          'Verifique se seu usuário possui a feature "read:notifications".',
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("List all notifications", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "read:notifications",
      ]);

      const notificationCreated = await orchestrator.createNotification();

      const response = await fetch(
        "http://localhost:3000/api/v1/notifications",
        {
          method: "GET",
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );

      expect(response.status).toBe(200);
      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);

      expect(responseBody[0]).toEqual({
        id: responseBody[0].id,
        guest_id: notificationCreated.guest_id,
        title: notificationCreated.title,
        message: notificationCreated.message,
        type: notificationCreated.type,
        is_read: false,
        datecreated: notificationCreated.datecreated,
        dateread: null,
      });
    });
  });
});
