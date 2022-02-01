import * as helpers from '@psdhub/helpers'

import communicatorMCF, {
  clearData
} from '~/pages/Solutions/pages/Microfrontend/communicator'

// jest.mock('@psdhub/helpers', () => {
//   const rest = jest.requireActual('@psdhub/helpers')
//   return {
//     ...rest,
//     getInformations: {
//       publish: jest.fn(),
//       clear: jest.fn()
//     }
//   }
// })
describe('communicatorMCF should work properly', () => {
  const data = {
    auth: { reduced_token: 'reducedToken', token: 'token' },
    profile: {
      guid: 'guid',
      colorProfile: 'colorProfile'
    },
    user: {
      info: {
        username: 'username',
        email: 'email',
        email_salas: 'email_salas',
        name: 'name'
      },
      school: {
        label: 'label',
        roles: [],
        user_id: 'user_id',
        value: 'value'
      }
    },
    educationalStage: {
      class: 'class'
    }
  }
  it('Should call publish function with correct params', () => {
    const spyPublish = jest.spyOn(
      helpers.getInformations as helpers.PostFnProps,
      'publish'
    )

    communicatorMCF(data as any, { blue: {} } as any)

    const { profile, auth, educationalStage, user } = data

    expect(spyPublish).toHaveBeenCalledWith({
      logged_in: {
        profile: profile.guid,
        profileTheme: profile.colorProfile,
        school: {
          id: user.school.value,
          name: user.school.label,
          class: educationalStage.class
        },
        educationalStage: {}
      },
      primary_color: {},
      reduced_token: auth.reduced_token,
      token: auth.token,
      user_info: user.info
    })
  })
})

describe('clearData should work properly', () => {
  it('Should call clear method', () => {
    const spyClear = jest.spyOn(
      helpers.getInformations as helpers.PostFnProps,
      'clear'
    )

    clearData()
    expect(spyClear).toHaveBeenCalledTimes(1)
  })
})
