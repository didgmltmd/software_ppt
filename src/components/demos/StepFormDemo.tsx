import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = ['폼 확인', '정보 입력', '파일 업로드']

export function StepFormDemo() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <motion.div
              animate={{
                background: i <= currentStep ? 'linear-gradient(135deg, #1071e5, #6366f1)' : '#e2e8f0',
                scale: i === currentStep ? 1.1 : 1,
              }}
              style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: i <= currentStep ? '#fff' : '#94a3b8', fontSize: '0.7rem', fontWeight: 700,
                boxShadow: i === currentStep ? '0 4px 12px rgba(16,113,229,0.3)' : 'none',
              }}
            >
              {i < currentStep ? '✓' : i + 1}
            </motion.div>
            <div style={{ fontSize: '0.75rem', marginLeft: 6, color: i <= currentStep ? '#1e40af' : '#94a3b8', fontWeight: 600 }}>
              {step}
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: '0 8px', background: i < currentStep ? '#1071e5' : '#e2e8f0', borderRadius: 1 }} />
            )}
          </div>
        ))}
      </div>

      {/* Content area */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ minHeight: 60, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {currentStep === 0 && (
          <div style={{ fontSize: '0.85rem', color: '#475569' }}>
            📋 <strong>2025-1학기 캡스톤 디자인</strong> 제출 폼을 확인하세요
          </div>
        )}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input placeholder="프로젝트명" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem', outline: 'none' }} defaultValue="Honey Barrel" />
            <input placeholder="한줄 소개" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem', outline: 'none' }} defaultValue="AI 기반 프로젝트 분석 플랫폼" />
          </div>
        )}
        {currentStep === 2 && (
          <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: 8 }}>
            🔗 <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem' }}>github.com/honey-barrel</code>
            <span style={{ color: '#10b981', fontWeight: 600 }}>✓ 검증됨</span>
          </div>
        )}
      </motion.div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
        {currentStep > 0 && (
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setCurrentStep(currentStep - 1)}
            style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: '#e2e8f0', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
            이전
          </motion.button>
        )}
        <motion.button whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
          style={{ padding: '6px 16px', borderRadius: 20, border: 'none', background: 'linear-gradient(135deg, #1071e5, #1e40af)', color: 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>
          {currentStep === steps.length - 1 ? '제출 완료' : '다음'}
        </motion.button>
      </div>
    </div>
  )
}
