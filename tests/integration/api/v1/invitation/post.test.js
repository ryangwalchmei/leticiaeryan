import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";
import user from "models/user";

const invitationDefaultParams = {
  name: "Ryan e Família",
  status: "pendente",
};

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrationsPending();
});

describe("POST /api/v1/invitation", () => {
  describe("Anonymous user", () => {
    test("Failed to create invitations.", async () => {
      const response = await fetch("http://localhost:3000/api/v1/invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invitationDefaultParams),
      });
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action:
          'Verifique se seu usuário possui a feature "create:invitations".',
        status_code: 403,
      });
    });
  });
  describe("Default user", () => {
    test("Create new invitation", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "create:invitations",
      ]);

      const response = await fetch("http://localhost:3000/api/v1/invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify(invitationDefaultParams),
      });

      expect(response.status).toBe(201);
      const responseBody = await response.json();

      expect(uuidVersion(responseBody.id)).toBe(4);

      expect(responseBody.pin_code).not.toBeNaN();
      expect(Number.isInteger(Number(responseBody.pin_code))).toBe(true);

      expect(
        responseBody.pin_code >= 1000 && responseBody.pin_code <= 99999,
      ).toBe(true);

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: invitationDefaultParams.name,
        pin_code: responseBody.pin_code,
        shipping_date: responseBody.shipping_date,
        status: invitationDefaultParams.status,
      });
    });

    test("with user activated but without permission", async () => {
      const userCreated = await orchestrator.createUser();
      await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      const response = await fetch("http://localhost:3000/api/v1/invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify(invitationDefaultParams),
      });

      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para executar essa ação",
        action:
          'Verifique se seu usuário possui a feature "create:invitations".',
        status_code: 403,
      });
    });

    test("No name on the invitation", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "create:invitations",
      ]);

      const response = await fetch("http://localhost:3000/api/v1/invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({ status: "pendente" }), // Sem nome
      });

      expect(response.status).toBe(400);
    });

    test("With a long name", async () => {
      const userCreated = await orchestrator.createUser();
      const userActivated = await orchestrator.activateUser(userCreated);
      const sessionObject = await orchestrator.createSession(userCreated.id);

      await user.setFeatures(userCreated.id, [
        ...userActivated.features,
        "create:invitations",
      ]);

      const response = await fetch("http://localhost:3000/api/v1/invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({ name: "A".repeat(51), status: "pendente" }), // Nome muito longo
      });

      expect(response.status).toBe(400);
    });
  });
});
