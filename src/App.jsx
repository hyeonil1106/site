import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// 기존 컴포넌트
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainVisual from './components/MainVisual';
import NoticeBanner from './components/NoticeBanner';
import ExhibitionSection from './components/ExhibitionSection';
import NewsSection from './components/NewsSection';
import DirectionsSection from './components/DirectionsSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ReservationModal from './components/ReservationModal';

// ★ 신규 서브페이지 컴포넌트 임포트
import ExhibitionListPage from './pages/ExhibitionListPage';
import NewsListPage from './pages/NewsListPage'; // 신규 임포트 완료

// [도우미] 페이지 이동 시 최상단 스크롤 보증 모듈
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isResOpen, setIsResOpen] = useState(false);
  const [resTitle, setResTitle] = useState('');

  const openReservation = (title = '시간의 정원') => {
    setResTitle(title);
    setIsResOpen(true);
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* 페이지 라우팅 간 스크롤 정규화 보장 */}
      <ScrollToTop />
      
      <div className="app-wrapper">
        <Routes>
          {/* 1. 메인 페이지 경로 */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <main id="main-content">
                  <SearchBar />
                  <NoticeBanner />
                  <MainVisual onOpenReservation={() => openReservation('시간의 정원')} />
                  <ExhibitionSection onOpenReservation={openReservation} />
                  <NewsSection />
                  <DirectionsSection />
                </main>
                <Footer />
                
                {/* 기존의 빠른 간이 팝업 예약 모달 */}
                <ReservationModal 
                  isOpen={isResOpen} 
                  onClose={() => setIsResOpen(false)} 
                  exhibitionTitle={resTitle}
                />
              </>
            }
          />

          {/* 2. 로그인 단일 화면 경로 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 3. ★ [NEW] 전체 전시 리스트 상세화면 경로 */}
          <Route path="/exhibitions" element={<ExhibitionListPage />} />



          {/* 5. ★ [NEW] 전체 뉴스 및 보도자료 서브 페이지 경로 */}
          <Route path="/news" element={<NewsListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
