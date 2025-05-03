export const getUsernameFromArgs = (args) => {
  const usernameArg = args.find((arg) => arg.startsWith("--username="));

  if (!usernameArg) return null;

  return usernameArg.split("=")[1];
};
