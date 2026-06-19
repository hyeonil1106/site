import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationModal.css';
import imgDown from '../assets/down.png'

const ReservationModal = ({ isOpen, onClose, exhibitionTitle }) => {
  const navigate = useNavigate();
  // 캘린더 현재 날짜 상태
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(4);
  
  // 퀵 피커 (연월 통합 드롭다운 피커) 활성화 여부
  const [isQuickPickerOpen, setIsQuickPickerOpen] = useState(false);
  // 피커 내부 임시 선택값
  const [tempYear, setTempYear] = useState(2026);
  const [tempMonth, setTempMonth] = useState(4);

  // 최종 선택값 설정
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [personCount, setPersonCount] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const yearScrollRef = useRef(null);

  // 모달 활성화 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSuccess(false);
      setIsQuickPickerOpen(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 퀵 피커 열릴 때 스무스 오토 스크롤
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

  if (!isOpen) return null;

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

  const handleFinalBooking = () => {
    setIsSuccess(true);
  };

  return (
    <div className="res-modal-overlay" onClick={onClose}>
      <div 
        className={`res-modal-window ${isSuccess ? 'success-mode' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {!isSuccess ? (
          <>
            {/* 1. 모달 메인 헤더 (고정 타이틀) */}
            <header className="res-header">
              <h2 className="res-modal-main-title">{exhibitionTitle}</h2>
              <button 
                type="button" 
                className="btn-res-close-header" 
                onClick={onClose}
                aria-label="예약 팝업 닫기"
              >
              </button>
            </header>

            {/* 2. [위치 격상 완료] 위에서 아래로 슬라이드 다운되는 통합 퀵 피커 패널 */}
            <div className={`quick-picker-panel from-top ${isQuickPickerOpen ? 'open' : ''}`}>
              <div className="picker-header-inner">
              </div>

              <div className="picker-body-full">
                {/* 연도 좌우 선택기 */}
                <div className="picker-year-row">
                  <button 
                    type="button" 
                    className="btn-year-nav" 
                    onClick={() => setTempYear(y => y - 1)}
                    aria-label="이전 년도"
                  >
                    ❮
                  </button>
                  <span className="current-temp-year">{tempYear}년</span>
                  <button 
                    type="button" 
                    className="btn-year-nav" 
                    onClick={() => setTempYear(y => y + 1)}
                    aria-label="다음 년도"
                  >
                    ❯
                  </button>
                </div>

                {/* 월 그리드 (축소된 사이즈) */}
                <div className="month-grid-picker compact">
                  {availableMonths.map((mo) => (
                    <button
                      key={mo}
                      type="button"
                      className={`picker-month-btn compact ${tempMonth === mo ? 'active' : ''}`}
                      onClick={() => {
                        setTempMonth(mo);
                        setCurrentYear(tempYear);
                        setCurrentMonth(mo);
                        setSelectedDate(1);
                        setIsQuickPickerOpen(false);
                      }}
                    >
                      {mo}월
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. 스크롤 영역 및 하위 캘린더 그리드 */}
            <div className="res-scroll-content">
              {/* 년/월 선택 트리거 (캘린더 상단에 위치) */}
              <div className="calendar-control-bar" onClick={handleHeaderClick}>
                <div className="bank-header-trigger" title="연도/월 변경하기">
                  <h2 className="res-month-text clickable">{currentYear}년 {currentMonth}월</h2>
                  <img src={imgDown} className="down-chevron-icon" alt="down"/>
                </div>
              </div>

              <section className="calendar-section">
                <div className="weekday-grid">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="days-grid">
                  {calendarDays.map((item) => (
                    <div key={item.id} className="day-cell-wrapper">
                      {item.day !== null && (
                        <button
                          type="button"
                          className={`day-cell-btn ${selectedDate === item.day ? 'active' : ''}`}
                          onClick={() => setSelectedDate(item.day)}
                        >
                          {item.day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="people-counter-section">
                <h3 className="counter-title">관람 인원</h3>
                <div className="counter-control">
                  <button 
                    type="button" 
                    className="btn-counter-adjust" 
                    onClick={() => setPersonCount((p) => Math.max(p - 1, 1))}
                    disabled={personCount <= 1}
                  >
                    －
                  </button>
                  <span className="counter-display">{personCount}명</span>
                  <button 
                    type="button" 
                    className="btn-counter-adjust" 
                    onClick={() => setPersonCount((p) => Math.min(p + 1, 10))}
                    disabled={personCount >= 10}
                  >
                    ＋
                  </button>
                </div>
              </section>

              <section className="time-selection-section">
                <h3 className="time-title">시간선택</h3>
                <div className="time-grid">
                  {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`time-pill-btn ${selectedTime === time ? 'active' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* 푸터 바 */}
            <div className="res-footer">
              <div className="res-summary-bar">
                <span className="res-summary-text">
                  <strong>{currentMonth}월 {selectedDate}일</strong> • <strong>{selectedTime}</strong> • <strong>{personCount}명</strong>
                </span>
              </div>
              <button 
                type="button" 
                className="btn-booking-submit"
                onClick={handleFinalBooking}
              >
                관람예약
              </button>
            </div>
          </>
        ) : (
          <div className="success-message-container">
            <h2 className="success-headline">예약이 완료되었습니다!</h2>
            <p className="success-details">
              {exhibitionTitle}<br />
              <strong>{currentYear}년 {currentMonth}월 {selectedDate}일 ({selectedTime})</strong><br />
              <strong>총 {personCount}명</strong>
            </p>
            <button 
              type="button" 
              className="btn-modal-go-main" 
              onClick={() => {
                onClose();
                navigate('/');
              }}
            >
              메인 페이지로 넘어가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
