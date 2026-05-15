import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

import logoImg from '../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [saveId, setSaveId] = useState(false);

  const handleBackClick = (e) => {
    e.preventDefault();
    // 이전 페이지 정보가 있을 경우 뒤로 가고, 아니면 홈으로 이동
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    // 로그인 시뮬레이션
    alert('성공적으로 로그인되었습니다.');
    navigate('/');
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* 상단 헤더 영역 */}
        <div className="login-header">
          <button 
            type="button" 
            className="btn-back" 
            onClick={handleBackClick} 
            aria-label="이전 페이지로 이동"
          >
            <span className="arrow-icon" aria-hidden="true">‹</span>
          </button>
          <div className="login-logo">
            <Link to="/">
              <img src={logoImg} alt="" className="login-logo-img" />
              <span className="logo-text">수원시립미술관</span>
            </Link>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="login-content">
          <h2 className="login-title">로그인</h2>
          <p className="login-description">
            수원시립미술관 홈페이지를 방문해주셔서 감사합니다.<br />
            로그인하시면 홈페이지를 보다 편리하게 이용하실 수 있습니다.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            {/* 입력 폼 박스 (그룹화 처리) */}
            <div className="input-group">
              <div className="input-field-wrapper floating">
                <input
                  type="text"
                  id="userId"
                  className="login-input"
                  placeholder=" "
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
                <label htmlFor="userId" className="floating-label">아이디(이메일주소)를 입력해주세요.</label>
              </div>
              <div className="input-field-wrapper floating">
                <input
                  type="password"
                  id="password"
                  className="login-input"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password" className="floating-label">비밀번호를 입력해주세요.</label>
              </div>
            </div>

            {/* 부가 기능 영역 */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={saveId}
                  onChange={(e) => setSaveId(e.target.checked)}
                  className="custom-checkbox"
                />
                <span className="checkbox-text">아이디(이메일) 저장</span>
              </label>
            </div>

            {/* 로그인 버튼 */}
            <button type="submit" className="btn-submit-login">
              로그인
            </button>
          </form>

          {/* 하단 네비게이션 링크 */}
          <div className="login-footer-links">
            <a href="#find-id" className="footer-link">아이디(이메일)찾기</a>
            <span className="divider" aria-hidden="true">|</span>
            <a href="#find-pwd" className="footer-link">비밀번호찾기</a>
            <span className="divider" aria-hidden="true">|</span>
            <a href="#signup" className="footer-link signup-link">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
