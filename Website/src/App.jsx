import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import NewsSection from './components/NewsSection.jsx'
import EventsCalendar from './components/EventsCalendar.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <About />
        <NewsSection />
        <EventsCalendar />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
