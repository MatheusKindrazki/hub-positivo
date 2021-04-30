import React, { useState } from 'react'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart
} from 'react-beautiful-dnd'
import classNames from 'classnames'

import {
  Tr,
  Thead,
  Th,
  Tfoot,
  Td,
  Tbody
} from '@psdhub/common/components/Table'
import type { TableProps } from '@psdhub/common/components/Table'
import { Box } from '@psdhub/common/components/'

import { reoderList as reorder } from '~/utils/reorderList'

import TableUI from './styles'
export interface TableSolution {
  solution: React.ReactNode | string
  profile: string
  schools: string
  activated: boolean
  id: string
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [items, setItems] = useState<TableSolution[]>(data)

  const onDragEnd = (result: DropResult, list: TableSolution[]) => {
    if (!result.destination) {
      return
    }

    const reorderList = reorder(
      list,
      result.source.index,
      result.destination.index
    )

    setItems(reorderList)
  }

  const onBeforeDragStart = async (_start: DragStart) => {
    console.log('onBeforeDragStart')
  }

  return (
    <DragDropContext
      onDragEnd={e => onDragEnd(e, items)}
      onBeforeDragStart={onBeforeDragStart}
    >
      <Droppable droppableId="accessControl">
        {(provided, _snapshot) => {
          return (
            <Box
              overflow="auto"
              m="3"
              borderWidth="thin"
              borderColor="gray.400"
              rounded="md"
            >
              <TableUI>
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
                          {...provided.dragHandleProps}
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
                                alignItems="center"
                                justifyContent="center"
                              >
                                {c?.render ? c.render(e) : e[c.property]}
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
export { Thead, Td, Th, Tr, Tfoot, Tbody }
