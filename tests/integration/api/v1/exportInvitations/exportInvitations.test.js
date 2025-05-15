import orchestrator from "tests/orchestrator";

describe("GET /api/v1/exportInvitations", () => {
  describe("Com convites no banco", () => {
    beforeAll(async () => {
      await orchestrator.waitForAllServices();
      await orchestrator.clearDatabase();
      await orchestrator.runMigrationsPending();

      await fetch("http://localhost:3000/api/v1/invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Família Silva",
          status: "pendente",
        }),
      });
    });

    test("Exporta XLSX com sucesso", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/exportInvitations",
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );

      const contentDisposition = response.headers.get("Content-Disposition");
      expect(contentDisposition).toBe("attachment; filename=Convites.xlsx");

      const buffer = await response.arrayBuffer();
      expect(buffer.byteLength).toBeGreaterThan(0);
    });

    test("Verifica presence do header Content-Length", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/exportInvitations",
      );
      expect(response.headers.get("Content-Length")).not.toBeNull();
    });

    test("Retorna 405 se método não for GET", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/exportInvitations",
        {
          method: "POST",
        },
      );

      expect(response.status).toBe(405);
      const text = await response.text();
      expect(text).toContain("Method POST Not Allowed");
    });
  });

  describe("Sem convites no banco", () => {
    beforeAll(async () => {
      await orchestrator.clearDatabase();
      await orchestrator.runMigrationsPending();
    });

    test("Exporta XLSX vazio com sucesso", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/exportInvitations",
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );

      const buffer = await response.arrayBuffer();
      expect(buffer.byteLength).toBeGreaterThan(0);
    });
  });
});
