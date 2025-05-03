import { mkdir as createDirectory } from "fs/promises";
import { resolve } from "path";

export const mkdir = async (dirName) => {
  try {
    if (!dirName) {
      console.log("Invalid input");
      return;
    }

    const fullPath = resolve(process.cwd(), dirName);

    await createDirectory(fullPath);
  } catch (error) {
    console.log(`Operation failed: ${error.message || error}`);
  }
};
