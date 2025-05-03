import { rename, stat } from "fs/promises";
import { resolve, dirname, join } from "path";

export const rn = async (sourcePath, newName) => {
  try {
    if (!sourcePath || !newName) {
      console.log("Invalid input");
      return;
    }

    const oldPath = resolve(process.cwd(), sourcePath);
    const dir = dirname(oldPath);
    const newPath = join(dir, newName);

    await stat(oldPath);

    await rename(oldPath, newPath);
  } catch (error) {
    console.log(`Operation failed: ${error.message || error}`);
  }
};
