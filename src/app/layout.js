import { DataProvider } from './DataContext';
import "./globals.css";
import Header from "./components/header";

export const metadata = {
  title: "Frontend Quiz App",
  description: "Frontend Quiz App",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
      </head>
      <body>
        <DataProvider>
          <Header/>
          <main>
            {children}
          </main>
        </DataProvider>
      </body>
    </html>
  );
}
