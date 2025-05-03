import { getUsernameFromArgs } from "./src/utils/parseArgs.js";
import { createCLI } from "./src/utils/createInterface.js";
import { handleExit } from "./src/utils/handleExit.js";
import { setInitialDirectory } from "./src/utils/setInitialDirectory.js";

const run = () => {
  const args = process.argv.slice(2);
  const username = getUsernameFromArgs(args);

  if (!username) {
    console.log(
      "Username is required. Please run the program with --username=your_username"
    );
    process.exit(1);
  }

  setInitialDirectory();

  console.log(`Welcome to the File Manager, ${username}`);

  createCLI(() => handleExit(username));
};

run();
