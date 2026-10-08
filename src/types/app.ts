export type UserRole = 'USER' | 'ADMIN'
export type ApplicationStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED'
export type ApplicationStatusFilter = 'ALL' | ApplicationStatus
export type PaymentMethod = 'CASH' | 'PHONE_TRANSFER'
export type RegistrationFieldName = 'login' | 'password' | 'fullname' | 'phone' | 'email'

export type UserRecord = {
  id: string
  login: string
  password: string
  fullname: string
  phone: string
  email: string
  role: UserRole
}

export type ApplicationRecord = {
  id: string
  userId: string
  course: string
  startDate: string
  paymentMethod: PaymentMethod
  status: ApplicationStatus
  createdAt: string
}

export type ReviewRecord = {
  id: string
  applicationId: string
  userId: string
  rating: number
  text: string
  createdAt: string
}

export type DemoState = {
  users: UserRecord[]
  applications: ApplicationRecord[]
  reviews: ReviewRecord[]
}

export type RegistrationValues = {
  login: string
  password: string
  fullname: string
  phone: string
  email: string
}

export type RegistrationField = {
  name: RegistrationFieldName
  label: string
  type: 'text' | 'password' | 'email' | 'tel'
  placeholder: string
  inputMode?: 'text' | 'numeric' | 'email' | 'tel'
  mask?: 'latin-alphanumeric' | 'cyrillic' | 'phone'
}
