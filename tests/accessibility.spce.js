import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

test.describe('수원시립미술관 메인 페이지 웹 접근성 검사', () => {

  test('메인 페이지의 WCAG A/AA 접근성 표준 검사 및 에러 리포트 추출', async ({ page }) => {
    // 1. Given: 로컬 개발 서버 메인 페이지(/site/)에 진입
    const targetUrl = 'http://localhost:5173/site/';
    await page.goto(targetUrl);

    // 메인 콘텐츠 영역이 온전히 로드될 때까지 대기
    await page.waitForSelector('#main-content', { state: 'attached', timeout: 5000 });

    // 2. When: Axe-core 접근성 자동화 엔진으로 페이지 스캔 수행
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice']) // WCAG 2.1 A, AA 및 Best Practice 준수 여부 검사
      .analyze();

    const violations = accessibilityScanResults.violations;

    // 3. Then: 위반 사항이 발견되었을 경우, 소스 수정 전에 리포트 파일(JSON)을 먼저 추출 후 실패 판정
    if (violations.length > 0) {
      const reportPath = path.resolve(process.cwd(), 'accessibility-violations.json');
      
      // JSON 포맷으로 들여쓰기를 적용해 예쁘게 저장
      fs.writeFileSync(reportPath, JSON.stringify(violations, null, 2), 'utf-8');
      
      console.log(`\n⚠️ [접근성 위반 항목 감지] 총 ${violations.length}개의 위반 사항이 발견되었습니다.`);
      console.log(`💾 에러 리포트 저장 완료: ${reportPath}\n`);
    }

    // 최종적으로 위반 사항이 0개인지 어설션 검증 (실패 시 여기서 테스트 실패 처리됨)
    expect(violations).toEqual([]);
  });

});
