export type ProjectType = "nextjs" | "npm-package" | "docs";

export interface AllAnswers {
  projectName: string;
  DB: boolean;
  "better-auth"?: boolean;
  lemonsqueezy: boolean;
  resend: boolean;
  projectType: ProjectType;
}

export type TemplateType = "npm-package" | "better-auth" | "db";

export interface Template {
  type: "file" | "dir";
  content?: string;
  files?: {
    [key: string]: Template;
  };
}
