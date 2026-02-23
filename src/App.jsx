import { useState } from "react";
import { HashRouter, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";

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

function AppNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const close = () => setOpen(false);
  const goToSection = (sectionId) => {
    close();
    const scroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scroll, 120);
      return;
    }
    scroll();
  };

  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <NavLink className="brand" to="/" onClick={close}>
          <img src="/hero-logo.png" alt="Tots and Trim Home" className="brand-logo" />
        </NavLink>

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
            <NavLink to="/" end onClick={close}>
              Home
            </NavLink>
          </li>
          <li>
            <button type="button" className="menu-link-btn" onClick={() => goToSection("spaces")}>
              Spaces
            </button>
          </li>
          <li>
            <NavLink to="/location" onClick={close}>
              Location
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={close}>
              Contact
            </NavLink>
          </li>
          <li>
            <button type="button" className="menu-link-btn" onClick={() => goToSection("subscribe")}>
              Subscribe
            </button>
          </li>
          <li>
            <a
              className="book-btn"
              href="https://wa.me/60123889771?text=Hi%20Tots%20%26%20Trim%2C%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noreferrer"
              onClick={close}
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
        <img className="hero-logo" src="/Circle_logo3.png" alt="Tots and Trim logo" />
        <h1>Little Cuts. Big Smiles.</h1>
        <p>
          A joyful kids salon where haircuts, playtime, and pampering come together in
          one beautiful space.
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
            Get updates, promotions, and tips for making salon visits easier and more fun
            for your little one.
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

function HomePage() {
  return (
    <>
      <Hero />

      <section id="spaces" className="spaces-intro shell">
        <p className="eyebrow">Designed for Families</p>
        <h2>Explore Our Signature Kids Salon Zones</h2>
        <p>
          Every corner is thoughtfully designed to keep children comfortable, engaged,
          and excited throughout their visit.
        </p>
      </section>

      {areaSections.map((area, index) => (
        <AreaSection key={area.id} area={area} reverse={index % 2 === 1} />
      ))}

      <Subscribe />
    </>
  );
}

function ContactPage() {
  return (
    <main className="shell page-shell">
      <section className="page-card">
        <h1>Contact</h1>

        <h2>Our Location</h2>
        <p>
          18, Jalan Tun Mohd Fuad 1, Taman Tun Dr Ismail, 60000 Kuala Lumpur,
          Wilayah Persekutuan Kuala Lumpur, Malaysia
        </p>
        <p className="row">
          <a href="https://maps.app.goo.gl/M2KFCZWBru5iuenVA" target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
        </p>

        <h3 className="hours-title">Working Hours</h3>
        <ul className="hours-list" aria-label="Working hours list">
          <li><span className="day">Monday</span><span className="time">Closed</span></li>
          <li><span className="day">Tuesday</span><span className="time">10:00 AM - 8:00 PM</span></li>
          <li><span className="day">Wednesday</span><span className="time">10:00 AM - 8:00 PM</span></li>
          <li><span className="day">Thursday</span><span className="time">10:00 AM - 8:00 PM</span></li>
          <li><span className="day">Friday</span><span className="time">10:00 AM - 8:00 PM</span></li>
          <li><span className="day">Saturday</span><span className="time">10:00 AM - 8:00 PM</span></li>
          <li><span className="day">Sunday</span><span className="time">10:00 AM - 8:00 PM</span></li>
        </ul>
        <p className="row">Closed on public holidays.</p>

        <h2>Contact Us</h2>
        <p>
          WhatsApp: <a href="https://wa.me/60123889771" target="_blank" rel="noreferrer">(+6) 012-388-9771</a>
        </p>
        <p className="row">
          Email: <a href="mailto:info@totsandtrim.com">info@totsandtrim.com</a>
        </p>

        <div className="social">
          <a href="https://instagram.com/totsntrim" target="_blank" rel="noreferrer">Instagram: @totsntrim</a>
          <a href="https://facebook.com/totsntrim" target="_blank" rel="noreferrer">Facebook: @totsntrim</a>
          <a href="https://tiktok.com/@totsntrim" target="_blank" rel="noreferrer">TikTok: @totsntrim</a>
        </div>
      </section>
    </main>
  );
}

function LocationPage() {
  return (
    <main className="shell page-shell">
      <h1 className="page-title">Our Location</h1>

      <section className="map-layout" aria-label="Store location">
        <aside className="left-panel">
          <div className="search-box">Enter your location or zip code</div>

          <article className="location-card">
            <h2>Tots &amp; Trim</h2>
            <p className="address">
              18, Jalan Tun Mohd Fuad 1, Taman Tun Dr Ismail, 60000 Kuala Lumpur, Wilayah
              Persekutuan Kuala Lumpur, Malaysia
            </p>
            <p className="distance">Kuala Lumpur</p>
            <div className="actions">
              <a href="https://totsandtrim.com" target="_blank" rel="noreferrer">Website</a>
              <a href="https://maps.app.goo.gl/M2KFCZWBru5iuenVA" target="_blank" rel="noreferrer">Directions</a>
            </div>
          </article>

          <div className="meta">
            Displaying 1 result
            <br />
            Open map with the Directions button above.
          </div>
        </aside>

        <div className="map-frame">
          <iframe
            title="Tots and Trim Map"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=101.619227%2C3.131842%2C101.639227%2C3.151842&layer=mapnik&marker=3.141842%2C101.629227"
          ></iframe>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="app">
        <AppNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/location" element={<LocationPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
