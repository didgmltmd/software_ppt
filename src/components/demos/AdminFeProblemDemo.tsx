import { useState } from 'react'
import { motion } from 'framer-motion'

type Tab = 0 | 1 | 2

export function AdminFeProblemDemo() {
  const [tab, setTab] = useState<Tab>(0)

  return (
    <div data-interactive style={{ display: 'flex', gap: 20, marginTop: 8 }}>
      <div style={{ width: 180, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {['max-width 불일치', '스크롤바 밀림', 'Input 스타일'].map((label, i) => (
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
      <div style={{ flex: 1 }}>
        {tab === 0 && <MaxWidthProblem />}
        {tab === 1 && <ScrollbarProblem />}
        {tab === 2 && <InputStyleProblem />}
      </div>
    </div>
  )
}

function MaxWidthProblem() {
  const [showAfter, setShowAfter] = useState(false)
  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button onClick={() => setShowAfter(false)} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: !showAfter ? '#ef4444' : '#e2e8f0', color: !showAfter ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>❌ Before</button>
        <button onClick={() => setShowAfter(true)} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: showAfter ? '#10b981' : '#e2e8f0', color: showAfter ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>✅ After</button>
      </div>
      <div style={{ background: '#f1f5f9', borderRadius: 12, padding: 16, border: `2px solid ${showAfter ? '#10b98130' : '#ef444430'}` }}>
        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: 8 }}>페이지 전환 시뮬레이션</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <motion.div animate={{ width: showAfter ? '100%' : '85%' }} transition={{ duration: 0.5 }}
            style={{ height: 32, background: '#1071e5', borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 12, color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>
            대시보드 {showAfter ? '(max-w-7xl)' : '(1200px)'}
          </motion.div>
          <motion.div animate={{ width: showAfter ? '100%' : '70%' }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ height: 32, background: '#6366f1', borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 12, color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>
            폼 관리 {showAfter ? '(max-w-7xl)' : '(960px)'}
          </motion.div>
          <motion.div animate={{ width: showAfter ? '100%' : '100%' }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ height: 32, background: '#10b981', borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 12, color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>
            설정 {showAfter ? '(max-w-7xl)' : '(100%)'}
          </motion.div>
        </div>
        <div style={{ fontSize: '0.72rem', color: showAfter ? '#10b981' : '#ef4444', fontWeight: 600, marginTop: 8 }}>
          {showAfter ? '✅ 모든 페이지 동일 너비 → 전환 시 점프 없음' : '❌ 페이지마다 너비 달라 → 레이아웃 점프 발생'}
        </div>
      </div>
    </div>
  )
}

function ScrollbarProblem() {
  const [showAfter, setShowAfter] = useState(false)
  const [items, setItems] = useState(2)

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button onClick={() => { setShowAfter(false); setItems(2) }} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: !showAfter ? '#ef4444' : '#e2e8f0', color: !showAfter ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>❌ Before</button>
        <button onClick={() => { setShowAfter(true); setItems(2) }} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: showAfter ? '#10b981' : '#e2e8f0', color: showAfter ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>✅ After</button>
        <button onClick={() => setItems(prev => prev + 2)} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: '#1071e5', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>+ 항목 추가</button>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, height: 140, overflow: showAfter ? 'auto' : 'auto', background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', padding: 10, scrollbarGutter: showAfter ? 'stable' : undefined }}>
          <motion.div animate={{ x: !showAfter && items > 3 ? -8 : 0 }} style={{ transition: 'all 0.3s' }}>
            <div style={{ background: '#1071e5', height: 24, borderRadius: 4, marginBottom: 6, width: '100%' }} />
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} style={{ background: '#e2e8f0', height: 20, borderRadius: 4, marginBottom: 4 }} />
            ))}
          </motion.div>
        </div>
        <div style={{ width: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.7rem', color: '#64748b' }}>
          {!showAfter && items > 3 && <span style={{ color: '#ef4444', fontWeight: 600 }}>← 16px 밀림!</span>}
          {showAfter && <span style={{ color: '#10b981', fontWeight: 600 }}>밀림 없음 ✓</span>}
        </div>
      </div>
    </div>
  )
}

function InputStyleProblem() {
  const [showAfter, setShowAfter] = useState(false)
  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button onClick={() => setShowAfter(false)} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: !showAfter ? '#ef4444' : '#e2e8f0', color: !showAfter ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>❌ Before</button>
        <button onClick={() => setShowAfter(true)} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: showAfter ? '#10b981' : '#e2e8f0', color: showAfter ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>✅ After</button>
      </div>
      <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, border: `2px solid ${showAfter ? '#10b98130' : '#ef444430'}` }}>
        {['프로젝트명', '한줄 소개', '상세 설명'].map((label, i) => (
          <div key={i}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: 3, fontWeight: 500 }}>{label}</div>
            <input
              readOnly
              defaultValue={i === 0 ? 'Honey Barrel' : i === 1 ? 'AI 기반 프로젝트 분석' : ''}
              placeholder={label + ' 입력'}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: showAfter ? 10 : 8, fontSize: '0.85rem',
                background: showAfter ? '#ffffff' : '#f1f5f9',
                border: showAfter ? '1.5px solid #e2e8f0' : 'none',
                outline: 'none',
                boxShadow: showAfter && i === 0 ? '0 0 0 3px rgba(16,113,229,0.1)' : 'none',
                borderColor: showAfter && i === 0 ? '#1071e5' : undefined,
              }}
            />
          </div>
        ))}
        <div style={{ fontSize: '0.72rem', color: showAfter ? '#10b981' : '#ef4444', fontWeight: 600, marginTop: 4 }}>
          {showAfter ? '✅ 보더 기반: 필드 구분 명확 + 포커스 표시' : '❌ 회색 배경: 모든 필드가 동일하게 보임'}
        </div>
      </div>
    </div>
  )
}
