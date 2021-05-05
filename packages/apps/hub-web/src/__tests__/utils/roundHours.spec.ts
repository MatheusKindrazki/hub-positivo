import roundHours from '~/utils/formatData/roundHours'

describe('roundHours util', () => {
  it('should round hour if it doesn`t exact', () => {
    const zeroMinutes = 0
    const zeroSeconds = 0
    const date = new Date(2021, 11, 17, 5, 50, 19).getTime()
    const dateWithRoundedHour = new Date(
      2021,
      11,
      17,
      5,
      zeroMinutes,
      zeroSeconds
    ).getTime()

    expect(roundHours({ milliseconds: date }).getTime()).toEqual(
      dateWithRoundedHour
    )
  })
})
