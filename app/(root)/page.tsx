import Stats from "../components/views/root/stats";
import Feature from "../components/views/root/feature";
import Hero from "../components/views/root/hero";
import Testimonials from "../components/views/root/testimonials";
import Pricing from "../components/views/root/pricing";
import Newsletter from "../components/views/root/newsletter";
import BlockCarousel from "../components/views/root/block-carousel";

export default async function Home() {
  return (
    <main>
      <div className="w-full flex flex-col items-center justify-center">
        <Hero />
        <Stats />
        <Feature />
        <Testimonials />
        <Pricing />
        <BlockCarousel />
        <Newsletter />
      </div>
    </main>
  );
}
