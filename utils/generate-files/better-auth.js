import fs from "fs";

export const generateBetterAuthFiles = (folderName) => {
  console.log("🚀 Initializing Better Auth setup...");

  // Create the folder
  console.log("📁 Creating folder structure...");
  fs.mkdirSync(folderName);

  // Create the config file
  console.log("⚙️  Generating configuration file...");
  fs.writeFileSync(
    `${folderName}/.env`,
    `BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000/`
  );

  // Create the auth service
};

console.log("\n✨ Better Auth setup completed successfully!");
console.log("🔑 Don't forget to set your BETTER_AUTH_SECRET in the .env file");
