import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { productRequest } from '~/store/modules/products/actions'
import { setEducationalStage } from '~/store/modules/educationalStage/actions'

import { Box, Button } from '@psdhub/common/components'

import { MenuContainer } from './styles'

const educationalLevelsOrder = ['EI', 'EF1', 'EF2', 'EM', 'PRE']

const EducationalLevelMenu: React.FC = () => {
  const dispatch = useDispatch()

  const orderEducationalLevel = useCallback(
    (levelArr: { label: string; value: string }[]) =>
      educationalLevelsOrder.map(level =>
        levelArr.find(option => option.value === level)
      ),
    []
  )

  const setEducationalLevel = useCallback(
    data => {
      dispatch(setEducationalStage(data))
      dispatch(productRequest({}))
    },
    [dispatch]
  )

  const { name: profileName } = useSelector(
    (state: Store.State) => state.profile
  )

  const { levels, level: selectedLevel } = useSelector(
    (state: Store.State) => state.educationalStage
  )
  if (!levels?.length || profileName !== 'Professor' || selectedLevel === '') {
    return null
  }

  const orderedLevels = orderEducationalLevel(levels)

  return (
    <MenuContainer data-testid="educational-level-menu" d="flex">
      {orderedLevels.map(level => {
        if (!level) return
        return (
          <Box px="2.5" key={level.value} className="nav-container">
            <Button
              onClick={() => setEducationalLevel(level.value)}
              className={
                level.value === selectedLevel ? 'active level' : 'level'
              }
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
        )
      })}
    </MenuContainer>
  )
}

export default EducationalLevelMenu
