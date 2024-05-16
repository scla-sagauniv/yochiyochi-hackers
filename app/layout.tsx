import type { Metadata } from "next";
import Provider from "./Provider";
import Header from "./Header";
import Body from "./Body";


export const metadata: Metadata = {
  title: "yochiyochi",
  description: "hack'z hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>
        <Provider>
          <Header />
          <Body>
            {children}
          </Body>
        </Provider>
      </body>
    </html>
  );
}