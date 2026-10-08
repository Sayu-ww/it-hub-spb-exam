import type { RegistrationFieldName } from '../types/app'

export function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`
}

export function isValidDateInput(value: string) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value)
  if (!match) return false

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  if (month < 1 || month > 12 || year < 1) return false

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return day >= 1 && day <= daysInMonth[month - 1]!
}

export function isDateOnOrAfterToday(value: string, today = new Date()) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value)
  if (!match || !isValidDateInput(value)) return false

  const [day, month, year] = match.slice(1).map(Number)
  const currentDate = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
  const selectedDate = [year!, month!, day!]

  for (let index = 0; index < currentDate.length; index += 1) {
    if (selectedDate[index]! > currentDate[index]!) return true
    if (selectedDate[index]! < currentDate[index]!) return false
  }
  return true
}

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''

  let formatted = digits[0]!
  if (digits.length > 1) {
    formatted += `(${digits.slice(1, 4)}`
    if (digits.length >= 4) formatted += ')'
  }
  if (digits.length > 4) formatted += digits.slice(4, 7)
  if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`
  if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`
  return formatted
}

export function formatRegistrationInput(field: RegistrationFieldName, value: string) {
  switch (field) {
    case 'login':
      return value.replace(/[^A-Za-z0-9]/g, '')
    case 'fullname':
      return value.replace(/[^А-Яа-яЁё\s]/g, '')
    case 'phone':
      return formatPhoneInput(value)
    case 'password':
    case 'email':
      return value
  }
}
