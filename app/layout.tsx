import "./globals.css";

import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Container>
                    <Navbar />
                    {children}
                </Container>
            </body>
        </html>
    );
};

export default RootLayout;
