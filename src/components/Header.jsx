import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDrawer from './MenuDrawer';
import './Header.css';
import loginImg from '../assets/icon1.jpg';
import menuImg from '../assets/icon3.jpg';

// 사용자가 설계한 수원시립미술관 신규 전용 로고 임포트
import logoImg from '../assets/logo.png';

const MENU_DATA = [
  {
    title: '전시',
    path: '/exhibitions',
    subItems: [
      { label: '현재전시', href: '/exhibitions?tab=current' },
      { label: '예정전시', href: '/exhibitions?tab=upcoming' },
      { label: '지난전시', href: '/exhibitions?tab=past' },
      { label: '온라인전시', href: '/exhibitions?tab=online' },
      { label: '미술관 소장품', href: '/exhibitions?tab=collection' },
    ],
  },
  {
    title: '예약내역',
    path: '#', // 단독 예약 페이지 제거됨
    subItems: [
      { label: '예약확인', href: '#' },
      { label: '사전예약', href: '#' },
      { label: '단체예약', href: '#' },
      { label: '전시관대여', href: '#' },
      { label: '예약취소', href: '#' },
    ],
  },
  {
    title: '교육·문화',
    path: '#',
    subItems: [
      { label: '교육프로그램', href: '#' },
      { label: '문화프로그램', href: '#' },
      { label: '프로그램 일정', href: '#' },
      { label: '자원봉사', href: '#' },
      { label: '갤러리', href: '#' },
    ],
  },
  {
    title: '미술관소개',
    path: '#',
    subItems: [
      { label: '시설안내', href: '#' },
      { label: '요금안내', href: '#' },
      { label: '미술관위치', href: '#' },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 링크 클릭 가로채기 핸들러
  const handleLinkIntercept = (path, e) => {
    if (path === '#') {
      e.preventDefault();
      setIsAlertOpen(true);
    }
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="header" role="banner">
        <div className="header-container">
          <div className="logo-area">
            <Link to="/" aria-label="수원시립미술관 홈으로 이동">
              <img src={logoImg} alt="" className="main-logo-img" />
              <h1 className="logo-text">수원시립미술관</h1>
            </Link>
          </div>
          
          <nav 
            className="top-menu-nav" 
            aria-label="메인 메뉴"
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <ul className="top-menu-list">
              {MENU_DATA.map((menu, index) => {
                const isOpen = activeDropdown === index;

                return (
                  <li 
                    key={index} 
                    className={`top-menu-item-wrapper ${isOpen ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveDropdown(index)}
                  >
                    <Link 
                      to={menu.path} 
                      className="top-menu-item"
                      onClick={(e) => handleLinkIntercept(menu.path, e)}
                    >
                      {menu.title}
                    </Link>

                    {/* Figma 4단 드롭다운 리스트 */}
                    <div className={`top-submenu ${isOpen ? 'show' : ''}`}>
                      <ul className="submenu-list">
                        {menu.subItems.map((sub, sIdx) => (
                          <li key={sIdx} className="submenu-item">
                            <Link 
                              to={sub.href} 
                              className="submenu-link"
                              onClick={(e) => handleLinkIntercept(sub.href, e)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <nav className="utility-nav" aria-label="유틸리티 메뉴">
            <ul className="utility-list">
              <li className="utility-item">
                <Link to="/login" className="utility-button" aria-label="로그인 페이지로 이동">
                  <img src={loginImg} className="icon1" aria-hidden="true"/>
                  <span className="label">로그인</span>
                </Link>
              </li>
              <li className="utility-item">
                <button 
                  type="button" 
                  className="utility-button" 
                  aria-label="전체 메뉴 열기"
                  onClick={toggleMenu}
                >
                  <img src={menuImg} className="icon3" aria-hidden="true"/>
                  <span className="label">메뉴</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 전체 메뉴 드로어 컴포넌트 */}
      <MenuDrawer 
        isOpen={isMenuOpen} 
        onClose={toggleMenu} 
        onAlert={() => {
          setIsMenuOpen(false);
          setIsAlertOpen(true);
        }}
      />

      {/* 현재 준비중 알림 커스텀 팝업 */}
      {isAlertOpen && (
        <div className="alert-overlay" onClick={() => setIsAlertOpen(false)}>
          <div className="alert-box" onClick={(e) => e.stopPropagation()}>
            <p className="alert-message">현재 준비중인 서비스입니다.</p>
            <button 
              type="button" 
              className="btn-alert-confirm" 
              onClick={() => setIsAlertOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
