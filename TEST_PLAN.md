# 수원시립미술관 리디자인 프로젝트(Vibe) 메인 페이지 웹 접근성 테스트 계획서

본 계획서는 **Playwright**와 **Axe-core** 기반의 자동화 테스트 환경을 이용하여, 리디자인된 수원시립미술관 메인 페이지의 웹 접근성(Web Accessibility, A11y) 표준 준수 여부를 검증하기 위해 작성되었습니다.

---

## 1. 테스트 목적 및 범위
* **목적**: WCAG 2.1 (Web Content Accessibility Guidelines) Level AA 및 한국형 웹 콘텐츠 접근성 지침(KWCAG 2.2)의 기준을 충족하는지 자동화 및 반자동 테스트로 검증함.
* **범위**: 메인 페이지 (`/`) 및 메인 페이지에 포함된 핵심 컴포넌트 전체
  * `Header` (글로벌 네비게이션)
  * `SearchBar` (통합 검색창)
  * `NoticeBanner` (공지사항 롤링 배너)
  * `MainVisual` (메인 비주얼 슬라이드 및 간이 예약 진입점)
  * `ExhibitionSection` (전시 목록 및 예약 상세)
  * `NewsSection` (새 소식)
  * `DirectionsSection` (찾아오시는 길)
  * `Footer` (사이트 하단 주소 및 연락처, 카피라이트)
  * `ReservationModal` (동적 간이 예약 레이어 팝업)

---

## 2. 웹 접근성 자동화 검사 시나리오 (Given-When-Then)

### 시나리오 1: 메인 페이지 초기 진입 시 자동화 접근성 표준 스캔
* **Given**: 
  * 로컬 개발 서버가 정상 작동하고 있으며,
  * 사용자가 크롬(Chromium) 브라우저를 통해 메인 페이지(`/`)에 최초로 진입하여 
  * `Header`, `SearchBar`, `ExhibitionSection`, `NewsSection`, `Footer` 등 메인 콘텐츠 전체가 화면에 정상 렌더링되었을 때
* **When**: 
  * Playwright에 연결된 `@axe-core/playwright` 검증 모듈이 
  * 페이지의 DOM 구조와 CSS 속성을 분석하는 접근성 전체 자동화 검사(Axe Scan)를 실행했을 때
* **Then**: 
  * 다음 핵심 접근성 표준 위배 사항이 단 하나도 발견되지 않아야 한다:
    1. **대체 텍스트**: 모든 `<img>` 태그에 의미 있는 `alt` 속성이 포함되어 있으며, 장식용 이미지는 빈 값(`alt=""`)이 명시되어 있어야 한다.
    2. **텍스트 명도 대비**: 일반 텍스트는 배경색과의 명도 대비가 최소 **4.5:1 이상**이어야 하고, 큰 텍스트(18pt/24px 이상)는 최소 **3:1 이상**의 명도 대비를 유지해야 한다.
    3. **문서 구조**: 페이지 내 최상위 제목은 1개(`<h1>`)로 명확히 지정되어 있고, `header`, `main`, `footer`, `section` 등의 HTML5 랜드마크 태그가 적절하게 구조화되어 사용되어야 한다.
    4. **ID 고유성**: 페이지 내 모든 대화형 요소 및 마크업 요소들의 `id` 속성은 중복 없이 고유해야 한다.

---

### 시나리오 2: 키보드 탐색 접근성 및 초점 지시시각화(Focus Indicator) 검증
* **Given**: 
  * 마우스나 터치 패드를 사용하지 못하는 키보드 전용 사용자가 메인 페이지(`/`)에 진입하여 
  * 최초의 포커스가 브라우저 주소창 또는 최상단 영역에 위치하고 있을 때
* **When**: 
  * 사용자가 키보드의 `Tab` 키(순방향) 및 `Shift + Tab` 키(역방향)를 반복적으로 입력하며 
  * 페이지 내의 글로벌 네비게이션(GNB), 검색 창, 예약 버튼, 링크 요소들을 차례대로 순회할 때
* **Then**: 
  * 다음의 키보드 동작 조건들이 모두 충족되어야 한다:
    1. **포커스 도달 여부**: 마우스 클릭이 가능한 모든 버튼, 링크(`<a>`), 입력 필드(`<input>`) 등의 대화형 요소에 키보드 포커스가 정확히 도달해야 한다.
    2. **시각적 초점 표시**: 포커스가 위치한 요소는 브라우저 기본 포커스 아웃라인 혹은 커스텀 스타일링된 포커스 링(Focus Ring)이 **시각적으로 뚜렷하게 노출**되어, 사용자가 현재 어느 요소에 머물러 있는지 확실하게 식별할 수 있어야 한다.
    3. **이동 순서**: 키보드 초점은 화면 좌측 상단에서 우측 하단으로, 시각적인 콘텐츠 흐름과 일치하도록 논리적으로 이동해야 한다.

---

### 시나리오 3: 빠른 간이 예약 모달 활성화 시 포커스 트랩(Focus Trap) 검증
* **Given**: 
  * 메인 페이지의 `MainVisual` 또는 `ExhibitionSection` 컴포넌트 내에 배치된 
  * 예약하기 버튼에 키보드 초점(Focus)이 맞춰져 있을 때
* **When**: 
  * 사용자가 `Enter` 또는 `Space` 키를 눌러 `ReservationModal`(동적 예약 팝업 모달)을 성공적으로 화면에 노출시켰을 때
* **Then**: 
  * 다음의 모달 접근성 제어 요건이 엄격히 준수되어야 한다:
    1. **초점 강제 이동**: 모달 팝업이 활성화되는 즉시 키보드 초점은 모달 내부의 첫 번째 대화형 요소(예: 예약 정보 입력란 또는 닫기 버튼)로 즉각 이동해야 한다.
    2. **포커스 가두기 (Focus Trap)**: 모달 창이 열려 있는 동안 `Tab` 키 또는 `Shift + Tab` 키를 계속 눌러 이동하더라도, 초점이 모달 바깥의 메인 페이지 요소(Header, Footer 등)로 빠져나가지 못하고 **모달 내부의 대화형 요소들 사이에서만 순환**해야 한다.
    3. **Esc 키 조작**: 사용자가 키보드의 `Escape(ESC)` 키를 누르는 즉시 예약 모달 창이 부드럽게 닫혀야 한다.
    4. **초점 복귀**: 모달 창이 닫힌 후, 키보드 초점은 모달을 열기 위해 최초에 눌렀던 메인 페이지의 '예약하기' 버튼 위치로 정확하게 복귀해야 한다.

---

### 시나리오 4: 통합 검색창(`SearchBar`) 양식 컨트롤 레이블 검증
* **Given**: 
  * 스크린 리더(화면 낭독기)를 사용하는 시각장애인 사용자가 메인 페이지의 통합 검색창 영역에 접근해 
  * 검색어 입력을 시도하려 할 때
* **When**: 
  * 사용자가 키보드로 `SearchBar` 내의 텍스트 입력창(`<input type="text">`)에 포커스를 이동시켰을 때
* **Then**: 
  * 스크린 리더 사용자가 해당 입력창의 역할을 올바르게 안내받을 수 있도록 다음 조건 중 최소 하나가 만족되어 스크린 리더에서 "검색어 입력" 등의 정보를 명확히 음성 출력해야 한다:
    1. `<input>` 태그에 `id` 속성이 정의되어 있고, 이에 대응하는 `<label for="[input-id]">` 태그가 명시적으로 연결되어 있는 경우
    2. 또는, 별도의 레이블 태그가 제공되기 어려운 구조라면 `<input>` 태그 내에 `aria-label="통합 검색어 입력"`과 같은 암묵적 ARIA 레이블 속성이 올바르게 정의되어 있어야 한다.

---

## 3. 웹 접근성 자동화 테스트 구현 가이드 (Playwright 예시)

설치된 Playwright와 Axe를 활용하여 위의 Given-When-Then 테스트를 실행하는 간단한 테스트 파일(`.spec.js`) 구현 가이드라인입니다.

```javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('수원시립미술관 메인 페이지 웹 접근성 자동 검증', () => {

  // 시나리오 1 검증 코드 예시
  test('메인 페이지 초기 진입 시 자동화 접근성 표준(WCAG AA)을 만족해야 한다', async ({ page }) => {
    // 1. Given (준비) : 메인 페이지 접속
    await page.goto('/');

    // 2. When (실행) : Axe-core 엔진 분석 준비
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice']) // WCAG 2.1 A & AA 준수 검사
      .analyze();

    // 3. Then (기대 결과) : 위배 사항 개수가 0개여야 함
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // 시나리오 3 검증 코드 예시
  test('예약 모달이 열리면 포커스는 모달 내부로 가두어지고(Focus Trap), Esc 입력 시 복귀한다', async ({ page }) => {
    // 1. Given: 메인 페이지 접속 후 예약 버튼 찾기
    await page.goto('/');
    const reserveButton = page.locator('button:has-text("예약")').first();
    
    // 2. When: 예약 버튼 클릭하여 모달 열기
    await reserveButton.click();
    
    // 3. Then: 포커스가 모달 내에 위치하는지 확인 및 모달 바깥 접근 제한 검증
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();

    // 4. ESC 키 입력 시 닫힘 검증
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
    await expect(reserveButton).toBeFocused(); // 원래 초점으로 복귀
  });

});
```

---

## 4. 검사 결과 판정 기준
* **PASS**: Axe-core 스캔 결과 `violations` 리스트가 존재하지 않으며, 키보드 탐색 및 포커스 트랩 시나리오가 모두 정상 작동함.
* **FAIL**: 접근성 오류(`violations`)가 발생하거나, 키보드로의 특정 영역 탐색 불능, 혹은 모달창 탈출 시 포커스 유실 등의 현상이 발생할 경우 즉시 실패로 판정하여 코드 수정을 진행함.
