import Interceptor from "./interceptor";

export const userSignIn = async (data) => {
  try {
    const response = await Interceptor.post("/api/signin", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const userSignUp = async (data) => {
  try {
    const response = await Interceptor.post("/api/signup", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const userInfo = async (userId) => {
  try {
    const response = await Interceptor.get(`/api/userinfo`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
