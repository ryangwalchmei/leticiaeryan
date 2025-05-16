import orchestrator from "tests/orchestrator";
import { randomUUID } from "crypto";

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
    giftCreated = responseBody;
  });

  test("Retorna 400 se dados obrigatórios estiverem ausentes", async () => {
    const response = await fetch("http://localhost:3000/api/v1/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // corpo inválido
    });

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("message");
  });

  test("Retorna 400 se o link fornecido por inválido", async () => {
    const example = {
      ext: ".jpg",
      alt: "Cosméticos",
      link: "htagem-para-o-olho-e-boca/p",
      title: "Natura",
      price: "1000",
      available: false,
      received: false,
    };
    const response = await fetch("http://localhost:3000/api/v1/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(example), // corpo inválido
    });

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("message");
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

    const firstGift = responseBody[0];
    expect(firstGift).toHaveProperty("id");
    expect(firstGift).toHaveProperty("title");
  });
});

describe("GET /api/v1/gifts/:id", () => {
  let responseBody;

  test("Retorna 200 e o presente correto quando o ID é válido", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${giftCreated.id}`,
    );

    expect(response.status).toBe(200);
    responseBody = await response.json();

    expect(typeof responseBody).toBe("object");
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("title");
    expect(responseBody).toHaveProperty("link");
    expect(responseBody).toHaveProperty("available");
    expect(responseBody).toHaveProperty("received");

    // Checagem de tipos (defensivo)
    expect(typeof responseBody.id).toBe("string");
    expect(typeof responseBody.title).toBe("string");
    expect(typeof responseBody.link).toBe("string");
    expect(typeof responseBody.available).toBe("boolean");
    expect(typeof responseBody.received).toBe("boolean");

    // Confirma integridade dos dados
    expect(responseBody).toStrictEqual(giftCreated);
  });

  test("Retorna 404 quando o ID não existe", async () => {
    const fakeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${fakeId}`,
    );

    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body).toHaveProperty("message");
    expect(body.message).toMatch("Gift is not found");
  });

  test("Retorna 400 quando o ID é malformado", async () => {
    const invalidId = "not-a-valid-uuid";
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${invalidId}`,
    );

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty("message");
    expect(body.message).toMatch("Invalid ID");
  });
});

describe("PUT /api/v1/gifts/:id", () => {
  let responseBody;

  test("Atualiza um presente com sucesso", async () => {
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
    responseBody = await response.json();
    expect(response.status).toBe(200);
  });

  test("Verifica integridade dos dados atualizados", async () => {
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");
    expect(responseBody.title).toBe("Kit de maquiagem");
  });

  test("Falha ao atualizar presente com propriedades obrigatórias ausentes", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${giftCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "",
        }),
      },
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("message");
  });

  test("Falha ao atualizar presente com ID inexistente", async () => {
    const fakeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // UUID válido mas não existente

    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${fakeId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...giftsDefaultParams,
          title: "Presente inexistente",
        }),
      },
    );
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body).toHaveProperty("message");
    expect(body.message).toMatch("Gift is not found");
  });

  test("Falha ao atualizar presente com ID inválido (não UUID)", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/id-invalido-123`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...giftsDefaultParams,
          title: "Presente com ID inválido",
        }),
      },
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("message");
    expect(body.message).toMatch("Invalid ID");
  });

  test("Atualiza todos os campos e verifica persistência", async () => {
    const updatedData = {
      ...giftsDefaultParams,
      title: "Novo título",
      link: "https://exemplo.com/presente",
      ext: ".png",
      price: "199.99",
      available: true,
      received: true,
    };

    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${giftCreated.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      },
    );

    expect(response.status).toBe(200);
    const body = await response.json();

    Object.entries(updatedData).forEach(([key, value]) => {
      expect(body[key]).toEqual(value);
    });
  });
});

describe("DELETE /api/v1/gifts/:id", () => {
  let giftToDelete;

  beforeAll(async () => {
    const response = await fetch("http://localhost:3000/api/v1/gifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ext: ".jpg",
        alt: "Brinquedo",
        link: "https://exemplo.com/brinquedo",
        title: "Presente para criança",
        price: "199.99",
        available: true,
        received: false,
      }),
    });
    giftToDelete = await response.json();
  });

  test("Deleta um presente com sucesso", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${giftToDelete.id}`,
      { method: "DELETE" },
    );
    expect(response.status).toBe(204);
  });

  test("Tenta deletar novamente o mesmo ID (deve retornar 404)", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${giftToDelete.id}`,
      { method: "DELETE" },
    );
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.message).toMatch("Gift is not found");
  });

  test("Tenta deletar um ID que não existe (UUID válido)", async () => {
    const fakeId = randomUUID();
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/${fakeId}`,
      { method: "DELETE" },
    );
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.message).toMatch("Gift is not found");
  });

  test("Tenta deletar com ID inválido (UUID malformado)", async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/gifts/id-invalido`,
      { method: "DELETE" },
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.message).toMatch("Invalid ID");
  });
});
