import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { processTemplate } from "../utils/config.js";
import { TemplateType } from "../types/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Get the source directory by going up from dist to src
const sourceDir = path.join(__dirname, "..", "..", "src");

function createTemplateObject(dirPath: string): any {
  const templates: Record<string, any> = {};
  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      templates[item] = {
        type: "dir",
        files: createTemplateObject(fullPath),
      };
    } else {
      templates[item] = {
        type: "file",
        content: fs.readFileSync(fullPath, "utf8"),
      };
    }
  });

  return templates;
}

// Replace the hardcoded template directory with folderName

export const generateFiles = (folderName: string, type: TemplateType) => {
  if (type === "better-auth") {
    console.log("🚀 Initializing Better Auth setup...");
  }

  try {
    const templateDir = path.join(sourceDir, `templates/${type}`);

    const output = createTemplateObject(templateDir);
    processTemplate(folderName, output);

    if (type === "better-auth") {
      console.log("\n✨ Better Auth setup completed successfully!");
      console.log(
        "🔑 Don't forget to set your BETTER_AUTH_SECRET in the .env file"
      );
    }
  } catch (error) {
    console.error("❌ Error generating files:", error);
    throw error;
  }
};
