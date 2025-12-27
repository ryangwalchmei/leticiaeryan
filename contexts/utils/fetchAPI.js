export default async function fetchAPI(endpoint, options) {
  try {
    const response = await fetch(endpoint, {
      ...options,
      credentials: "include",
    });

    console.log({ response });
    if (!response.ok) {
      const errorObject = await response.json();
      throw errorObject;
    }

    if (response.statusText === "No Content") return response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}
