const { default: Convidados } = require("models/convidados");

describe('GET /api/v1/convidados/:id', () => {
  test('Get convidado by ID', async () => {
    const convidadosList = await Convidados().getConvidados();

    expect(convidadosList.length).toBeGreaterThan(0);
    const id = convidadosList[0].id;

    const response = await fetch(`http://localhost:3000/api/v1/convidados/${id}`);

    const responseBody = await response.json();

    expect(response.status).toBe(200);

    expect(typeof responseBody).toBe("object");
    expect(responseBody[0]).toHaveProperty("id", id);
    expect(responseBody[0]).toHaveProperty("name");
    expect(responseBody[0]).toHaveProperty("quantindividuals");
  });
});
