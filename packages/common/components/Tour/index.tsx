import React, { useCallback, useEffect } from 'react'

import ReactTour from 'reactour'

import GlobalStyle from './styles'
export interface StepsTour {
  selector: string
  content: string
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center'
}

export interface TourProps {
  steps: StepsTour[]
  open: boolean
  onClosed: () => void
}

const Tour: React.FC<TourProps> = ({ steps, open, onClosed }) => {
  const handleClosed = useCallback(() => {
    onClosed()
  }, [onClosed])

  useEffect(() => {
    if (open) {
      window.document.body.style.overflow = 'hidden'
    } else {
      window.document.body.style.overflow = 'auto'
    }
  }, [open])

  return (
    <>
      <ReactTour
        steps={steps}
        isOpen={open}
        disableKeyboardNavigation={['esc']}
        onRequestClose={handleClosed}
        accentColor="#1565C0"
        className="hub-tour"
      />
      <GlobalStyle />
    </>
  )
}

export default Tour
