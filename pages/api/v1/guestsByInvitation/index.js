import guestFactory from "models/guests";

const guestDb = guestFactory();

export default async function guest(request, response) {
  const allowedMethods = ["GET"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) {
    response.setHeader("Allow", allowedMethods);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
    }

    throw new Error({ message: "Method not allowed" });
  } catch (error) {
    console.log("Error", error);
    return response.status(405).json({ message: "Method not allowed" });
  }
}

async function getHandler(request, response) {
  const convidadosList = await guestDb.getGuests();
  return response.status(200).json(convidadosList);
}
