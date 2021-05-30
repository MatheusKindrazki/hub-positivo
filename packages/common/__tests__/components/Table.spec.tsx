import React from 'react'

import { render } from '@psdhub/test-utils'
import Table from '@psdhub/common/components/Table'

describe('Table renders without crashing', () => {
  const setup = () => {
    const columns = [
      { header: 'column_one', property: 'column_one' },
      { header: 'column_two', property: 'column_two' },
      { header: null, property: 'action', render: () => <span>action</span> }
    ]

    const data = [
      { column_one: 'data_column_one ', column_two: 'data_column_two' }
    ]
    const wrapper = render(
      <Table className="test-table" columns={columns} data={data} />
    )
    return { ...wrapper, data, columns }
  }

  it('Should render table`s headers', () => {
    const { queryByText } = setup()
    expect(queryByText('column_one')).not.toBeNull()
    expect(queryByText('column_two')).not.toBeNull()
  })

  it('Should render table`s data', () => {
    const { queryByText } = setup()
    expect(queryByText('data_column_one')).not.toBeNull()
    expect(queryByText('data_column_two')).not.toBeNull()
  })

  it('Should match snapshot', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
