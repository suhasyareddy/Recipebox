import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RecipeBox - Homestyle Indian Meal Planning",
  description:
    "Cherishing Indian Domestic Kitchens. Balanced, delicious homestyle Indian meal planning with tender spices, pantry matching, and zero kitchen fatigue.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (document.cookie) {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                      var c = cookies[i].trim();
                      if (c.indexOf('data%3Aimage') !== -1 || c.indexOf('data:image') !== -1 || (c.indexOf('sb-') === 0 && c.length > 2500)) {
                        var name = c.split('=')[0];
                        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';
                      }
                    }
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <Providers>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
