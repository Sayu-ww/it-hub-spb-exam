import slide1 from '../assets/slider/image10.webp'
import slide2 from '../assets/slider/image11.jpg'
import slide3 from '../assets/slider/image12.webp'
import slide4 from '../assets/slider/image13.webp'

import type {
  ApplicationStatus,
  ApplicationStatusFilter,
  PaymentMethod,
  RegistrationField,
  RegistrationValues,
} from '../types/app'

export const STORAGE_KEY = 'korochki-demo-storage'
export const CURRENT_USER_KEY = 'korochki-current-user'
export const ADMIN_PAGE_SIZE = 5
export const SLIDER_INTERVAL_MS = 3000
export const COURSES = [
  'Основы алгоритмизации и программирования',
  'Основы веб-дизайна',
  'Основы проектирования баз данных',
]
export const INITIAL_APPLICATION_FILTER: ApplicationStatusFilter = 'ALL'
export const NEW_APPLICATION_INITIAL_VALUES = {
  course: COURSES[0]!,
  startDate: '',
  paymentMethod: 'CASH' as PaymentMethod,
}

export const APPLICATION_STATUSES: ApplicationStatus[] = ['NEW', 'IN_PROGRESS', 'COMPLETED']

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  NEW: 'Новая',
  IN_PROGRESS: 'Идет обучение',
  COMPLETED: 'Обучение завершено',
}

export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  NEW: 'bg-amber-100 text-amber-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
}

export const PAYMENT_METHODS: Array<{ value: PaymentMethod; label: string }> = [
  { value: 'CASH', label: 'Наличными' },
  { value: 'PHONE_TRANSFER', label: 'Переводом по номеру телефона' },
]

export const REVIEW_RATINGS = [5, 4, 3, 2, 1]

export const REGISTRATION_INITIAL_VALUES: RegistrationValues = {
  login: '',
  password: '',
  fullname: '',
  phone: '',
  email: '',
}

export const REGISTRATION_FIELDS: RegistrationField[] = [
  {
    name: 'login',
    label: 'Логин',
    type: 'text',
    inputMode: 'text',
    mask: 'latin-alphanumeric',
    placeholder: 'Латиница и цифры, минимум 6 символов',
  },
  { name: 'password', label: 'Пароль', type: 'password', placeholder: 'Минимум 8 символов' },
  {
    name: 'fullname',
    label: 'ФИО',
    type: 'text',
    inputMode: 'text',
    mask: 'cyrillic',
    placeholder: 'Иванов Иван Иванович',
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'tel',
    inputMode: 'tel',
    mask: 'phone',
    placeholder: '8(XXX)XXX-XX-XX',
  },
  { name: 'email', label: 'Электронная почта', type: 'email', placeholder: 'name@example.com' },
]

export const HOME_FEATURES = [
  'Гибкий график и дистанционный формат',
  'Поддержка администратора и заявки в одну систему',
  'Возможность оплатить курс удобным способом',
]

export const HOME_HIGHLIGHT_GROUPS = [
  { title: 'Популярные курсы', items: COURSES },
  { title: 'Почему выбирают нас', items: HOME_FEATURES },
]

export const GUEST_NAVIGATION_LINKS = [
  { to: '/login' as const, label: 'Войти', primary: false },
  { to: '/register' as const, label: 'Регистрация', primary: true },
]

export const SLIDES = [slide1, slide2, slide3, slide4]

export const ADMIN_TABLE_COLUMNS = ['Пользователь', 'Курс', 'Дата', 'Оплата', 'Статус']
