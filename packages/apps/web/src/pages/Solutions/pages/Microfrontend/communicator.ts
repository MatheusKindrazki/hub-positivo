import { User } from '~/store/modules/user/types'

import { postInformations } from '@psdhub/helpers'
import { Theme } from '@psdhub/common/layout/styles'

type NonNullable<T> = Exclude<T, null | undefined> // Remove null and undefined from T

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

function communicatorMCF(data: Store.State, colors: Theme['colors']): void {
  const primary_color = colors.blue

  const { reduced_token, token } = data.auth
  const { guid, colorProfile } = data.profile
  const { info, school } = data.user
  const { class: user_class } = data.educationalStage

  const user_info = info as NoUndefinedField<User>

  postInformations({
    primary_color,
    reduced_token: reduced_token as string,
    token: token as string,
    user_info,
    logged_in: {
      profile: guid,
      profileTheme: colorProfile as string,
      school: {
        id: school?.value as string,
        name: school?.label as string,
        class: user_class as string
      }
    }
  })
}
export default communicatorMCF
