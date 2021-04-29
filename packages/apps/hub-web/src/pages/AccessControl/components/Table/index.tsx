import React, { useState, useRef, useEffect } from 'react'

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
  Tbody,
  TableUI
} from '@psdhub/common/components/Table'
import type { TableProps } from '@psdhub/common/components/Table'
import { Box } from '@psdhub/common/components/'

import { reoderList as reorder } from '~/utils/reorderList'

const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  const [items, setItems] = useState(data)
  const tableRef = useRef<HTMLTableElement>(null)
  useEffect(() => {
    // console.log(tableRef.current)
  }, [])

  const onDragEnd = (result: DropResult, list: any) => {
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
    console.log('width')
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
              <TableUI
                ref={tableRef}
                variant="unstyle"
                className={classNames(className, {
                  'accessControl-table': true
                })}
              >
                <Thead>
                  <Tr>
                    {columns?.map(({ header }, index) => (
                      <Th key={index} textAlign="center">
                        {header}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((e: any, index: number) => (
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
                            display: s.isDragging ? 'table' : 'table-row',
                            ...provided.draggableProps.style
                          }}
                          key={index}
                          className={classNames({
                            'hub-table-even': index % 2 === 0,
                            'hub-table-odd': index % 2 !== 0
                          })}
                        >
                          {columns?.map((c, i) => {
                            return (
                              <Td
                                width="500px"
                                key={i}
                                alignItems="center"
                                justifyContent="center"
                              >
                                {c?.render ? c.render(e) : e[c.property as any]}
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
