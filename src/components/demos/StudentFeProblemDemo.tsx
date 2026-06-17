import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type Tab = 0 | 1 | 2

export function StudentFeProblemDemo() {
  const [tab, setTab] = useState<Tab>(0)

  return (
    <div data-interactive style={{ display: 'flex', gap: 20, marginTop: 8 }}>
      {/* 탭 */}
      <div style={{ width: 180, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {['캐러셀 겹침', '타이머 충돌', 'Query 캐시'].map((label, i) => (
          <button key={i} onClick={() => setTab(i as Tab)}
            style={{
              padding: '10px 14px', borderRadius: 8, border: 'none', textAlign: 'left', cursor: 'pointer',
              background: i === tab ? '#eff6ff' : '#f8fafc',
              borderLeft: i === tab ? '3px solid #1071e5' : '3px solid transparent',
              fontSize: '0.85rem', fontWeight: i === tab ? 700 : 500, color: '#334155',
            }}>
            문제 {i + 1}: {label}
          </button>
        ))}
      </div>

      {/* 콘텐츠 */}
      <div style={{ flex: 1 }}>
        {tab === 0 && <CarouselProblem />}
        {tab === 1 && <TimerProblem />}
        {tab === 2 && <QueryCacheProblem />}
      </div>
    </div>
  )
}

// ===== 문제 1: 캐러셀 겹침 =====
function CarouselProblem() {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button onClick={() => setShowAfter(false)}
          style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: !showAfter ? '#ef4444' : '#e2e8f0', color: !showAfter ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
          ❌ Before (3D 원통)
        </button>
        <button onClick={() => setShowAfter(true)}
          style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: showAfter ? '#10b981' : '#e2e8f0', color: showAfter ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
          ✅ After (translateX)
        </button>
      </div>

      {/* 시각적 렌더링 비교 */}
      <div style={{ background: '#f8fafc', borderRadius: 12, padding: 20, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: `2px solid ${showAfter ? '#10b981' : '#ef4444'}20` }}>
        {!showAfter ? (
          // Before: 겹치는 3D 카드
          <div style={{ position: 'relative', width: 300, height: 120 }}>
            <div style={{ position: 'absolute', left: 20, top: 10, width: 140, height: 100, background: '#6366f1', borderRadius: 10, transform: 'rotateY(20deg) translateZ(50px)', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>
              카드 A (잘림!)
            </div>
            <div style={{ position: 'absolute', left: 80, top: 5, width: 140, height: 100, background: '#1071e5', borderRadius: 10, transform: 'rotateY(-5deg)', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>
              카드 B (겹침!)
            </div>
            <div style={{ position: 'absolute', left: 140, top: 15, width: 140, height: 100, background: '#10b981', borderRadius: 10, transform: 'rotateY(-20deg) translateZ(50px)', opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>
              카드 C (잘림!)
            </div>
            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: '#ef4444', fontWeight: 600 }}>
              ↑ 카드끼리 겹치고 텍스트 짤림
            </div>
          </div>
        ) : (
          // After: 깔끔한 translateX
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.div animate={{ opacity: 0.5, scale: 0.8 }}
              style={{ width: 100, height: 80, background: '#6366f1', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 600 }}>
              카드 A
            </motion.div>
            <motion.div animate={{ opacity: 1, scale: 1 }}
              style={{ width: 130, height: 100, background: '#1071e5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
              카드 B (중앙)
            </motion.div>
            <motion.div animate={{ opacity: 0.5, scale: 0.8 }}
              style={{ width: 100, height: 80, background: '#10b981', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 600 }}>
              카드 C
            </motion.div>
          </div>
        )}
      </div>

      {/* 코드 */}
      <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px', marginTop: 10, fontFamily: 'Consolas, monospace', fontSize: '0.72rem', color: '#e2e8f0', lineHeight: 1.6, borderTop: `3px solid ${showAfter ? '#10b981' : '#ef4444'}` }}>
        {!showAfter ? (
          <span style={{ color: '#fca5a5' }}>transform: rotateY(72deg) translateZ(300px) → 겹침 발생</span>
        ) : (
          <span style={{ color: '#6ee7b7' }}>{'{ x: -280, scale: 0.78, opacity: 0.5 }'} → 깔끔한 분리</span>
        )}
      </div>
    </div>
  )
}

// ===== 문제 2: 타이머 충돌 =====
function TimerProblem() {
  const [current, setCurrent] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const cancelRef = useRef(false)

  const wait = (ms: number) => new Promise<void>(r => {
    const id = setTimeout(r, ms)
    // 취소 가능하게 하진 않지만, 짧은 시간이라 OK
    void id
  })

  const startDemo = async (fixed: boolean) => {
    if (isRunning) return
    cancelRef.current = false
    setIsRunning(true)
    setCurrent(0)
    setLog([])

    // 자동 슬라이드: 0 → 1
    await wait(800)
    if (cancelRef.current) return
    setCurrent(1)
    setLog(l => [...l, '자동: 카드 1로 이동'])

    // 자동 슬라이드: 1 → 2
    await wait(1200)
    if (cancelRef.current) return
    setCurrent(2)
    setLog(l => [...l, '자동: 카드 2로 이동'])

    // 유저 클릭: 카드 0으로 가고 싶음
    await wait(1000)
    if (cancelRef.current) return
    setCurrent(0)
    setLog(l => [...l, '👆 유저 클릭: 카드 0으로 이동!'])

    if (!fixed) {
      // 문제: 바로 자동이 덮어씀
      await wait(600)
      if (cancelRef.current) return
      setCurrent(3)
      setLog(l => [...l, '❌ 자동이 덮어씀: 카드 3으로 강제 이동'])

      await wait(1000)
      if (cancelRef.current) return
      setLog(l => [...l, '❌ 유저 의도 무시됨!'])
    } else {
      // 해결: 타이머 리셋 → 유저 의도 유지
      await wait(600)
      if (cancelRef.current) return
      setLog(l => [...l, '✅ 타이머 리셋됨 — 유저 의도 유지'])

      await wait(1500)
      if (cancelRef.current) return
      setCurrent(1)
      setLog(l => [...l, '✅ 자동 재개: 카드 1 (5초 후)'])
    }

    setIsRunning(false)
  }

  useEffect(() => { return () => { cancelRef.current = true } }, [])

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button onClick={() => startDemo(false)} disabled={isRunning}
          style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: isRunning ? '#94a3b8' : '#ef4444', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: isRunning ? 'default' : 'pointer' }}>
          ▶ 충돌 시뮬레이션
        </button>
        <button onClick={() => startDemo(true)} disabled={isRunning}
          style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: isRunning ? '#94a3b8' : '#10b981', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: isRunning ? 'default' : 'pointer' }}>
          ▶ 해결 시뮬레이션
        </button>
      </div>

      {/* 카드 시각화 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            flex: 1, height: 40, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: i === current ? '#1071e5' : '#e2e8f0',
            color: i === current ? 'white' : '#94a3b8',
            fontWeight: 700, fontSize: '0.75rem', transition: 'all 0.3s',
          }}>
            카드 {i}
          </div>
        ))}
      </div>

      {/* 로그 */}
      {log.length > 0 && (
        <div style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px', fontFamily: 'Consolas, monospace', fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.6, maxHeight: 100, overflow: 'auto' }}>
          {log.slice(-6).map((l, i) => (
            <div key={i} style={{ color: l.includes('유저') ? '#fbbf24' : l.includes('재개') ? '#6ee7b7' : '#e2e8f0' }}>{l}</div>
          ))}
        </div>
      )}
    </div>
  )
}

// ===== 문제 3: Query 캐시 =====
function QueryCacheProblem() {
  const [showAfter, setShowAfter] = useState(false)
  const [submissions, setSubmissions] = useState(['프로젝트 A', '프로젝트 B'])
  const [log, setLog] = useState<string[]>([])

  const simulate = async (fixed: boolean) => {
    setShowAfter(fixed)
    setSubmissions(['프로젝트 A', '프로젝트 B'])
    setLog([])

    await wait(500)
    setLog(l => [...l, 'POST /api/submissions → 201 OK'])
    await wait(500)

    if (!fixed) {
      setLog(l => [...l, '❌ invalidation 없음 → 캐시된 데이터 유지'])
      setLog(l => [...l, '❌ 새로고침해야 목록 갱신됨'])
    } else {
      setLog(l => [...l, '✅ invalidateQueries([student, submissions])'])
      await wait(400)
      setSubmissions(['프로젝트 A', '프로젝트 B', '프로젝트 C (신규!)'])
      setLog(l => [...l, '✅ 자동 refetch → 목록 즉시 갱신'])
    }
  }

  const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button onClick={() => simulate(false)}
          style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: '#ef4444', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
          ▶ 문제 상황
        </button>
        <button onClick={() => simulate(true)}
          style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: '#10b981', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
          ▶ 해결 상황
        </button>
      </div>

      {/* 목록 렌더링 */}
      <div style={{ background: '#f8fafc', borderRadius: 10, padding: 14, border: '1px solid #e2e8f0', marginBottom: 10 }}>
        <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: 6, fontWeight: 600 }}>제출 목록 (캐시)</div>
        {submissions.map((s, i) => (
          <motion.div key={s} initial={i === 2 ? { opacity: 0, x: -10 } : {}} animate={{ opacity: 1, x: 0 }}
            style={{ padding: '6px 10px', borderRadius: 6, background: i === 2 ? '#f0fdf4' : 'white', border: `1px solid ${i === 2 ? '#10b981' : '#e2e8f0'}`, marginBottom: 4, fontSize: '0.8rem', fontWeight: i === 2 ? 600 : 400, color: i === 2 ? '#166534' : '#334155' }}>
            {s}
          </motion.div>
        ))}
      </div>

      {/* 로그 */}
      {log.length > 0 && (
        <div style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px', fontFamily: 'Consolas, monospace', fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.6 }}>
          {log.map((l, i) => (
            <div key={i} style={{ color: l.startsWith('✅') ? '#6ee7b7' : l.startsWith('❌') ? '#fca5a5' : '#e2e8f0' }}>{l}</div>
          ))}
        </div>
      )}
    </div>
  )
}
