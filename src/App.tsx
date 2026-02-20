import './App.css'
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import WhyUs from './components/WhyUs';
import CTA from './components/CTA';

function App() {
  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative', backgroundColor: 'white' }}>
      <main style={{ position: 'relative', zIndex: 10, width: '100%', paddingLeft: '1.5rem', paddingRight: '1.5rem', overflowX: 'hidden' }}>
        <Header />
        <Hero />
        <Benefits />
        <WhyUs />
        <CTA />
      </main>
    </div>
  )
}

export default App