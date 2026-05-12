import "../styles/landing.css";

function LandingPage() {
  return (
    <main className="landing-page">
      <section className="hero-section">
        <img src="/images/hero.png" alt="hero" />{" "}
      </section>

      <section className="landing-section">
        <img src="/images/section1.png" alt="section1" />
      </section>

      <section className="landing-section">
        <img src="/images/section2.png" alt="section2" />
      </section>

      <section className="landing-section">
        <img src="/images/section3.png" alt="section3" />
      </section>

      <section className="bottom-section">
        <img src="/images/bottom.png" alt="bottom" className="full-image" />
      </section>
    </main>
  );
}

export default LandingPage;
