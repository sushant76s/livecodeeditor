import Interceptor from "./interceptor";

export const createRoom = async (data) => {
  try {
    const response = await Interceptor.post("/api/create-room", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const joinRoom = async (data) => {
  try {
    const response = await Interceptor.post("/api/join-room", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getRoom = async () => {
  try {
    const response = await Interceptor.get("/api/get-room");
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const roomInfo = async (id) => {
  try {
    const response = await Interceptor.post("/api/get-room-info", id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
