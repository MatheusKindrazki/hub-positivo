import React, { useCallback, useState } from 'react'

import ReactTour from 'reactour'

export interface StepsTour {
  selector: string
  content: string
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center'
  style?: string
}

export interface TourProps {
  steps: StepsTour[]
  open: boolean
  onClosed: () => void
}

const Tour: React.FC<TourProps> = ({ steps, open, onClosed }) => {
  const [isTourOpen, setIsTourOpen] = useState(open)
  const handleClosed = useCallback(() => {
    setIsTourOpen(false)
    onClosed()
  }, [onClosed])

  return (
    <ReactTour
      steps={steps}
      isOpen={isTourOpen}
      disableKeyboardNavigation={['esc']}
      onRequestClose={handleClosed}
      accentColor="red"
      className="hub-tour"
    />
  )
}

export default Tour
