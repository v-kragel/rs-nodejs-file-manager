import { platform } from "os";
import { parse } from "path";

export const up = () => {
  const currentDir = process.cwd();
  const rootDir = platform() === "win32" ? parse(currentDir).root : "/";

  if (currentDir === rootDir) {
    console.log("You are already at the root directory");
  } else {
    process.chdir("..");
  }
};
