import Interceptor from "./interceptor";

export const saveCodeSnippet = async (data) => {
  try {
    const response = await Interceptor.post("/api/save-snippet", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
