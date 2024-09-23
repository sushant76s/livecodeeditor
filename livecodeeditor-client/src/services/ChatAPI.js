import Interceptor from "./interceptor";

export const roomChat = async (data) => {
  try {
    const response = await Interceptor.post("/api/room-chat", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const personalChat = async (data) => {
  try {
    const response = await Interceptor.post("/api/personal-chat", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
