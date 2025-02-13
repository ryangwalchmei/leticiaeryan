import orchestrator from "tests/orchestrator";

const giftsDefaultParams = {
  name: "Kit de cosméticos",
  categoria: "Cosméticos",
  preco_estimado: 300,
  loja_sugerida: "Natura",
  status: "Ocioso",
  data_reserva: new Date().toISOString(),
};

let giftCreated = null;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await fetch("http://localhost:3000/api/v1/migrations", { method: "POST" });
});

describe("POST /api/v1/gifts", () => {
  let responseBody;
  test("Create new gift", async () => {
    const response = await fetch("http://localhost:3000/api/v1/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(giftsDefaultParams),
    });

    expect(response.status).toBe(201);
    responseBody = await response.json();
  });

  test("Verifica integridade dos dados cadastrados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");
    expect(responseBody.name).toBe(giftsDefaultParams.name);
    expect(responseBody.quantindividuals).toBe(
      giftsDefaultParams.quantindividuals,
    );
    expect(responseBody.quantchildrens).toBe(giftsDefaultParams.quantchildrens);
    giftCreated = responseBody;
  });
});

describe("GET /api/v1/gifts", () => {
  let responseBody;

  test("Verifica se a API retorna status 200", async () => {
    const response = await fetch(`http://localhost:3000/api/v1/gifts`);
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica estrutura dos presentes", async () => {
    expect(Array.isArray(responseBody)).toBe(true);

    const firstConvidado = responseBody[0];
    expect(firstConvidado).toHaveProperty("id");
    expect(firstConvidado).toHaveProperty("name");
  });
});

describe("GET /api/v1/gifts/:id", () => {
  let responseBody;
  test("Get a gift by ID", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${giftCreated.id}`,
    );
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica estrutura do presente", async () => {
    expect(typeof responseBody).toBe("object");
    expect(responseBody).toStrictEqual(giftCreated);
    expect(responseBody).toHaveProperty("name");
    expect(responseBody).toHaveProperty("categoria");
  });
});

describe("PUT /api/v1/gifts/:id", () => {
  let responseBody;
  test("Update a gift by ID", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${giftCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...giftsDefaultParams,
          name: "Kit de maquiagem",
        }),
      },
    );
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica integridade dos dados atualizados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");
    expect(responseBody.name).toBe("Kit de maquiagem");
    expect(responseBody.quantindividuals).toBe(
      giftsDefaultParams.quantindividuals,
    );
    expect(responseBody.quantchildrens).toBe(giftsDefaultParams.quantchildrens);
  });
});

describe("DELETE /api/v1/gifts/:id", () => {
  test("Delete a gift by ID", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${giftCreated.id}`,
      { method: "DELETE" },
    );
    expect(response.status).toBe(204);
  });
});
