import giftFactory from "models/gifts";
const gifts = giftFactory();

export default async function Gift(request, response) {
  const allowedMethods = ["GET", "PUT", "DELETE"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) {
    response.setHeader("Allow", allowedMethods);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
      case "PUT":
        return await putHandler(request, response);
      case "DELETE":
        return await deleteHandler(request, response);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

async function getHandler(request, response) {
  const returnGift = await gifts.getGift(request.query.id);
  return response.status(200).json(returnGift[0]);
}

async function putHandler(request, response) {
  const returnGift = await gifts.updateGift(request.query.id, request.body);

  return response.status(200).json(returnGift[0]);
}

async function deleteHandler(request, response) {
  const returnGift = await gifts.deleteGift(request.query.id);
  return response.status(204).json(returnGift[0]);
}
