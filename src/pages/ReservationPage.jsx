import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ReservationPage.css';

import logoImg from '../assets/logo.png';

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 전달받은 전시명 (기본값은 '별 헤는 밤')
  const exhibitionTitle = location.state?.exhibitionTitle || '별 헤는 밤';

  // 캘린더 및 피커 상태 로직 (ReservationModal의 하이엔드 엔진 100% 재활용)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(4);
  const [isQuickPickerOpen, setIsQuickPickerOpen] = useState(false);
  const [tempYear, setTempYear] = useState(2026);
  const [tempMonth, setTempMonth] = useState(4);

  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [personCount, setPersonCount] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const yearScrollRef = useRef(null);

  // 최상단 스크롤 포커스
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 피커 개방 시 부드러운 오토 스크롤
  useEffect(() => {
    if (isQuickPickerOpen && yearScrollRef.current) {
      setTimeout(() => {
        const activeBtn = yearScrollRef.current.querySelector('.picker-year-btn.active');
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [isQuickPickerOpen]);

  // 캘린더 동적 계산식
  const getCalendarDays = (year, month) => {
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    const totalDays = new Date(year, month, 0).getDate();
    const daysArray = [];
    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push({ day: null, id: `blank-${i}` });
    }
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push({ day: i, id: `day-${i}` });
    }
    return daysArray;
  };

  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const availableYears = Array.from({ length: 9 }, (_, i) => 2022 + i);
  const availableMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleHeaderClick = () => {
    setTempYear(currentYear);
    setTempMonth(currentMonth);
    setIsQuickPickerOpen(true);
  };

  const handleApplyQuickPicker = () => {
    setCurrentYear(tempYear);
    setCurrentMonth(tempMonth);
    setSelectedDate(1);
    setIsQuickPickerOpen(false);
  };

  const handleFinalSubmit = () => {
    setIsSuccess(true);
  };

  return (
    <div className="sub-page-wrapper reserve-page">
      {/* 서브 네비 바 */}
      <header className="sub-nav-header">
        <div className="header-inner">
          <button type="button" className="btn-sub-back" onClick={() => navigate(-1)} aria-label="이전 페이지로 돌아가기">
            〈
          </button>
          <h1 className="sub-header-logo" onClick={() => navigate('/')}>
            <img src={logoImg} alt="" className="sub-logo-img" />
            수원시립미술관
          </h1>
          <div className="header-space"></div>
        </div>
      </header>

      <main className="reserve-content-container">
        <div className="page-title-area">
          <h2 className="page-main-title">예약</h2>
        </div>

        {/* 피그마 고증 세로 플로팅 스마트 카드 */}
        <div className={`booking-smart-card ${isSuccess ? 'success-active' : ''}`}>
          {!isSuccess ? (
            <>
              {/* A. 캘린더 연월 제어바 (트리거형) */}
              <div className="card-calendar-trigger-row" onClick={handleHeaderClick}>
                <span className="trigger-label">날짜선택</span>
                <div className="trigger-anchor">
                  <span className="current-text">{currentYear}년 {currentMonth}월</span>
                  <span className="arrow-icon">▼</span>
                </div>
              </div>

              {/* B. 초정밀 탑-다운 퀵 피커 (부모 카드에 바인딩) */}
              <div className={`card-dropdown-picker ${isQuickPickerOpen ? 'active' : ''}`}>
                <div className="picker-header-mini">
                  <h4>연월 기간 선택</h4>
                  <button type="button" className="btn-close-mini" onClick={() => setIsQuickPickerOpen(false)}>✕</button>
                </div>
                <div className="picker-content-body">
                  <div className="column-year" ref={yearScrollRef}>
                    <div className="column-head">연도</div>
                    <div className="scroll-area">
                      {availableYears.map(yr => (
                        <button 
                          key={yr} 
                          className={`year-item-btn ${tempYear === yr ? 'active' : ''}`}
                          onClick={() => setTempYear(yr)}
                        >
                          {yr}년
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="column-month">
                    <div className="column-head">월</div>
                    <div className="grid-area">
                      {availableMonths.map(mo => (
                        <button 
                          key={mo} 
                          className={`month-item-btn ${tempMonth === mo ? 'active' : ''}`}
                          onClick={() => setTempMonth(mo)}
                        >
                          {mo}월
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="picker-footer-row">
                  <button type="button" className="btn-pick-cancel" onClick={() => setIsQuickPickerOpen(false)}>취소</button>
                  <button type="button" className="btn-pick-confirm" onClick={handleApplyQuickPicker}>선택 완료</button>
                </div>
              </div>

              {/* C. 실물 캘린더 판넬 */}
              <div className="card-calendar-section">
                <div className="calendar-month-banner">{currentMonth}월</div>
                <div className="calendar-labels">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="calendar-grid-days">
                  {calendarDays.map((cell) => (
                    <div key={cell.id} className="day-cell-wrap">
                      {cell.day !== null && (
                        <button 
                          type="button"
                          className={`day-number-btn ${selectedDate === cell.day ? 'active' : ''}`}
                          onClick={() => setSelectedDate(cell.day)}
                        >
                          {cell.day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* D. 관람 인원 섹션 */}
              <div className="card-people-section">
                <span className="section-label">관람 인원</span>
                <div className="counter-panel">
                  <button 
                    type="button" 
                    className="btn-adj" 
                    onClick={() => setPersonCount(p => Math.max(p - 1, 1))}
                    disabled={personCount <= 1}
                  >
                    －
                  </button>
                  <span className="count-num">{personCount}명</span>
                  <button 
                    type="button" 
                    className="btn-adj" 
                    onClick={() => setPersonCount(p => Math.min(p + 1, 10))}
                    disabled={personCount >= 10}
                  >
                    ＋
                  </button>
                </div>
              </div>

              {/* E. 피그마 다크 테마 시간 선택 */}
              <div className="card-time-section">
                <h4 className="time-title">시간선택</h4>
                <div className="time-grid-wrapper">
                  {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                    <button
                      key={time}
                      type="button"
                      className={`time-chip ${selectedTime === time ? 'active' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* F. 하단 고정형 서머리 + 제출 버튼 */}
              <div className="card-footer-cta">
                <div className="cta-summary-row">
                  <span className="summary-badge">{exhibitionTitle}</span>
                  <span className="summary-info">
                    {currentMonth}월 {selectedDate}일 • {selectedTime} • {personCount}명
                  </span>
                </div>
                <button type="button" className="btn-submit-booking" onClick={handleFinalSubmit}>
                  관람예약
                </button>
              </div>
            </>
          ) : (
            <div className="card-success-view">
              <div className="icon-party">🎉</div>
              <h3>관람 예약 성공!</h3>
              <div className="success-info-card">
                <p className="title-txt">[{exhibitionTitle}]</p>
                <p className="dt-txt">{currentYear}년 {currentMonth}월 {selectedDate}일</p>
                <p className="tm-txt">{selectedTime} 입장 ({personCount}명)</p>
              </div>
              <button 
                type="button" 
                className="btn-go-main" 
                onClick={() => navigate('/')}
              >
                메인 화면으로 나가기
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReservationPage;
