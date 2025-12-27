import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("DELETE /api/v1/invitation/:id", () => {
  describe("Anonymous user", () => {
    test("with invitation id valid", async () => {
      const invitationCreated = await orchestrator.createInvitation();
      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          method: "DELETE",
        },
      );

      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action:
          'Verifique se seu usuário possui a feature "delete:invitations".',
        status_code: 403,
      });
    });

    test("with invitation id inexsistent", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/06e6aa58-0744-47ed-95cb-a1e61ef155bd`,
        {
          method: "DELETE",
        },
      );

      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action:
          'Verifique se seu usuário possui a feature "delete:invitations".',
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("Delete a invitation by ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "delete:invitations",
        "read:invitations",
      ]);

      const invitationCreated = await orchestrator.createInvitation();
      const response = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
          method: "DELETE",
        },
      );
      expect(response.status).toBe(204);

      const response2 = await fetch(
        `http://localhost:3000/api/v1/invitation/${invitationCreated.id}`,
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );
      const responsebody2 = await response2.json();

      expect(response2.status).toBe(404);
      expect(responsebody2).toEqual({
        name: "NotFoundError",
        message: "Invitation not found",
        action: "Verifique se os parâmetros enviados na consulta estão certos.",
        status_code: 404,
      });
    });

    test("With non-existent ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "delete:invitations",
      ]);

      const response = await fetch(
        "http://localhost:3000/api/v1/invitation/999999",
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
          method: "DELETE",
        },
      );

      expect(response.status).toBe(503);

      const errorBody = await response.json();
      expect(errorBody).toHaveProperty("message");
      expect(errorBody.message).toContain(
        "Um erro interno não esperado aconteceu.",
      );
    });

    test("Without specifying ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "delete:invitations",
      ]);

      const response = await fetch("http://localhost:3000/api/v1/invitation/", {
        method: "DELETE",
      });

      expect(response.status).toBe(405);
    });

    test("With invalid ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "delete:invitations",
      ]);
      const response = await fetch(
        "http://localhost:3000/api/v1/invitation/1234",
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
          method: "DELETE",
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
