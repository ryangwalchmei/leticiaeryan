const { default: Convidados } = require("models/convidados");
import orchestrator from 'tests/orchestrator';
let createdUserId = null;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  const newConvidado = {
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

  const response = await fetch(`http://localhost:3000/api/v1/convidados`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newConvidado),
  });

  const responseBody = await response.json();

  if (response.status !== 201) {
    throw new Error(`Falha ao criar convidado. Status: ${response.status}`);
  }

  createdUserId = responseBody[0].id;
});

describe('GET /api/v1/convidados/:id', () => {
  test('Get convidado by ID', async () => {
    expect(createdUserId).not.toBeNull();

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
