export default {
  providers: ["github"],
  roles: ["admin", "user"],
  profiles: {
    tabs: ["profile", "security"],
  },
  admin: {
    tabs: ["dashboard", "testimonials"],
  },
  verifyEmail: {
    not_allowed: false,
  },
  session: {
    allowed: 2,
  },
  productId: {
    main: 429842,
  },
} as AppConfig;
