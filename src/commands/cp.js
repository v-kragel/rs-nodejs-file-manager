import { resolve, basename, join } from "path";
import { stat } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";

export const cp = async (sourcePath, destinationPath) => {
  try {
    if (!sourcePath || !destinationPath) {
      console.log("Invalid input");
      return;
    }

    const fullSourcePath = resolve(process.cwd(), sourcePath);
    const fullDestinationPath = resolve(process.cwd(), destinationPath);
    const fileName = basename(fullSourcePath);
    const destPath = join(fullDestinationPath, fileName);

    const sourceStat = await stat(fullSourcePath);
    const destinationStat = await stat(fullDestinationPath);

    if (!sourceStat.isFile() || !destinationStat.isDirectory()) {
      console.log("Operation failed");
      return;
    }

    const readStream = createReadStream(fullSourcePath);
    const writeStream = createWriteStream(destPath);

    readStream.on("error", () => console.log("Operation failed"));
    writeStream.on("error", () => console.log("Operation failed"));

    readStream.pipe(writeStream);
  } catch (error) {
    console.log(`Operation failed: ${error.message || error}`);
  }
};
