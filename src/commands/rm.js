import { resolve } from "path";
import { stat, unlink } from "fs/promises";

export const rm = async (targetPath) => {
  try {
    if (!targetPath) {
      console.log("Invalid input");
      return;
    }

    const fullPath = resolve(process.cwd(), targetPath);
    const fileStat = await stat(fullPath);

    if (!fileStat.isFile()) {
      console.log("Operation failed");
      return;
    }

    await unlink(fullPath);
  } catch (error) {
    console.log("Operation failed");
  }
};
