import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    // "scroll-smooth" allows the anchor links (#about, #projects) to slide nicely
    <div className="bg-slate-50 text-slate-900 dark:bg-[#050505] dark:text-white transition-colors duration-300 scroll-smooth">
      <Navbar />
      
      <main>
        {/* We give sections IDs so the Navbar links actually jump to them */}
        <section id="home">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="blog">
          <Blog />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;