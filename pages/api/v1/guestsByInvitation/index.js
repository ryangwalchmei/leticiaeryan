import guestFactory from "../../../../models/guests";

const guestDb = guestFactory();

export default function guest(request, response) {
  const allowedMethods = ["GET"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) throw new Error();

  try {
    if (request.method === "GET") {
      return getHandler(request, response);
    }

    throw new Error({ message: "Method not allowed" });
  } catch (error) {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

async function getHandler(request, response) {
  const convidadosList = await guestDb.getGuests();
  return response.status(200).json(convidadosList);
}
