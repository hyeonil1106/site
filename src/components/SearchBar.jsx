import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import searchIcon from '../assets/icon2.png';

const SearchBar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDesktopSuggestOpen, setIsDesktopSuggestOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : true);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const recommendWords = [
    { label: "관람예약", path: "/exhibitions" },
    { label: "고객센터", path: "/cs" },
    { label: "이용안내", path: "/about" }
  ];

  const handleRecommendClick = (path) => {
    navigate(path);
    setIsDesktopSuggestOpen(false);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileState = window.innerWidth <= 768;
      setIsMobile(mobileState);
      // 환경이 바뀔 때 활성화된 팝업 및 드롭다운 상태를 정리합니다.
      if (mobileState) {
        setIsDesktopSuggestOpen(false);
      } else {
        setIsPopupOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 데스크탑에서 외부 영역 클릭 시 드롭다운이 닫히도록 구성합니다.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsDesktopSuggestOpen(false);
      }
    };
    
    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleInputFocus = () => {
    if (isMobile) {
      setIsPopupOpen(true);
    } else {
      setIsDesktopSuggestOpen(true);
    }
  };

  return (
    <section className="search-section" aria-labelledby="search-heading" ref={containerRef}>
      <h2 id="search-heading" className="sr-only">전시 검색</h2>
      <div className="search-container">
        <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="search-input-wrapper">
            <input 
              type="text" 
              className="search-input" 
              placeholder="찾고싶은 전시를 검색하세요." 
              aria-label="전시 검색어 입력"
              onClick={handleInputFocus}
              onFocus={handleInputFocus}
              readOnly={isMobile} /* 모바일일 때만 읽기 전용 처리하여 팝업 내 인풋 유도 */
            />
            <button type="button" className="search-submit" aria-label="검색창 열기" onClick={handleInputFocus}>
              <img src={searchIcon} alt="icon2" className="icon2" aria-hidden="true"/>  
              <span className="label">검색</span>
            </button>
          </div>

          {/* 테블릿 및 데스크탑용: overflow: hidden이 없는 형제 레벨에 위치시켜 드롭다운 렌더링 안전화 */}
          {!isMobile && isDesktopSuggestOpen && (
            <div className="desktop-suggest-dropdown">
              <h3 className="recommend-title">추천검색어</h3>
              <ul className="recommend-list">
                {recommendWords.map((item, idx) => (
                  <li key={idx}>
                    <button 
                      type="button" 
                      className="recommend-item-btn"
                      onClick={() => handleRecommendClick(item.path)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>

      {/* 모바일용: 피그마 디자인의 오버레이 팝업 모달 */}
      {isMobile && isPopupOpen && (
        <div className="search-popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="search-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <div className="popup-search-input-wrapper">
                <input 
                  type="text" 
                  className="popup-search-input" 
                  placeholder="찾고싶은 전시를 검색하세요." 
                  aria-label="전시 검색어 입력"
                  autoFocus
                />
              </div>
              <div className="popup-actions">
                <button type="button" className="popup-action-btn btn-search" aria-label="검색 실행">
                  <img src={searchIcon} alt="icon2" className="icon-large" aria-hidden="true"/>
                </button>
                <button type="button" className="popup-action-btn btn-close" onClick={() => setIsPopupOpen(false)} aria-label="검색 팝업 닫기">
                  <span className="icon-large" aria-hidden="true">✕</span>
                </button>
              </div>
            </div>
            
            <div className="popup-divider" />
            
            <div className="popup-body">
              <h3 className="recommend-title">추천검색어</h3>
              <ul className="recommend-list">
                {recommendWords.map((item, idx) => (
                  <li key={idx}>
                    <button 
                      type="button" 
                      className="recommend-item-btn"
                      onClick={() => handleRecommendClick(item.path)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchBar;
