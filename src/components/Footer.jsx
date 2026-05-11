import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>@codeit - 2026</p>

        <div className="footer-center">
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>

        <div className="footer-icons">
          <span>
            <img src="/images/ic_facebook.png" alt="facebook" />
          </span>
          <span>
            <img src="images/ic_twitter.png" alt="twitter" />
          </span>
          <span>
            <img src="images/ic_youtube.png" alt="youtube" />
          </span>
          <span>
            <img src="images/ic_instagram.png" alt="instagram" />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
