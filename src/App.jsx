import { useState } from 'react'

/* ===== STYLES ===== */
const styles = `
  .app { min-height: 100vh; }
  
  /* Navbar */
  .navbar {
    position: sticky; top: 0; z-index: 1000;
    background: #e0f7f5; border-bottom: 3px solid #1aaa9b;
    padding: 12px 20px;
  }
  .nav-inner {
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { text-decoration: none; display: flex; align-items: baseline; gap: 2px; }
  .nl-tots { font-family: 'Fredoka One', cursive; font-size: 1.6rem; color: #1aaa9b; }
  .nl-and { font-family: 'Fredoka One', cursive; font-size: 1.2rem; color: #ff6b9d; }
  .nl-trim { font-family: 'Fredoka One', cursive; font-size: 1.6rem; color: #ff6b9d; }
  .nl-sub { font-size: 0.65rem; color: #148a7d; margin-left: 6px; letter-spacing: 1px; }
  .nav-links { display: flex; align-items: center; list-style: none; gap: 24px; }
  .nav-links a { text-decoration: none; color: #2d3575; font-weight: 700; font-size: 0.95rem; }
  .nav-links a:hover { color: #1aaa9b; }
  .btn-book {
    background: #ff6b9d !important; color: white !important;
    padding: 8px 20px; border-radius: 50px; font-weight: 800 !important;
  }
  .btn-book:hover { background: #e85d8a !important; }
  .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
  .hamburger span { display: block; width: 24px; height: 3px; background: #2d3575; border-radius: 3px; }
  
  /* Hero */
  .hero {
    background: #1aaa9b; min-height: 480px;
    display: flex; align-items: center; justify-content: center;
    padding: 60px 20px; position: relative; overflow: hidden;
  }
  .hero-content { text-align: center; max-width: 750px; position: relative; z-index: 1; }
  .hero-logo-text {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(3rem, 10vw, 5.5rem);
    display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .hl-t { color: #4a90d9; }
  .hl-o { color: #ffd166; background: #4a90d9; border-radius: 50%; width: 1em; display: inline-flex; align-items: center; justify-content: center; }
  .hl-t2 { color: #e8a030; }
  .hl-s { color: #a78bfa; }
  .hl-amp { color: white; font-size: 0.6em; margin: 0 4px; }
  .hl-tr { color: #7bcf9e; }
  .hl-i { color: #ff6b9d; }
  .hl-m { color: #e85d8a; }
  .hl-scissors { font-size: 0.55em; color: white; margin-left: 4px; }
  .hero-tagline { color: rgba(255,255,255,0.95); font-size: 1.1rem; line-height: 1.7; margin-bottom: 32px; }
  .hero-tagline strong { color: white; }
  .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .hero-btn {
    text-decoration: none; padding: 14px 32px; border-radius: 50px;
    font-weight: 800; font-size: 1rem; transition: all 0.2s;
  }
  .hero-btn-primary { background: #ff6b9d; color: white; box-shadow: 0 4px 15px rgba(255,107,157,0.4); }
  .hero-btn-primary:hover { background: #e85d8a; transform: translateY(-2px); }
  .hero-btn-secondary { background: transparent; color: white; border: 2px solid white; }
  .hero-btn-secondary:hover { background: white; color: #1aaa9b; }
  
  /* Sections */
  .section { padding: 80px 20px; }
  .container { max-width: 1100px; margin: 0 auto; }
  .section-title { font-family: 'Fredoka One', cursive; font-size: 2.2rem; color: #2d3575; margin-bottom: 16px; }
  .teal-bg { background: #1aaa9b; }
  .teal-light-bg { background: #e0f7f5; }
  
  /* Signature */
  .sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .sig-features { display: flex; flex-direction: column; gap: 24px; margin-top: 24px; }
  .sig-feature { display: flex; gap: 16px; align-items: flex-start; }
  .sig-icon { font-size: 1.8rem; flex-shrink: 0; width: 50px; height: 50px; background: #e0f7f5; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #1aaa9b; }
  .sig-feature h3 { font-size: 1.05rem; color: #148a7d; margin-bottom: 5px; font-weight: 800; }
  .sig-feature p { color: #555; font-size: 0.92rem; line-height: 1.6; }
  .sig-visual { background: linear-gradient(135deg, #e0f7f5, #1aaa9b); height: 380px; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; font-size: 5rem; }
  .sig-visual p { color: white; font-family: 'Fredoka One', cursive; font-size: 1.2rem; }
  
  /* Safety */
  .safety-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
  .safety-card { background: rgba(255,255,255,0.15); border-radius: 20px; padding: 28px 20px; text-align: center; border: 2px solid rgba(255,255,255,0.3); transition: transform 0.2s; }
  .safety-card:hover { transform: translateY(-4px); }
  .safety-card .icon { font-size: 2.5rem; margin-bottom: 14px; }
  .safety-card h3 { font-family: 'Fredoka One', cursive; color: white; margin-bottom: 10px; font-size: 1.1rem; }
  .safety-card p { color: rgba(255,255,255,0.88); font-size: 0.9rem; line-height: 1.6; }
  
  /* Services */
  .services-subtitle { text-align: center; color: #666; margin-bottom: 40px; }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .service-card { border-radius: 20px; padding: 36px 24px; border: 3px solid var(--c); background: white; transition: transform 0.2s; position: relative; overflow: hidden; }
  .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--c); }
  .service-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
  .service-emoji { font-size: 3rem; margin-bottom: 16px; }
  .service-card h3 { font-family: 'Fredoka One', cursive; font-size: 1.25rem; color: #2d3575; margin-bottom: 10px; }
  .service-card p { color: #555; font-size: 0.92rem; line-height: 1.65; }
  
  /* Book */
  .bv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .bv-item { margin-bottom: 28px; }
  .bv-item h3 { font-family: 'Fredoka One', cursive; color: white; margin-bottom: 8px; font-size: 1.15rem; }
  .bv-item p { color: rgba(255,255,255,0.88); line-height: 1.65; font-size: 0.93rem; }
  .bv-badge { font-family: 'Nunito', sans-serif; font-size: 0.72rem; background: #ffd166; color: #2d3575; padding: 2px 8px; border-radius: 50px; font-weight: 700; margin-left: 8px; }
  .bv-btn { display: inline-block; background: #ff6b9d; color: white; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 800; transition: all 0.2s; margin-top: 8px; }
  .bv-btn:hover { background: #e85d8a; transform: translateY(-2px); }
  .bv-visual { background: rgba(255,255,255,0.15); border-radius: 20px; height: 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; font-size: 5rem; border: 2px solid rgba(255,255,255,0.3); }
  .bv-visual p { color: white; font-family: 'Fredoka One', cursive; font-size: 1.1rem; }
  
  /* Contact */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; margin-top: 40px; }
  .contact-block { margin-bottom: 24px; }
  .contact-block h3 { font-family: 'Fredoka One', cursive; font-size: 1.1rem; color: #148a7d; margin-bottom: 8px; }
  .contact-block p { color: #555; line-height: 1.65; font-size: 0.93rem; }
  .contact-block a { color: #1aaa9b; font-weight: 700; text-decoration: none; }
  .contact-block a:hover { text-decoration: underline; }
  .hours-note { color: #888; font-style: italic; font-size: 0.88rem; }
  .social-links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px; }
  .social-btn { text-decoration: none; padding: 7px 14px; border-radius: 50px; font-weight: 700; font-size: 0.87rem; border: 2px solid; transition: all 0.2s; }
  .social-ig { color: #e1306c; border-color: #e1306c; }
  .social-ig:hover { background: #e1306c; color: white; }
  .social-fb { color: #1877f2; border-color: #1877f2; }
  .social-fb:hover { background: #1877f2; color: white; }
  .social-tt { color: #000; border-color: #000; }
  .social-tt:hover { background: #000; color: white; }
  .contact-map iframe { width: 100%; min-height: 380px; border-radius: 20px; border: none; }
  
  /* Survey */
  .survey-inner { text-align: center; max-width: 650px; margin: 0 auto; }
  .survey-icon { font-size: 4rem; margin-bottom: 16px; }
  .survey-inner h3 { font-family: 'Fredoka One', cursive; font-size: 1.35rem; margin-bottom: 14px; }
  .survey-inner p { color: #555; line-height: 1.65; margin-bottom: 24px; }
  .survey-btn { display: inline-block; background: #1aaa9b; color: white; text-decoration: none; padding: 14px 30px; border-radius: 50px; font-weight: 800; transition: all 0.2s; }
  .survey-btn:hover { background: #148a7d; transform: translateY(-2px); }
  .survey-note { margin-top: 14px; color: #148a7d; font-weight: 700; font-style: italic; font-size: 0.9rem; }
  
  /* CTA */
  .cta-inner { display: flex; gap: 40px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
  .cta-text { flex: 1; min-width: 280px; }
  .cta-text p { color: rgba(255,255,255,0.9); line-height: 1.7; margin-top: 12px; }
  .cta-actions { display: flex; flex-direction: column; gap: 12px; }
  .cta-btn-p { display: block; background: #ff6b9d; color: white; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 800; text-align: center; transition: all 0.2s; }
  .cta-btn-p:hover { background: #e85d8a; transform: translateY(-2px); }
  .cta-btn-s { display: block; background: transparent; color: white; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 700; text-align: center; border: 2px solid white; transition: all 0.2s; }
  .cta-btn-s:hover { background: white; color: #1aaa9b; }
  
  /* Footer */
  .footer { background: #2d3575; padding: 40px 20px 0; }
  .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; gap: 40px; justify-content: space-between; flex-wrap: wrap; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.15); }
  .footer-logo { display: flex; align-items: baseline; flex-wrap: wrap; gap: 2px; }
  .fl-tots { font-family: 'Fredoka One', cursive; font-size: 1.5rem; color: #1aaa9b; }
  .fl-and { font-family: 'Fredoka One', cursive; font-size: 1.2rem; color: #ff6b9d; }
  .fl-trim { font-family: 'Fredoka One', cursive; font-size: 1.5rem; color: #ff6b9d; }
  .fl-sub { width: 100%; font-size: 0.7rem; color: rgba(255,255,255,0.4); letter-spacing: 1px; }
  .footer-links, .footer-social { display: flex; flex-direction: column; gap: 10px; }
  .footer-links a, .footer-social a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.92rem; }
  .footer-links a:hover, .footer-social a:hover { color: #1aaa9b; }
  .footer-bottom { max-width: 1100px; margin: 0 auto; text-align: center; padding: 20px; color: rgba(255,255,255,0.35); font-size: 0.83rem; }
  
  /* Responsive */
  @media (max-width: 768px) {
    .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: #e0f7f5; padding: 20px; gap: 16px; border-bottom: 3px solid #1aaa9b; z-index: 100; }
    .nav-links.open { display: flex; }
    .navbar { position: sticky; top: 0; }
    .hamburger { display: flex; }
    .sig-grid, .bv-grid, .contact-grid { grid-template-columns: 1fr; gap: 30px; }
    .safety-grid, .services-grid { grid-template-columns: 1fr; }
    .section-title { font-size: 1.75rem; }
    .section { padding: 50px 16px; }
    .hero-logo-text { font-size: clamp(2.2rem, 12vw, 4rem); }
    .cta-inner { flex-direction: column; text-align: center; }
    .cta-actions { flex-direction: row; flex-wrap: wrap; justify-content: center; }
    .sig-visual { height: 230px; font-size: 3.5rem; }
    .bv-visual { height: 200px; }
    .footer-inner { flex-direction: column; gap: 24px; }
  }
`;

/* ===== INJECT STYLES ===== */
if (!document.getElementById('tt-styles')) {
  const s = document.createElement('style');
  s.id = 'tt-styles';
  s.textContent = styles;
  document.head.appendChild(s);
}

/* ===== COMPONENTS ===== */

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          <span className="nl-tots">tots</span>
          <span className="nl-and"> &amp; </span>
          <span className="nl-trim">trim</span>
          <span className="nl-sub">hair . nail . play</span>
        </a>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
          <span/><span/><span/>
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><a href="#signature" onClick={() => setOpen(false)}>Our Signature</a></li>
          <li><a href="#services" onClick={() => setOpen(false)}>Services</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>Contact Us</a></li>
          <li><a href="#survey" onClick={() => setOpen(false)}>Survey</a></li>
          <li><a href="https://wa.me/60123889771?text=Hi%20Tots%20and%20Trim!" className="btn-book" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Book Now</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-logo-text">
          <span className="hl-t">t</span>
          <span className="hl-o">o</span>
          <span className="hl-t2">t</span>
          <span className="hl-s">s</span>
          <span className="hl-amp">&amp;</span>
          <span className="hl-tr">tr</span>
          <span className="hl-i">i</span>
          <span className="hl-m">m</span>
          <span className="hl-scissors">✂</span>
        </div>
        <p className="hero-tagline">
          <strong>Welcome to Tots &amp; Trim!</strong> Where every visit is designed for{' '}
          <strong>little cuts and big smiles</strong>. We believe a child&apos;s haircut should be an
          enjoyable experience. Our thoughtfully designed salon ensures every visit leaves your child
          happy and looking their best!
        </p>
        <div className="hero-actions">
          <a href="https://wa.me/60123889771?text=Hi%20Tots%20and%20Trim!" className="hero-btn hero-btn-primary" target="_blank" rel="noreferrer">
            ✂️ Book Now
          </a>
          <a href="#signature" className="hero-btn hero-btn-secondary">Learn More ↓</a>
        </div>
      </div>
    </section>
  );
}

function Signature() {
  const features = [
    { icon: '✂️', title: "Expert Kids' Stylists", desc: "Our stylists are highly skilled in children's hairstyling, attuned to the unique needs of all ages, ensuring each child feels comfortable and content." },
    { icon: '🚗', title: "Engaging Themed Styling Chairs", desc: "Children can select from our engaging themed chairs, like race cars, transforming their haircut into an enjoyable adventure." },
    { icon: '🎮', title: "Games & TV", desc: "Each styling station features a personal TV offering age-appropriate programming. Older children can enjoy games on Xbox, PlayStation, or Nintendo Switch." },
  ];
  return (
    <section className="section" id="signature">
      <div className="container sig-grid">
        <div>
          <h2 className="section-title">Our Signature ✨</h2>
          <div className="sig-features">
            {features.map((f, i) => (
              <div className="sig-feature" key={i}>
                <div className="sig-icon">{f.icon}</div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sig-visual">
          <span>👶</span>
          <p>Fun Kids Salon!</p>
        </div>
      </div>
    </section>
  );
}

function Safety() {
  const items = [
    { icon: '🧼', title: 'Always Clean & Safe', desc: 'Our salon is meticulously maintained. After each client, we thoroughly sanitize all equipment and surfaces to ensure your child is always in a safe, hygienic environment.' },
    { icon: '🌈', title: 'A Space for All Kids', desc: 'Our space is thoughtfully designed for every child, including those with sensory sensitivities or who may need a little extra time and care to feel comfortable.' },
    { icon: '☕', title: 'Comfortable Amenities for Parents', desc: 'Complimentary high-speed Wi-Fi and a selection of refreshments are available while your child enjoys their pampering session.' },
  ];
  return (
    <section className="section teal-bg">
      <div className="container">
        <h2 className="section-title" style={{color:'white'}}>Safety &amp; Comfort First 🛡️</h2>
        <div className="safety-grid">
          {items.map((item, i) => (
            <div className="safety-card" key={i}>
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { emoji: '✂️', title: 'Signature Haircuts', desc: "Our skilled stylists craft fades, bobs, or pixie cuts tailored to each child's unique personality.", color: '#ffd166' },
    { emoji: '🎨', title: 'Creative Braiding & Styling', desc: 'We offer imaginative braiding, elegant updos, and temporary color. Perfect for special occasions, school portraits, or any memorable event.', color: '#a78bfa' },
    { emoji: '💅', title: 'Premium Nail Services', desc: 'Our nail services feature cruelty-free and eco-friendly polishes. We exclusively utilize safe, non-toxic products for a brilliant and healthy finish.', color: '#ff6b9d' },
  ];
  return (
    <section className="section" id="services">
      <div className="container">
        <h2 className="section-title" style={{textAlign:'center'}}>Our Curated Services 🌟</h2>
        <p className="services-subtitle">Everything your little one needs for a perfect day of pampering!</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i} style={{'--c': s.color}}>
              <div className="service-emoji">{s.emoji}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookVisit() {
  return (
    <section className="section teal-bg">
      <div className="container bv-grid">
        <div>
          <h2 className="section-title" style={{color:'white'}}>Book Your Visit 📅</h2>
          <div className="bv-item">
            <h3>📲 Effortless Booking <span className="bv-badge">Coming Soon!</span></h3>
            <p>Our seamless online platform provides instant appointment confirmation and sends timely reminders, ensuring a stress-free experience for you and your child.</p>
          </div>
          <div className="bv-item">
            <h3>🕐 Flexible Scheduling</h3>
            <p>We offer a wide array of appointment slots, including convenient weekend and after-school hours. Our scheduling flexibility ensures a perfect fit for even the busiest family schedules.</p>
          </div>
          <a href="https://wa.me/60123889771?text=Hi%20Tots%20and%20Trim!" className="bv-btn" target="_blank" rel="noreferrer">
            📱 WhatsApp Us to Book
          </a>
        </div>
        <div className="bv-visual">
          <span>📱</span>
          <p>Easy Booking</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">Location &amp; Contact 📍</h2>
        <div className="contact-grid">
          <div>
            <div className="contact-block">
              <h3>📍 Our Location</h3>
              <p>Taman Tun Dr Ismail,<br />60000 Kuala Lumpur,<br />Wilayah Persekutuan Kuala Lumpur</p>
            </div>
            <div className="contact-block">
              <h3>🕐 Operating Hours</h3>
              <p><strong>Tuesday – Sunday:</strong> 10:00 AM – 8:00 PM</p>
              <p className="hours-note">Closed on Mondays and public holidays.</p>
            </div>
            <div className="contact-block">
              <h3>📞 Contact Us</h3>
              <p>WhatsApp: <a href="https://wa.me/60123889771?text=Hi%20Tots%20and%20Trim!" target="_blank" rel="noreferrer">(+6) 012-388-9771</a></p>
              <p>Email: <a href="mailto:info@totsandtrim.com">info@totsandtrim.com</a></p>
            </div>
            <div className="contact-block">
              <h3>🌐 Follow us on:</h3>
              <div className="social-links">
                <a href="https://www.instagram.com/totsntrim" target="_blank" rel="noreferrer" className="social-btn social-ig">📸 Instagram</a>
                <a href="https://www.facebook.com/totsntrim" target="_blank" rel="noreferrer" className="social-btn social-fb">👍 Facebook</a>
                <a href="https://www.tiktok.com/@totsntrim" target="_blank" rel="noreferrer" className="social-btn social-tt">🎵 TikTok</a>
              </div>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              title="Tots and Trim Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0!2d101.6249!3d3.1478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c7e83b8951%3A0xa4e50b9c1f7a2a5e!2sTaman%20Tun%20Dr%20Ismail%2C%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1700000000000"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Survey() {
  return (
    <section className="section teal-light-bg" id="survey">
      <div className="container survey-inner">
        <div className="survey-icon">📋</div>
        <h2 className="section-title">Survey 🎁</h2>
        <h3>Help Us Shape the Perfect Kids&apos; Salon Experience!</h3>
        <p>Got 3 minutes? We&apos;d love to hear your feedback! Your insights help us create an even better experience. Plus, you&apos;ll be entered into our prize draw!</p>
        <a href="https://websurvey.shinyapps.io/kids-salon/" target="_blank" rel="noreferrer" className="survey-btn">
          🎉 Click Here to Take Our Quick Survey
        </a>
        <p className="survey-note">Start survey and enter to win!</p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section teal-bg">
      <div className="container cta-inner">
        <div className="cta-text">
          <h2 className="section-title" style={{color:'white'}}>Elevate Your Child&apos;s Salon Experience with Tots &amp; Trim 🌟</h2>
          <p>At Tots &amp; Trim, every visit is designed as a cherished experience, ensuring each child leaves with radiant confidence. Schedule an appointment today and let the magic begin!</p>
        </div>
        <div className="cta-actions">
          <a href="https://wa.me/60123889771?text=Hi%20Tots%20and%20Trim!" className="cta-btn-p" target="_blank" rel="noreferrer">✂️ Book Your Appointment</a>
          <a href="tel:+60123889771" className="cta-btn-s">📞 Call Now</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="fl-tots">tots</span>
          <span className="fl-and"> &amp; </span>
          <span className="fl-trim">trim</span>
          <p className="fl-sub">hair . nail . play</p>
        </div>
        <div className="footer-links">
          <a href="#signature">Our Signature</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="#survey">Survey</a>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/totsntrim" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/totsntrim" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.tiktok.com/@totsntrim" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tots &amp; Trim. All rights reserved. Made with ❤️ for little ones.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Signature />
      <Safety />
      <Services />
      <BookVisit />
      <Contact />
      <Survey />
      <CTA />
      <Footer />
    </div>
  );
}
