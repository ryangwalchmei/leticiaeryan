describe('POST /api/v1/convidados', () => {
  test('Create new convidado', async () => {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newConvidado)
    });

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status).toBe(201);

    expect(typeof responseBody).toBe('object');
    expect(responseBody[0]).toHaveProperty('id');
    expect(responseBody[0]).toMatchObject(newConvidado);
  });
});