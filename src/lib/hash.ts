export function hashPassword(password: string) {
  let hash = 2166136261

  for (let index = 0; index < password.length; index += 1) {
    hash ^= password.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return (hash >>> 0).toString(16).padStart(8, '0')
}

export function verifyPassword(password: string, hash: string) {
  return hashPassword(password) === hash
}
