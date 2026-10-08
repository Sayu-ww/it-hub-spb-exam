export const REGISTRATION_PATTERNS = {
  login: /^[A-Za-z0-9]{6,}$/,
  fullname: /^[А-Яа-яЁё\s]+$/,
  phone: /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}
