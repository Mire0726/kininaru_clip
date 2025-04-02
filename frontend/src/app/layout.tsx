import { Providers } from "./providers";
export const metadata = {
  title: "キニナルクリップ",
  description: "キニナル場所をシェアしよう！",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
