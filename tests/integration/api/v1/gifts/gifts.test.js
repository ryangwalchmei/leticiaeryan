import orchestrator from "tests/orchestrator";

const giftsDefaultParams = {
  ext: ".jpg",
  alt: "Cosméticos",
  link: "https://www.natura.com.br/maquiagem/kit-de-maquiagem-para-o-olho-e-boca/p",
  title: "Natura",
  price: "1000",
  available: false,
  received: false,
};

let giftCreated = null;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.runMigrationsPending();
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
    expect(firstConvidado).toHaveProperty("title");
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
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("title");
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
          title: "Kit de maquiagem",
        }),
      },
    );
    expect(response.status).toBe(200);
    responseBody = await response.json();
  });

  test("Verifica integridade dos dados atualizados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");
    expect(responseBody.title).toBe("Kit de maquiagem");
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
