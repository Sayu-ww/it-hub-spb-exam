import { hashPassword } from './hash'
import { CURRENT_USER_KEY, STORAGE_KEY } from '../constants/app'
import { SEEDED_DEMO_STATE } from '../constants/demoData'
import type {
  ApplicationRecord,
  ApplicationStatus,
  DemoState,
  PaymentMethod,
  ReviewRecord,
  UserRecord,
} from '../types/app'

export type {
  ApplicationRecord,
  ApplicationStatus,
  DemoState,
  PaymentMethod,
  ReviewRecord,
  UserRecord,
  UserRole,
} from '../types/app'

function readState(): DemoState {
  if (typeof window === 'undefined') {
    return SEEDED_DEMO_STATE
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEEDED_DEMO_STATE))
    return SEEDED_DEMO_STATE
  }

  try {
    const parsed = JSON.parse(raw) as DemoState
    if (!parsed.users || !parsed.applications || !parsed.reviews) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEEDED_DEMO_STATE))
      return SEEDED_DEMO_STATE
    }
    return parsed
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEEDED_DEMO_STATE))
    return SEEDED_DEMO_STATE
  }
}

function writeState(nextState: DemoState) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
}

export function getCurrentUserId() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(CURRENT_USER_KEY)
}

export function setCurrentUserId(userId: string | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (userId) {
    window.localStorage.setItem(CURRENT_USER_KEY, userId)
    return
  }

  window.localStorage.removeItem(CURRENT_USER_KEY)
}

export function getAllUsers() {
  return readState().users
}

export function getUserById(userId: string | null | undefined) {
  if (!userId) {
    return null
  }

  return readState().users.find((user) => user.id === userId) ?? null
}

export function findUserByLogin(login: string) {
  return readState().users.find((user) => user.login.toLowerCase() === login.toLowerCase()) ?? null
}

export function loginUser(login: string, password: string) {
  const state = readState()
  const user = state.users.find(
    (entry) => entry.login.toLowerCase() === login.toLowerCase() && entry.password === hashPassword(password),
  )

  return user ?? null
}

export function createUser(input: {
  login: string
  password: string
  fullname: string
  phone: string
  email: string
}) {
  const state = readState()

  const isLoginTaken = state.users.some((user) => user.login.toLowerCase() === input.login.toLowerCase())
  const isEmailTaken = state.users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())

  if (isLoginTaken || isEmailTaken) {
    return null
  }

  const user: UserRecord = {
    id: `user-${Date.now()}`,
    login: input.login,
    password: hashPassword(input.password),
    fullname: input.fullname.trim(),
    phone: input.phone,
    email: input.email.toLowerCase(),
    role: 'USER',
  }

  const nextState = {
    ...state,
    users: [...state.users, user],
  }

  writeState(nextState)
  return user
}

export function getAllApplications() {
  return readState().applications
}

export function getApplicationsByUser(userId: string) {
  const state = readState()
  return state.applications
    .filter((entry) => entry.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function createApplication(input: {
  userId: string
  course: string
  startDate: string
  paymentMethod: PaymentMethod
}) {
  const state = readState()
  const application: ApplicationRecord = {
    id: `app-${Date.now()}`,
    userId: input.userId,
    course: input.course,
    startDate: input.startDate,
    paymentMethod: input.paymentMethod,
    status: 'NEW',
    createdAt: new Date().toISOString(),
  }

  const nextState = {
    ...state,
    applications: [application, ...state.applications],
  }

  writeState(nextState)
  return application
}

export function updateApplicationStatus(applicationId: string, status: ApplicationStatus) {
  updateApplicationStatuses([{ applicationId, status }])
}

export function updateApplicationStatuses(
  updates: Array<{ applicationId: string; status: ApplicationStatus }>,
) {
  if (updates.length === 0) {
    return
  }

  const state = readState()
  const statusesById = new Map(updates.map(({ applicationId, status }) => [applicationId, status]))
  const nextState = {
    ...state,
    applications: state.applications.map((entry) => {
      const status = statusesById.get(entry.id)
      return status ? { ...entry, status } : entry
    }),
  }

  writeState(nextState)
}

export function createReview(input: {
  applicationId: string
  userId: string
  rating: number
  text: string
}) {
  const state = readState()
  const review: ReviewRecord = {
    id: `review-${Date.now()}`,
    applicationId: input.applicationId,
    userId: input.userId,
    rating: input.rating,
    text: input.text,
    createdAt: new Date().toISOString(),
  }

  const nextState = {
    ...state,
    reviews: [review, ...state.reviews],
  }

  writeState(nextState)
  return review
}

export function getReviewsForApplication(applicationId: string) {
  return readState().reviews.filter((review) => review.applicationId === applicationId)
}

export function getApplicationById(id: string) {
  return readState().applications.find((entry) => entry.id === id) ?? null
}
