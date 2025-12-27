import orchestrator from "tests/orchestrator";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("GET /api/v1/guests", () => {
  describe("Anonymous user", () => {
    test("trying to get the guest list", async () => {
      const response = await fetch(`http://localhost:3000/api/v1/guests`);
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action: 'Verifique se seu usuário possui a feature "read:guests".',
        status_code: 403,
      });
    });
  });
  describe("Default user", () => {
    test("Get all guests", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "read:guests",
      ]);

      const guestCreated = await orchestrator.createGuest();

      const response = await fetch(`http://localhost:3000/api/v1/guests`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });
      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody)).toBe(true);
      const firstGuest = responseBody[0];

      expect(firstGuest).toEqual({
        id: guestCreated.id,
        name: guestCreated.name,
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
        invitation_id: guestCreated.invitation_id,
        confirmation_status: null,
        confirmation_date: null,
      });
    });
  });
});
