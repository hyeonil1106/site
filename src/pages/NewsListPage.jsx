import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NewsListPage.css';

// AI 생성 고화질 뉴스/보도자료 썸네일 임포트
import newsGalleryImg from '../assets/news_gallery.png';
import pressEcoImg from '../assets/press_eco.png';
import logoImg from '../assets/logo.png';

// 대규모 리얼 뉴스 데이터셋 (각 카테고리당 12~16개씩 총 60개 내외)
const ALL_NEWS_DATA = {
  news: [
    { id: 1, title: "현대미술의 새로운 물결, 기획전 개막", desc: "국내 최대 규모의 현대미술 전시회가 이번 달부터 본격적으로 개최됩니다.", date: "2024-06-10", image: newsGalleryImg },
    { id: 2, title: "고미술품의 숨겨진 이야기 대공개", desc: "전통 미술품을 재조명하는 특별 전시가 미술관에서 매주 열립니다.", date: "2024-05-25", image: newsGalleryImg },
    { id: 3, title: "어린이와 함께하는 특별 미술 체험전", desc: "어린이들이 직접 작가가 되어보는 인터랙티브 미술 교육 프로그램입니다.", date: "2024-06-15", image: newsGalleryImg },
    { id: 4, title: "미술관, 디지털 미디어 아트 확장 선언", desc: "미래형 첨단 아트를 수용하기 위한 대규모 디지털 리뉴얼 계획을 발표합니다.", date: "2024-06-05", image: newsGalleryImg },
    { id: 5, title: "신진 작가 지원 특별 공모 프로젝트", desc: "참신한 예술 세계를 가진 청년 신진 작가들을 발굴하고 지원하는 프로젝트입니다.", date: "2024-06-18", image: newsGalleryImg },
    { id: 6, title: "빛의 판타지, 야간 특별 개장 실시", desc: "여름밤의 낭만을 즐기는 야간 특별 관람 프로모션을 진행합니다.", date: "2024-07-01", image: newsGalleryImg },
    { id: 7, title: "예술이 살아 숨 쉬는 도심형 광장 조성", desc: "미술관 외부 공간을 복합 예술 커뮤니티 파크로 새롭게 리모델링합니다.", date: "2024-06-12", image: newsGalleryImg },
    { id: 8, title: "세계의 박물관 교류 협정 최종 체결", desc: "해외 명문 미술관과의 상호 작품 대여 협약을 맺어 다양한 컬렉션을 제공합니다.", date: "2024-05-28", image: newsGalleryImg },
    { id: 9, title: "미술 치유, 지친 현대인을 위한 정서 케어", desc: "감성적인 그림들을 관람하며 마음의 피로를 푸는 웰니스 도슨트 프로그램입니다.", date: "2024-06-22", image: newsGalleryImg },
    { id: 10, title: "조각 미술의 거장, 한국 특별 방문", desc: "글로벌 조각 아티스트가 내한하여 관객들과 소통하는 오픈 세미나를 가집니다.", date: "2024-06-14", image: newsGalleryImg },
    { id: 11, title: "미학의 세계로 초대하는 시민 미술 아카데미", desc: "인문학적 소양과 심미안을 넓혀주는 프리미엄 시민 강연을 개최합니다.", date: "2024-05-30", image: newsGalleryImg },
    { id: 12, title: "컬렉션의 가치, 소장품 도록 전격 발간", desc: "소장 중인 예술적 걸작들을 집약한 한정판 고급 도록이 시판됩니다.", date: "2024-06-07", image: newsGalleryImg }
  ],
  press: [
    { id: 101, title: "[한국뉴스] 친환경 에너지 프로젝트, 지구를 지키다", desc: "새로운 태양광 발전소가 본격 가동을 시작하며 대대적인 탄소 저감을 실천합니다.", date: "2024-06-12", image: pressEcoImg },
    { id: 102, title: "[경제일보] 교육 혁신, 디지털 AI 학습 플랫폼 개막", desc: "인터랙티브 에듀테크 플랫폼이 학교 현장의 수업 질을 대폭 끌어올립니다.", date: "2024-06-16", image: pressEcoImg },
    { id: 103, title: "[중앙데일] 혁신적인 AI 기술, 스마트 산업 혁명 선도", desc: "생성형 AI 도입을 통해 생산성을 극대화하고 혁신 산업 패러다임을 개척합니다.", date: "2024-06-10", image: pressEcoImg },
    { id: 104, title: "[대한비전] 스마트 시티 청사진 발표, 미래 도시 실현", desc: "첨단 디지털 트윈 공학이 적용된 초연결 스마트 인프라가 가동됩니다.", date: "2024-06-14", image: pressEcoImg },
    { id: 105, title: "[세계저널] 신개념 업사이클링, 제로 웨이스트 모먼트", desc: "폐자원을 아름다운 예술품으로 승화시킨 지속가능한 예술 캠페인이 화제입니다.", date: "2024-06-02", image: pressEcoImg },
    { id: 106, title: "[시사위클] 문화가 곧 경쟁력, 로컬 아트 밸리 확장세", desc: "지자체와 로컬 아티스트의 협업이 지역 브랜드 가치를 드높이고 있습니다.", date: "2024-06-09", image: pressEcoImg },
    { id: 107, title: "[글로벌타] 메타버스 속 미술 체험, 메타 갤러리 열풍", desc: "비대면 가상 현실 기기를 이용한 초월적 전시 체험 시장이 폭발 성장합니다.", date: "2024-06-25", image: pressEcoImg },
    { id: 108, title: "[수원매일] 수원시립미술관, 방문 관람객 작년比 35% 증가", desc: "다채로운 특별전과 획기적인 관람 편의성 개편이 관객몰이에 성공했습니다.", date: "2024-05-20", image: pressEcoImg },
    { id: 109, title: "[아트뉴스] 신비의 조각 '침묵의 숲' 전격 국내 입항", desc: "글로벌 경매에서 찬사를 받았던 세계적 가치의 조각상이 상설 전시됩니다.", date: "2024-06-01", image: pressEcoImg },
    { id: 110, title: "[데일리안] 문화 사각지대 없앤다 '찾아가는 갤러리 버스'", desc: "원거리 거주 주민들을 위해 특수 제작된 이동형 아트 뮤지엄이 달립니다.", date: "2024-05-12", image: pressEcoImg },
    { id: 111, title: "[경향투데] 미술품 공유 렌탈 제도 확산, 예술을 소유하다", desc: "일반 가정도 손쉽게 대가들의 진품 원화를 걸어둘 수 있는 렌탈 서비스 확대.", date: "2024-05-27", image: pressEcoImg },
    { id: 112, title: "[투데이포] 아이와 함께 힐링, 키즈 아트 클래스 연일 매진", desc: "전문 에듀케이터와 함께 호흡하며 배우는 오감 미술 체험이 학부모 인기를 끕니다.", date: "2024-06-03", image: pressEcoImg }
  ],
  updates: [
    { id: 201, title: "새로운 현대미술 전시회가 이번 주 금요일부터 시작됩니다.", date: "2024-06-12" },
    { id: 202, title: "미술관 입장료 할인 제휴 이벤트가 다음 달까지 연장되었습니다.", date: "2024-06-10" },
    { id: 203, title: "유명 작가의 미공개 회화 컬렉션 50여 점이 특별 전시 중입니다.", date: "2024-06-08" },
    { id: 204, title: "어린이 대상 미술교육 프로그램이 다가오는 토요일에 열립니다.", date: "2024-06-05" },
    { id: 205, title: "야간 연장 개방 이벤트를 매주 금요일 저녁 9시까지 실시합니다.", date: "2024-06-01" },
    { id: 206, title: "미술관 카페테리아 가을 시즌 스페셜 메뉴 런칭 안내", date: "2024-05-28" },
    { id: 207, title: "뮤지엄 샵 아트 굿즈 재입고 안내: '별 헤는 밤' 머그 등", date: "2024-05-22" },
    { id: 208, title: "모바일 오디오 도슨트 가이드 앱 업데이트 배포 완료", date: "2024-05-15" },
    { id: 209, title: "2024년도 3분기 자원봉사 도슨트 선발 면접 합격자 통보", date: "2024-05-10" },
    { id: 210, title: "회원 가입 갱신 이벤트 당첨자 경품 배송 완료 확인 요청", date: "2024-05-05" },
    { id: 211, title: "로비 미니 라이브 음악회 개최 안내: 첼로 콰르텟 앙상블", date: "2024-04-28" },
    { id: 212, title: "미술관 숲 산책로 데크 전면 보수 공사 완료 및 정식 개방", date: "2024-04-20" }
  ],
  notices: [
    { id: 301, title: "이번 주말 미술관 휴관 공지: 내부 냉방 시스템 노후 장비 교체", date: "2024-06-15" },
    { id: 302, title: "작품 보호를 위한 전시실 내부 플래시 촬영 금지 및 관람 예절 안내", date: "2024-06-12" },
    { id: 303, title: "미술관 특별 강연 개시 일정 정정 안내: 장소 변경 확인 바람", date: "2024-06-07" },
    { id: 304, title: "주차장 공사로 인한 우회 및 임시 공용 주차 구역 배치 공지", date: "2024-05-30" },
    { id: 305, title: "전시실 혼잡도 조절을 위한 시간대별 사전 예약 인원 제한 실시", date: "2024-05-25" },
    { id: 306, title: "수원시립미술관 관람 조례 개정에 따른 단체 할인 기준 변동 고지", date: "2024-05-18" },
    { id: 307, title: "화재 예방을 위한 소방 시설 종합 정밀 점검 실시에 관한 안내", date: "2024-05-08" },
    { id: 308, title: "미술관 전산망 시스템 고도화 점검에 따른 홈페이지 일시 중단 공지", date: "2024-05-01" },
    { id: 309, title: "코로나19 및 유행성 호흡기 질환 대응 개인 위생 권고 수칙 전파", date: "2024-04-25" },
    { id: 310, title: "전시 해설(도슨트) 정기 투어 시간 편성표 개정 확정 공시", date: "2024-04-15" },
    { id: 311, title: "제1전시실 부분 통제 및 동선 변경에 따른 이용객 협조 요청", date: "2024-04-08" },
    { id: 312, title: "미술관 기증품 선정 심의위원회 결과 공고 및 신규 소장 작품 리스트", date: "2024-03-28" }
  ]
};

const NewsListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 메인 페이지에서 보던 탭 정보를 인계 받음 (없으면 기본 'news')
  const initialTab = location.state?.tab || 'news';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // 화면 가로폭 동적 귀속

  // 1. 실시간 디바이스 가로폭 모니터링을 통한 최적의 페이징 배분
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(8);  // 데스크톱: 8개 (2열 구성)
      } else if (width >= 768) {
        setItemsPerPage(6);  // 태블릿: 6개
      } else {
        setItemsPerPage(4);  // 모바일: 4개
      }
    };

    handleResize(); // 초기 연산
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 탭 변동 및 스케일 재조정 시 첫 페이지 원점 복귀
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, itemsPerPage]);

  const currentList = ALL_NEWS_DATA[activeTab] || [];

  // 2. 유기적 동적 페이지네이션 계산
  const totalPages = Math.ceil(currentList.length / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const visibleList = currentList.slice(indexOfFirst, indexOfLast);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // 이미지 포함형 가로 카드 뷰 (뉴스, 보도자료)
  const renderMediaCard = (item) => (
    <article key={item.id} className="news-media-row-card">
      <div className="media-thumb-box">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="media-detail-box">
        <h3 className="media-title">{item.title}</h3>
        <p className="media-desc">{item.desc}</p>
        <time className="media-date">{item.date}</time>
      </div>
    </article>
  );

  // 담백한 텍스트 배너 뷰 (새소식, 공지사항)
  const renderTextRow = (item) => (
    <article key={item.id} className="news-text-banner-row">
      <div className="banner-txt-wrap">
        <span className="txt-badge">{activeTab === 'updates' ? '새소식' : '공지'}</span>
        <h3 className="banner-title">{item.title}</h3>
      </div>
      <div className="banner-meta-wrap">
        <time className="banner-date">{item.date}</time>
        <span className="banner-arrow">〉</span>
      </div>
    </article>
  );

  return (
    <div className="sub-page-wrapper news-list-page">
      {/* 서브 로고 헤더 */}
      <header className="sub-nav-header">
        <div className="header-inner">
          <button type="button" className="btn-sub-back" onClick={() => navigate('/')} aria-label="메인 페이지로">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h1 className="sub-header-logo" onClick={() => navigate('/')}>
            <img src={logoImg} alt="" className="sub-logo-img" />
            수원시립미술관
          </h1>
          <div className="header-space"></div>
        </div>
      </header>

      {/* 피그마 명세 4대 통합 탭바 */}
      <nav className="sub-tab-navigation">
        <ul className="tab-list">
          <li className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>뉴스</li>
          <li className={activeTab === 'press' ? 'active' : ''} onClick={() => setActiveTab('press')}>보도자료</li>
          <li className={activeTab === 'updates' ? 'active' : ''} onClick={() => setActiveTab('updates')}>새소식</li>
          <li className={activeTab === 'notices' ? 'active' : ''} onClick={() => setActiveTab('notices')}>공지사항</li>
        </ul>
      </nav>

      {/* 컨텐츠 유닛 */}
      <main className="news-content-area">
        <div className={`news-rendering-frame type-${activeTab}`}>
          {visibleList.length > 0 ? (
            <div className={(activeTab === 'news' || activeTab === 'press') ? 'news-media-grid' : 'news-text-stack'}>
              {visibleList.map(item => (
                (activeTab === 'news' || activeTab === 'press') 
                  ? renderMediaCard(item) 
                  : renderTextRow(item)
              ))}
            </div>
          ) : (
            <div className="empty-news-info">게시된 정보물이 없습니다.</div>
          )}
        </div>

        {/* 3. 동적 페이지네이션 버튼 리액터 */}
        {totalPages > 0 && currentList.length > 0 && (
          <div className="pagination-wrapper">
            <button type="button" className="btn-page-arrow prev" onClick={handlePrevPage} disabled={currentPage === 1} aria-label="이전 페이지">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="page-numbers-row">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  type="button"
                  className={`btn-page-num ${currentPage === num ? 'active' : ''}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <button type="button" className="btn-page-arrow next" onClick={handleNextPage} disabled={currentPage === totalPages} aria-label="다음 페이지">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsListPage;
