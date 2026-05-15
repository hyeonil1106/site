import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import './ExhibitionSection.css';

// 생성 및 기존 이미지 자산 임포트
import starryNightImg from '../assets/starry_night.png';
import autumnDreamImg from '../assets/autumn_dream.png';
import timeFlowImg from '../assets/time_flow.png';
import natureArtImg from '../assets/nature_art.png';
import digitalArtImg from '../assets/digital_art.png';
import colorSpaceImg from '../assets/color_space.png';

const ExhibitionCard = ({ title, desc, period, isReservable, onOpenReservation, image }) => {
  const navigate = useNavigate();

  return (
    <article className="exhibition-card">
      {image ? (
        <div className="card-image-wrapper">
          <img src={image} alt={title} className="card-image" loading="lazy" />
        </div>
      ) : (
        <div className="card-image-placeholder" aria-hidden="true">
          <span className="placeholder-text">이미지 준비 중</span>
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
        <p className="card-period">{period}</p>
        <div className="card-actions">
          {isReservable && (
            <button 
              type="button" 
              className="action-btn primary" 
              aria-label={`'${title}' 관람예약`}
              onClick={() => onOpenReservation(title)}
            >
              관람예약
            </button>
          )}
          <button 
            type="button" 
            className="action-btn secondary" 
            aria-label={`'${title}' 전시 상세 더보기`}
            onClick={() => navigate('/exhibitions')} // 페이지 이동 설정 완료
          >
            더보기
          </button>
        </div>
      </div>
    </article>
  );
};

const ExhibitionSection = ({ onOpenReservation }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(3); // 데스크톱: 한 번에 3개
      } else if (width >= 768) {
        setItemsPerPage(2); // 태블릿: 한 번에 2개
      } else {
        setItemsPerPage(1); // 모바일: 한 번에 1개
      }
    };
    
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const currentExhibitions = [
    { title: "별 헤는 밤", desc: "밤하늘의 아름다움을 담은 서정적인 작품", period: "2024.12.01 ~ 2024.12.31", isReservable: true, image: starryNightImg },
    { title: "시간의 흐름", desc: "현대 미술로 풀어낸 시간의 의미와 고찰", period: "2024.11.20 ~ 2024.12.20", isReservable: true, image: timeFlowImg },
    { title: "자연과 사람", desc: "자연과 인류의 공존을 다룬 특별 기획전", period: "2024.12.05 ~ 2025.01.10", isReservable: true, image: natureArtImg },
    { title: "디지털 르네상스", desc: "기술과 예술의 결합을 보여주는 미디어 아트", period: "2024.12.10 ~ 2025.02.15", isReservable: true, image: digitalArtImg },
  ];

  const pastExhibitions = [
    { title: "고요한 아침의 빛", desc: "새로운 시작을 알리는 희망의 메시지", period: "2023.11.15 ~ 2024.01.15", isReservable: false, image: natureArtImg },
    { title: "과거의 궤적", desc: "잊혀진 역사를 다시 조명하는 회고전", period: "2023.09.01 ~ 2023.10.31", isReservable: false, image: timeFlowImg },
    { title: "색채의 향연", desc: "다양한 색의 조화와 대비를 탐구한 작품들", period: "2023.06.15 ~ 2023.08.15", isReservable: false, image: colorSpaceImg },
    { title: "공간의 미학", desc: "건축과 예술이 만나는 지점을 탐구하다", period: "2023.03.10 ~ 2023.05.20", isReservable: false, image: digitalArtImg },
  ];

  const onlineExhibitions = [
    { title: "디지털 수채화", desc: "온라인으로 감상하는 부드러운 수채화의 세계", period: "상시 관람", isReservable: false, image: autumnDreamImg },
    { title: "가상 조각전", desc: "3D로 재현된 유명 조각가들의 작품을 온라인에서 만나보세요.", period: "상시 관람", isReservable: false, image: digitalArtImg },
    { title: "VR 아트 투어", desc: "VR 기기를 통해 실제 미술관에 있는 듯한 생생한 경험", period: "상시 관람", isReservable: false, image: starryNightImg },
    { title: "인터랙티브 미디어 아트", desc: "사용자의 마우스 움직임에 반응하는 예술 작품", period: "상시 관람", isReservable: false, image: colorSpaceImg },
  ];

  const exhibitions = activeTab === 'current' ? currentExhibitions : 
                    activeTab === 'past' ? pastExhibitions : onlineExhibitions;

  const maxIndex = Math.max(0, exhibitions.length - itemsPerPage);
  const totalPages = maxIndex + 1;
  const shiftPercentage = 100 / itemsPerPage;

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab, itemsPerPage]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  return (
    <section className="exhibition-section" aria-labelledby="exhibition-heading">
      <div className="section-container">
        <h2 id="exhibition-heading" className="sr-only">전시 안내</h2>
        
        <div className="tabs-container" role="tablist" aria-label="전시 분류 탭">
          <button 
            role="tab" 
            aria-selected={activeTab === 'current'}
            aria-controls="panel-exhibition"
            id="tab-current"
            className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            현재전시
          </button>
          <button 
            role="tab" 
            aria-selected={activeTab === 'past'}
            aria-controls="panel-exhibition"
            id="tab-past"
            className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            예정전시
          </button>
          <button 
            role="tab" 
            aria-selected={activeTab === 'online'}
            aria-controls="panel-exhibition"
            id="tab-online"
            className={`tab-btn ${activeTab === 'online' ? 'active' : ''}`}
            onClick={() => setActiveTab('online')}
          >
            지난전시
          </button>
        </div>

        <div 
          id="panel-exhibition" 
          role="tabpanel" 
          tabIndex="0" 
          aria-labelledby={`tab-${activeTab}`}
          className="tab-panel"
        >
          <div className="slider-viewport">
            <div 
              className="cards-slider" 
              style={{ transform: `translateX(-${currentIndex * shiftPercentage}%)` }}
            >
              {exhibitions.map((ex, idx) => (
                <div key={idx} className="slider-item">
                  <ExhibitionCard {...ex} onOpenReservation={onOpenReservation} />
                </div>
              ))}
            </div>
          </div>

          <div className="slider-controls">
            <button 
              type="button" 
              className="slider-arrow-btn prev" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="이전 전시 보기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="slider-pagination" aria-live="polite">
              <span className="current-num">{currentIndex + 1}</span>
              <span className="divider">/</span>
              <span className="total-num">{totalPages}</span>
            </div>
            <button 
              type="button" 
              className="slider-arrow-btn next" 
              onClick={handleNext}
              disabled={currentIndex === totalPages - 1}
              aria-label="다음 전시 보기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionSection;
