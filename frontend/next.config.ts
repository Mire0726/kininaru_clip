import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ,
  },
  // 環境変数のバリデーション
  onDemandEntries: {
    // @ts-ignore
    webpack(config, options) {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.warn('\x1b[33m%s\x1b[0m', '警告: NEXT_PUBLIC_API_BASE_URL が設定されていません');
      }
      return config;
    },
  },
};

export default nextConfig;