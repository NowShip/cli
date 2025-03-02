import { processTemplate } from "../config.js";
import type { Template } from "../../types";

// Template file structure
const templates: Record<string, Template> = {
  config: {
    type: "dir",
    files: {
      ".env": {
        content: `BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000/`,
        type: "file",
      },
      testing: {
        type: "dir",
        files: {
          "test.js": {
            content: `console.log("Hello, world!");`,
            type: "file",
          },
        },
      },
    },
  },
  auth: {
    type: "dir",
    files: {
      "auth.service.js": {
        content: `// Auth service template content`,
        type: "file",
      },
      middleware: {
        type: "dir",
        files: {
          "auth.middleware.js": {
            content: `// Middleware template content`,
            type: "file",
          },
        },
      },
    },
  },
};

export const generateBetterAuthFiles = (folderName: string) => {
  console.log("🚀 Initializing Better Auth setup...");

  try {
    processTemplate(folderName, templates);

    console.log("\n✨ Better Auth setup completed successfully!");
    console.log(
      "🔑 Don't forget to set your BETTER_AUTH_SECRET in the .env file"
    );
  } catch (error) {
    console.error("❌ Error generating files:", error);
    throw error;
  }
};
