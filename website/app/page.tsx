import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Tools } from "@/components/tools";
import { Statistics } from "@/components/statistics";
import { OpenSource } from "@/components/opensource";
import { Download } from "@/components/download";
import { Footer } from "@/components/footer";
import { ScrollProvider } from "@/lib/scroll-context";

export default function Page() {
  return (
    <ScrollProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <Tools />
        <Statistics />
        <OpenSource />
        <Download />
        <Footer />
      </main>
    </ScrollProvider>
  );
}