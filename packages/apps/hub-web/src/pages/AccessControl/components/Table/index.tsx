import React, { useState } from 'react'

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

import { reoderList as reorder } from '~/utils/reorderList'

import GrabIcon from '~/components/GrabIcon'

import TableUI from './styles'

export interface TableSolution {
  solution: React.ReactNode | string
  profile: string
  schools: string
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
    console.log({ list })
    dispatch(
      solutionPostReorderRequest(
        reorderedList.map((l, i) => ({ id: l.data.id, ordem: i + 1 }))
      )
    )
  }

  return (
    <DragDropContext onDragEnd={e => onDragEnd(e, items)}>
      <Droppable droppableId="accessControl">
        {provided => {
          return (
            <Box
              overflow="auto"
              m="3"
              borderWidth="thin"
              borderColor="gray.400"
              rounded="md"
            >
              <TableUI size="md" varitant="unstyled">
                <Thead>
                  <Tr>
                    {columns?.map(({ header }, index) => (
                      <Th key={index}>{header}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((e: any, index) => (
                    <Draggable
                      key={index}
                      index={index}
                      draggableId={index.toString() || ''}
                    >
                      {(provided, s) => (
                        <Tr
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            ...provided.draggableProps.style,
                            display: s.isDragging ? 'table' : 'table-row'
                          }}
                          key={index}
                          className={classNames({
                            'hub-table-even': index % 2 === 0,
                            'hub-table-odd': index % 2 !== 0,
                            'table-row': true
                          })}
                        >
                          {columns?.map((c, i) => {
                            return (
                              <Td
                                key={i}
                                borderBottomColor={
                                  s.isDragging ? 'transparent' : 'gray.200'
                                }
                                borderBottomWidth="0.0625rem"
                              >
                                {i === 0 && (
                                  <GrabIcon
                                    {...provided.dragHandleProps}
                                    float={['left']}
                                    mt="2"
                                  />
                                )}
                                {c?.render
                                  ? c.render({ ...e.data })
                                  : e[c.property]}
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

export default Table
