import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("GET /api/v1/invitation/:id", () => {
  describe("Anonymous user", () => {
    test("with invitation id valid", async () => {
      const invitationCreated = await orchestrator.createInvitation();
      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
      );

      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action: 'Verifique se seu usuário possui a feature "read:invitations".',
        status_code: 403,
      });
    });
    test("with invitation id inexsistent", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/06e6aa58-0744-47ed-95cb-a1e61ef155bd`,
      );

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
    test("Get invitation by ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "read:invitations",
      ]);
      const invitationCreated = await orchestrator.createInvitation();

      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );

      expect(response.status).toBe(200);
      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: invitationCreated.id,
        name: invitationCreated.name,
        pin_code: invitationCreated.pin_code,
        shipping_date: invitationCreated.shipping_date,
        status: invitationCreated.status,
      });
    });

    test("with invalid id", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "read:invitations",
      ]);

      const response = await fetch(
        "http://localhost:3000/api/v1/invitation/99999999",
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );
      expect(response.status).toBe(503);

      const errorBody = await response.json();
      expect(errorBody).toHaveProperty("message");
      expect(errorBody.message).toContain(
        "Um erro interno não esperado aconteceu.",
      );
    });
  });
});
