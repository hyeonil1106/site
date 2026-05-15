import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/privacy" className="privacy-link" aria-label="개인정보 처리방침 상세 보기">
            <strong>개인정보 처리방침</strong>
          </a>
        </div>
        
        <address className="footer-address">
          (우 16252) 경기도 수원시 팔달구 정조로 833 (신풍동)<br/>
          TEL: 031-5191-3800
        </address>
        
        <div className="footer-copyright">
          <p>홈페이지의 모든 내용들은 무단 복제가 불가합니다.</p>
          <p>Copyright &copy; 2019 SUWON MUSEUM OF ART. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
