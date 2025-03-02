interface FunctionResponse<T> {
  data: T;
  message: string;
  status: number;
}

interface ErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
}

interface LemonSqueezyError {
  jsonapi: { version: string };
  errors: {
    detail: string;
    source: {
      pointer: string;
    };
    status: string;
    title: string;
  }[];
}

interface CheckoutOptions {
  redirectUrl?: string;
  receiptButtonText?: string;
  price?: number;
  name?: string;
  description?: string;
  username?: string;
  email?: string;
}

type Plan = "free" | "pro" | "business";
type Provider = "google" | "github";
type Role = "admin" | "user";
type ProfileTab = "profile" | "security" | "billing";
type AdminTab = "dashboard" | "testimonials";

interface AppConfig {
  providers: Provider[];
  roles: Role[];
  profiles: {
    tabs: ProfileTab[];
  };
  admin: {
    tabs: AdminTab[];
  };
  verifyEmail: {
    not_allowed: boolean;
  };
  session: {
    allowed: number;
  };
  productId: {
    main: number;
  };
}
