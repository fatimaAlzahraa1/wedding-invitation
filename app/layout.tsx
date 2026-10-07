import "./globals.css";

export const metadata = {
title: "Mohamed & Nada Wedding invitation",
  description: "A beautiful digital wedding invitation"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}