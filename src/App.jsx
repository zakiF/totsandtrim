import { useState } from "react";

const signatureItems = [
  {
    icon: "✂",
    title: "Expert Kids' Stylists",
    body: "Our stylists are highly skilled in children's hairstyling, attuned to the unique needs of all ages, ensuring each child feels comfortable and content.",
  },
  {
    icon: "🚗",
    title: "Engaging Themed Styling Chairs",
    body: "Children can select from our engaging themed chairs, like race cars, transforming their haircut into an enjoyable adventure.",
  },
  {
    icon: "🎮",
    title: "Games & TV",
    body: "Each styling station features a personal TV offering age-appropriate programming. Older children can enjoy a selection of games on Xbox, PlayStation, or Nintendo Switch.",
  },
];

const safetyItems = [
  {
    icon: "🛡️",
    title: "Always Clean & Safe",
    body: "Our salon is meticulously maintained. After each client, we thoroughly sanitize all equipment and surfaces, ensuring a consistently safe and hygienic environment for your child.",
  },
  {
    icon: "💚",
    title: "A Space for All Kids",
    body: "Our space is thoughtfully designed for every child, including those with sensory sensitivities or who may experience anxiety, to ensure everyone feels at ease and supported.",
  },
  {
    icon: "☕",
    title: "Comfortable Amenities for Parents",
    body: "Complimentary high-speed Wi-Fi and refreshments are available while your child enjoys their styling session.",
  },
];

const serviceItems = [
  {
    color: "#54a7ca",
    icon: "✂",
    title: "Signature Haircuts",
    body: "Our skilled stylists craft fades, bobs, or pixie cuts tailored to each child's unique personality.",
  },
  {
    color: "#e6739f",
    icon: "🎀",
    title: "Creative Braiding & Styling",
    body: "We offer imaginative braiding, elegant updos, and temporary color, perfect for occasions, portraits, or any memorable event.",
  },
  {
    color: "#f1af4e",
    icon: "💅",
    title: "Premium Nail Services",
    body: "Our nail services use cruelty-free and eco-friendly polishes. We exclusively use safe, non-toxic products for a brilliant and healthy finish.",
  },
];

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <a className="brand" href="#home">
          <span className="brand-word b1">tots</span>
          <span className="brand-word b2">&amp;</span>
          <span className="brand-word b3">trim</span>
          <span className="brand-sub">hair . nail . play</span>
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
            <a href="#signature" onClick={() => setOpen(false)}>
              Our Signature
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => setOpen(false)}>
              Services
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
            <a href="#survey" onClick={() => setOpen(false)}>
              Survey
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

function App() {
  return (
    <div>
      <Nav />

      <section id="home" className="hero">
        <div className="shell hero-inner">
          <img
            className="hero-logo-img"
            src="/hero-logo.png"
            alt="Tots and Trim logo"
          />
          <p className="hero-copy">
            <strong>Welcome to Tots &amp; Trim!</strong> Where every visit is
            designed for little cuts and big smiles. We believe a child's
            haircut should be an enjoyable experience, and our salon is designed
            to help every child leave happy and looking their best.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#book">
              Book Your Visit
            </a>
            <a className="btn ghost" href="#services">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      <section id="signature" className="section light">
        <div className="shell">
          <h2>Our Signature</h2>
          <div className="sig-grid">
            <div>
              {signatureItems.map((item) => (
                <article className="icon-card" key={item.title}>
                  <div className="icon-pill" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <aside className="visual-card" aria-label="Kids salon image panel">
              <div className="bubble bubble-a" />
              <div className="bubble bubble-b" />
              <div className="visual-content">
                <p>Fun chairs</p>
                <p>Friendly stylists</p>
                <p>Happy kids</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section teal">
        <div className="shell">
          <h2 className="white">Safety &amp; Comfort First</h2>
          <div className="three-grid">
            {safetyItems.map((item) => (
              <article className="teal-card" key={item.title}>
                <div className="teal-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section light">
        <div className="shell">
          <h2>Our Curated Services</h2>
          <div className="three-grid">
            {serviceItems.map((item) => (
              <article
                className="service-card"
                key={item.title}
                style={{ "--accent": item.color }}
              >
                <div className="service-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="section teal">
        <div className="shell split">
          <div>
            <h2 className="white">Book Your Visit</h2>
            <article className="book-item">
              <h3>Effortless Booking (Coming Soon...)</h3>
              <p>
                Our upcoming online platform will provide instant appointment
                confirmation and reminders for an even smoother experience.
              </p>
            </article>
            <article className="book-item">
              <h3>Flexible Scheduling</h3>
              <p>
                We offer convenient weekend and after-school hours so your
                family can find the perfect time.
              </p>
            </article>
            <a
              className="btn primary"
              href="https://wa.me/60123889771?text=Hi%20Tots%20%26%20Trim%2C%20I%20want%20to%20book%20a%20slot."
              target="_blank"
              rel="noreferrer"
            >
              Book via WhatsApp
            </a>
          </div>
          <div className="booking-visual" aria-hidden="true">
            <span>📱</span>
            <p>Simple booking for busy parents</p>
          </div>
        </div>
      </section>

      <section id="survey" className="section survey">
        <div className="shell survey-inner">
          <h2>Help Us Shape the Perfect Kids' Salon Experience</h2>
          <p>
            Got 3 minutes? We'd love your feedback. Your insights help us create
            an even better experience for your little ones.
          </p>
          <a className="btn primary" href="#" onClick={(e) => e.preventDefault()}>
            Start Survey and Enter to Win
          </a>
        </div>
      </section>

      <section className="section teal cta">
        <div className="shell split">
          <div>
            <h2 className="white">Elevate Your Child's Salon Experience</h2>
            <p className="white-copy">
              At Tots &amp; Trim, every visit is designed as a cherished
              experience, ensuring each child leaves with confidence, style, and
              a smile.
            </p>
          </div>
          <div className="cta-actions">
            <a className="btn primary" href="#book">
              Book Your Appointment
            </a>
            <a
              className="btn ghost"
              href="https://wa.me/60123889771"
              target="_blank"
              rel="noreferrer"
            >
              Call / WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
