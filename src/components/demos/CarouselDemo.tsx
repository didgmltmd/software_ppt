import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const mockProjects = [
  { id: 1, title: 'AI 챗봇 플랫폼', team: '김철수 외 3명', tech: 'React, FastAPI, Claude 4.5 Haiku', category: '인공지능', color: '#6366f1' },
  { id: 2, title: '스마트 출석 시스템', team: '이영희 외 2명', tech: 'Flutter, Firebase', category: 'IoT', color: '#10b981' },
  { id: 3, title: '실시간 협업 에디터', team: '박준호 외 4명', tech: 'Next.js, WebSocket', category: '웹', color: '#1071e5' },
  { id: 4, title: '블록체인 투표', team: '최민지 외 2명', tech: 'Solidity, React', category: '블록체인', color: '#f59e0b' },
  { id: 5, title: '자율주행 RC카', team: '정다은 외 3명', tech: 'Python, OpenCV', category: '임베디드', color: '#ef4444' },
]

export function CarouselDemo() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % mockProjects.length), 3500)
    return () => clearInterval(timer)
  }, [])

  const getPosition = (index: number) => {
    const diff = (index - current + mockProjects.length) % mockProjects.length
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    if (diff === mockProjects.length - 1) return 'left'
    return 'hidden'
  }

  const posStyles = {
    left: { x: -280, scale: 0.78, opacity: 0.5, zIndex: 1 },
    center: { x: 0, scale: 1, opacity: 1, zIndex: 3 },
    right: { x: 280, scale: 0.78, opacity: 0.5, zIndex: 1 },
    hidden: { x: 0, scale: 0.5, opacity: 0, zIndex: 0 },
  }

  return (
    <div data-interactive style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ position: 'relative', height: 320, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {mockProjects.map((project, index) => {
          const pos = getPosition(index)
          return (
            <motion.div
              key={project.id}
              animate={posStyles[pos]}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setCurrent(index)}
              style={{
                position: 'absolute',
                width: 340,
                height: 260,
                padding: 28,
                borderRadius: 20,
                background: pos === 'center' ? `linear-gradient(135deg, ${project.color}, ${project.color}dd)` : '#f8fafc',
                color: pos === 'center' ? '#fff' : '#1e293b',
                boxShadow: pos === 'center' ? '0 24px 48px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: pos !== 'center' ? '1px solid #e2e8f0' : 'none',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {project.category}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>{project.title}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{project.team}</div>
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 12 }}>
                {project.tech}
              </div>
            </motion.div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {mockProjects.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: 4, cursor: 'pointer',
              background: i === current ? '#6366f1' : '#cbd5e1', transition: 'all 0.3s',
            }} />
        ))}
      </div>
    </div>
  )
}
