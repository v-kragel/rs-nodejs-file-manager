import {
  up,
  cd,
  ls,
  cat,
  add,
  mkdir,
  rn,
  cp,
  mv,
  rm,
  os,
  hash,
  compress,
  decompress,
} from "../commands/index.js";

export const handleCommand = async (line) => {
  const command = line.trim();

  if (!command) return;

  const [cmd, ...args] = command.split(" ");
  const argStr = args.join(" ");

  try {
    switch (cmd) {
      case "up":
        up();
        break;

      case "cd":
        cd(argStr);
        break;

      case "ls":
        await ls();
        break;

      case "cat":
        await cat(argStr);
        break;

      case "add":
        await add(argStr);
        break;

      case "mkdir":
        await mkdir(argStr);
        break;

      case "rn": {
        const [pathToFile, newName] = args;
        await rn(pathToFile, newName);
        break;
      }

      case "cp": {
        const [source, destination] = args;
        await cp(source, destination);
        break;
      }

      case "mv": {
        const [source, destination] = args;
        await mv(source, destination);
        break;
      }

      case "rm":
        await rm(argStr);
        break;

      case "os":
        await os(argStr);
        break;

      case "hash":
        await hash(argStr);
        break;

      case "compress": {
        const [source, destination] = args;
        await compress(source, destination);
        break;
      }

      case "decompress": {
        const [source, destination] = args;
        await decompress(source, destination);
        break;
      }

      default:
        console.log("Invalid input");
        break;
    }
  } catch (err) {
    console.log(`Operation failed: ${err.message || err}`);
  }
};
