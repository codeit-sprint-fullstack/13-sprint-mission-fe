export function renderFooter() {
  const footerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-left">
          <span>©codeit - 2026</span>
        </div>
        
        <div class="footer-center">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        
        <div class="footer-right">
          <div class="sns-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="./images/facebook-icon.png" alt="facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="./images/twitter-icon.png" alt="twitter" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="./images/youtube-icon.png" alt="youtube" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="./images/instagram-icon.png" alt="instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML("beforeend", footerHTML);
}
