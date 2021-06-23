import React, { useCallback } from 'react'

import classNames from 'classnames'

import { useMediaQuery } from '@psdhub/common/hooks'
import { CaretLeft, CaretRight } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import { Container } from './styles'
import Button from './components/ButtonPagination'

interface PaginationProps {
  currentPage: number
  loading?: boolean
  totalPages: number
  goToPage(page: number): void
}

const Pagination: React.FC<PaginationProps> = props => {
  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const { currentPage, goToPage, totalPages, loading } = props

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  const handleNextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [goToPage, currentPage])

  const renderPagination = () => {
    const pagination = []
    let lastDot = 0
    const splitBaseNumber = !isDesktop ? 2 : 3
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - splitBaseNumber &&
          i <= currentPage + splitBaseNumber)
      ) {
        pagination.push(
          <Button
            key={i}
            type="button"
            border="none"
            onClick={() => goToPage(i)}
            className={classNames({
              page: true,
              active: i === currentPage
            })}
            disabled={i === currentPage || loading}
          >
            {i}
          </Button>
        )
      } else {
        if (i - 1 !== lastDot) {
          pagination.push(
            <Button key={i} border="none" disabled className="page">
              ...
            </Button>
          )
        }
        lastDot = i
      }
    }
    return pagination
  }

  return (
    <Container
      className="hub-pagination"
      w="100%"
      d="flex"
      justifyContent="center"
    >
      <Button
        onClick={handlePrevPage}
        disabled={loading || currentPage === 1}
        className="prev"
        background="white"
      >
        <Box as={CaretLeft} size={20} color="gray.500" />
      </Button>
      <Box className="pages">{renderPagination()}</Box>
      <Button
        onClick={handleNextPage}
        disabled={loading || currentPage >= totalPages}
        className="next"
        background="white"
      >
        <Box as={CaretRight} size={20} color="blue.500" />
      </Button>
    </Container>
  )
}

export default Pagination
