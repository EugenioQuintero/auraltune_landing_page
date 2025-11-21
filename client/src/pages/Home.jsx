import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Events from "../components/Events";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Corporate from "../components/Corporate";

const Home = () => {
  return (
    <main className="bg-primary pt-16">
      {/* Hero section */}
      <section className="h-[33vh]">
        <Hero />
      </section>

      {/* Corporate logos section with video background - no gap */}
      <section>
        <Corporate />
      </section>

      {/* Services and other sections */}
      <section id="servicios" className="section-full py-16 md:py-24 lg:py-32">
        <Services />
      </section>

      <section id="sobre-nosotros" className="section-compact pt-16 pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16">
        <About />
      </section>

      <section id="eventos" className="section-full pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16">
        <Events />
      </section>

      <section id="cta" className="section-compact pt-4 pb-16 md:pt-6 md:pb-24 lg:pt-8 lg:pb-32">
        <Contact />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
