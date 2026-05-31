import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { TrustBar } from "./sections/TrustBar";
import { ValueProps } from "./sections/ValueProps";
import { HowItWorks } from "./sections/HowItWorks";
import { Calculator } from "./sections/Calculator";
import { UseCases } from "./sections/UseCases";
import { Process } from "./sections/Process";
import { Testimonials } from "./sections/Testimonials";
import { FAQ } from "./sections/FAQ";
import { FinalCTA } from "./sections/FinalCTA";
import { Footer } from "./sections/Footer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <ValueProps />
        <HowItWorks />
        <Calculator />
        <UseCases />
        <Process />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
