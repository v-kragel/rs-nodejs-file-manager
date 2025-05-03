import { resolve, basename, join } from "path";
import { stat, unlink } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";

export const mv = async (sourcePath, destinationPath) => {
  try {
    if (!sourcePath || !destinationPath) {
      console.log("Invalid input");
      return;
    }

    const fullSourcePath = resolve(process.cwd(), sourcePath);
    const fullDestinationPath = resolve(process.cwd(), destinationPath);

    const sourceStat = await stat(fullSourcePath);
    if (!sourceStat.isFile()) {
      console.log("Operation failed");
      return;
    }

    const destinationStat = await stat(fullDestinationPath);
    if (!destinationStat.isDirectory()) {
      console.log("Operation failed");
      return;
    }

    const fileName = basename(fullSourcePath);
    const finalDestPath = join(fullDestinationPath, fileName);

    await new Promise((resolvePromise, rejectPromise) => {
      const readStream = createReadStream(fullSourcePath);
      const writeStream = createWriteStream(finalDestPath);

      readStream.on("error", rejectPromise);
      writeStream.on("error", rejectPromise);
      writeStream.on("finish", resolvePromise);

      readStream.pipe(writeStream);
    });

    await unlink(fullSourcePath);
  } catch (error) {
    console.log(`Operation failed: ${error.message || error}`);
  }
};
