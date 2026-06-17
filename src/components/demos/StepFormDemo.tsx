import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = ['폼 확인', '정보 입력', '파일 업로드']
const techStacks = ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'TailwindCSS', 'Zustand', 'Framer Motion']

export function StepFormDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTech, setSelectedTech] = useState<string[]>(['React', 'TypeScript', 'FastAPI'])

  return (
    <div data-interactive style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <motion.div
              animate={{ background: i <= currentStep ? '#1071e5' : '#e2e8f0', scale: i === currentStep ? 1.1 : 1 }}
              style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i <= currentStep ? '#fff' : '#94a3b8', fontSize: '0.78rem', fontWeight: 700, boxShadow: i === currentStep ? '0 4px 12px rgba(16,113,229,0.25)' : 'none' }}
            >
              {i < currentStep ? '✓' : i + 1}
            </motion.div>
            <div style={{ fontSize: '0.82rem', marginLeft: 8, color: i <= currentStep ? '#1e40af' : '#94a3b8', fontWeight: i === currentStep ? 700 : 500 }}>{step}</div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, margin: '0 12px', background: i < currentStep ? '#1071e5' : '#e2e8f0', borderRadius: 1 }} />}
          </div>
        ))}
      </div>

      {/* Content */}
      <motion.div key={currentStep} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} style={{ minHeight: 180 }}>
        {currentStep === 0 && (
          <div>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>2025-1학기 캡스톤 디자인</div>
                <span style={{ padding: '4px 10px', borderRadius: 6, background: '#eff6ff', color: '#1e40af', fontSize: '0.72rem', fontWeight: 600 }}>진행 중</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
                제출 기한: 2025.06.20 23:59<br/>
                필수 항목: 프로젝트명, 소개, GitHub URL, 팀원 정보
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: 4, fontWeight: 500 }}>프로젝트명 *</div>
                <input defaultValue="Honey Barrel" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }} readOnly />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: 4, fontWeight: 500 }}>한줄 소개 *</div>
                <input defaultValue="AI 기반 프로젝트 분석 플랫폼" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: '0.88rem', outline: 'none' }} readOnly />
              </div>
            </div>
            {/* 기술 스택 선택기 */}
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: 6, fontWeight: 500 }}>기술 스택</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                {selectedTech.map(t => (
                  <span key={t} onClick={() => setSelectedTech(prev => prev.filter(x => x !== t))}
                    style={{ padding: '5px 12px', borderRadius: 20, background: '#eff6ff', color: '#1e40af', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1px solid #bfdbfe' }}>
                    {t} ×
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {techStacks.filter(t => !selectedTech.includes(t)).map(t => (
                  <span key={t} onClick={() => setSelectedTech(prev => [...prev, t])}
                    style={{ padding: '4px 10px', borderRadius: 6, background: '#f1f5f9', color: '#64748b', fontSize: '0.72rem', cursor: 'pointer' }}>
                    + {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: 8 }}>GitHub 레포지토리</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: '#fff', border: '1.5px solid #e2e8f0', fontSize: '0.82rem', color: '#334155' }}>
                  github.com/didgmltmd/honey-barrel
                </div>
                <span style={{ padding: '6px 12px', borderRadius: 6, background: '#f0fdf4', color: '#166534', fontSize: '0.72rem', fontWeight: 600 }}>✓ 검증됨</span>
              </div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: 8 }}>스크린샷 (썸네일)</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['대시보드', '갤러리', '분석결과'].map((name, i) => (
                  <div key={i} style={{ width: 80, height: 56, borderRadius: 8, background: `hsl(${220 + i * 30}, 70%, 92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#475569', border: i === 0 ? '2px solid #1071e5' : '1px solid #e2e8f0' }}>
                    {i === 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: '#1071e5', color: 'white', borderRadius: 4, fontSize: '0.5rem', padding: '1px 4px' }}>썸네일</span>}
                    {name}
                  </div>
                ))}
                <div style={{ width: 80, height: 56, borderRadius: 8, border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#94a3b8', cursor: 'pointer' }}>+</div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <div>
          {currentStep > 0 && (
            <button onClick={() => setCurrentStep(currentStep - 1)}
              style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#f1f5f9', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
              ← 이전
            </button>
          )}
        </div>
        <button onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
          style={{ padding: '8px 24px', borderRadius: 20, border: 'none', background: 'linear-gradient(135deg, #1071e5, #1e40af)', color: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
          {currentStep === steps.length - 1 ? '✓ 제출 완료' : '다음 →'}
        </button>
      </div>
    </div>
  )
}
