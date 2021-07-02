/* eslint-disable indent */
import React, { useState, useCallback, memo } from 'react'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd'
import classNames from 'classnames'

import { useDispatch } from 'react-redux'

import { PutSolutionData } from '~/store/modules/solutions/types'
import { solutionPostReorderRequest } from '~/store/modules/solutions/actions'

import { Tr, Thead, Th, Td, Tbody } from '@psdhub/common/components/Table'
import type { TableProps } from '@psdhub/common/components/Table'
import { Box } from '@psdhub/common/components/'

import { reorderList as reorder } from '~/utils/reorderList'

import TableUI from './styles'
import Order from '../Order'

export interface TableSolution {
  solution: React.ReactNode | string
  profile: React.ReactNode | string
  schools: React.ReactNode | string
  data: PutSolutionData
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const dispatch = useDispatch()
  const [items, setItems] = useState<TableSolution[]>(data)

  const onDragEnd = (result: DropResult, list: TableSolution[]) => {
    if (!result.destination) {
      return
    }

    const { source, destination } = result

    const reorderedList = reorder(list, source.index, destination.index)

    setItems(reorderedList)

    dispatch(
      solutionPostReorderRequest(
        reorderedList.map((l, i) => ({ id: l.data.id, ordem: i + 1 }))
      )
    )
  }

  const onChangeSwitch = useCallback(
    (solutionIndex: number) => {
      const solutions = items
      solutions[solutionIndex].data.ativo = !solutions[solutionIndex].data.ativo
      setItems(() => [...solutions])
    },
    [items]
  )

  return (
    <DragDropContext onDragEnd={e => onDragEnd(e, items)}>
      <Droppable droppableId="accessControl" ignoreContainerClipping>
        {provided => {
          return (
            <Box
              overflow="auto"
              m="3"
              borderWidth="thin"
              borderColor="gray.400"
              rounded="md"
            >
              <TableUI size={['sm', 'sm', 'md']} variant="simple">
                <Thead>
                  <Tr>
                    {columns?.map(({ header }, solutionIndex) => (
                      <Th
                        textTransform="capitalize"
                        key={solutionIndex}
                        fontSize={['sm', 'sm', 'md']}
                        p="1rem"
                      >
                        {header}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((e: any, solutionIndex: number) => (
                    <Draggable
                      key={solutionIndex}
                      index={solutionIndex}
                      draggableId={solutionIndex.toString() || ''}
                    >
                      {(provided, s) => (
                        <Tr
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            ...provided.draggableProps.style,
                            display: s.isDragging ? 'table' : 'table-row',
                            backgroundColor: 'white'
                          }}
                          key={solutionIndex}
                          className={classNames({
                            'hub-table-even': solutionIndex % 2 === 0,
                            'hub-table-odd': solutionIndex % 2 !== 0,
                            'table-row': true
                          })}
                        >
                          {columns?.map((c, i) => {
                            return (
                              <Td
                                verticalAlign="center"
                                style={
                                  i in [0, 1, 2]
                                    ? {
                                        minWidth: '18.75rem',
                                        opacity: items[solutionIndex].data.ativo
                                          ? '1'
                                          : '0.5'
                                      }
                                    : {}
                                }
                                key={i}
                                borderBottomColor={
                                  s.isDragging ? 'transparent' : 'gray.200'
                                }
                                borderBottomWidth="0.0625rem"
                              >
                                <Box d="flex" flexDir="row" alignItems="center">
                                  {i === 0 && (
                                    <Order
                                      dragHandleProps={provided.dragHandleProps}
                                      order={solutionIndex + 1}
                                    />
                                  )}
                                  {c.render
                                    ? c.render({
                                        ...e,
                                        ...e.data,
                                        index: solutionIndex,
                                        onChangeSwitch
                                      })
                                    : e[c.property]}
                                </Box>
                              </Td>
                            )
                          })}
                        </Tr>
                      )}
                    </Draggable>
                  ))}
                </Tbody>
                {provided.placeholder}
              </TableUI>
            </Box>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}

export default memo(Table)
