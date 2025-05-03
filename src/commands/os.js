import { EOL, cpus, homedir, userInfo } from "os";

export const os = async (arg) => {
  try {
    switch (arg) {
      case "--EOL":
        console.log(JSON.stringify(EOL));
        break;

      case "--cpus":
        const _cpus = cpus();
        console.log(`Total CPUs: ${_cpus.length}`);
        _cpus.forEach((cpu, index) => {
          const { model, speed } = cpu;

          console.log(`CPU ${index + 1}: ${model}, ${speed / 1000} GHz`);
        });
        break;

      case "--homedir":
        console.log(homedir());
        break;

      case "--username":
        console.log(userInfo().username);
        break;

      case "--architecture":
        console.log(process.arch);
        break;

      default:
        console.log("Invalid input");
        break;
    }
  } catch (error) {
    console.log(`Operation failed: ${error.message || error}`);
  }
};
