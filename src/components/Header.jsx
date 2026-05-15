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
    path: '/exhibitions', // 수정: 이전에 추가했던 전시 리스트 주소 매핑
    subItems: [
      { label: '현재전시', href: '#current-exhibition' },
      { label: '예전전시', href: '#past-exhibition-1' },
      { label: '지난전시', href: '#past-exhibition-2' },
      { label: '온라인전시', href: '#online-exhibition' },
    ],
  },
  {
    title: '예약내역',
    path: '#', // 단독 예약 페이지 제거됨
    subItems: [
      { label: '예약확인', href: '#check-reservation' },
      { label: '사전예약', href: '#pre-reservation' },
      { label: '단체예약', href: '#group-reservation' },
      { label: '전시관대여', href: '#hall-rental' },
      { label: '예약취소', href: '#cancel-reservation' },
    ],
  },
  {
    title: '교육·문화',
    path: '/education',
    subItems: [
      { label: '교육프로그램', href: '#edu-program' },
      { label: '문화프로그램', href: '#culture-program' },
      { label: '프로그램 일정', href: '#program-schedule' },
      { label: '자원봉사', href: '#volunteer' },
      { label: '갤러리', href: '#gallery' },
    ],
  },
  {
    title: '미술관소개',
    path: '/about',
    subItems: [
      { label: '시설안내', href: '#facility-guide' },
      { label: '요금안내', href: '#fee-guide' },
      { label: '미술관위치', href: '#museum-location' },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 터치 및 클릭 시 토글 동작 핸들러
  const handleMenuClick = () => {
    // 사용자가 메뉴를 직접 클릭한 경우, 즉시 페이지 이동을 허용하며 드롭다운은 닫습니다.
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
                      onClick={(e) => handleMenuClick(index, e)}
                    >
                      {menu.title}
                    </Link>

                    {/* Figma 4단 드롭다운 리스트 */}
                    <div className={`top-submenu ${isOpen ? 'show' : ''}`}>
                      <ul className="submenu-list">
                        {menu.subItems.map((sub, sIdx) => (
                          <li key={sIdx} className="submenu-item">
                            <Link 
                              to={`${menu.path}${sub.href}`} 
                              className="submenu-link"
                              onClick={handleMenuClick}
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
      <MenuDrawer isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Header;
