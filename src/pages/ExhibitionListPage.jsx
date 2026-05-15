import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationModal from '../components/ReservationModal'; // 메인 페이지와 동일한 모달 임포트
import './ExhibitionListPage.css';

// 이미지 자산 임포트
import starryNightImg from '../assets/starry_night.png';
import autumnDreamImg from '../assets/autumn_dream.png';
import logoImg from '../assets/logo.png';

// 글로벌 전시 데이터 베이스 (풍부한 16개 이상의 목록 탑재)
const ALL_DATA = {
  current: [
    { id: 1, title: "별 헤는 밤", desc: "밤하늘의 아름다움을 담은 서정적인 명작 기획전", period: "2025.02.15 ~ 2025.04.15", image: starryNightImg },
    { id: 2, title: "낙엽 속의 꿈", desc: "가을의 정취와 로맨틱한 수채화의 만남", period: "2024.11.01 ~ 2024.12.01", image: autumnDreamImg },
    { id: 3, title: "빛과 공간의 미학", desc: "자연의 빛이 빚어내는 신비로운 입체 공간 연출", period: "2025.03.01 ~ 2025.05.30", image: starryNightImg },
    { id: 4, title: "시간의 흔적", desc: "과거와 현대의 기억을 넘나드는 특별 고전 회고전", period: "2025.01.10 ~ 2025.03.20", image: autumnDreamImg },
    { id: 5, title: "마음의 풍경", desc: "내면의 고요함을 붓끝으로 표현한 추상화 모음전", period: "2025.02.05 ~ 2025.04.10", image: starryNightImg },
    { id: 6, title: "도심 속 오아시스", desc: "지친 일상에 위로를 건네는 녹색 예술 정원", period: "2025.02.28 ~ 2025.05.15", image: autumnDreamImg },
    { id: 7, title: "색채의 변주곡", desc: "원색의 대비와 조화가 주는 강렬한 시각 에너지", period: "2025.03.15 ~ 2025.06.15", image: starryNightImg },
    { id: 8, title: "유리 상자의 기억", desc: "투명한 유리 속에 각인된 영롱한 조형 아트", period: "2025.02.10 ~ 2025.04.20", image: autumnDreamImg },
    { id: 9, title: "바다와 소년", desc: "푸른 파도가 선사하는 동화적 서사의 일러스트", period: "2025.03.05 ~ 2025.05.25", image: starryNightImg },
    { id: 10, title: "대지의 리듬", desc: "흙과 나무, 날것 그대로의 소재를 다룬 설치 미술", period: "2025.02.01 ~ 2025.04.05", image: autumnDreamImg },
    { id: 11, title: "디지털 플로우", desc: "코딩과 미디어 아트가 만나 빚는 움직이는 벽화", period: "2025.03.12 ~ 2025.06.05", image: starryNightImg },
    { id: 12, title: "겨울비 내리던 날", desc: "차갑지만 따스한 흑백 모노톤의 서정성 탐구", period: "2025.01.20 ~ 2025.03.30", image: autumnDreamImg },
  ],
  upcoming: [
    { id: 101, title: "신록의 행진", desc: "싱그러운 새봄의 기운을 담아낸 수묵채색전", period: "2025.05.01 ~ 2025.07.01", image: autumnDreamImg },
    { id: 102, title: "우주와의 조우", desc: "끝없는 심연의 우주공간을 입체 프로젝션으로 조망", period: "2025.06.15 ~ 2025.08.30", image: starryNightImg },
    { id: 103, title: "선의 기하학", desc: "직선과 곡선의 반복이 주는 미니멀리즘 조각전", period: "2025.05.20 ~ 2025.07.25", image: autumnDreamImg },
    { id: 104, title: "여름의 조각", desc: "한여름 밤의 꿈같은 청량한 색조의 비주얼 향연", period: "2025.07.10 ~ 2025.09.05", image: starryNightImg },
  ],
  past: [
    { id: 201, title: "눈의 꽃", desc: "겨울 왕국의 하얀 설경을 모티브로 한 회화전", period: "2024.12.10 ~ 2025.01.15", image: starryNightImg },
    { id: 202, title: "황혼의 실루엣", desc: "노을 질 무렵의 서사적인 감동을 화폭에 담다", period: "2024.10.05 ~ 2024.11.25", image: autumnDreamImg },
  ]
};

const ExhibitionListPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // 화면 폭에 따라 동적 변동

  // 모달 제어 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExhibitionTitle, setSelectedExhibitionTitle] = useState('');

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
          <li className={activeTab === 'current' ? 'active' : ''} onClick={() => setActiveTab('current')}>현재전시</li>
          <li className={activeTab === 'upcoming' ? 'active' : ''} onClick={() => setActiveTab('upcoming')}>예정전시</li>
          <li className={activeTab === 'past' ? 'active' : ''} onClick={() => setActiveTab('past')}>지난전시</li>
          <li className={activeTab === 'online' ? 'active' : ''} onClick={() => setActiveTab('online')}>온라인전시</li>
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
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>
                  <p className="card-period">{item.period}</p>
                  {activeTab !== 'past' && activeTab !== 'online' ? (
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
