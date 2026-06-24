import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReservationModal from '../components/ReservationModal'; // 메인 페이지와 동일한 모달 임포트
import './ExhibitionListPage.css';

// 소장품 데이터 임포트
import { COLLECTION_DATA } from '../components/CollectionSection';

// 이미지 자산 임포트
import starryNightImg from '../assets/starry_night.png';
import autumnDreamImg from '../assets/autumn_dream.png';
import timeFlowImg from '../assets/time_flow.png';
import natureArtImg from '../assets/nature_art.png';
import digitalArtImg from '../assets/digital_art.png';
import colorSpaceImg from '../assets/color_space.png';
import pressEcoImg from '../assets/press_eco.png';
import newsGalleryImg from '../assets/news_gallery.png';
import glassArtImg from '../assets/glass_art.png';
import seaBoyImg from '../assets/sea_boy.png';
import winterRainImg from '../assets/winter_rain.png';
import mindLandscapeImg from '../assets/mind_landscape.png';
import geometricSculptureImg from '../assets/geometric_sculpture.png';
import snowFlowerImg from '../assets/snow_flower.png';
import sunsetSilhouetteImg from '../assets/sunset_silhouette.png';
import cyberArtImg from '../assets/cyber_art.png';
import logoImg from '../assets/logo.png';

// 글로벌 전시 데이터 베이스 (모든 전시가 100% 중복 없이 고유한 아트 비주얼을 소유함)
const ALL_DATA = {
  current: [
    { id: 1, title: "별 헤는 밤", desc: "밤하늘의 아름다움을 담은 서정적인 명작 기획전", period: "2025.02.15 ~ 2025.04.15", image: starryNightImg },
    { id: 2, title: "낙엽 속의 꿈", desc: "가을의 정취와 로맨틱한 수채화의 만남", period: "2024.11.01 ~ 2024.12.01", image: autumnDreamImg },
    { id: 3, title: "빛과 공간의 미학", desc: "자연의 빛이 빚어내는 신비로운 입체 공간 연출", period: "2025.03.01 ~ 2025.05.30", image: colorSpaceImg },
    { id: 4, title: "시간의 흔적", desc: "과거와 현대의 기억을 넘나드는 특별 고전 회고전", period: "2025.01.10 ~ 2025.03.20", image: timeFlowImg },
    { id: 5, title: "마음의 풍경", desc: "내면의 고요함을 붓끝으로 표현한 추상화 모음전", period: "2025.02.05 ~ 2025.04.10", image: mindLandscapeImg },
    { id: 6, title: "도심 속 오아시스", desc: "지친 일상에 위로를 건네는 녹색 예술 정원", period: "2025.02.28 ~ 2025.05.15", image: natureArtImg },
    { id: 7, title: "유리 상자의 기억", desc: "투명한 유리 속에 각인된 영롱한 조형 아트", period: "2025.02.10 ~ 2025.04.20", image: glassArtImg },
    { id: 8, title: "바다와 소년", desc: "푸른 파도가 선사하는 동화적 서사의 일러스트", period: "2025.03.05 ~ 2025.05.25", image: seaBoyImg },
  ],
  upcoming: [
    { id: 101, title: "대지의 리듬", desc: "흙과 나무, 날것 그대로의 소재를 다룬 설치 미술", period: "2025.05.01 ~ 2025.07.01", image: pressEcoImg },
    { id: 102, title: "디지털 플로우", desc: "코딩과 미디어 아트가 만나 빚는 움직이는 벽화", period: "2025.06.15 ~ 2025.08.30", image: digitalArtImg },
    { id: 103, title: "선의 기하학", desc: "직선과 곡선의 반복이 주는 미니멀리즘 조각전", period: "2025.07.10 ~ 2025.09.05", image: geometricSculptureImg },
  ],
  past: [
    { id: 201, title: "겨울비 내리던 날", desc: "차갑지만 따스한 흑백 모노톤의 서정성 탐구", period: "2024.12.10 ~ 2025.01.15", image: winterRainImg },
    { id: 202, title: "눈의 꽃", desc: "겨울 왕국의 하얀 설경을 모티브로 한 회화전", period: "2024.11.01 ~ 2024.12.15", image: snowFlowerImg },
    { id: 203, title: "황혼의 실루엣", desc: "노을 질 무렵의 서사적인 감동을 화폭에 담다", period: "2024.10.05 ~ 2024.11.25", image: sunsetSilhouetteImg },
  ],
  online: [
    { id: 301, title: "메타 버추얼 뮤지엄", desc: "가상현실 공간에서 만나는 신감각 현대 미디어 전시", period: "상시 운영", image: cyberArtImg },
    { id: 302, title: "온라인 컬렉션 아카이브", desc: "수원시립미술관 주요 소장품의 인터랙티브 웹 회화전", period: "상시 운영", image: newsGalleryImg },
  ],
  collection: COLLECTION_DATA
};

const ExhibitionListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'current';

  const [activeTab, setActiveTab] = useState(tabParam);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // 화면 폭에 따라 동적 변동

  // 모달 제어 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExhibitionTitle, setSelectedExhibitionTitle] = useState('');

  // 외부 파라미터 변화 감지하여 activeTab 변경
  useEffect(() => {
    if (tabParam && ALL_DATA[tabParam]) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // 1. 화면 폭 감지 및 itemsPerPage 동적 설정 로직
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(6); // 데스크톱: 6개
      } else if (width >= 768) {
        setItemsPerPage(4); // 태블릿: 4개
      } else {
        setItemsPerPage(2); // 모바일: 2개
      }
    };
    
    updateLayout(); // 최초 실행
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // 탭 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, itemsPerPage]);

  const currentList = ALL_DATA[activeTab] || [];
  
  // 2. 실시간 동적 페이지네이션 계산기
  const totalPages = Math.ceil(currentList.length / itemsPerPage) || 1;
  
  // 현재 페이지에 해당하는 데이터 청크 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visibleItems = currentList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleReserveClick = (title) => {
    // 단독 예약 페이지로 라우팅하는 대신 메인화면과 동일한 팝업을 엽니다.
    setSelectedExhibitionTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="sub-page-wrapper list-page">
      {/* 모던 서브 헤더 (뒤로가기 + 타이틀) */}
      <header className="sub-nav-header">
        <div className="header-inner">
          <button type="button" className="btn-sub-back" onClick={() => navigate('/')} aria-label="메인 페이지로 돌아가기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h1 className="sub-header-logo" onClick={() => navigate('/')}>
            <img src={logoImg} alt="" className="sub-logo-img" />
            수원시립미술관
          </h1>
          <div className="header-space"></div> {/* 시각적 대칭성 공간 */}
        </div>
      </header>

      {/* Figma 탭 메뉴바 */}
      <nav className="sub-tab-navigation">
        <ul className="tab-list">
          <li className={activeTab === 'current' ? 'active' : ''} onClick={() => setSearchParams({ tab: 'current' })}>현재전시</li>
          <li className={activeTab === 'upcoming' ? 'active' : ''} onClick={() => setSearchParams({ tab: 'upcoming' })}>예정전시</li>
          <li className={activeTab === 'past' ? 'active' : ''} onClick={() => setSearchParams({ tab: 'past' })}>지난전시</li>
          <li className={activeTab === 'online' ? 'active' : ''} onClick={() => setSearchParams({ tab: 'online' })}>온라인전시</li>
          <li className={activeTab === 'collection' ? 'active' : ''} onClick={() => setSearchParams({ tab: 'collection' })}>미술관 소장품</li>
        </ul>
      </nav>

      {/* 메인 카드 그리드 컨텐츠 */}
      <main className="list-content-container">
        {visibleItems.length > 0 ? (
          <div className="responsive-exhibition-grid">
            {visibleItems.map((item) => (
              <article key={item.id} className="premium-list-card">
                <div className="card-img-box">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="card-info-box">
                  <h3 className="card-title">
                    {activeTab === 'collection' ? `[소장품] ${item.title}` : item.title}
                  </h3>
                  {activeTab === 'collection' && (
                    <p className="card-artist" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '8px' }}>
                      작가: {item.artist}
                    </p>
                  )}
                  <p className="card-desc">{item.desc}</p>
                  <p className="card-period">{activeTab === 'collection' ? item.info : item.period}</p>
                  {activeTab === 'collection' ? (
                    <button 
                      type="button" 
                      className="btn-card-booking"
                      onClick={() => alert(`[${item.title}] 작품의 디지털 도슨트 해설 및 고해상도 아카이브 뷰어는 현재 준비 중입니다.`)}
                    >
                      작품 설명보기
                    </button>
                  ) : activeTab !== 'past' && activeTab !== 'online' ? (
                    <button 
                      type="button" 
                      className="btn-card-booking"
                      onClick={() => handleReserveClick(item.title)}
                    >
                      관람예약
                    </button>
                  ) : (
                    <button type="button" className="btn-card-booking disabled" disabled>
                      {activeTab === 'past' ? '종료된 전시' : '온라인 관람'}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-list-message">
            현재 준비 중인 전시 정보가 없습니다.
          </div>
        )}

        {/* 3. 동적 페이지네이션 컨트롤러 */}
        {totalPages > 0 && currentList.length > 0 && (
          <div className="pagination-wrapper">
            <button 
              type="button" 
              className="btn-page-arrow prev" 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              aria-label="이전 페이지"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="page-numbers-row">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`btn-page-num ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button 
              type="button" 
              className="btn-page-arrow next" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              aria-label="다음 페이지"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </main>

      {/* 모달 연동부 */}
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        exhibitionTitle={selectedExhibitionTitle} 
      />
    </div>
  );
};

export default ExhibitionListPage;
