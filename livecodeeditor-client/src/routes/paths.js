const path = (root, subLink) => `${root}${subLink}`;
const ROOT_PATH = "";

export const PATHS = {
  root: ROOT_PATH,
  createRoom: path(ROOT_PATH, "/room"),
  room: path(ROOT_PATH, "/room/:room_id"),
  login: path(ROOT_PATH, "/login"),
  singup: path(ROOT_PATH, "/signup"),
};
