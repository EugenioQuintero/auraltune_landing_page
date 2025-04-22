import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Events from "../components/Events";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Corporate from "../components/Corporate";

const Home = () => {
  return (
    <main className="bg-primary pt-16">
      {/* Hero takes up 1/3 of viewport height */}
      <section className="h-[33vh]">
        <Hero />
      </section>

      {/* Corporate logos section with subtle transition */}
      <section className="py-12 bg-primary/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Corporate />
        </div>
      </section>

      {/* Services and other sections */}
      <section id="servicios" className="section-full py-16 md:py-24 lg:py-32">
        <Services />
      </section>

      <section id="sobre-nosotros" className="section-compact py-16 md:py-24 lg:py-32">
        <About />
      </section>

      <section id="eventos" className="section-full py-16 md:py-24 lg:py-32">
        <Events />
      </section>

      <section id="resenas" className="section-full py-16 md:py-24 lg:py-32">
        <Testimonials />
      </section>

      <section id="cta" className="section-compact py-16 md:py-24 lg:py-32">
        <Contact />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
