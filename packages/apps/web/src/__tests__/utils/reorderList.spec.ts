import { reorderList } from '~/utils/reorderList'

describe('Reorder List util should work properly', () => {
  it('Should reorder list correctly', () => {
    const list: string[] = ['1', '2', '3', '4']
    const indexes = {
      from: 1,
      to: 2
    }

    const reordered = reorderList(list, indexes.from, indexes.to)
    expect(reordered).toStrictEqual(['1', '3', '2', '4'])
  })
})
