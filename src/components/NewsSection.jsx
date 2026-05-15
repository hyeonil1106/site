import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import './NewsSection.css';

// 뉴스/보도자료 전용 고화질 이미지 에셋 임포트
import newsGalleryImg from '../assets/news_gallery.png';
import pressEcoImg from '../assets/press_eco.png';
import newsLectureImg from '../assets/news_lecture.png';
import newsKidsImg from '../assets/news_kids.png';
import timeFlowImg from '../assets/time_flow.png';
import colorSpaceImg from '../assets/color_space.png';

const newsData = [
  {
    id: 1,
    title: "미술관 신관 오픈 기념 특별 강연 개최",
    desc: "신관 오픈을 기념하여 유명 미술 평론가의 특별 강연이 예정되어 있습니다.",
    date: "2024-06-20",
    hasImage: true,
    image: newsLectureImg,
  },
  {
    id: 2,
    title: "현대 미술 대가 전시회 개최",
    desc: "국내 유명 현대 미술 작가들의 작품을 한자리에서 감상할 수 있는 전시회가 이번 달부터 시작됩니다.",
    date: "2024-06-10",
    hasImage: true,
    image: newsGalleryImg,
  },
  {
    id: 3,
    title: "미술관, 어린이 대상 무료 체험 프로그램 운영",
    desc: "어린이들이 직접 참여할 수 있는 미술 체험 프로그램이 미술관에서 매주 토요일 진행됩니다.",
    date: "2024-06-15",
    hasImage: true,
    image: newsKidsImg,
  },
  {
    id: 4,
    title: "수원시립미술관, 2024 우수 공공미술관 선정",
    desc: "수원시립미술관이 문화체육관광부 주관 2024 우수 공공미술관으로 선정되었습니다.",
    date: "2024-05-30",
    hasImage: true,
    image: colorSpaceImg,
  },
];

const pressData = [
  {
    id: 1,
    title: "[한국일보] 수원시립미술관, '별 헤는 밤' 기획전 호평",
    desc: "수원시립미술관에서 열리는 '별 헤는 밤' 기획전이 관람객들 사이에서 큰 호평을 받고 있습니다.",
    date: "2024-06-18",
    hasImage: true,
    image: pressEcoImg,
  },
  {
    id: 2,
    title: "[연합뉴스] 수원시, 시립미술관 신관 건립 본격 추진",
    desc: "수원시가 시립미술관 신관 건립을 위한 부지 확보 및 설계 공모를 본격적으로 추진한다고 밝혔습니다.",
    date: "2024-06-05",
    hasImage: true,
    image: timeFlowImg,
  },
  {
    id: 3,
    title: "[경기일보] 미술관 어린이 미술교육 프로그램 전국 우수상 수상",
    desc: "수원시립미술관의 어린이 대상 미술교육 프로그램이 전국 공립미술관 우수 교육 프로그램 공모전에서 대상을 수상했습니다.",
    date: "2024-05-28",
    hasImage: true,
    image: newsKidsImg,
  },
  {
    id: 4,
    title: "[수원일보] 수원시립미술관 올해 관람객 20만명 돌파",
    desc: "수원시립미술관이 개관 이래 최초로 연간 관람객 20만명을 돌파하는 기록을 세웠습니다.",
    date: "2024-05-15",
    hasImage: true,
    image: newsGalleryImg,
  },
];

const NewsItem = ({ title, desc, date, hasImage, image }) => (
  <article className="news-item">
    <div className="news-image-slot" aria-hidden="true">
      {hasImage && image ? (
        <img src={image} alt={title} className="news-image-content" loading="lazy" />
      ) : (
        <span className="news-image-placeholder-text no-img">-</span>
      )}
    </div>
    <div className="news-content">
      <h3 className="news-title">{title}</h3>
      <p className="news-desc">{desc}</p>
      <time className="news-date" dateTime={date}>{date}</time>
    </div>
  </article>
);

const NewsSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('news');

  const currentList = activeTab === 'news' ? newsData : pressData;
  const tabLabel = activeTab === 'news' ? '뉴스' : '보도자료';

  const handleMoreClick = () => {
    // 현재 보고 있는 탭 정보를 넘겨서 서브 페이지에서 끊김 없이 볼 수 있게 연동
    navigate('/news', { state: { tab: activeTab } });
  };

  return (
    <section className="news-section" aria-labelledby="news-heading">
      <div className="section-container">
        <h2 id="news-heading" className="news-section-title">소식</h2>

        {/* 데스크탑: 카드형 탭 헤더 */}
        <div className="news-tab-header" role="tablist" aria-label="소식 카테고리">
          <button
            role="tab"
            id="tab-news"
            aria-selected={activeTab === 'news'}
            aria-controls="news-panel"
            className={`news-tab-card ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <span className="tab-card-label">뉴스</span>
          </button>
          <button
            role="tab"
            id="tab-press"
            aria-selected={activeTab === 'press'}
            aria-controls="news-panel"
            className={`news-tab-card ${activeTab === 'press' ? 'active' : ''}`}
            onClick={() => setActiveTab('press')}
          >
            <span className="tab-card-label">보도자료</span>
          </button>
        </div>

        {/* 콘텐츠 패널 */}
        <div
          id="news-panel"
          role="tabpanel"
          tabIndex="0"
          aria-labelledby={activeTab === 'news' ? 'tab-news' : 'tab-press'}
          className="news-panel"
        >
          <div className="news-list">
            {currentList.map((item) => (
              <NewsItem key={item.id} {...item} />
            ))}
          </div>
          <div className="news-more-actions">
            <button 
              type="button" 
              className="more-btn" 
              aria-label={`${tabLabel} 더보기`}
              onClick={handleMoreClick} // 연동 완료
            >
              더보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
