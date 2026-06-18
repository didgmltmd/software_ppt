export interface SlideData {
  type: 'blue' | 'white' | 'light' | 'dark'
  className?: string
  html: string
}

export const slidesData: SlideData[] = [
  // 0: 인트로
  {
    type: 'dark',
    className: 'section-header',
    html: `
      <div class="intro-title" style="background:linear-gradient(135deg, #fbbf24, #f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">Honey Barrel</div>
      <div class="intro-tagline" style="color:rgba(255,255,255,0.8);">학과 프로젝트 제출 · AI 분석 · 전시 자동화 플랫폼</div>
      <div class="team-list" style="color:rgba(255,255,255,0.7);">
        연암공과대학교 스마트소프트웨어학과<br>
        양희승(팀장) · 황원경 · 최국진 · 송수하 · 노수정<br>
        2025.03 ~ 2025.06
      </div>
    `
  },
  // 1: 파트1-1
  {
    type: 'blue',
    className: 'section-header',
    html: `
      <div class="section-number">01</div>
      <div class="slide-title">프로젝트 소개 + 시스템 아키텍처</div>
      <div class="section-presenter">발표자: 양희승 (팀장)</div>
      <div class="slide-content" style="margin-top:24px; text-align:center;">
        <ul style="display:inline-block; text-align:left;">
          <li>이메일/USB 제출 — 누락, 버전 혼동</li>
          <li>수동 코드 검토 — 시간 부족, 일관성 없음</li>
          <li>포트폴리오 공유 채널 부재</li>
        </ul>
      </div>
    `
  },
  // 2: 파트1-2
  {
    type: 'white',
    html: `
      <div class="slide-title">핵심 기능 요약</div>
      <div class="slide-subtitle">하나의 플랫폼에서 제출부터 전시까지</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:8px;">
        <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe); border-radius:14px; padding:20px; border:1px solid #bfdbfe;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <div style="width:40px;height:40px;border-radius:10px;background:#1071e5;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">👨‍💼</div>
            <strong style="color:#1e40af; font-size:1.1rem;">관리자</strong>
          </div>
          <ul style="list-style:none;padding:0;font-size:0.95rem;color:#334155;line-height:2;">
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>제출 폼 설계 (다이나믹 필드)</li>
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>학생/화이트리스트 관리</li>
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>AI 분석 결과 + 소스코드 탐색</li>
          </ul>
        </div>
        <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe); border-radius:14px; padding:20px; border:1px solid #c4b5fd;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <div style="width:40px;height:40px;border-radius:10px;background:#6366f1;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">👨‍🎓</div>
            <strong style="color:#5b21b6; font-size:1.1rem;">학생</strong>
          </div>
          <ul style="list-style:none;padding:0;font-size:0.95rem;color:#334155;line-height:2;">
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>GitHub URL / ZIP 파일 제출</li>
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>기술 스택 태깅 (8개 카테고리)</li>
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>팀원 등록 + 스크린샷 업로드</li>
          </ul>
        </div>
        <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7); border-radius:14px; padding:20px; border:1px solid #86efac;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <div style="width:40px;height:40px;border-radius:10px;background:#10b981;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">🤖</div>
            <strong style="color:#166534; font-size:1.1rem;">AI 분석</strong>
          </div>
          <ul style="list-style:none;padding:0;font-size:0.95rem;color:#334155;line-height:2;">
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>파일별 Map 분석 (분류/요약/점수)</li>
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>전체 Reduce 종합 (아키텍처 분석)</li>
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>Bedrock Claude 4.5 Haiku</li>
          </ul>
        </div>
        <div style="background:linear-gradient(135deg,#fffbeb,#fef3c7); border-radius:14px; padding:20px; border:1px solid #fcd34d;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <div style="width:40px;height:40px;border-radius:10px;background:#f59e0b;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">🏆</div>
            <strong style="color:#92400e; font-size:1.1rem;">갤러리</strong>
          </div>
          <ul style="list-style:none;padding:0;font-size:0.95rem;color:#334155;line-height:2;">
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>명예의 전당 (3D 캐러셀)</li>
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>프로젝트 상세 열람</li>
            <li style="padding-left:16px;position:relative;"><span style="position:absolute;left:0;">•</span>댓글 + 기술 스택 필터</li>
          </ul>
        </div>
      </div>
    `
  },

  // 3: 파트1-3 시스템 아키텍처
  {
    type: 'light',
    html: `
      <div class="slide-title">시스템 아키텍처</div>
      <div class="slide-subtitle">API 서버와 AI 워커를 분리 · Docker Compose로 배포 · GitHub Actions CI/CD</div>
    `
  },
  // 4: 파트1-4 인프라 문제해결
  {
    type: 'white',
    html: `
      <div class="slide-title">인프라 & 배포 — 어려움과 해결</div>
      <div class="slide-subtitle">각 문제를 클릭하고 실행 버튼으로 Before/After를 비교해보세요</div>
    `
  },

  // 5: 파트2-1
  {
    type: 'blue',
    className: 'section-header',
    html: `
      <div class="section-number">02</div>
      <div class="slide-title">인증 및 보안 시스템</div>
      <div class="section-presenter">발표자: 황원경</div>
      <div class="slide-content" style="margin-top:24px; text-align:center;">
        <ul style="display:inline-block; text-align:left;">
          <li>Access Token(15분) + Refresh Token(14일) 이중 체계</li>
          <li>HttpOnly 쿠키 + DB 세션 저장</li>
          <li>Token Rotation + 탈취 감지 + 화이트리스트</li>
        </ul>
      </div>
    `
  },
  // 6: 파트2-2
  {
    type: 'white',
    html: `
      <div class="slide-title">Refresh Token Rotation</div>
      <div class="slide-subtitle">매 갱신마다 새 토큰 발급, 이전 토큰 즉시 폐기</div>
      <div class="flow-chart">
        <div class="flow-row">
          <div class="flow-box primary">갱신 요청</div>
          <span class="pipeline-arrow">→</span>
          <div class="flow-box accent">새 토큰 발급</div>
          <span class="pipeline-arrow">→</span>
          <div class="flow-box warning">이전 토큰 폐기</div>
        </div>
      </div>
      <div class="slide-content" style="margin-top:12px;">
        <ul>
          <li>탈취된 토큰은 <strong>1회만 유효</strong> (재사용 불가)</li>
          <li>DB에 저장된 refresh_token을 덮어씀 → 이전 값 무효</li>
        </ul>
      </div>
      <div class="code-block">
// 실제 코드 — client.ts (Axios 인터셉터)<br>
const { data } = await axios.post(<br>
&nbsp;&nbsp;refreshUrl, {},<br>
&nbsp;&nbsp;{ baseURL: apiClient.defaults.baseURL, withCredentials: true }<br>
);<br>
const newToken = data.data.access_token;<br>
useAuthStore.getState().setToken(newToken, role);
      </div>
    `
  },
  // 7: 파트2-3 토큰 탈취 감지 (AuthFlowDemo)
  {
    type: 'light',
    html: `
      <div class="slide-title">토큰 탈취 감지 — 라이브 시뮬레이션</div>
      <div class="slide-subtitle">아래 버튼으로 정상 흐름 / 탈취 시나리오를 실행해보세요</div>
    `
  },
  // 8: 파트2-4
  {
    type: 'white',
    html: `
      <div class="slide-title">화이트리스트 & Rate Limiting</div>
      <div class="slide-content">
        <div class="two-col">
          <div>
            <strong style="color:#1071e5;">화이트리스트</strong>
            <ul>
              <li>관리자가 허용 학번 관리</li>
              <li>학번+이름 매칭 시에만 가입 허용</li>
              <li>엑셀 벌크 업로드</li>
            </ul>
          </div>
          <div>
            <strong style="color:#ef4444;">Rate Limiting</strong>
            <ul>
              <li>SlowAPI 적용</li>
              <li>로그인 5회/분 제한</li>
              <li>브루트포스 방지</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  // 9: 파트3-1
  {
    type: 'blue',
    className: 'section-header',
    html: `
      <div class="section-number">03</div>
      <div class="slide-title">AI 분석 파이프라인</div>
      <div class="section-presenter">발표자: 최국진</div>
      <div class="slide-content" style="margin-top:24px; text-align:center;">
        <ul style="display:inline-block; text-align:left;">
          <li>Bedrock API + Map-Reduce 분석 패턴</li>
          <li>PostgreSQL FOR UPDATE SKIP LOCKED 큐</li>
          <li>Docker 워커 x2 수평 확장</li>
        </ul>
      </div>
    `
  },
  // 10: 파트3-2 Map-Reduce (AnalysisPipelineDemo)
  {
    type: 'white',
    html: `
      <div class="slide-title">Map-Reduce 분석 — 라이브 데모</div>
      <div class="slide-subtitle">▶ 분석 시작 버튼을 눌러 실제 과정을 확인하세요</div>
    `
  },
  // 11: 파트3-3 PostgreSQL 큐
  {
    type: 'light',
    html: `
      <div class="slide-title">PostgreSQL 분산 큐</div>
      <div class="slide-subtitle">Redis 없이 DB만으로 워커 큐 구현 (인프라 단순화)</div>
      <div class="flow-chart" style="margin-bottom:12px;">
        <div class="flow-row">
          <div class="flow-box primary">Worker A</div>
          <div class="flow-box primary">Worker B</div>
        </div>
        <div class="flow-arrow-down">↓ 동시 접근</div>
        <div class="flow-row">
          <div class="flow-box warning" style="min-width:260px;">FOR UPDATE SKIP LOCKED<br><span style="font-size:0.72rem;font-weight:400;">잠긴 행 건너뜀 · 중복 0건</span></div>
        </div>
        <div class="flow-arrow-down">↓ 크래시 시</div>
        <div class="flow-row">
          <div class="flow-box accent">트랜잭션 롤백 → 자동 잠금 해제</div>
        </div>
      </div>
      <div class="code-block">
SELECT * FROM analysis_queue<br>
WHERE status = 'pending'<br>
ORDER BY created_at LIMIT 1<br>
FOR UPDATE SKIP LOCKED;
      </div>
    `
  },
  // 12: 파트3-4
  {
    type: 'white',
    html: `
      <div class="slide-title">AI 파이프라인 — 어려움과 해결</div>
      <div class="slide-subtitle">각 문제를 클릭하고 실행 버튼으로 Before/After를 비교해보세요</div>
    `
  },

  // 13: 파트4-1
  {
    type: 'blue',
    className: 'section-header',
    html: `
      <div class="section-number">04</div>
      <div class="slide-title">프론트엔드 — 학생 화면</div>
      <div class="section-presenter">발표자: 송수하</div>
      <div class="slide-content" style="margin-top:24px; text-align:center;">
        <ul style="display:inline-block; text-align:left;">
          <li>3단계 멀티스텝 제출 폼</li>
          <li>기술 스택 선택기 (8개 카테고리)</li>
          <li>명예의 전당 3D 캐러셀</li>
        </ul>
      </div>
    `
  },
  // 14: 파트4-2 제출 폼 (StepFormDemo)
  {
    type: 'white',
    html: `
      <div class="slide-title">제출 폼 — 라이브 데모</div>
      <div class="slide-subtitle">실제 구현한 멀티스텝 폼입니다. 다음 버튼을 눌러보세요.</div>
    `
  },
  // 15: 파트4-3 캐러셀 (CarouselDemo)
  {
    type: 'light',
    html: `
      <div class="slide-title">명예의 전당 — 라이브 캐러셀</div>
      <div class="slide-subtitle">자동 슬라이드 + 카드 클릭으로 전환됩니다</div>
    `
  },
  // 16: 파트4-4
  {
    type: 'white',
    html: `
      <div class="slide-title">학생 화면 — 어려움과 해결</div>
      <div class="slide-subtitle">각 문제를 클릭하고 실행 버튼으로 Before/After를 비교해보세요</div>
    `
  },

  // 17: 파트5-1
  {
    type: 'blue',
    className: 'section-header',
    html: `
      <div class="section-number">05</div>
      <div class="slide-title">프론트엔드 — 관리자 + 공통 UI</div>
      <div class="section-presenter">발표자: 노수정</div>
      <div class="slide-content" style="margin-top:24px; text-align:center;">
        <ul style="display:inline-block; text-align:left;">
          <li>대시보드 · 폼 빌더 · 소스코드 탐색기</li>
          <li>10개+ 공통 컴포넌트 · MD3 디자인 시스템</li>
          <li>Axios 인터셉터 기반 인증 관리</li>
        </ul>
      </div>
    `
  },
  // 18: 파트5-2 디자인 시스템 (ButtonDemo)
  {
    type: 'white',
    html: `
      <div class="slide-title">공통 컴포넌트 — 라이브 데모</div>
      <div class="slide-subtitle">Framer Motion으로 구현한 버튼 컴포넌트입니다. 호버/클릭해보세요.</div>
      <div class="slide-content">
        <ul>
          <li>whileHover: scale(1.02) / whileTap: scale(0.98)</li>
          <li>variant: primary / secondary / danger / ghost</li>
          <li>Material Design 3 컬러 토큰 적용</li>
        </ul>
      </div>
    `
  },
  // 19: 파트5-3 인증 흐름
  {
    type: 'light',
    html: `
      <div class="slide-title">인증 흐름 (프론트엔드)</div>
      <div class="slide-subtitle">Axios 인터셉터 + 실패 큐 패턴</div>
      <div class="flow-chart" style="margin-bottom:12px;">
        <div class="flow-row">
          <div class="flow-box secondary">API 요청</div>
          <span class="pipeline-arrow">→</span>
          <div class="flow-box" style="background:#ef4444;color:white;">401 에러</div>
          <span class="pipeline-arrow">→</span>
          <div class="flow-box primary">자동 Refresh</div>
          <span class="pipeline-arrow">→</span>
          <div class="flow-box accent">재시도 OK</div>
        </div>
      </div>
      <div class="slide-content">
        <ul>
          <li>실패 큐: 동시 실패 → 1개만 refresh, 나머지 대기</li>
          <li>Zustand persist: 토큰/유저 정보 localStorage</li>
        </ul>
      </div>
      <div class="code-block">
// Axios 인터셉터 — 실제 코드 (client.ts)<br>
if (error.response?.status === 401) {<br>
&nbsp;&nbsp;const { data } = await axios.post(refreshUrl, {}, { withCredentials: true });<br>
&nbsp;&nbsp;const newToken = data.data.access_token;<br>
&nbsp;&nbsp;useAuthStore.getState().setToken(newToken, role);<br>
&nbsp;&nbsp;return apiClient(config);<br>
}
      </div>
    `
  },
  // 20: 파트5-4
  {
    type: 'white',
    html: `
      <div class="slide-title">관리자 화면 — 어려움과 해결</div>
      <div class="slide-subtitle">각 문제를 클릭하고 실행 버튼으로 Before/After를 비교해보세요</div>
    `
  },
  // 21: 시연 페이지
  {
    type: 'dark',
    className: 'section-header',
    html: `
      <div class="slide-title" style="font-size:2.6rem; margin-bottom:24px;">라이브 시연</div>
      <div style="margin: 20px auto; padding: 24px 40px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; display: inline-block; backdrop-filter: blur(8px);">
        <div style="font-size:0.8rem; color:rgba(255,255,255,0.5); margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">배포 URL</div>
        <a href="http://54.180.133.241:5173" target="_blank" style="font-size:1.6rem; color:#93c5fd; text-decoration:none; font-weight:700; letter-spacing:-0.02em;">
          http://54.180.133.241:5173
        </a>
      </div>
      <div class="slide-content" style="margin-top:28px; text-align:center; opacity:0.7; font-size:1rem;">
        관리자 로그인 → 폼 생성 → 학생 제출 → AI 분석 → 명예의 전당
      </div>
    `
  },
  // 22: 향후 개선점
  {
    type: 'light',
    html: `
      <div class="slide-title">향후 개선점</div>
      <div class="slide-subtitle">다음 학기 고도화 계획</div>
      <div class="slide-content">
        <div class="two-col">
          <div style="border-top:3px solid #6366f1;">
            <strong style="color:#6366f1;">포트폴리오 자동 생성</strong>
            <ul>
              <li>학생 제출물을 개인 포트폴리오로 자동 변환</li>
              <li>기술 스택·분석 결과 기반 이력서 연동</li>
              <li>외부 공유 링크 생성 기능</li>
            </ul>
          </div>
          <div style="border-top:3px solid #10b981;">
            <strong style="color:#10b981;">실시간 알림 시스템</strong>
            <ul>
              <li>AI 분석 완료 시 학생에게 즉시 알림</li>
              <li>WebSocket 기반 실시간 상태 업데이트</li>
              <li>이메일/Slack 연동 알림 채널</li>
            </ul>
          </div>
        </div>
        <div class="two-col" style="margin-top:16px;">
          <div style="border-top:3px solid #f59e0b;">
            <strong style="color:#f59e0b;">AI 분석 정확도 향상</strong>
            <ul>
              <li>Claude 4.5 Haiku 업그레이드 + 프롬프트 최적화</li>
              <li>코드 품질 점수 산정 알고리즘 개선</li>
              <li>다국어 코드 주석 지원</li>
            </ul>
          </div>
          <div style="border-top:3px solid #06b6d4;">
            <strong style="color:#06b6d4;">모바일 반응형 강화</strong>
            <ul>
              <li>모바일 전용 제출 UI</li>
              <li>PWA 지원으로 오프라인 접근</li>
              <li>터치 제스처 기반 갤러리 탐색</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  // 23: 아웃트로
  {
    type: 'dark',
    className: 'section-header',
    html: `
      <div class="slide-title" style="font-size:3.5rem; background:linear-gradient(135deg, #fbbf24, #f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">감사합니다</div>
      <div class="section-presenter" style="margin-top:40px; font-size:1.3rem; color:rgba(255,255,255,0.5);">Q & A</div>
    `
  }
]
