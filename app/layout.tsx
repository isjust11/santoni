import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santoni Mũi Né | Villa & Resort Nghỉ Dưỡng Sát Biển",
  description:
    "Santoni Mũi Né – Chuỗi Villa & Resort phong cách Địa Trung Hải biệt lập, sang trọng tại Mũi Né, Phan Thiết, Bình Thuận. Lý tưởng cho đoàn gia đình và nhóm đông người.",
  keywords: [
    "Santoni Mũi Né",
    "villa Mũi Né",
    "resort Mũi Né",
    "homestay Phan Thiết",
    "biệt thự Mũi Né",
    "nghỉ dưỡng Bình Thuận",
  ],
  openGraph: {
    title: "Santoni Mũi Né | Villa & Resort Nghỉ Dưỡng Sát Biển",
    description:
      "Chuỗi Villa & Resort phong cách Địa Trung Hải tại Mũi Né. Biệt lập, sang trọng, sát biển – lý tưởng cho gia đình và đoàn đông.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body>{children}</body>
    </html>
  );
}
