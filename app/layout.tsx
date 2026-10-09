import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://mohamed-nada-wedding-invitation.vercel.app"),
  title: "Mohamed & Nada Wedding Invitation",
  description: "Join Mohamed & Nada as they celebrate their wedding on October 18, 2026.",
  openGraph: {
    title: "Mohamed & Nada Wedding Invitation",
    description: "Join Mohamed & Nada as they celebrate their wedding on October 18, 2026.",
images: ["/image/wedding-preview.jpg"],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}