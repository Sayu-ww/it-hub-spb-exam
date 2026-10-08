import { hashPassword } from '../lib/hash'
import type { DemoState, UserRecord } from '../types/app'

const SEEDED_USERS: UserRecord[] = [
  {
    id: 'admin-user',
    login: 'Admin',
    password: hashPassword('KorokNET'),
    fullname: 'Админ Админович',
    phone: '8(922)344-91-23',
    email: 'admin@example.com',
    role: 'ADMIN',
  },
  {
    id: 'demo-user',
    login: 'testuser',
    password: hashPassword('testuser'),
    fullname: 'Юзер Юзерович',
    phone: '8(912)345-67-89',
    email: 'testuser@example.com',
    role: 'USER',
  },
]

export const SEEDED_DEMO_STATE: DemoState = {
  users: SEEDED_USERS,
  applications: [
    {
      id: 'app-demo-1',
      userId: 'demo-user',
      course: 'Основы алгоритмизации и программирования',
      startDate: '12.12.2027',
      paymentMethod: 'PHONE_TRANSFER',
      status: 'COMPLETED',
      createdAt: '2027-10-05T09:00:00.000Z',
    },
  ],
  reviews: [],
}
