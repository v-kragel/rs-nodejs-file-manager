import { homedir } from "os";

export const setInitialDirectory = () => {
  const homeDir = homedir();
  process.chdir(homeDir);
};
