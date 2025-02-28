export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
} as const;

export type ApiConfig = typeof API_CONFIG;
