const path = (root, subLink) => `${root}${subLink}`;
const ROOT_PATH = "";

export const PATHS = {
  root: ROOT_PATH,
  login: path(ROOT_PATH, "/room"),
  editor: path(ROOT_PATH, "/room/:roomId"),
};
