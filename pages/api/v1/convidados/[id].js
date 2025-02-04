import userFactory from 'models/convidados';
const convidados = userFactory();

export default function convidado(request, response) {
  try {
    if (request.method === "GET") {
      console.log(request);

      return getHandler(request, response);
    }

    return postHandler(request, response);

  } catch (error) {
    console.log("Error");

  }
}

async function getHandler(request, response) {
  const returnUser = await convidados.getConvidado(request.query.id);
  return response.status(200).json(returnUser);
}
