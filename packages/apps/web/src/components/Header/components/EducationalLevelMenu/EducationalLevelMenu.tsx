import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { productRequest } from '~/store/modules/products/actions'
import { setEducationalStage } from '~/store/modules/educationalStage/actions'

import { Box, Button } from '@psdhub/common/components'

import { MenuContainer } from './styles'

const EducationalLevelMenu: React.FC = () => {
  const dispatch = useDispatch()

  const { name: profileName } = useSelector(
    (state: Store.State) => state.profile
  )

  const { levels, level: selectedLevel } = useSelector(
    (state: Store.State) => state.educationalStage
  )

  const setEducationalLevel = useCallback(
    data => {
      dispatch(setEducationalStage(data))
      dispatch(productRequest({}))
    },
    [dispatch]
  )

  if (!levels?.length || profileName !== 'Professor' || selectedLevel === '') {
    return null
  }

  return (
    <MenuContainer d="flex">
      {levels.map(level => (
        <Box px="2.5" key={level.value} className="nav-container">
          <Button
            onClick={() => setEducationalLevel(level.value)}
            className={level.value === selectedLevel ? 'active level' : 'level'}
            alignSelf="self-end"
            variant="unstyled"
            textColor="gray.500"
            fontFamily="TTNORMS"
            fontWeight="500"
            height="12"
          >
            {level.label}
          </Button>
        </Box>
      ))}
    </MenuContainer>
  )
}

export default EducationalLevelMenu
