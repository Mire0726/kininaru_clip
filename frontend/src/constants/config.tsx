export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
} as const;

if (
  process.env.NODE_ENV !== "production" &&
  !process.env.NEXT_PUBLIC_API_BASE_URL
) {
  console.warn(
    "Warning: NEXT_PUBLIC_API_BASE_URL is not defined, using default value"
  );
}

export type ApiConfig = typeof API_CONFIG;
