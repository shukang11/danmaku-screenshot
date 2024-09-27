import type { Metadata } from "next";
import "@/app/globals.css";
import { RootProviders } from "@/lib/providers/root-provider";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/layout/TailwindIndicator";
import { AdminPanelLayout } from "@/components/layout/admin-panel";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className="font-inter antialiased tracking-tight">
                <div className="flex flex-col min-h-screen overflow-hidden">
                    <RootProviders>
                        <AdminPanelLayout>
                            {children}
                        </AdminPanelLayout>
                        <Toaster />
                        <TailwindIndicator />
                    </RootProviders>
                </div>
            </body>
        </html>
    );
}