import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MenuDrawer.css';

const MenuDrawer = ({ isOpen, onClose }) => {
  // 현재 오픈된 아코디언 섹션 상태 관리 (초기값: null - 모두 닫힌 상태)
  const [activeSection, setActiveSection] = useState(null);

  // 아코디언 섹션 토글 핸들러: 이미 열려있으면 닫고, 다른 섹션 클릭 시 전환
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  // 메뉴 드로어가 열렸을 때 본문 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={`menu-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <aside 
        className={`menu-drawer-content ${isOpen ? 'active' : ''}`} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-drawer-title"
      >
        {/* 드로어 헤더 영역 */}
        <div className="drawer-header">
          <h2 id="menu-drawer-title" className="sr-only">전체 메뉴</h2>
          <div className="header-left">
            <span className="text-close">닫기</span>
          </div>
          <button 
            type="button" 
            className="btn-close-drawer" 
            onClick={onClose} 
            aria-label="전체 메뉴 닫기"
          >
            <span className="close-icon" aria-hidden="true">✕</span>
          </button>
        </div>

        {/* 드로어 스크롤 콘텐츠 */}
        <div className="drawer-body">
          
          {/* 1. 로그인 / 회원가입 아코디언 */}
          <div className={`accordion-item ${activeSection === 'auth' ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="accordion-header"
              onClick={() => toggleSection('auth')}
              aria-expanded={activeSection === 'auth'}
            >
              <span className="header-title">로그인/회원가입</span>
              <span className="toggle-indicator" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <ul className="sub-menu-list">
                <li><Link to="/login" className="sub-menu-link" onClick={onClose}>로그인</Link></li>
                <li><a href="#signup" className="sub-menu-link">회원가입</a></li>
              </ul>
            </div>
          </div>

          {/* 2. 내정보 아코디언 */}
          <div className={`accordion-item ${activeSection === 'myInfo' ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="accordion-header"
              onClick={() => toggleSection('myInfo')}
              aria-expanded={activeSection === 'myInfo'}
            >
              <span className="header-title">내정보</span>
              <span className="toggle-indicator" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <ul className="sub-menu-list">
                <li><a href="#my-reservation" className="sub-menu-link">나의예약</a></li>
                <li><a href="#group-reservation" className="sub-menu-link">단체관람예약</a></li>
                <li><a href="#nonmember-reservation" className="sub-menu-link">비회원예약</a></li>
              </ul>
            </div>
          </div>

          {/* 3. 공지 및 소식 아코디언 */}
          <div className={`accordion-item ${activeSection === 'notice' ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="accordion-header"
              onClick={() => toggleSection('notice')}
              aria-expanded={activeSection === 'notice'}
            >
              <span className="header-title">공지 및 소식</span>
              <span className="toggle-indicator" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <ul className="sub-menu-list">
                <li><a href="#news" className="sub-menu-link">새소식</a></li>
                <li><a href="#faq" className="sub-menu-link">자주묻는 질문</a></li>
                <li><a href="#survey" className="sub-menu-link">설문조사</a></li>
              </ul>
            </div>
          </div>

          {/* 4. 라이브러리 아코디언 */}
          <div className={`accordion-item ${activeSection === 'library' ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="accordion-header"
              onClick={() => toggleSection('library')}
              aria-expanded={activeSection === 'library'}
            >
              <span className="header-title">라이브러리</span>
              <span className="toggle-indicator" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <ul className="sub-menu-list">
                <li><a href="#archive" className="sub-menu-link">아카이브</a></li>
              </ul>
            </div>
          </div>

          {/* 5. 미술관소개 아코디언 */}
          <div className={`accordion-item ${activeSection === 'about' ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="accordion-header"
              onClick={() => toggleSection('about')}
              aria-expanded={activeSection === 'about'}
            >
              <span className="header-title">미술관소개</span>
              <span className="toggle-indicator" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <ul className="sub-menu-list">
                <li><a href="#greetings" className="sub-menu-link" onClick={onClose}>인사말</a></li>
                <li><a href="#history" className="sub-menu-link" onClick={onClose}>연혁</a></li>
                <li><a href="#mission" className="sub-menu-link" onClick={onClose}>미션</a></li>
                <li><a href="#ci" className="sub-menu-link" onClick={onClose}>CI</a></li>
                <li><a href="#organization" className="sub-menu-link" onClick={onClose}>조직도</a></li>
                <li><a href="#facility" className="sub-menu-link" onClick={onClose}>시설현황·대관안내</a></li>
                <li><a href="#gwanggyo" className="sub-menu-link" onClick={onClose}>수원시립아트스페이스광교</a></li>
                <li><a href="#kids" className="sub-menu-link" onClick={onClose}>수원시립어린이미술체험관</a></li>
              </ul>
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
};

export default MenuDrawer;
