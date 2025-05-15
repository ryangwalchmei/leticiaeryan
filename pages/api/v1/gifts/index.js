import giftsFactory from "models/gifts";

const giftsDb = giftsFactory();

export default async function gifts(request, response) {
  const allowedMethods = ["GET", "POST"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) {
    response.setHeader("Allow", allowedMethods);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
      case "POST":
        return await postHandler(request, response);
    }
  } catch (error) {
    console.log("Error", error);
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
