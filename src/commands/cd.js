import { statSync } from "fs";
import { platform } from "os";
import { isAbsolute, relative, resolve, parse } from "path";

export const cd = (targetPath) => {
  if (!targetPath) {
    console.log("Invalid input");
    return;
  }

  const currentDir = process.cwd();
  const rootDir = platform() === "win32" ? parse(currentDir).root : "/";

  const resolvedPath = resolve(currentDir, targetPath);

  try {
    const stats = statSync(resolvedPath);

    if (!stats.isDirectory()) throw new Error();

    const relativeToRoot = relative(rootDir, resolvedPath);

    const isAboveRoot =
      relativeToRoot.startsWith("..") ||
      (isAbsolute(relativeToRoot) && !relativeToRoot);

    if (isAboveRoot) {
      console.log("You are already at the root directory");

      return;
    }

    process.chdir(resolvedPath);
  } catch (err) {
    console.log(`Operation failed: ${err.message || err}`);
  }
};
