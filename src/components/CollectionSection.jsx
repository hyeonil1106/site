import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CollectionSection.css';

// 에셋 이미지 임포트 (기존 에셋을 명화 소장품 컨셉에 매칭)
import natureArtImg from '../assets/nature_art.png';        // 화녕전작약
import sunsetSilhouetteImg from '../assets/sunset_silhouette.png'; // 자화상
import digitalArtImg from '../assets/digital_art.png';        // 백남준 가족계획
import mindLandscapeImg from '../assets/mind_landscape.png';  // 김환기 산월
import autumnDreamImg from '../assets/autumn_dream.png';      // 유영국 산
import geometricSculptureImg from '../assets/geometric_sculpture.png'; // 이우환 선으로부터

// 고유한 미술관 대표 소장품 데이터 베이스
export const COLLECTION_DATA = [
  {
    id: 401,
    title: "화녕전작약 (華寧殿芍藥)",
    artist: "나혜석",
    info: "1930년대 | 캔버스에 유채 | 33.4 × 24.2 cm",
    desc: "한국 최초의 여성 서양화가 나혜석이 고향 수원의 화령전(화녕전) 앞뜰에 핀 작약꽃을 대담한 필치와 강렬한 색채로 그려낸 역사적인 대표 소장품입니다.",
    image: natureArtImg
  },
  {
    id: 402,
    title: "자화상 (自畵像)",
    artist: "나혜석",
    info: "1928년경 | 캔버스에 유채 | 44 × 34 cm",
    desc: "서구 복식과 서구 화풍을 받아들인 지식인 여성이자 예술가로서의 자아를 성찰적이고 깊은 색감의 음영 대비로 담아낸 초상화입니다.",
    image: sunsetSilhouetteImg
  },
  {
    id: 403,
    title: "가족계획 (Family Plan)",
    artist: "백남준",
    info: "1984년 | 미디어 조각 | 가변크기",
    desc: "수원시립미술관이 자랑하는 현대 미술의 거장 백남준의 대표 미디어 조각으로, 텔레비전 모니터와 빈티지 로봇 골격을 결합하여 가족의 미래적 소통을 은유합니다.",
    image: digitalArtImg
  },
  {
    id: 404,
    title: "산월 (Mountain and Moon)",
    artist: "김환기",
    info: "1950년대 | 캔버스에 유채 | 65 × 53 cm",
    desc: "한국의 자연미를 서정적인 푸른 빛의 색조와 조형적인 구도로 단순화하여 한국적 추상미술의 기틀을 마련한 김환기 화백의 명작입니다.",
    image: mindLandscapeImg
  },
  {
    id: 405,
    title: "산 (Mountain)",
    artist: "유영국",
    info: "1960년대 | 캔버스에 유채 | 72.7 × 60.6 cm",
    desc: "산이라는 자연의 원초적 모티브를 붉고 노란 기하학적 색면 대비로 분할하여 추상적 웅장함과 강렬한 서정성을 환기시키는 대작입니다.",
    image: autumnDreamImg
  },
  {
    id: 406,
    title: "선으로부터 (From Line)",
    artist: "이우환",
    info: "1970년대 | 캔버스에 안료 | 90.9 × 72.7 cm",
    desc: "동양적 우주론을 바탕으로 붓끝의 호흡에 따라 선이 시작되어 점차 사라지는 반복을 통해 시간의 흐름과 공간의 무한함을 담아낸 단색화 대표작입니다.",
    image: geometricSculptureImg
  }
];

const CollectionSection = () => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    // 전시목록 페이지로 이동하며 탭을 'collection'으로 세팅
    navigate('/exhibitions?tab=collection');
  };

  return (
    <section className="collection-section" aria-labelledby="collection-section-title">
      <div className="section-container">
        <h2 id="collection-section-title" className="collection-section-title">
          미술관 대표 소장품
        </h2>
        <p className="collection-section-desc">
          수원시립미술관이 소장한 역사적이고 예술적 가치가 높은 국내외 거장들의 명작 컬렉션을 소개합니다.
        </p>

        {/* 반응형 1/2/3열 그리드 적용 */}
        <div className="collection-grid">
          {COLLECTION_DATA.map((item) => (
            <article key={item.id} className="collection-card">
              <div className="collection-card-image-box">
                <img src={item.image} alt={`${item.artist}의 ${item.title}`} loading="lazy" />
                <div className="collection-card-badge">{item.artist}</div>
              </div>
              <div className="collection-card-content">
                <h3 className="collection-card-title">{item.title}</h3>
                <p className="collection-card-info">{item.info}</p>
                <p className="collection-card-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="collection-more-actions">
          <button 
            type="button" 
            className="collection-more-btn"
            onClick={handleMoreClick}
            aria-label="소장품 목록 전체보기 페이지로 이동"
          >
            소장품 전체보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
