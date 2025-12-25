import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("POST /api/v1/notifications", () => {
  describe("Anonymous user", () => {
    test("With all paramters valid", async () => {
      const invitationCreated = await orchestrator.createInvitation();
      const guestCreated = await orchestrator.createGuest({
        name: "Lucas Almeida",
        email: "lucas.almeida@example.com",
        cell: "+55 11 98765-4321",
        is_family: true,
        is_friend: false,
        is_musician: false,
        is_witness: false,
        is_bridesmaid: false,
        is_bestman: false,
        is_bride: false,
        is_groom: false,
        guest_of: null,
        invitation_id: invitationCreated.id,
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/notifications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Presença Confirmada",
            message: `${guestCreated.name} confirmou presença no convite ${invitationCreated.name}`,
            type: "Info",
            is_read: false,
            guest_id: guestCreated.id,
          }),
        },
      );

      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action:
          'Verifique se seu usuário possui a feature "create:notifications".',
        status_code: 403,
      });
    });
  });
  describe("Default user", () => {
    test("With all paramters valid", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "create:notifications",
      ]);

      const invitationCreated = await orchestrator.createInvitation();
      const guestCreated = await orchestrator.createGuest({
        name: "Lucas Almeida",
        email: "lucas.almeida@example.com",
        cell: "+55 11 98765-4321",
        is_family: true,
        is_friend: false,
        is_musician: false,
        is_witness: false,
        is_bridesmaid: false,
        is_bestman: false,
        is_bride: false,
        is_groom: false,
        guest_of: null,
        invitation_id: invitationCreated.id,
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            title: "Presença Confirmada",
            message: `${guestCreated.name} confirmou presença no convite ${invitationCreated.name}`,
            type: "Info",
            is_read: false,
            guest_id: guestCreated.id,
          }),
        },
      );

      expect(response.status).toBe(201);
      const notificationCreated = await response.json();
      expect(notificationCreated).toEqual({
        id: notificationCreated.id,
        guest_id: guestCreated.id,
        title: "Presença Confirmada",
        message: `${guestCreated.name} confirmou presença no convite ${invitationCreated.name}`,
        type: "Info",
        is_read: false,
        datecreated: notificationCreated.datecreated,
        dateread: null,
      });
    });

    test("Without data required", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "create:notifications",
      ]);

      const invitationCreated = await orchestrator.createInvitation();
      const guestCreated = await orchestrator.createGuest({
        name: "Lucas Almeida",
        email: "lucas.almeida@example.com",
        cell: "+55 11 98765-4321",
        is_family: true,
        is_friend: false,
        is_musician: false,
        is_witness: false,
        is_bridesmaid: false,
        is_bestman: false,
        is_bride: false,
        is_groom: false,
        guest_of: null,
        invitation_id: invitationCreated.id,
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionObject.token}`,
          },
          body: JSON.stringify({
            guest_id: guestCreated.id,
          }),
        },
      );

      expect(response.status).toBe(400);
      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "BadRequestError",
        message: "Missing required fields: title, message, type",
        status_code: 400,
      });
    });
  });
});
