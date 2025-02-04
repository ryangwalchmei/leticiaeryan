
import convidadosFactory from 'models/convidados.js';

const convidadosDb = convidadosFactory();

export default function convidados(request, response) {
  const allowedMethods = ['GET', 'POST'];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) throw new Error;

  try {
    if (request.method === "GET") {
      return getHandler(request, response);
    }

    return postHandler(request, response);

  } catch (error) {
    console.log("Error");

  }
}

async function getHandler(request, response) {
  const convidadosList = await convidadosDb.getConvidados();
  return response.status(200).json(convidadosList);
}

async function postHandler(request, response) {
  const returnIdconvidadosDb = await convidadosDb.createConvidados(request.body);

  return response.status(201).json(returnIdconvidadosDb);
} 