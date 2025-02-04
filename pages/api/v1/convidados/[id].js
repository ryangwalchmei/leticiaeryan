import userFactory from "models/convidados";
const convidados = userFactory();

export default function convidado(request, response) {
  try {
    if (request.method === "GET") {
      return getHandler(request, response);
    }
  } catch (error) {
    console.log("Error");
  }
}

async function getHandler(request, response) {
  const returnUser = await convidados.getConvidado(request.query.id);
  return response.status(200).json(returnUser[0]);
}
