const path = require("path");
const fs = require("fs");

const REGISTRY_PATH = path.join(process.cwd(), "/contents");

function getFilesRecursive(directory) {
  const files = [];
  const items = fs.readdirSync(directory);

  // Remove the check for index.tsx
  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getFilesRecursive(fullPath));
    } else if (item.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = getFilesRecursive(REGISTRY_PATH);

let index = `import dynamic from "next/dynamic";
 
export const PREVIEWS: Record<string, { name: string; component: any; code: string }> = {`;

// Previews
for (const file of files) {
  const relativePath = path.relative(REGISTRY_PATH, file);
  let componentName = relativePath
    .replace(/\.tsx$/, "")
    .replace(/\//g, "-")
    .replace("-main", "");

  const fileContent = fs
    .readFileSync(file, "utf8")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");

  if (
    relativePath.includes("reusable-components") &&
    relativePath.includes("main")
  ) {
    continue;
  }

  index += `"${componentName}": {
      name: "${componentName.split("-").pop()}",
      component: dynamic(
        () => import("@/contents/${relativePath.replace(".tsx", "")}"),
        {
          ssr: false,
        }
      ),
      code: \`${fileContent}\`,
    },
  `;
}

index += `
};

`;

const COMPONENTS_PATH = path.join(process.cwd(), "/components/main-components");

const components = getFilesRecursive(COMPONENTS_PATH);

index += `export const COMPONENTS: Record<string, { name: string; component: any; code: string }> = {`;

for (const file of components) {
  const relativePath = path.relative(COMPONENTS_PATH, file);
  let componentName = relativePath
    .replace(/\.tsx$/, "")
    .replace(/\//g, "-")
    .replace("-main", "");

  const fileContent = fs.readFileSync(file, "utf8");

  index += `"${componentName}": {
      name: "${componentName.split("-").pop()}",
      component: dynamic(
        () => import("@/components/main-components/${relativePath.replace(".tsx", "")}"),
        {
          ssr: false,
        }
      ),
      code: \`${fileContent}\`,
    },
  `;
}

index += `
};

`;

fs.writeFileSync(path.join(process.cwd(), "__registry__/index.tsx"), index);
