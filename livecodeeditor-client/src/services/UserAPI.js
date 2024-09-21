import Interceptor from "./interceptor";

export const getUser = async () => {
  try {
    const response = await Interceptor.get("/api/user");
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
