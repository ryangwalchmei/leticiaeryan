import orchestrator from 'tests/orchestrator';

beforeAll(async () => {
  try {
    await orchestrator.waitForAllServices();
  } catch (error) {
    console.error("Erro ao iniciar os serviços:", error);
  }
});

describe('GET /api/v1/convidados', () => {
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
