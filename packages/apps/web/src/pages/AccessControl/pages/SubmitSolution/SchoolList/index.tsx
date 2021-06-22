import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback
} from 'react'

import { Option } from '~/store/modules/solutions/types'

import { useDisclosure } from '@psdhub/common/hooks'
import { Box, Button, Text } from '@psdhub/common/components'

import { SlideFade } from '@chakra-ui/react'

import { Container } from './styles'
import AnimatedFade from './components/AnimatedFade'

export interface SchoolListHandler {
  setValue: (value: Option[]) => void
}

export interface SchoolListProps {
  onDelete: (value: Option[]) => void
}

const SchoolList = forwardRef<SchoolListHandler, SchoolListProps>(
  ({ onDelete }, ref) => {
    const [selectedSchools, setSelectedSchools] = useState<Option[]>([])

    const setValue = (value: Option[]) => {
      setSelectedSchools(value)
    }

    useImperativeHandle(ref, () => {
      return {
        setValue
      }
    })

    const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })

    const deleteOne = useCallback(
      (index: number) => {
        const schools = [...selectedSchools]
        schools.splice(index, 1)
        setSelectedSchools(schools)
        onDelete(schools)
      },
      [onDelete, selectedSchools]
    )

    const deleteAll = useCallback(() => {
      onClose()
      setTimeout(() => {
        setSelectedSchools([])
        onDelete([])
        onOpen()
      }, 300)
    }, [onClose, onDelete, onOpen])

    return (
      <Box d="flex" flexDir="column">
        <SlideFade offsetY="0" offsetX="-300px" in={isOpen}>
          {!!selectedSchools.length &&
            selectedSchools.map((school, i) => (
              <Container key={school.value} boxShadow="md">
                <AnimatedFade onDelete={() => deleteOne(i)}>
                  <Text color="gray.600">{school.label}</Text>
                </AnimatedFade>
              </Container>
            ))}
        </SlideFade>
        {!!selectedSchools.length && (
          <Button
            py="1.5rem"
            mt="1rem"
            alignSelf="flex-end"
            variant="ghost"
            textTransform="uppercase"
            color="blue.500"
            onClick={deleteAll}
            _hover={{ background: 'gray.400' }}
          >
            Apagar tudo
          </Button>
        )}
      </Box>
    )
  }
)

export default SchoolList
