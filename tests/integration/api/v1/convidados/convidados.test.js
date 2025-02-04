import orchestrator from 'tests/orchestrator';

const convidadoDefaultParams = {
  name: "Ryan",
  quantindividuals: 2,
  quantchildrens: 1,
  isfamily: true,
  isfriend: false,
  ismusician: false,
  ispadrin: true,
  pertencea: "Noivo",
  statusconvite: 1,
  cell: "11987654321"
};

let userCreated = null;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await fetch("http://localhost:3000/api/v1/migrations", { method: "POST" });
});

describe("POST /api/v1/convidados", () => {
  let responseBody;
  test("Create new convidado", async () => {
    const response = await fetch("http://localhost:3000/api/v1/convidados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convidadoDefaultParams),
    });

    expect(response.status).toBe(201);
    responseBody = await response.json();
  });

  test("Verifica integridade dos dados cadastrados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");
    expect(responseBody.name).toBe(convidadoDefaultParams.name);
    expect(responseBody.quantindividuals).toBe(convidadoDefaultParams.quantindividuals);
    expect(responseBody.quantchildrens).toBe(convidadoDefaultParams.quantchildrens);
    userCreated = responseBody;
  });
});

describe("GET /api/v1/convidados", () => {
  let responseBody;

  test('Verifica se a API retorna status 200', async () => {
    const response = await fetch(`http://localhost:3000/api/v1/convidados`);
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test('Verifica estrutura dos convidados', async () => {
    expect(Array.isArray(responseBody)).toBe(true);

    if (responseBody.length > 0) {
      const firstConvidado = responseBody[0];
      expect(firstConvidado).toHaveProperty('id');
      expect(firstConvidado).toHaveProperty('name');
    }
  });
});

describe("GET /api/v1/convidados/:id", () => {
  let responseBody;
  test("Get convidado by ID", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/convidados/${userCreated.id}`);
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica estrutura do convidado", async () => {
    expect(typeof responseBody).toBe("object");
    expect(responseBody).toStrictEqual(userCreated);
    expect(responseBody).toHaveProperty("name");
    expect(responseBody).toHaveProperty("quantindividuals");
  });
});