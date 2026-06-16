import { useState } from 'react'
import { motion } from 'framer-motion'

type Step = 'idle' | 'request' | 'expired' | 'refreshing' | 'success' | 'stolen' | 'detected' | 'logout'

export function AuthFlowDemo() {
  const [step, setStep] = useState<Step>('idle')

  const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

  const runNormalFlow = async () => {
    setStep('request'); await wait(900)
    setStep('expired'); await wait(900)
    setStep('refreshing'); await wait(1100)
    setStep('success'); await wait(2000)
    setStep('idle')
  }

  const runStolenFlow = async () => {
    setStep('stolen'); await wait(1100)
    setStep('detected'); await wait(1300)
    setStep('logout'); await wait(2000)
    setStep('idle')
  }

  const getColor = (node: string) => {
    if (step === 'success' && (node === 'client' || node === 'server')) return '#10b981'
    if (step === 'request' && node === 'client') return '#1071e5'
    if (step === 'expired' && node === 'server') return '#f59e0b'
    if (step === 'refreshing' && (node === 'server' || node === 'db')) return '#6366f1'
    if (step === 'stolen' && node === 'attacker') return '#ef4444'
    if (step === 'stolen' && node === 'db') return '#ef4444'
    if (step === 'detected') return '#ef4444'
    if (step === 'logout') return '#ef4444'
    return '#cbd5e1'
  }

  const msgs: Record<Step, string> = {
    idle: '↓ 아래 버튼을 눌러 시나리오를 실행하세요',
    request: '→ API 요청 전송 중...',
    expired: '⚠️ 401 — Access Token 만료!',
    refreshing: '🔄 Refresh Token으로 갱신 중...',
    success: '✅ 새 토큰 발급 완료 → 재요청 성공!',
    stolen: '🦹 공격자가 Refresh Token을 먼저 사용!',
    detected: '🚨 정상 유저 시도 → DB 토큰 불일치 감지!',
    logout: '🔒 전 기기 세션 삭제 완료 (강제 로그아웃)',
  }

  return (
    <div style={{ padding: '24px 0' }} data-interactive>
      {/* 노드들 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginBottom: 24 }}>
        {[
          { id: 'client', icon: '👤', label: 'Client' },
          { id: 'server', icon: '⚡', label: 'Server' },
          { id: 'db', icon: '🗄️', label: 'DB (Sessions)' },
        ].map(node => (
          <motion.div key={node.id}
            animate={{ borderColor: getColor(node.id), boxShadow: `0 0 20px ${getColor(node.id)}30` }}
            transition={{ duration: 0.3 }}
            style={{
              padding: '16px 28px', borderRadius: 14, border: '3px solid',
              background: '#fff', fontSize: '1rem', fontWeight: 700, textAlign: 'center',
              minWidth: 120,
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{node.icon}</div>
            {node.label}
          </motion.div>
        ))}
      </div>

      {/* 메시지 */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center', fontSize: '1.1rem', fontWeight: 600, marginBottom: 24,
          padding: '12px 20px', borderRadius: 10,
          background: step === 'idle' ? '#f1f5f9' : step.includes('success') ? '#f0fdf4' : step.includes('stolen') || step.includes('detected') || step.includes('logout') ? '#fef2f2' : '#eff6ff',
          color: step === 'idle' ? '#64748b' : '#1e293b',
        }}
      >
        {msgs[step]}
      </motion.div>

      {/* 버튼 */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={runNormalFlow} disabled={step !== 'idle'}
          style={{
            padding: '10px 24px', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '0.9rem',
            background: step === 'idle' ? '#1071e5' : '#94a3b8', color: 'white',
            cursor: step === 'idle' ? 'pointer' : 'default',
          }}>
          ▶ 정상 갱신 흐름
        </button>
        <button onClick={runStolenFlow} disabled={step !== 'idle'}
          style={{
            padding: '10px 24px', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: '0.9rem',
            background: step === 'idle' ? '#ef4444' : '#94a3b8', color: 'white',
            cursor: step === 'idle' ? 'pointer' : 'default',
          }}>
          ▶ 탈취 시나리오
        </button>
      </div>
    </div>
  )
}
