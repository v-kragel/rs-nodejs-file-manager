import { resolve } from "path";
import { createReadStream } from "fs";

export const cat = async (targetPath) => {
  return new Promise((resolvePromise) => {
    try {
      if (!targetPath) {
        console.log("Invalid input");
        return;
      }

      const fullPath = resolve(process.cwd(), targetPath);

      const stream = createReadStream(fullPath, { encoding: "utf-8" });

      stream.on("error", (error) => {
        console.log(`Operation failed: ${error.message || error}`);
				resolvePromise();
      });

      stream.on("end", () => {
        process.stdout.write("\n");
        resolvePromise();
      });

      stream.pipe(process.stdout);
    } catch (error) {
      console.log(`Operation failed: ${error.message || error}`);
    }
  });
};
