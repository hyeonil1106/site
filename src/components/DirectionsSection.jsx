import React, { useState, useEffect } from 'react';
import './DirectionsSection.css';

const DirectionsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (type) => {
    setModalContent(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  return (
    <>
    <section className="directions-section" aria-labelledby="directions-heading">
      <div className="section-container">
        <h2 id="directions-heading" className="section-title text-center">찾아오시는 길</h2>
        
        <div className="directions-grid">
          <div className="direction-card">
            <div className="direction-icon" aria-hidden="true">📍</div>
            <h3 className="direction-title">주소</h3>
            <p className="direction-desc">
              경기도 수원시 팔달구 정조로 833 (신풍동)<br/>
              수원시립미술관
            </p>
            <button type="button" className="action-btn secondary direction-btn" aria-label="네이버 지도로 주소 보기" onClick={() => openModal('map')}>지도 보기</button>
          </div>
          
          <div className="direction-card">
            <div className="direction-icon" aria-hidden="true">🚌</div>
            <h3 className="direction-title">교통편</h3>
            <p className="direction-desc">
              <strong>버스:</strong> 팔달구청, 화성행궁, 수원시립미술관 하차<br/>
              <strong>지하철:</strong> 1호선 수원역 하차 후 버스 환승
            </p>
            <button type="button" className="action-btn secondary direction-btn" aria-label="교통편 상세 안내 보기" onClick={() => openModal('guide')}>상세 안내</button>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`} onClick={closeModal} role="dialog" aria-modal="true">
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{modalContent === 'map' ? '지도 보기' : '상세 안내'}</h3>
            <button type="button" className="btn-close" onClick={closeModal} aria-label="팝업 닫기">✕</button>
          </div>
          <div className="modal-body">
            {modalContent === 'map' && (
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.5249013068187!2d127.01323757642066!3d37.28269174035247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b433466d0e6c3%3A0x8d8b6679f1156293!2z7IiY7JuQ7Iuc66a966-47Iig6rSA!5e0!3m2!1sko!2skr!4v1778650520019!5m2!1sko!2skr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
            )}
            {modalContent === 'guide' && (
              <div className="guide-container">
                <div className="guide-item">
                  <div className="guide-icon">🚌</div>
                  <div className="guide-text">
                    <strong>버스 이용 시</strong>
                    <p>팔달구청, 화성행궁, 수원시립미술관 정류장 하차</p>
                    <p>일반: 11, 13, 16, 16-1, 16-2, 26, 32-4</p>
                  </div>
                </div>
                <div className="guide-item">
                  <div className="guide-icon">🚇</div>
                  <div className="guide-text">
                    <strong>지하철 이용 시</strong>
                    <p>1호선 / 수인분당선 수원역 하차 후</p>
                    <p>9번 출구 앞 정류장에서 버스 환승</p>
                  </div>
                </div>
                <div className="guide-item">
                  <div className="guide-icon">🚗</div>
                  <div className="guide-text">
                    <strong>자가용 이용 시 (주차 안내)</strong>
                    <p>미술관 지하 1층, 지하 2층 주차장 이용</p>
                    <p>최초 30분 무료, 이후 10분당 400원</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default DirectionsSection;
