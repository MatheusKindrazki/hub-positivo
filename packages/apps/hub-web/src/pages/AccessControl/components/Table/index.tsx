import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Table, { Tbody, Tr } from '@psdhub/common/components/Table'
import Box, { BoxProps } from '@psdhub/common/components/Box'

import Tdata, { Solution } from './Tdata'
import TableHead from './TableHead'
export interface TableProps extends BoxProps {
  solutions: Solution[]
}

const ControlTable: React.FC<TableProps> = ({ solutions }) => {
  return (
    <Box
      overflowX="auto"
      borderWidth="thin"
      borderColor="gray.500"
      borderRadius="md"
      margin="2"
    >
      <Table size="sm" variant="unstyled">
        <TableHead />
        <DragDropContext onDragEnd={() => console.log('end')}>
          <Droppable droppableId="table">
            {provided => {
              return (
                <Tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {solutions.map((solution, index) => (
                    <Draggable
                      key={solution.name}
                      index={index}
                      draggableId={index.toString() || ''}
                    >
                      {(provided, _snapshot) => (
                        <Tr
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <Tdata solution={solution} />
                        </Tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Tbody>
              )
            }}
          </Droppable>
        </DragDropContext>
      </Table>
    </Box>
  )
}

export default ControlTable
