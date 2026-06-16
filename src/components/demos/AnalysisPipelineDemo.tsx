import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const files = ['main.py', 'routes.py', 'models.py', 'service.py', 'utils.py']

export function AnalysisPipelineDemo() {
  const [phase, setPhase] = useState<'idle' | 'map' | 'reduce' | 'done'>('idle')
  const [currentFile, setCurrentFile] = useState(0)
  const [analyzed, setAnalyzed] = useState<boolean[]>(new Array(files.length).fill(false))

  useEffect(() => {
    if (phase !== 'map') return
    if (currentFile >= files.length) {
      setPhase('reduce')
      return
    }
    const timer = setTimeout(() => {
      setAnalyzed(prev => { const n = [...prev]; n[currentFile] = true; return n })
      setCurrentFile(prev => prev + 1)
    }, 700)
    return () => clearTimeout(timer)
  }, [phase, currentFile])

  useEffect(() => {
    if (phase === 'reduce') {
      const timer = setTimeout(() => setPhase('done'), 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const start = () => {
    setPhase('map')
    setCurrentFile(0)
    setAnalyzed(new Array(files.length).fill(false))
  }

  const reset = () => {
    setPhase('idle')
    setCurrentFile(0)
    setAnalyzed(new Array(files.length).fill(false))
  }

  return (
    <div style={{ padding: 16, position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 16 }}>
        {/* File list */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6366f1', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Phase 1: Map
          </div>
          {files.map((file, i) => (
            <motion.div key={file}
              animate={{
                background: analyzed[i] ? '#f0fdf4' : i === currentFile && phase === 'map' ? '#eff6ff' : '#f8fafc',
                borderColor: analyzed[i] ? '#10b981' : i === currentFile && phase === 'map' ? '#1071e5' : '#e2e8f0',
              }}
              style={{
                padding: '6px 12px', borderRadius: 8, marginBottom: 4,
                border: '1px solid', fontSize: '0.75rem', fontWeight: 500,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <span>📄 {file}</span>
              {analyzed[i] && <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>}
              {i === currentFile && phase === 'map' && !analyzed[i] && (
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}>
                  🤖
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 60, color: '#94a3b8', fontSize: '1.5rem' }}>→</div>

        {/* Reduce */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Phase 2: Reduce
          </div>
          <motion.div
            animate={{
              background: phase === 'done' ? '#f0fdf4' : phase === 'reduce' ? '#eff6ff' : '#f8fafc',
              borderColor: phase === 'done' ? '#10b981' : phase === 'reduce' ? '#6366f1' : '#e2e8f0',
            }}
            style={{ padding: 16, borderRadius: 12, border: '1px solid', minHeight: 120 }}
          >
            {phase === 'idle' && <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>대기중...</div>}
            {phase === 'map' && <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>파일 분석 중...</div>}
            {phase === 'reduce' && (
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <div style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600 }}>🔄 요약 종합 중...</div>
              </motion.div>
            )}
            {phase === 'done' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', marginBottom: 6 }}>✅ 분석 완료</div>
                <div style={{ fontSize: '0.7rem', color: '#475569', lineHeight: 1.6 }}>
                  아키텍처: FastAPI + SQLAlchemy MVC<br/>
                  복잡도: 평균 6.2/10<br/>
                  주요 패턴: Repository, Service Layer
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        <motion.button whileTap={{ scale: 0.95 }} onClick={start}
          disabled={phase !== 'idle'}
          style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: phase === 'idle' ? '#6366f1' : '#94a3b8', color: 'white', cursor: phase === 'idle' ? 'pointer' : 'default', fontSize: '0.75rem', fontWeight: 700 }}>
          ▶ 분석 시작
        </motion.button>
        {phase === 'done' && (
          <motion.button whileTap={{ scale: 0.95 }} onClick={reset}
            style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: '#e2e8f0', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
            리셋
          </motion.button>
        )}
      </div>
    </div>
  )
}
