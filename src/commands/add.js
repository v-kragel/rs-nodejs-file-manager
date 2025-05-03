import { writeFile, access, constants } from "fs/promises";
import { resolve } from "path";

export const add = async (filename) => {
  try {
    if (!filename) {
      console.log("Invalid input");
      return;
    }

    const fullPath = resolve(process.cwd(), filename);

    try {
      await access(fullPath, constants.F_OK);
      console.log("Operation failed: File already exists");
      return;
    } catch {}

    await writeFile(fullPath, "", { flag: "wx" });
  } catch (error) {
    console.log(`Operation failed: ${error.message || error}`);
  }
};
