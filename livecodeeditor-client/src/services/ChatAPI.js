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

export const roomChatHistory = async (roomIntId) => {
  try {
    const response = await Interceptor.get(
      `/api/get-room-chat-history/${roomIntId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const personalChatHistory = async (receiverId) => {
  try {
    const response = await Interceptor.get(
      `/api/get-personal-chat-history/${receiverId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
