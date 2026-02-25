import { useEffect, useRef, useState } from "react";
import { HashRouter, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { saveSubscriber, saveWhatsappLead } from "./firebase";

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

const servicesCatalog = [
  {
    category: "Hair Service",
    items: [
      { name: "Basic Cut (No Wash)", duration: "30 min" },
      { name: "Style Cut (No Wash)", duration: "45 min" },
      { name: "Wash & Style", duration: "60 min" },
      { name: "First Haircut Package", duration: "45 min" },
      { name: "Special Occasion Styling", duration: "60 min" },
    ],
  },
  {
    category: "Additional Service",
    items: [
      { name: "Hair Coloring Spray (Temporary)", duration: "20 min" },
      { name: "Hair Tinsel (4 strands)", duration: "10 min" },
      { name: "Hair Tinsel (8 strands)", duration: "15 min" },
      { name: "Hair Braiding", duration: "30 min" },
      { name: "Hair Updos", duration: "45 min" },
      { name: "Face mask + eye masks", duration: "20 min" },
      { name: "Supervised play area", duration: "60 min" },
    ],
  },
  {
    category: "Nail Service",
    items: [
      { name: "Kids Manicure", duration: "15 min" },
      { name: "Kids Pedicure", duration: "20 min" },
      { name: "Nail Polish", duration: "30 min" },
      { name: "Nail Art (Simple)", duration: "20 min" },
    ],
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

  const goToRouteTop = (path) => {
    close();
    if (location.pathname !== path) {
      navigate(path);
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 120);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <NavLink
          className="brand"
          to="/"
          onClick={(e) => {
            e.preventDefault();
            goToSection("home");
          }}
        >
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
            <button type="button" className="menu-link-btn" onClick={() => goToSection("home")}>
              Home
            </button>
          </li>
          <li>
            <button type="button" className="menu-link-btn" onClick={() => goToSection("spaces")}>
              Spaces
            </button>
          </li>
          <li>
            <button
              type="button"
              className="menu-link-btn book-btn nav-service-btn"
              onClick={() => goToRouteTop("/services")}
            >
              Our Service
            </button>
          </li>
          <li>
            <button type="button" className="menu-link-btn" onClick={() => goToRouteTop("/location")}>
              Location
            </button>
          </li>
          <li>
            <button type="button" className="menu-link-btn" onClick={() => goToRouteTop("/contact")}>
              Contact
            </button>
          </li>
          <li>
            <button type="button" className="menu-link-btn" onClick={() => goToRouteTop("/careers")}>
              Join Our Team
            </button>
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
          <a className="btn btn-solid" href="#/services">
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

function Subscribe({
  sectionId = "subscribe",
  title = "Stay in the loop",
  description = "Share your email for occasional updates, early news, and family-friendly offers. We keep it light and useful.",
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [waStatus, setWaStatus] = useState({ type: "", message: "" });
  const [waSubmitting, setWaSubmitting] = useState(false);
  const whatsappPromptRef = useRef(null);

  useEffect(() => {
    if (status.type === "success" && whatsappPromptRef.current) {
      whatsappPromptRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter a valid email.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await saveSubscriber(email);

      setStatus({
        type: "success",
        message: "Thanks. Your email has been saved and your 15% offer is noted.",
      });
      setEmail("");
    } catch (err) {
      if (err?.code === "permission-denied") {
        setStatus({
          type: "success",
          message: "You’re already subscribed with this email. Thanks for being with us.",
        });
        return;
      }
      setStatus({
        type: "error",
        message: "We couldn't save your email right now. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsappSubmit = async (e) => {
    e.preventDefault();
    const normalized = whatsAppNumber.replace(/[^\d+]/g, "");
    if (normalized.length < 8) {
      setWaStatus({
        type: "error",
        message: "Please enter a valid WhatsApp number.",
      });
      return;
    }

    setWaSubmitting(true);
    setWaStatus({ type: "", message: "" });

    try {
      await saveWhatsappLead(normalized);
      setWaStatus({
        type: "success",
        message: "Perfect. We’ll send one WhatsApp message when we open.",
      });
      setWhatsAppNumber("");
    } catch (err) {
      if (err?.code === "permission-denied") {
        setWaStatus({
          type: "success",
          message: "This WhatsApp number is already on our notify list.",
        });
        return;
      }
      setWaStatus({
        type: "error",
        message: "Could not save your number right now. Please try again.",
      });
    } finally {
      setWaSubmitting(false);
    }
  };

  return (
    <section id={sectionId} className="subscribe-section">
      <div className="shell subscribe-grid">
        <div className="subscribe-left">
          <span className="dot" aria-hidden="true" />
          <p>Let&apos;s hang out, parents!</p>
        </div>

        <div className="subscribe-right">
          <h2>{title}</h2>
          <p>{description}</p>

          <form className="subscribe-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="email-input">
              Your email
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "SAVING..." : "KEEP ME UPDATED"}
            </button>
          </form>
          {status.message && (
            <p className={`subscribe-status ${status.type}`}>{status.message}</p>
          )}
          {status.type === "success" && (
            <div className="whatsapp-prompt" ref={whatsappPromptRef}>
              <h3>Want a one-time WhatsApp notification when we open?</h3>
              <p>
                Be the first to know when we launch. No spam, just one message when
                we&apos;re ready.
              </p>
              <form className="whatsapp-form" onSubmit={handleWhatsappSubmit}>
                <label className="sr-only" htmlFor="wa-number">
                  WhatsApp number
                </label>
                <input
                  id="wa-number"
                  type="tel"
                  inputMode="tel"
                  placeholder="Your WhatsApp number (e.g. +6012...)"
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-solid" disabled={waSubmitting}>
                  {waSubmitting ? "SAVING..." : "NOTIFY ME ON WHATSAPP"}
                </button>
              </form>
              {waStatus.message && (
                <p className={`subscribe-status ${waStatus.type}`}>{waStatus.message}</p>
              )}
            </div>
          )}
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
          <a className="social-pill instagram" href="https://instagram.com/totsntrim" target="_blank" rel="noreferrer">Instagram: @totsntrim</a>
          <a className="social-pill facebook" href="https://facebook.com/totsntrim" target="_blank" rel="noreferrer">Facebook: @totsntrim</a>
          <a className="social-pill tiktok" href="https://tiktok.com/@totsntrim" target="_blank" rel="noreferrer">TikTok: @totsntrim</a>
        </div>
      </section>
    </main>
  );
}

function ServicesPage() {
  const scrollToServiceUpdates = () => {
    const el = document.getElementById("service-updates");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="shell page-shell">
      <Subscribe
        sectionId="service-updates"
        title="Opening soon, share your email for 15% OFF your 1st visit"
        description="Be the first to know when we open our full service schedule and receive your first-visit offer."
      />

      <section className="page-card services-page-card">
        <h1>Our Service</h1>
        <p>
          Kid-friendly and parent-friendly services designed for comfort, fun, and
          confidence. Timings below are estimated durations.
        </p>
        <p className="row">We use organic natural product.</p>

        {servicesCatalog.map((group) => (
          <section className="service-group" key={group.category}>
            <h2>{group.category}</h2>
            <div className="service-grid">
              {group.items.map((service) => (
                <article className="service-item-card" key={`${group.category}-${service.name}`}>
                  <h3>{service.name}</h3>
                  <p>{service.duration}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="service-reminder shell">
        <p>Opening soon. Want updates and first access?</p>
        <button type="button" className="btn btn-solid service-reminder-btn" onClick={scrollToServiceUpdates}>
          Share Your Email
        </button>
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
          <article className="location-card">
            <h2>Tots &amp; Trim</h2>
            <p className="address">
              18, Jalan Tun Mohd Fuad 1, Taman Tun Dr Ismail, 60000 Kuala Lumpur, Wilayah
              Persekutuan Kuala Lumpur, Malaysia
            </p>
            <p className="distance">Kuala Lumpur</p>
            <div className="actions">
              <a href="https://maps.app.goo.gl/M2KFCZWBru5iuenVA" target="_blank" rel="noreferrer">Directions</a>
            </div>
          </article>

          <article className="location-card social-card">
            <h3>Follow us</h3>
            <div className="actions">
              <a className="social-pill instagram" href="https://instagram.com/totsntrim" target="_blank" rel="noreferrer">
                Instagram: @totsntrim
              </a>
              <a className="social-pill facebook" href="https://facebook.com/totsntrim" target="_blank" rel="noreferrer">
                Facebook: @totsntrim
              </a>
              <a className="social-pill tiktok" href="https://tiktok.com/@totsntrim" target="_blank" rel="noreferrer">
                TikTok: @totsntrim
              </a>
            </div>
          </article>

          <div className="meta">
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

function CareersPage() {
  return (
    <main className="shell page-shell">
      <section className="page-card careers-card">
        <h1>Join Our Team</h1>
        <img
          className="careers-image"
          src="/Join_team.png"
          alt="Join our team at Tots and Trim"
        />
        <h2>We&apos;re Hiring</h2>
        <p>
          Tots &amp; Trim is growing, and we&apos;re looking for warm, skilled team members
          who enjoy working with children and families.
        </p>
        <p className="open-roles"><strong>Open roles:</strong> Hair Dresser / Hair Stylist</p>
        <p className="open-roles">
          <strong>Employment type:</strong> Full-time / Part-time
        </p>
        <p className="open-roles">
          <strong>Salary:</strong> Full-time RM 3,000 - RM 3,500 | Part-time RM 1,500
        </p>

        <h3 className="hours-title">What we&apos;re looking for</h3>
        <ul className="careers-list" aria-label="Careers requirements">
          <li>
            <span className="careers-main">Experience</span>
            <ul>
              <li>Previous hair styling experience (kids styling is a plus).</li>
            </ul>
          </li>
          <li>
            <span className="careers-main">Attitude</span>
            <ul>
              <li>Patient, friendly, and confident with children and parents.</li>
              <li>Able to converse in English.</li>
            </ul>
          </li>
          <li>
            <span className="careers-main">Skills</span>
            <ul>
              <li>Comfortable with modern cuts, trims, and basic styling.</li>
            </ul>
          </li>
          <li>
            <span className="careers-main">Teamwork</span>
            <ul>
              <li>Works well in a clean, fast-paced, supportive salon environment.</li>
            </ul>
          </li>
        </ul>

        <h2>How to apply</h2>
        <p>
          Send your updated CV to{" "}
          <a href="mailto:info@totsandtrim.com">info@totsandtrim.com</a>
        </p>
        <p className="row">
          Shortlisted candidates will be contacted for the next step.
        </p>
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
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
