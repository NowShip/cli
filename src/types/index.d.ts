interface DBAnswers {
  projectName: string;
  DB: boolean;
}

interface ProjectAnswers {
  lemonsqueezy: boolean;
  resend: boolean;
  betterauth?: boolean; // Optional since it only exists when DB is true
}

// Combined type for all answers
export interface AllAnswers extends DBAnswers, ProjectAnswers {}

export interface Template {
  type: "file" | "dir";
  content?: string;
  files?: {
    [key: string]: Template;
  };
}
