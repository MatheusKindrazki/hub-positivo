import validateUUID from 'uuid-validate'

function validate(g: string): string | null {
  if (validateUUID(g)) return g

  let uuid: string | null

  const guid = g.match(/guid=([^&]+)/)

  if (guid !== null) {
    uuid = guid.length ? guid[1] : null

    if (validateUUID(uuid || '')) return uuid

    return null
  }

  return null
}

export default validate
