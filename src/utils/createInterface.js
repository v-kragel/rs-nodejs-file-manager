import readline from "readline";
import { printCWD } from "./printCWD.js";
import { handleCommand } from "./handleCommand.js";

export const createCLI = (onExit) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">>> ",
  });

  printCWD();
  rl.prompt();

  rl.on("line", async (line) => {
    const trimmed = line.trim();

    if (trimmed === ".exit") {
      onExit();
    } else {
      await handleCommand(line);

      printCWD();

      rl.prompt();
    }
  });

  rl.on("SIGINT", () => {
    rl.close();

    onExit();
  });
};
