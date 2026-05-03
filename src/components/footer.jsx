export default function footer() {
  return (
    <footer style={{ backgroundColor: '#111827', color: '#9CA3AF', width: '100%' }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "160px",
          padding: "0 20px",
          backgroundColor: '#111827',
          color: '#9CA3AF'
        }}
      >
        <div className="footer-left">
          <a href="https://www.codeit.kr/" style={{ textDecoration: 'none'}}>
            <span style={{ color: '#ffffff' }}>@codeit - 2024</span>
          </a>  
        </div>
        <div className="footer-center" style={{ display: 'flex', gap: '30px'}}>
          <a href="/privacyPolicy" style={{ textDecoration: 'none'}}>
            <span style={{ color: '#ffffff' }}>Privacy Policy</span>
          </a>
          <a href="/faq" style={{ textDecoration: 'none' }}>  
            <span style={{ color: '#ffffff' }}>FAQ</span>
          </a>
        </div>
        <div className="footer-right" style={{ display: 'flex', gap: '12px'}}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/ic_facebook.svg" alt="facebook" style={{ width: '20px', height: '20px' }} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/ic_twitter.svg" alt="twitter" style={{ width: '20px', height: '20px'}} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/ic_youtube.svg" alt="youtube" style={{ width: '20px', height: '20px' }} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/ic_instagram.svg" alt="instagram" style={{ width: '20px', height: '20px' }} />
          </a>
        </div>
    
      </div>
    </footer>
  );
};