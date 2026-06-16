import { useState, useCallback, useEffect, useRef } from 'react'
import { Slide } from './components/Slide'
import { Indicator } from './components/Indicator'
import { BackgroundParticles } from './components/BackgroundParticles'
import { slidesData } from './data/slides'

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    if (index < 0 || index >= slidesData.length) return
    if (index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 350)
  }, [isAnimating, currentSlide])

  const nextSlide = useCallback(() => {
    if (currentSlide < slidesData.length - 1) goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  // 키보드
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault(); prevSlide()
      } else if (e.key === 'Home') goToSlide(0)
      else if (e.key === 'End') goToSlide(slidesData.length - 1)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide])

  // 마우스 드래그 + 클릭 (슬라이드 스와이프)
  const handleMouseDown = (e: React.MouseEvent) => {
    // 인터랙티브 요소 위에서는 드래그 시작 안 함
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('input') || target.closest('[data-interactive]')) return
    dragStartX.current = e.clientX
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return
    const diff = Math.abs(e.clientX - dragStartX.current)
    if (diff > 10) isDragging.current = true
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return
    const diff = dragStartX.current - e.clientX

    if (isDragging.current && Math.abs(diff) > 80) {
      // 스와이프
      if (diff > 0) nextSlide()
      else prevSlide()
    } else if (!isDragging.current) {
      // 클릭 — 왼쪽 절반 / 오른쪽 절반
      const clickX = e.clientX
      const half = window.innerWidth / 2
      if (clickX < half) prevSlide()
      else nextSlide()
    }

    dragStartX.current = null
    isDragging.current = false
  }

  // 터치 스와이프
  const touchStartX = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('input') || target.closest('[data-interactive]')) return
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ width: '100vw', height: '100vh', cursor: 'default', userSelect: 'none' }}
    >
      <BackgroundParticles />

      <div className="presentation">
        {slidesData.map((slide, index) => (
          <Slide
            key={index}
            data={slide}
            index={index}
            isActive={index === currentSlide}
          />
        ))}
      </div>

      <Indicator total={slidesData.length} current={currentSlide} onDotClick={goToSlide} />
      <div className="slide-number">{currentSlide + 1} / {slidesData.length}</div>
    </div>
  )
}
