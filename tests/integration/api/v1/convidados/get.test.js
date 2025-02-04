import convidados from 'models/convidados';

describe('GET /api/v1/convidados', () => {
  describe('get convidados list', () => {
    test('List All convidados', async () => {
      const response = await fetch(`http://localhost:3000/api/v1/convidados`);
      // const responseBody = await response.json();

      console.log(response);


    });
  });
});