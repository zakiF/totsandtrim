import { useState } from "react";

const areaSections = [
  {
    id: "hair-zone",
    title: "Hair Cut Area",
    subtitle: "Quick trims, calm vibes, confident smiles.",
    copy: "Bright stations, child-friendly seating, and experienced stylists make every haircut smooth and stress-free.",
    image: "/Hair_cut_area.png",
    alt: "Hair cut area at Tots and Trim",
  },
  {
    id: "play-zone",
    title: "Play Area",
    subtitle: "Built for fun while parents relax.",
    copy: "A playful corner that keeps little ones engaged before or after their appointment with games and creative activities.",
    image: "/Play_area.png",
    alt: "Play area at Tots and Trim",
  },
  {
    id: "wash-zone",
    title: "Wash & Nail Area",
    subtitle: "Gentle care for tiny hands and happy heads.",
    copy: "Comfort-first wash stations and kid-safe nail services give your child a polished look in a clean, safe environment.",
    image: "/Wash_nail_area.png",
    alt: "Wash and nail area at Tots and Trim",
  },
];

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <a className="brand" href="#home">
          <img src="/hero-logo.png" alt="Tots and Trim Home" className="brand-logo" />
        </a>

        <button
          className="menu-btn"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`menu ${open ? "open" : ""}`}>
          <li>
            <a href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#spaces" onClick={() => setOpen(false)}>
              Spaces
            </a>
          </li>
          <li>
            <a
              href="/location.html"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Location
            </a>
          </li>
          <li>
            <a
              href="/contact.html"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
          </li>
          <li>
            <a href="#subscribe" onClick={() => setOpen(false)}>
              Subscribe
            </a>
          </li>
          <li>
            <a
              className="book-btn"
              href="https://wa.me/60123889771?text=Hi%20Tots%20%26%20Trim%2C%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Book Now
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-main">
      <img
        className="hero-bg"
        src="/FrontDesk_v4.png"
        alt="Front desk at Tots and Trim"
      />

      <div className="hero-curve-panel">
        <img className="hero-logo" src="/Circle_logo2.png" alt="Tots and Trim logo" />
        <h1>Little Cuts. Big Smiles.</h1>
        <p>
          A joyful kids salon where haircuts, playtime, and pampering come
          together in one beautiful space.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href="https://wa.me/60123889771" target="_blank" rel="noreferrer">
            Book Appointment
          </a>
          <a className="btn btn-outline" href="#spaces">
            Explore The Space
          </a>
        </div>
      </div>
    </section>
  );
}

function AreaSection({ area, reverse }) {
  return (
    <section className={`space-section ${reverse ? "reverse" : ""}`} id={area.id}>
      <div className="shell split-grid">
        <div className="space-image-wrap">
          <img src={area.image} alt={area.alt} />
        </div>
        <div className="space-copy">
          <p className="eyebrow">Tots &amp; Trim Spaces</p>
          <h2>{area.title}</h2>
          <h3>{area.subtitle}</h3>
          <p>{area.copy}</p>
        </div>
      </div>
    </section>
  );
}

function Subscribe() {
  return (
    <section id="subscribe" className="subscribe-section">
      <div className="shell subscribe-grid">
        <div className="subscribe-left">
          <span className="dot" aria-hidden="true" />
          <p>Let&apos;s hang out, parents!</p>
        </div>

        <div className="subscribe-right">
          <h2>Subscribe and receive 15% OFF your 1st visit</h2>
          <p>
            Get updates, promotions, and tips for making salon visits easier and
            more fun for your little one.
          </p>

          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="email-input">
              Your email
            </label>
            <input id="email-input" type="email" placeholder="Your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />

      <section id="spaces" className="spaces-intro shell">
        <p className="eyebrow">Designed for Families</p>
        <h2>Explore Our Signature Kids Salon Zones</h2>
        <p>
          Every corner is thoughtfully designed to keep children comfortable,
          engaged, and excited throughout their visit.
        </p>
      </section>

      {areaSections.map((area, index) => (
        <AreaSection key={area.id} area={area} reverse={index % 2 === 1} />
      ))}

      <Subscribe />
    </div>
  );
}

export default App;
