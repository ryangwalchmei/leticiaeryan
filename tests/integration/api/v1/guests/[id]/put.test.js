import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("PUT /api/v1/guests/:id", () => {
  describe("Anonymous user", () => {
    test("With guest id valid", async () => {
      const guestCreated = await orchestrator.createGuest();

      const response = await fetch(
        `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
        {
          method: "PUT",
        },
      );
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action: 'Verifique se seu usuário possui a feature "update:guests".',
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("Update a guests by ID", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:guests",
      ]);

      const guestCreated = await orchestrator.createGuest();
      const response = await fetch(
        `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            name: "Letícia Vitória",
            confirmation_status: "confirmado",
          }),
        },
      );
      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        id: guestCreated.id,
        name: "Letícia Vitória",
        email: guestCreated.email,
        cell: guestCreated.cell,
        is_family: guestCreated.is_family,
        is_friend: guestCreated.is_friend,
        is_musician: guestCreated.is_musician,
        is_witness: guestCreated.is_witness,
        is_bridesmaid: guestCreated.is_bridesmaid,
        is_bestman: guestCreated.is_bestman,
        is_bride: guestCreated.is_bride,
        is_groom: guestCreated.is_groom,
        guest_of: null,
        invitation_id: responseBody.invitation_id,
        confirmation_status: "confirmado",
        confirmation_date: responseBody.confirmation_date,
      });

      expect(Date.parse(responseBody.confirmation_date)).not.toBeNaN();
    });

    test("With uuid invalid", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:guests",
      ]);
      const response = await fetch(
        `http://localhost:3000/api/v1/guests/999999`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            name: "Letícia Vitória",
            confirmation_status: "confirmado",
          }),
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

    test("Erro ao atualizar convidado com nome vazio", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      const guestCreated = await orchestrator.createGuest();

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:guests",
      ]);
      const response = await fetch(
        `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            name: "",
            confirmation_status: "confirmado",
          }),
        },
      );

      expect(response.status).toBe(400);
      const errorBody = await response.json();
      expect(errorBody).toEqual({
        name: "BadRequestError",
        message: "Name is required",
        status_code: 400,
      });
    });

    test("Erro ao atualizar convidado sem especificar id", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:guests",
      ]);

      const response = await fetch(`http://localhost:3000/api/v1/guests/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({
          name: "Leticia",
          confirmation_status: "confirmado",
        }),
      });

      expect(response.status).toBe(405);
      const errorBody = await response.json();
      expect(errorBody).toEqual({
        name: "MethodNotAllowedError",
        message: "O método HTTP PUT não é permitido para este endpoint.",
        action: "Use um dos métodos permitidos: GET, POST",
        status_code: 405,
        method: "PUT",
        allowed_methods: ["GET", "POST"],
      });
    });

    test("With guest id informed in body", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      const guestCreated = await orchestrator.createGuest();

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "update:guests",
      ]);
      const response = await fetch(
        `http://localhost:3000/api/v1/guests/${guestCreated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            id: "e7148d3f-d79e-453c-a8ba-4312d159b811",
            name: "Leticia",
            confirmation_status: "confirmado",
          }),
        },
      );
      expect(response.status).toBe(400);
      const errorBody = await response.json();

      expect(errorBody).toEqual({
        name: "BadRequestError",
        message: "ID cannot be changed",
        status_code: 400,
      });
    });
  });
});
