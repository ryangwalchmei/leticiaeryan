import giftFactory from "models/gifts";
const gifts = giftFactory();

export default function Gift(request, response) {
  try {
    if (request.method === "GET") {
      return getHandler(request, response);
    } else if (request.method === "PUT") {
      return putHandler(request, response);
    } else if (request.method === "DELETE") {
      return deleteHandler(request, response);
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
