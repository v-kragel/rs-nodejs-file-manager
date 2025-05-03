import { createHash } from "crypto";
import { createReadStream } from "fs";
import { resolve } from "path";

export const hash = async (targetPath) => {
  return new Promise((resolvePromise) => {
    try {
      if (!targetPath) {
        console.log("Invalid input");
        return;
      }

      const fullPath = resolve(process.cwd(), targetPath);
      const hash = createHash("sha256");
      const stream = createReadStream(fullPath);

      stream.on("error", () => {
        console.log("Operation failed");
        resolvePromise();
      });

      stream.on("data", (chunk) => {
        hash.update(chunk);
      });

      stream.on("end", () => {
        const digest = hash.digest("hex");
        console.log(digest);
        resolvePromise();
      });
    } catch (error) {
      console.log(`Operation failed: ${error.message || error}`);
    }
  });
};
