const path = (root, subLink) => `${root}${subLink}`;
const ROOT_PATH = "";

export const PATHS = {
  root: ROOT_PATH,
  room: path(ROOT_PATH, "/room"),
  editor: path(ROOT_PATH, "/room/:roomId"),
  login: path(ROOT_PATH, "/login"),
  singup: path(ROOT_PATH, "/signup"),
};
