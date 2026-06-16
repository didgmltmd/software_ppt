import { motion } from 'framer-motion'

export function ButtonDemo() {
  return (
    <div data-interactive style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      {/* 왼쪽: 실제 버튼 */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          Live Components
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '12px 28px', borderRadius: 24, border: 'none', background: 'linear-gradient(135deg, #1071e5, #1e40af)', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(16,113,229,0.3)' }}>
              제출하기
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '12px 28px', borderRadius: 12, border: 'none', background: '#f1f5f9', color: '#334155', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
              취소
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '12px 28px', borderRadius: 24, border: 'none', background: '#ef4444', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
              삭제
            </motion.button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 12px', borderRadius: 6, background: '#eff6ff', color: '#1e40af', fontSize: '0.75rem', fontWeight: 600 }}>React</span>
            <span style={{ padding: '4px 12px', borderRadius: 6, background: '#f0fdf4', color: '#166534', fontSize: '0.75rem', fontWeight: 600 }}>FastAPI</span>
            <span style={{ padding: '4px 12px', borderRadius: 6, background: '#fef3c7', color: '#92400e', fontSize: '0.75rem', fontWeight: 600 }}>PostgreSQL</span>
            <span style={{ padding: '4px 12px', borderRadius: 6, background: '#f5f3ff', color: '#5b21b6', fontSize: '0.75rem', fontWeight: 600 }}>Docker</span>
          </div>
          <div style={{ padding: '12px 16px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>양</div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>양희승</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>팀장 · 시스템 아키텍처</div>
            </div>
          </div>
        </div>
      </div>
      {/* 오른쪽: 실제 코드 */}
      <div style={{ flex: 1, background: '#1e293b', borderRadius: 12, padding: 18, fontSize: '0.72rem', fontFamily: 'Consolas, monospace', color: '#e2e8f0', lineHeight: 1.7, borderTop: '3px solid #6366f1' }}>
        <div style={{ color: '#94a3b8', marginBottom: 4 }}>// Button.tsx - 실제 코드</div>
        <div><span style={{ color: '#c084fc' }}>{'<motion.button'}</span></div>
        <div>&nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>whileHover</span>={'{{ scale: 1.01 }}'}</div>
        <div>&nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>whileTap</span>={'{{ scale: 0.98 }}'}</div>
        <div>&nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>className</span>={'{cn('}</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;baseStyles,</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;variants[variant],</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;sizes[size]</div>
        <div>&nbsp;&nbsp;{')'}</div>
        <div><span style={{ color: '#c084fc' }}>{'>'}</span></div>
        <div>&nbsp;&nbsp;{'{children}'}</div>
        <div><span style={{ color: '#c084fc' }}>{'</motion.button>'}</span></div>
      </div>
    </div>
  )
}
