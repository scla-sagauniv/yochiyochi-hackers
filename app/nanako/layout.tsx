import Body from "../Body";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Body>
      {children}
    </Body>
  );
}