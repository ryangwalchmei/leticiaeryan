import giftsFactory from "models/gifts";

const giftsDb = giftsFactory();

export default function gifts(request, response) {
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) throw new Error();

  try {
    if (request.method === "GET") {
      return getHandler(request, response);
    } else if (request.method === "POST") {
      return postHandler(request, response);
    } else if (request.method === "PUT") {
      return putHandler(request, response);
    } else if (request.method === "DELETE") {
      return deleteHandler(request, response);
    }
  } catch (error) {
    console.log("Error");
  }
}

async function getHandler(request, response) {
  const giftsList = await giftsDb.getGifts();
  return response.status(200).json(giftsList);
}

async function postHandler(request, response) {
  const returnIdGiftsDb = await giftsDb.createGifts(request.body);

  return response.status(201).json(returnIdGiftsDb[0]);
}

async function putHandler(request, response) {
  const returnGift = await giftsDb.updateGift(request.query.id, request.body);

  return response.status(200).json(returnGift[0]);
}

async function deleteHandler(request, response) {
  const returnGift = await giftsDb.deleteGift(request.query.id);
  return response.status(204).json(returnGift[0]);
}
