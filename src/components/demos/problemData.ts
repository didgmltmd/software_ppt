// 슬라이드 12: AI 파이프라인 문제해결
export const aiProblemScenarios = [
  {
    problem: '동기 LLM 호출 → 이벤트 루프 차단',
    solution: 'asyncio.to_thread()로 별도 스레드 실행',
    beforeCode: `# 문제: 동기 호출이 전체 서버를 블로킹
response = client.chat.completions.create(
    model="gpt-4",
    messages=[...]
)
# 이 동안 다른 요청 처리 불가!`,
    afterCode: `# 해결: to_thread로 블로킹 우회
response = await asyncio.to_thread(
    client.chat.completions.create,
    model="gpt-4",
    messages=[...]
)
# 다른 코루틴 정상 실행됨!`,
    beforeConsole: [
      '> 워커 시작...',
      '> 파일 처리 중: main.py',
      '> OpenAI API 호출 (동기)...',
      '❌ 경고: 이벤트 루프 12.3초 차단됨',
      '❌ 다른 요청 타임아웃 발생',
      'ERROR: asyncio 태스크 타임아웃 초과',
    ],
    afterConsole: [
      '> 워커 시작...',
      '> 파일 처리 중: main.py',
      '> OpenAI API 호출 (비동기 스레드)...',
      '> [동시] routes.py 처리 중',
      '> [동시] models.py 처리 중',
      '✅ main.py 분석 완료 (3.2초)',
      '✅ routes.py 분석 완료 (2.8초)',
      'OK: 블로킹 없이 전체 처리 완료',
    ],
  },
  {
    problem: '대용량 레포 → 토큰 초과',
    solution: '8만자 제한 + 소스 확장자 필터링',
    beforeCode: `# 문제: 모든 파일을 보냄
all_files = list_s3_files(prefix)
for f in all_files:  # node_modules 포함!
    content = get_file_content(f)
    send_to_llm(content)  # 토큰 폭발`,
    afterCode: `# 해결: 필터링 + 글자수 제한
MAX_CHAR = 80000
sorted_files = filter_source_files(all_files)
# .py, .ts, .tsx만 + node_modules 제외
for f in sorted_files:
    content = get_file_content(f)[:MAX_CHAR]
    send_to_llm(content)`,
    beforeConsole: [
      '> 레포지토리 스캔 중...',
      '> 2,847개 파일 발견 (node_modules 포함)',
      '> 총 글자수: 14,200,000',
      '❌ ERROR: 토큰 제한 초과 (128k)',
      'ERROR: OpenAI API 400 에러 반환',
    ],
    afterConsole: [
      '> 레포지토리 스캔 중...',
      '> 필터링: 소스 확장자만 (.py, .ts, .tsx)',
      '> 제외: node_modules, .git, dist',
      '> 23개 소스 파일 발견',
      '> 총 글자수: 67,400 (8만자 제한 이내)',
      '✅ 모든 파일 전송 성공',
    ],
  },
  {
    problem: 'LLM이 코드블록으로 감싸서 응답',
    solution: '정규식 파싱 fallback 구현',
    beforeCode: `# 문제: JSON 파싱 실패
result = json.loads(llm_response)
# llm이 \`\`\`json ... \`\`\` 로 감싸서 응답
# → json.JSONDecodeError!`,
    afterCode: `# 해결: 코드블록 제거 + fallback
def parse_llm_json(raw: str):
    text = raw.strip()
    if text.startswith("\`\`\`"):
        text = re.sub(r"^\`\`\`(?:json)?", "", text)
        text = re.sub(r"\`\`\`$", "", text)
    match = re.search(r"\\{.*\\}", text, re.DOTALL)
    return json.loads(match.group(0))`,
    beforeConsole: [
      '> LLM 응답 수신됨',
      '> JSON 파싱 시도...',
      '❌ json.JSONDecodeError: 값을 기대했으나 실패',
      '❌ 응답 시작: ```json',
      'ERROR: main.py 분석 실패',
    ],
    afterConsole: [
      '> LLM 응답 수신됨',
      '> 코드블록 래핑 감지...',
      '> ```json ... ``` 마커 제거',
      '> 정규식으로 JSON 객체 추출',
      '✅ 파싱 성공: {file_type: "entry", ...}',
      'OK: Fallback 파서 정상 동작',
    ],
  },
]

// 슬라이드 16: 학생 FE 문제해결
export const studentFeProblemScenarios = [
  {
    problem: '3D 원통 캐러셀 → 카드 겹침/짤림',
    solution: 'translateX 기반 슬라이드 방식 전환',
    beforeCode: `// 문제: perspective + rotateY 방식
<div style={{ perspective: 1000 }}>
  {cards.map((card, i) => (
    <div style={{
      transform: \`rotateY(\${i * 72}deg)
                  translateZ(300px)\`
    }}> {/* 카드끼리 겹침 */}`,
    afterCode: `// 해결: translateX + scale + opacity
const posStyles = {
  left:   { x: -280, scale: 0.78, opacity: 0.5 },
  center: { x: 0,    scale: 1,    opacity: 1 },
  right:  { x: 280,  scale: 0.78, opacity: 0.5 },
}
<motion.div animate={posStyles[position]} />`,
    beforeConsole: [
      '> Rendering 3D cylinder carousel...',
      '> Card 1: rotateY(0deg) translateZ(300px)',
      '> Card 2: rotateY(72deg) translateZ(300px)',
      '❌ Visual: Cards overlapping at edges',
      '❌ Visual: Text cut off on side cards',
      'ERROR: User reported unreadable cards',
    ],
    afterConsole: [
      '> Rendering slide carousel...',
      '> Center card: x=0, scale=1, opacity=1',
      '> Left card: x=-280, scale=0.78, opacity=0.5',
      '> Right card: x=280, scale=0.78, opacity=0.5',
      '✅ No overlap, all text visible',
      'OK: Smooth 0.7s transition applied',
    ],
  },
  {
    problem: '자동 슬라이드 + 유저 클릭 충돌',
    solution: '클릭 시 타이머 리셋 패턴',
    beforeCode: `// 문제: 클릭해도 자동이 바로 덮어씀
useEffect(() => {
  setInterval(() => {
    setCurrent(prev => prev + 1) // 항상 실행
  }, 5000)
}, [])`,
    afterCode: `// 해결: 클릭 시 타이머 리셋
const timerRef = useRef<NodeJS.Timeout>()

const resetTimer = () => {
  clearInterval(timerRef.current)
  timerRef.current = setInterval(...)
}

const onClick = (idx) => {
  setCurrent(idx)
  resetTimer()  // 유저 액션 후 타이머 재시작
}`,
    beforeConsole: [
      '> Auto-slide: showing card 3',
      '> User clicks card 1',
      '> Current = 1 (user intent)',
      '❌ 0.3s later: Auto-slide fires',
      '❌ Current = 4 (auto override!)',
      'ERROR: User sees unexpected jump',
    ],
    afterConsole: [
      '> Auto-slide: showing card 3',
      '> User clicks card 1',
      '> Timer cleared & reset',
      '> Current = 1 (user intent preserved)',
      '> ... 5s passes ...',
      '✅ Auto-slide resumes: Current = 2',
      'OK: No conflicts',
    ],
  },
  {
    problem: 'React Query 캐시 무효화 타이밍',
    solution: 'queryKey 전략으로 정확한 invalidation',
    beforeCode: `// 문제: 제출 후 목록이 안 바뀜
const { mutate: submit } = useMutation({
  mutationFn: submitForm,
  // invalidation 누락!
})`,
    afterCode: `// 해결: onSuccess에서 관련 키 모두 무효화
const { mutate: submit } = useMutation({
  mutationFn: submitForm,
  onSuccess: () => {
    qc.invalidateQueries(['public','submissions'])
    qc.invalidateQueries(['student','submissions'])
  }
})`,
    beforeConsole: [
      '> User submits project...',
      '> POST /api/submissions → 201 OK',
      '> Navigate to submissions list',
      '❌ List shows stale data (cached)',
      '❌ User does not see their submission',
      'ERROR: Must manual refresh to see update',
    ],
    afterConsole: [
      '> User submits project...',
      '> POST /api/submissions → 201 OK',
      '> Invalidating: [public, submissions]',
      '> Invalidating: [student, submissions]',
      '> Cache refetched automatically',
      '✅ List shows new submission instantly',
    ],
  },
]

// 슬라이드 20: 관리자 FE 문제해결
export const adminFeProblemScenarios = [
  {
    problem: '레이아웃 max-width 불일치',
    solution: '통일 규격 (max-w-7xl) 적용',
    beforeCode: `/* 문제: 페이지마다 다른 max-width */
.dashboard { max-width: 1200px; }
.form-page { max-width: 960px; }
.settings  { max-width: 100%; }
/* 페이지 이동시 레이아웃 점프 */`,
    afterCode: `/* 해결: 전역 레이아웃 통일 */
.page-container {
  max-width: 80rem; /* max-w-7xl = 1280px */
  margin: 0 auto;
  padding: 0 2rem;
}
/* 모든 페이지 동일 너비 */`,
    beforeConsole: [
      '> 페이지 이동: 대시보드 → 폼 관리',
      '❌ 레이아웃 점프: 1200px → 960px',
      '> 페이지 이동: 폼 → 설정',
      '❌ 레이아웃 점프: 960px → 전체 너비',
      'ERROR: 일관성 없는 사용자 경험',
    ],
    afterConsole: [
      '> 페이지 이동: 대시보드 → 폼 관리',
      '✅ 둘 다 max-w-7xl (1280px) 사용',
      '> 페이지 이동: 폼 → 설정',
      '✅ 일관된 너비 유지',
      'OK: 페이지 간 레이아웃 이동 없음',
    ],
  },
  {
    problem: '스크롤바 유무로 레이아웃 밀림',
    solution: 'scrollbar-gutter: stable 적용',
    beforeCode: `/* 문제: 콘텐츠 길이에 따라 밀림 */
body {
  overflow: auto;
}
/* 스크롤바 나타나면 16px 밀림 */`,
    afterCode: `/* 해결: 스크롤바 공간 미리 확보 */
body {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}
/* 항상 스크롤바 공간 예약 → 밀림 0 */`,
    beforeConsole: [
      '> 짧은 콘텐츠 페이지 (스크롤바 없음)',
      '> 콘텐츠 너비: 1280px',
      '> 항목 추가 → 스크롤바 나타남',
      '❌ 콘텐츠 너비: 1264px (16px 밀림!)',
      'ERROR: 버튼/요소 수평 점프 발생',
    ],
    afterConsole: [
      '> 짧은 콘텐츠 페이지',
      '> scrollbar-gutter: stable 적용됨',
      '> 콘텐츠 너비: 1264px (공간 예약)',
      '> 항목 추가 → 스크롤바 나타남',
      '✅ 콘텐츠 너비: 1264px (변동 없음)',
      'OK: 레이아웃 밀림 제로',
    ],
  },
  {
    problem: '폼 빌더 Input 단조로움',
    solution: '보더 기반 스타일로 전환',
    beforeCode: `/* 문제: 모든 input이 회색 배경 */
.input {
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
}
/* 구분이 안 됨, 단조로움 */`,
    afterCode: `/* 해결: 보더 + focus 강조 */
.input {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  transition: border-color 0.2s;
}
.input:focus {
  border-color: #1071e5;
  box-shadow: 0 0 0 3px rgba(16,113,229,0.1);
}`,
    beforeConsole: [
      '> 폼 5개 필드 렌더링',
      '> 모든 input: 배경=#f1f5f9, 보더 없음',
      '❌ 유저 피드백: "필드 구분이 안 됨"',
      '❌ 포커스 표시기 없음',
      'ERROR: 폼 UX 및 접근성 문제',
    ],
    afterConsole: [
      '> 폼 5개 필드 렌더링',
      '> input: 흰색 배경 + 미세 보더',
      '> 필드 포커스 → 파란 보더 + 그림자',
      '✅ 명확한 시각적 계층 구조',
      '✅ WCAG 포커스 표시기 요건 충족',
      'OK: 폼 UX 개선 완료',
    ],
  },
]
