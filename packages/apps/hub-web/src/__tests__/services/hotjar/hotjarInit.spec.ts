import { hotjar } from 'react-hotjar'

import hotjarInit from '~/services/hotjar/hotjarInit'

jest.mock('react-hotjar')

process.env.REACT_APP_HOTJAR_ID = 'fake-id'

it('Should start Hotjar correctly', () => {
  const mockInit = jest.spyOn(hotjar, 'initialize')

  hotjarInit()

  expect(mockInit).toBeCalledWith('fake-id', 6)
})
