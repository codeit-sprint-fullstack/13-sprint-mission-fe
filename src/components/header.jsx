
export default function header() {
  return (
    <header style={{ width: '100%', borderBottom: '1px solid #e5e7eb' }}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
          padding: "0 20px"
        }}
      >
          <div className="header-left">
            <a href="/html">
              <img src="/images/ic_panda.svg" alt="panda" />
              <span style={{
                justifyContent: "center",
                alignItems: "center",
                padding: "21px 15px",
                fontSize: "26.633px",
                fontWeight: "bold",
                color: "#3692FF",
                textDecoration: 'none'
              }}>판다마켓</span>
            </a>
            <a href="/freeBoard" style={{ textDecoration: 'none' }}>
              <span style={{ color: "#4B5563", fontSize: "18px", padding: "21px 15px" }}>자유게시판</span>
            </a>
            <a href="/resaleMarket" style={{ textDecoration: 'none'}}>
              <span style={{ color: "#4B5563", fontSize: "18px", padding: "21px 15px" }}>중고마켓</span>
            </a>
          </div>  
        <div className="header-right">
          <a href="/login" style={{ textDecoration: 'none' }}>
            <span style={{
              paddingRight: "200px",
              display: "flex'",
              height: "42px",
              padding: "12px 23px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "8px",
              background: "var(--Primary-100, #3692FF)",
              color: "#ffffff"
            }}>로그인</span>
          </a>
        </div>
      </div>
    </header>
  )
}
