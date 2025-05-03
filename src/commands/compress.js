import { resolve, basename, join } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import { stat } from "fs/promises";

export const compress = async (sourcePath, destinationPath) => {
  try {
    if (!sourcePath || !destinationPath) {
      console.log("Invalid input");
      return;
    }

    const fullSourcePath = resolve(process.cwd(), sourcePath);
    const fullDestinationDir = resolve(process.cwd(), destinationPath);
    const fileName = basename(fullSourcePath);
    const destinationFilePath = join(fullDestinationDir, `${fileName}.br`);

    const sourceStat = await stat(fullSourcePath);

    if (!sourceStat.isFile()) {
      console.log("Operation failed");
      return;
    }

    const readStream = createReadStream(fullSourcePath);
    const brotli = createBrotliCompress();
    const writeStream = createWriteStream(destinationFilePath);

    readStream
      .on("error", () => console.log("Operation failed"))
      .pipe(brotli)
      .on("error", () => console.log("Operation failed"))
      .pipe(writeStream)
      .on("error", () => console.log("Operation failed"));
  } catch {
    console.log(`Operation failed: ${error.message || error}`);
  }
};
