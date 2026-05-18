import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 테스트 파일들이 위치한 디렉터리 지정
  testDir: './tests',
  
  // 사용자가 요청한 *.spce.js 확장자 패턴을 테스트 매칭 규칙에 강제 추가
  testMatch: [
    '**/*.spec.js',
    '**/*.spce.js'
  ],

  // 테스트 실행 설정
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1, // 로컬 환경에서 안정적인 검사를 위해 싱글 워커 사용
  reporter: 'list', // 터미널에 실시간 결과를 출력하도록 리포터 설정

  use: {
    // 로컬 서버의 베이스 URL 설정
    baseURL: 'http://localhost:5173/site/',
    trace: 'on-first-retry',
  },

  /* 브라우저 프로젝트 설정 (가장 표준적인 크롬 브라우저 위주로 검사) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
