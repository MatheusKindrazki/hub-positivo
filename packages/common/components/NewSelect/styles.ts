import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  position: relative;
  background: transparent;
  outline: none;
  border: none;
  width: 100%;

  max-width: 100%;

  font-size: ${({ theme }) => theme.fontSizes.md};

  .hub-select-header {
    position: relative;
    background: white;
    outline: none;
    width: 100%;
    border: 1px solid;
    overflow: hidden;

    border-radius: ${({ theme }) => theme.radii.md};
    border-color: ${({ theme }) => theme.colors.gray[400]};

    padding-inline-start: ${({ theme }) => theme.space[4]};
    padding-inline-end: ${({ theme }) => theme.space[10]};

    height: 3rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    .hub-select-header-title {
      width: 100%;
    }
  }

  .hub-content {
    max-height: 200px;
  }

  .hub-select-item {
    &:first-child {
      border-top-left-radius: ${props => props.theme.radii.md};
      border-top-right-radius: ${props => props.theme.radii.md};
    }
  }

  .rcs-custom-scroll {
    min-height: 0;
    min-width: 0;
  }
  .rcs-custom-scroll .rcs-outer-container {
    overflow: hidden;
  }
  .rcs-custom-scroll .rcs-outer-container .rcs-positioning {
    position: relative;
  }
  .rcs-custom-scroll .rcs-outer-container:hover .rcs-custom-scrollbar {
    opacity: 1;
    transition-duration: 0.2s;
  }
  .rcs-custom-scroll .rcs-inner-container {
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .rcs-custom-scroll .rcs-inner-container:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 0;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.05) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    pointer-events: none;
    transition: height 0.1s ease-in;
    will-change: height;
  }
  .rcs-custom-scroll .rcs-inner-container.rcs-content-scrolled:after {
    height: 5px;
    transition: height 0.15s ease-out;
  }
  .rcs-custom-scroll.rcs-scroll-handle-dragged .rcs-inner-container {
    user-select: none;
  }
  .rcs-custom-scroll .rcs-custom-scrollbar {
    position: absolute;
    height: 100%;
    width: 6px;
    right: 3px;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.4s ease-out;
    padding: 6px 0;
    box-sizing: border-box;
    will-change: opacity;
    pointer-events: none;
  }
  .rcs-custom-scroll .rcs-custom-scrollbar.rcs-custom-scrollbar-rtl {
    right: auto;
    left: 3px;
  }
  .rcs-custom-scroll.rcs-scroll-handle-dragged .rcs-custom-scrollbar {
    opacity: 1;
  }
  .rcs-custom-scroll .rcs-custom-scroll-handle {
    position: absolute;
    width: 100%;
    top: 0;
  }
  .rcs-custom-scroll .rcs-inner-handle {
    height: calc(100% - 12px);
    margin-top: 6px;
    background-color: ${({ theme }) => theme.colors.blue[400]};
    border-radius: 3px;
    mix-blend-mode: luminosity;
  }
`
