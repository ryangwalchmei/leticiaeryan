import orchestrator from "tests/orchestrator";
import * as XLSX from "xlsx";

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
      expect(text).toContain("MethodNotAllowedError");
    });

    test("Planilha contém dados corretos", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/exportInvitations",
      );
      const buffer = await response.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toBe("Família Silva");
      expect(data[0].status).toBe("pendente");
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

    test("Planilha vazia possui headers corretos", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/exportInvitations",
      );
      const buffer = await response.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];

      expect(headers).toEqual([
        "id",
        "name",
        "pin_code",
        "shipping_date",
        "status",
      ]);
    });
  });
});
