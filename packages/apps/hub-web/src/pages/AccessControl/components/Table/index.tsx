import React, { useState } from 'react'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
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
import type { TableProps, Data } from '@psdhub/common/components/Table'

import { reoderList as reorder } from '~/utils/reorderList'

const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  const [items, setItems] = useState<Data>(data)

  const onDragEnd = (result: DropResult, list: Data) => {
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

  return (
    <DragDropContext onDragEnd={e => onDragEnd(e, items)}>
      <Droppable droppableId="accessControl">
        {provided => {
          return (
            <TableUI
              className={classNames(className, { 'accessControl-table': true })}
            >
              <Thead>
                <Tr>
                  {columns?.map(({ header }, index) => (
                    <Th key={index}>{header}</Th>
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
                    {provided => (
                      <Tr
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        key={index}
                        className={classNames({
                          'hub-table-even': index % 2 === 0,
                          'hub-table-odd': index % 2 !== 0
                        })}
                      >
                        {columns?.map((c, i) => {
                          return (
                            <Td key={i}>
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
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}

export default Table
export { Thead, Td, Th, Tr, Tfoot, Tbody }
