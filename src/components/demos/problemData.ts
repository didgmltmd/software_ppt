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
      '> Worker started...',
      '> Processing file: main.py',
      '> Calling OpenAI API (sync)...',
      '❌ WARNING: Event loop blocked for 12.3s',
      '❌ Other requests TIMEOUT',
      'ERROR: asyncio task exceeded timeout',
    ],
    afterConsole: [
      '> Worker started...',
      '> Processing file: main.py',
      '> Calling OpenAI API (async thread)...',
      '> [concurrent] Processing file: routes.py',
      '> [concurrent] Processing file: models.py',
      '✅ main.py analysis complete (3.2s)',
      '✅ routes.py analysis complete (2.8s)',
      'OK: All files processed without blocking',
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
      '> Scanning repository...',
      '> Found 2,847 files (including node_modules)',
      '> Total chars: 14,200,000',
      '❌ ERROR: Token limit exceeded (128k)',
      'ERROR: OpenAI API returned 400',
    ],
    afterConsole: [
      '> Scanning repository...',
      '> Filtering: SOURCE_EXTENSIONS only',
      '> Excluding: node_modules, .git, dist',
      '> Found 23 source files',
      '> Total chars: 67,400 (under 80k limit)',
      '✅ All files sent successfully',
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
      '> LLM Response received',
      '> Parsing JSON...',
      '❌ json.JSONDecodeError: Expecting value',
      '❌ Raw response starts with: ```json',
      'ERROR: Analysis failed for main.py',
    ],
    afterConsole: [
      '> LLM Response received',
      '> Detecting code block wrapper...',
      '> Stripping ```json ... ``` markers',
      '> Extracting JSON object with regex',
      '✅ Parsed successfully: {file_type: "entry", ...}',
      'OK: Fallback parser worked',
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
      '> Navigate: Dashboard → Form page',
      '❌ Layout jumps: 1200px → 960px',
      '> Navigate: Form → Settings',
      '❌ Layout jumps: 960px → full width',
      'ERROR: Inconsistent user experience',
    ],
    afterConsole: [
      '> Navigate: Dashboard → Form page',
      '✅ Both use max-w-7xl (1280px)',
      '> Navigate: Form → Settings',
      '✅ Consistent width maintained',
      'OK: No layout shift between pages',
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
      '> Page with short content (no scrollbar)',
      '> Content width: 1280px',
      '> Add more items → scrollbar appears',
      '❌ Content width: 1264px (shifted 16px!)',
      'ERROR: Buttons/elements jump horizontally',
    ],
    afterConsole: [
      '> Page with short content',
      '> scrollbar-gutter: stable applied',
      '> Content width: 1264px (space reserved)',
      '> Add more items → scrollbar appears',
      '✅ Content width: 1264px (no shift)',
      'OK: Zero layout shift',
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
      '> Render form with 5 fields',
      '> All inputs: bg=#f1f5f9, no border',
      '❌ User feedback: "Can\'t tell fields apart"',
      '❌ No visual focus indicator',
      'ERROR: Poor form UX, accessibility issue',
    ],
    afterConsole: [
      '> Render form with 5 fields',
      '> Inputs: white bg + subtle border',
      '> User focuses field → blue border + shadow',
      '✅ Clear visual hierarchy',
      '✅ Meets WCAG focus indicator requirements',
      'OK: Improved form UX',
    ],
  },
]
