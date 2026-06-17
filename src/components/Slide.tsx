import React from 'react'
import type { SlideData } from '../data/slides'
import { CarouselDemo } from './demos/CarouselDemo'
import { ButtonDemo } from './demos/ButtonDemo'
import { StepFormDemo } from './demos/StepFormDemo'
import { AuthFlowDemo } from './demos/AuthFlowDemo'
import { AnalysisPipelineDemo } from './demos/AnalysisPipelineDemo'
import { ArchitectureDemo } from './demos/ArchitectureDemo'
import { IntroScene } from './demos/IntroScene'
import { ProblemSolveDemo } from './demos/ProblemSolveDemo'
import { aiProblemScenarios, studentFeProblemScenarios, adminFeProblemScenarios } from './demos/problemData'

interface SlideProps {
  data: SlideData
  isActive: boolean
  index: number
}

const DEMO_SLIDES: Record<number, () => React.ReactNode> = {
  3: () => <ArchitectureDemo />,
  7: () => <AuthFlowDemo />,
  10: () => <AnalysisPipelineDemo />,
  12: () => <ProblemSolveDemo scenarios={aiProblemScenarios} />,
  14: () => <StepFormDemo />,
  15: () => <CarouselDemo />,
  16: () => <ProblemSolveDemo scenarios={studentFeProblemScenarios} />,
  18: () => <ButtonDemo />,
  20: () => <ProblemSolveDemo scenarios={adminFeProblemScenarios} />,
}

export function Slide({ data, isActive, index }: SlideProps) {
  const bgClass = `slide-${data.type || 'white'}`
  const extraClass = data.className || ''
  const DemoComponent = DEMO_SLIDES[index]

  return (
    <div className={`slide ${bgClass} ${extraClass} ${isActive ? 'active' : ''}`}>
      {/* 인트로 슬라이드 배경 */}
      {index === 0 && isActive && <IntroScene />}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }} dangerouslySetInnerHTML={{ __html: data.html }} />
      {isActive && DemoComponent && (
        <div style={{ marginTop: 12, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <DemoComponent />
        </div>
      )}
    </div>
  )
}
