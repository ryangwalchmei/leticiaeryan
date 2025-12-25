import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("PUT /api/v1/notifications/[id]", () => {
  describe("Anonymous user", () => {
    test("With all paramters valid", async () => {
      const notificationCreated = await orchestrator.createNotification();
      const response = await fetch(
        `http://localhost:3000/api/v1/notifications/${notificationCreated.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
      );

      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action:
          'Verifique se seu usuário possui a feature "update:notifications".',
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("Mark a notification as read", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:notifications",
      ]);

      const notificationCreated = await orchestrator.createNotification();
      const response = await fetch(
        `http://localhost:3000/api/v1/notifications/${notificationCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );

      expect(response.status).toBe(200);
      const updated = await response.json();

      expect(updated.is_read).toBe(true);
      expect(updated.dateread).toBeTruthy();

      expect(updated).toEqual({
        id: notificationCreated.id,
        guest_id: notificationCreated.guest_id,
        title: notificationCreated.title,
        message: notificationCreated.message,
        type: notificationCreated.type,
        is_read: true,
        datecreated: notificationCreated.datecreated,
        dateread: updated.dateread,
      });

      expect(updated.dateread).not.toBeNaN();
      expect(updated.is_read).toBe(true);
      expect(updated.datecreated).toBe(notificationCreated.datecreated);
      expect(updated.dateread > updated.datecreated).toBe(true);
    });

    test("With notification uuid invalid", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:notifications",
      ]);

      const response = await fetch(
        "http://localhost:3000/api/v1/notifications/abc",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );
      expect(response.status).toBe(400);

      const errorBody = await response.json();
      expect(errorBody).toEqual({
        name: "BadRequestError",
        message: "invalid input syntax for type uuid",
        status_code: 400,
      });
    });

    test("With notification id no existent", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:notifications",
      ]);

      const response = await fetch(
        "http://localhost:3000/api/v1/notifications/ca2c251d-faf5-4267-b433-1f080eaa30da",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );

      const errorBody = await response.json();

      expect(errorBody).toEqual({
        name: "NotFoundError",
        message: "A notificação informada não foi encontrada no sistema.",
        action: "Verifique se o notification id está digitado corretamente.",
        status_code: 404,
      });
    });

    test("With notification id especified in body", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:notifications",
      ]);

      const notificationCreated = await orchestrator.createNotification();

      const response = await fetch(
        `http://localhost:3000/api/v1/notifications/${notificationCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({ id: 123 }),
        },
      );

      expect(response.status).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "BadRequestError",
        message: "ID cannot be changed",
        status_code: 400,
      });
    });

    test("With title especified in body", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:notifications",
      ]);

      const notificationCreated = await orchestrator.createNotification();

      const response = await fetch(
        `http://localhost:3000/api/v1/notifications/${notificationCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({ title: "" }),
        },
      );

      expect(response.status).toBe(400);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "BadRequestError",
        message: "Title cannot be changed",
        status_code: 400,
      });
    });
  });
});
