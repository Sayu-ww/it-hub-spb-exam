import { REGISTRATION_PATTERNS } from '../constants/validation'
import type { RegistrationValues } from '../types/app'

export function validateRegistration(input: RegistrationValues) {
  const errors: Partial<Record<keyof RegistrationValues, string>> = {}

  if (!REGISTRATION_PATTERNS.login.test(input.login)) {
    errors.login = 'Логин должен содержать латиницу и цифры, минимум 6 символов.'
  }

  if (input.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов.'
  }

  if (!REGISTRATION_PATTERNS.fullname.test(input.fullname.trim())) {
    errors.fullname = 'ФИО должно содержать только кириллицу и пробелы.'
  }

  if (!REGISTRATION_PATTERNS.phone.test(input.phone)) {
    errors.phone = 'Телефон должен быть в формате 8(XXX)XXX-XX-XX.'
  }

  if (!REGISTRATION_PATTERNS.email.test(input.email)) {
    errors.email = 'Введите корректный адрес электронной почты.'
  }

  return errors
}
