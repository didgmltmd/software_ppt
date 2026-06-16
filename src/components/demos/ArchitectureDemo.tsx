import { motion } from 'framer-motion'

export function ArchitectureDemo() {
  return (
    <div data-interactive style={{ position: 'relative', width: 800, height: 380, margin: '0 auto' }}>
      {/* EC2 점선 영역 — FastAPI, Worker, PostgreSQL 포함 */}
      <div style={{
        position: 'absolute', left: 240, top: 40, width: 320, height: 300,
        border: '2px dashed #f59e0b80', borderRadius: 20,
        background: 'rgba(251,191,36,0.03)',
      }}>
        <div style={{ position: 'absolute', top: -14, left: 16, background: '#fffbeb', padding: '2px 12px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700, color: '#b45309', border: '1px solid #fde68a' }}>
          ☁️ AWS EC2 (Docker Compose)
        </div>
      </div>

      {/* EC2 내부 */}
      <Node icon="⚡" label="FastAPI" sub="Python 3.11 · Async" color="#6366f1" x={280} y={70} delay={0.1} />
      <Node icon="🤖" label="AI Worker ×2" sub="OpenAI · Map-Reduce" color="#10b981" x={280} y={170} delay={0.2} />
      <Node icon="🗄️" label="PostgreSQL 16" sub="14 Tables · UUID PK" color="#3b82f6" x={280} y={270} delay={0.3} />

      {/* EC2 밖 — 왼쪽: 클라이언트 */}
      <Node icon="⚛️" label="React SPA" sub="Vite + TailwindCSS" color="#06b6d4" x={40} y={130} delay={0} />

      {/* EC2 밖 — 오른쪽: 외부 서비스 */}
      <Node icon="📦" label="AWS S3" sub="파일 저장소" color="#ef4444" x={620} y={200} delay={0.4} />
      <Node icon="🔄" label="GitHub Actions" sub="CI/CD Pipeline" color="#1e293b" x={620} y={80} delay={0.5} />

      {/* 연결선 */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {/* Client → FastAPI */}
        <Arrow x1={185} y1={155} x2={275} y2={95} label="HTTPS" />
        {/* FastAPI → PostgreSQL */}
        <Arrow x1={340} y1={115} x2={340} y2={265} label="SQLAlchemy" />
        {/* FastAPI → Worker (세로) */}
        <Arrow x1={310} y1={115} x2={310} y2={165} label="" />
        {/* Worker → S3 */}
        <Arrow x1={420} y1={195} x2={615} y2={225} label="Upload" />
        {/* GitHub Actions → EC2 박스 (Deploy) */}
        <Arrow x1={615} y1={105} x2={565} y2={105} label="Deploy" />
      </svg>
    </div>
  )
}

function Node({ icon, label, sub, color, x, y, delay }: { icon: string; label: string; sub: string; color: string; x: number; y: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        position: 'absolute', left: x, top: y,
        background: '#ffffff', border: `2px solid ${color}`,
        borderRadius: 12, padding: '10px 14px', minWidth: 140,
        boxShadow: `0 4px 12px ${color}15`,
        display: 'flex', alignItems: 'center', gap: 8, zIndex: 2,
      }}
    >
      <div style={{ fontSize: '1.3rem' }}>{icon}</div>
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color }}>{label}</div>
        <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{sub}</div>
      </div>
    </motion.div>
  )
}

function Arrow({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5 3" />
      {label && (
        <text x={mx} y={my - 6} textAnchor="middle" fontSize={9} fill="#64748b" fontWeight={500}>
          {label}
        </text>
      )}
    </g>
  )
}
