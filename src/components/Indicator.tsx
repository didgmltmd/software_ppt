interface IndicatorProps {
  total: number
  current: number
  onDotClick: (index: number) => void
}

export function Indicator({ total, current, onDotClick }: IndicatorProps) {
  return (
    <div className="slide-indicator">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`dot ${i === current ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onDotClick(i)
          }}
        />
      ))}
    </div>
  )
}
