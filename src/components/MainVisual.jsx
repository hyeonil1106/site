import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainVisual.css';
import mainBanner from '../assets/main_banner.png';

const MainVisual = ({ onOpenReservation }) => {
  const navigate = useNavigate();

  return (
    <section className="main-visual" aria-labelledby="visual-heading">
      <div className="visual-content">
        <img 
          src={mainBanner} 
          alt="시간의 정원 전시 메인 이미지: 과거와 현재, 미래가 공존하는 신비로운 공간" 
          className="visual-image"
        />
        <div className="visual-info">
          <div className="info-badge" aria-hidden="true">진행 중인 전시</div>
          <h2 id="visual-heading" className="visual-title">시간의 정원</h2>
          <p className="visual-desc">과거와 현재, 미래가 공존하는 신비로운 공간</p>
          <p className="visual-date">2024.12.01 ~ 2025.02.01</p>
          <div className="visual-actions">
            <button 
              type="button" 
              className="action-button primary" 
              aria-label="시간의 정원 전시 상세 정보 보기"
              onClick={() => navigate('/exhibitions')}
            >
              전시 상세 보기
            </button>
            <button 
              type="button" 
              className="action-button secondary" 
              aria-label="시간의 정원 전시 예매하기"
              onClick={onOpenReservation}
            >
              온라인 예매
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainVisual;
