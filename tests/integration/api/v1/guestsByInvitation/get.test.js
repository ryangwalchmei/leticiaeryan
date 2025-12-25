import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("GET /api/v1/guestsByInvitation", () => {
  describe("Anonymous user", () => {
    test("without invitation id", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/guestsByInvitation`,
      );
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action: 'Verifique se seu usuário possui a feature "read:guest:all".',
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("Busca convidados por invitation_id", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "read:guest:invitation",
      ]);

      const invitationCreated = await orchestrator.createInvitation();
      const guestCreated1 = await orchestrator.createGuest(
        {
          name: "Carlos Souza",
          email: "carlos.souza@example.com",
          cell: "+55 11 99999-9999",
        },
        invitationCreated.id,
      );

      const guestCreated2 = await orchestrator.createGuest(
        {
          name: "Ana Souza",
          email: "ana.souza@example.com",
          cell: "+55 11 98888-8888",
        },
        invitationCreated.id,
      );

      const response = await fetch(
        `http://localhost:3000/api/v1/guestsByInvitation/${invitationCreated.id}`,
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );

      expect(response.status).toBe(200);
      const responseBody = await response.json();

      expect(responseBody[0]).toEqual(guestCreated1);
      expect(responseBody[1]).toEqual(guestCreated2);

      expect(responseBody[0]).toHaveProperty("id");
      expect(responseBody[0]).toHaveProperty("name");
    });

    test("With uuid invalid", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "read:guest:invitation",
      ]);
      const response = await fetch(
        `http://localhost:3000/api/v1/guestsByInvitation/999999`,
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );

      expect(response.status).toBe(400); // Mudando de 400 para 404, se aplicável

      const errorBody = await response.json();
      expect(errorBody).toHaveProperty("message");
      expect(errorBody.message).toContain("invalid input syntax for type uuid");
    });

    test("With uuid valid but no existent", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "read:guest:invitation",
      ]);
      const uuid = crypto.randomUUID();
      const response = await fetch(
        `http://localhost:3000/api/v1/guestsByInvitation/${uuid}`,
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );

      expect(response.status).toBe(404);
      const responseBody = await response.json();

      const isObject =
        typeof responseBody === "object" &&
        responseBody !== null &&
        !Array.isArray(responseBody);

      expect(isObject).toBe(true);
      expect(responseBody.name).toBe("NotFoundError");
      expect(responseBody.message).toBe("Invitation not found");
    });
  });
});
