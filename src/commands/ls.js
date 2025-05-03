import { readdir, stat } from "fs/promises";
import { join } from "path";

export const ls = async () => {
  try {
    const currentDir = process.cwd();
    const dirContent = await readdir(currentDir);

    const items = await Promise.all(
      dirContent.map(async (name) => {
        const fullPath = join(currentDir, name);
        const stats = await stat(fullPath);
        return {
          name,
          type: stats.isDirectory() ? "Directory" : "File",
        };
      })
    );

    items.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "Directory" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    console.table(items, ["name", "type"]);
  } catch (err) {
    console.log(`Operation failed: ${err.message || err}`);
  }
};
