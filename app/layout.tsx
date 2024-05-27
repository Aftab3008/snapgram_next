import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Snapgram",
  description: "Snapgram is a modern social media platform",
};

const localizations = {
  signUp: {
    start: {
      subtitle: "to access Snapgram",
    },
  },
  signIn: {
    start: {
      title: "Welcome back to Snapgram",
      subtitle: "Sign to continue",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
        },
      }}
      localization={localizations}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
