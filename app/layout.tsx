import "./globals.css";

export const metadata = {
  title: "Mohamed & Nada Wedding Invitation",
  description: "Join Mohamed & Nada as they celebrate their wedding on October 18, 2026.",
  openGraph: {
    title: "Mohamed & Nada Wedding Invitation",
    description: "Join Mohamed & Nada as they celebrate their wedding on October 18, 2026.",
    images: ["/image/save-the-date-calendar.png"],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}