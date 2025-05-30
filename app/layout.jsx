import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSI Open-Day Quiz Event",
  description: "Tech and Non-Tech quizzes for the Tech Club event",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative">
            {/* Logo Placeholder */}
            <div className="absolute top-4 left-4 z-10">
              <img
                src="/logo.png"
                alt="Tech Club Logo"
                className="h-35 w-35 rounded-full"
              />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
