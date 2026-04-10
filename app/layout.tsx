// import page from './page.tsx';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js + Tailwind CSS Starter</title>
        <meta name="description" content="A starter template for Next.js with Tailwind CSS and TypeScript." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}