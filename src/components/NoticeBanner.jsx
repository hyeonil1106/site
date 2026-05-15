import React from 'react';
import { Link } from 'react-router-dom';
import './NoticeBanner.css';

const NoticeBanner = () => {
  return (
    <aside className="notice-banner" aria-label="최근 공지사항">
      <div className="notice-container">
        <div className="notice-label" aria-hidden="true">공지</div>
        <Link 
          to="/news" 
          state={{ tab: 'notices' }} 
          className="notice-link" 
          aria-label="공지사항 상세 보기: 2024년 하반기 미술관 관람 시간 변경 안내"
        >
          <span className="notice-text">2024년 하반기 미술관 관람 시간 변경 안내 (10월 1일부터)</span>
          <span className="notice-icon" aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
};

export default NoticeBanner;
