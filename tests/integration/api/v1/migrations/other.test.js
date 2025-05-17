import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("Requests to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("DELETE method should return 405", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "DELETE",
      });
      expect(response.status).toBe(405);
    });

    test("PUT method should return 405", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PUT",
      });
      expect(response.status).toBe(405);
    });

    test("OPTIONS method should return 405", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "OPTIONS",
      });
      expect(response.status).toBe(405);
    });

    test("PATCH method should return 405", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PATCH",
      });
      expect(response.status).toBe(405);
    });
  });
});
