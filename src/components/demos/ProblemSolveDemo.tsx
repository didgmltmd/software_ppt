import { useState } from 'react'
import { motion } from 'framer-motion'

interface Scenario {
  problem: string
  solution: string
  beforeCode: string
  afterCode: string
  beforeConsole: string[]
  afterConsole: string[]
}

interface Props {
  scenarios: Scenario[]
}

export function ProblemSolveDemo({ scenarios }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [showAfter, setShowAfter] = useState(false)
  const [consoleLines, setConsoleLines] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const scenario = scenarios[activeIdx]

  const runBefore = async () => {
    setShowAfter(false)
    setIsRunning(true)
    setConsoleLines([])
    for (let i = 0; i < scenario.beforeConsole.length; i++) {
      await wait(400)
      setConsoleLines(prev => [...prev, scenario.beforeConsole[i]])
    }
    setIsRunning(false)
  }

  const runAfter = async () => {
    setShowAfter(true)
    setIsRunning(true)
    setConsoleLines([])
    for (let i = 0; i < scenario.afterConsole.length; i++) {
      await wait(400)
      setConsoleLines(prev => [...prev, scenario.afterConsole[i]])
    }
    setIsRunning(false)
  }

  const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

  return (
    <div data-interactive style={{ display: 'flex', gap: 24, marginTop: 12 }}>
      {/* 왼쪽: 시나리오 탭 */}
      <div style={{ width: 200, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {scenarios.map((s, i) => (
          <button key={i} onClick={() => { setActiveIdx(i); setConsoleLines([]); setShowAfter(false) }}
            style={{
              padding: '10px 14px', borderRadius: 8, border: 'none', textAlign: 'left', cursor: 'pointer',
              background: i === activeIdx ? '#eff6ff' : '#f8fafc',
              borderLeft: i === activeIdx ? '3px solid #1071e5' : '3px solid transparent',
              fontSize: '0.82rem', fontWeight: i === activeIdx ? 700 : 500, color: '#334155',
            }}>
            문제 {i + 1}
          </button>
        ))}
      </div>

      {/* 오른쪽: 코드 + 콘솔 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* 문제/해결 요약 */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, padding: '10px 14px', borderRadius: 8, background: '#fef2f2', borderLeft: '3px solid #ef4444' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ef4444', marginBottom: 2 }}>PROBLEM</div>
            <div style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>{scenario.problem}</div>
          </div>
          <div style={{ flex: 1, padding: '10px 14px', borderRadius: 8, background: '#f0fdf4', borderLeft: '3px solid #10b981' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', marginBottom: 2 }}>SOLUTION</div>
            <div style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>{scenario.solution}</div>
          </div>
        </div>

        {/* 코드 비교 */}
        <div style={{ background: '#1e293b', borderRadius: 10, padding: '14px 18px', fontFamily: 'Consolas, monospace', fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.6, borderTop: `3px solid ${showAfter ? '#10b981' : '#ef4444'}`, whiteSpace: 'pre-wrap' }}>
          <div style={{ fontSize: '0.65rem', color: showAfter ? '#6ee7b7' : '#fca5a5', marginBottom: 6, fontWeight: 700 }}>
            {showAfter ? '✅ AFTER (해결)' : '❌ BEFORE (문제)'}
          </div>
          {showAfter ? scenario.afterCode : scenario.beforeCode}
        </div>

        {/* 실행 버튼 */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={runBefore} disabled={isRunning}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: isRunning ? '#94a3b8' : '#ef4444', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: isRunning ? 'default' : 'pointer' }}>
            ▶ 문제 코드 실행
          </button>
          <button onClick={runAfter} disabled={isRunning}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: isRunning ? '#94a3b8' : '#10b981', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: isRunning ? 'default' : 'pointer' }}>
            ▶ 해결 코드 실행
          </button>
        </div>

        {/* 콘솔 출력 */}
        {consoleLines.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: '#0f172a', borderRadius: 8, padding: '12px 16px', fontFamily: 'Consolas, monospace', fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.7, maxHeight: 120, overflow: 'auto' }}>
            <div style={{ color: '#64748b', marginBottom: 4 }}>{'>'} Console Output</div>
            {consoleLines.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                style={{ color: line.startsWith('ERROR') || line.startsWith('❌') ? '#f87171' : line.startsWith('✅') || line.startsWith('OK') ? '#6ee7b7' : '#e2e8f0' }}>
                {line}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
