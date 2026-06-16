import { motion } from 'framer-motion'

function HoneyComb({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.15, 0.1], scale: 1 }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatType: 'reverse' }}
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        width: size, height: size * 1.15,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      }}
    />
  )
}

function HoneyDrop({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <motion.div
      animate={{ y: ['-10vh', '110vh'], opacity: [0, 0.8, 0.8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', left: `${x}%`, top: 0,
        width: 6, height: 14, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'linear-gradient(180deg, #fbbf2400, #fbbf24cc)',
      }}
    />
  )
}

function Bee({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -15, 10, -5, 0],
      }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, fontSize: '1.8rem' }}
    >
      🐝
    </motion.div>
  )
}

export function IntroScene() {
  const combs = [
    { x: 5, y: 10, size: 60, delay: 0 },
    { x: 12, y: 30, size: 45, delay: 0.5 },
    { x: 3, y: 55, size: 55, delay: 1 },
    { x: 85, y: 8, size: 50, delay: 0.3 },
    { x: 90, y: 35, size: 65, delay: 0.8 },
    { x: 88, y: 60, size: 40, delay: 1.2 },
    { x: 15, y: 75, size: 48, delay: 1.5 },
    { x: 80, y: 78, size: 52, delay: 0.7 },
    { x: 45, y: 5, size: 35, delay: 1.8 },
    { x: 55, y: 85, size: 38, delay: 2 },
  ]

  const drops = [
    { x: 20, delay: 0, duration: 6 },
    { x: 35, delay: 2, duration: 7 },
    { x: 50, delay: 1, duration: 5.5 },
    { x: 65, delay: 3, duration: 6.5 },
    { x: 80, delay: 1.5, duration: 7.5 },
    { x: 10, delay: 4, duration: 6 },
    { x: 92, delay: 2.5, duration: 5 },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* 배경 그래디언트 오버레이 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(245,158,11,0.06) 0%, transparent 50%)',
      }} />

      {/* 허니콤 패턴 */}
      {combs.map((c, i) => <HoneyComb key={i} {...c} />)}

      {/* 꿀방울 */}
      {drops.map((d, i) => <HoneyDrop key={i} {...d} />)}

      {/* 벌 */}
      <Bee x={8} y={20} delay={0} />
      <Bee x={85} y={15} delay={2} />
      <Bee x={75} y={70} delay={4} />

      {/* 큰 장식 원 (꿀색) */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: '-10%', top: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 60%)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', right: '-8%', bottom: '-8%',
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 60%)',
        }}
      />

      {/* 꿀통 일러스트 (중앙 아래) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.12, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
          fontSize: '6rem',
        }}
      >
        🍯
      </motion.div>
    </div>
  )
}
