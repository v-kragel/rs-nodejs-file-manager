import { resolve, basename, join } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { stat } from "fs/promises";

export const decompress = async (sourcePath, destinationPath) => {
  try {
    if (!sourcePath || !destinationPath) {
      console.log("Invalid input");
      return;
    }

    const fullSourcePath = resolve(process.cwd(), sourcePath);
    const fullDestinationDir = resolve(process.cwd(), destinationPath);
    const fileName = basename(fullSourcePath, ".br");
    const destinationFilePath = join(fullDestinationDir, fileName);

    const sourceStat = await stat(fullSourcePath);

    if (!sourceStat.isFile()) {
      console.log("Operation failed");
      return;
    }

    const readStream = createReadStream(fullSourcePath);
    const brotli = createBrotliDecompress();
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
