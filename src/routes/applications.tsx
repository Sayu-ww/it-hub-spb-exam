import { Link, createRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import { ApplicationCard } from '../components/ApplicationCard'
import { BrandLink } from '../components/BrandLink'
import {
  Alert,
  AuthPanel,
  Button,
  FieldLabel,
  PageShell,
  Panel,
  SectionHeader,
  SelectControl,
  TextControl,
} from '../components/ui'
import { COURSES, NEW_APPLICATION_INITIAL_VALUES, PAYMENT_METHODS } from '../constants/app'
import {
  createApplication,
  getApplicationsByUser,
  getCurrentUserId,
  getUserById,
  setCurrentUserId,
} from '../lib/demoStore'
import { formatDateInput, isDateOnOrAfterToday, isValidDateInput } from '../lib/inputMasks'
import type { PaymentMethod } from '../types/app'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/applications',
  component: ApplicationsPage,
})

function ApplicationsPage() {
  const navigate = useNavigate()
  const [currentUserId, setCurrentUserIdState] = useState<string | null>(null)
  const user = useMemo(() => getUserById(currentUserId), [currentUserId])
  const [draft, setDraft] = useState(() => ({ ...NEW_APPLICATION_INITIAL_VALUES }))
  const [message, setMessage] = useState('')
  const [dateError, setDateError] = useState('')

  useEffect(() => {
    setCurrentUserIdState(getCurrentUserId())
  }, [])

  if (!user) {
    return (
      <PageShell>
        <BrandLink />
        <AuthPanel title="Доступ ограничен">
          <p className="mb-4 mt-0 text-slate-600">Необходимо войти в систему, чтобы просматривать заявки.</p>
          <Link
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-semibold text-white"
            to="/login"
          >
            Войти
          </Link>
        </AuthPanel>
      </PageShell>
    )
  }

  if (user.role === 'ADMIN') {
    return (
      <PageShell>
        <BrandLink />
        <AuthPanel title="Для администратора доступна отдельная панель">
          <Link
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-semibold text-white"
            to="/admin"
          >
            Перейти в панель администратора
          </Link>
        </AuthPanel>
      </PageShell>
    )
  }

  const applications = getApplicationsByUser(user.id)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isValidDateInput(draft.startDate)) {
      setDateError('Введите корректную дату в формате ДД.ММ.ГГГГ.')
      setMessage('')
      return
    }

    if (!isDateOnOrAfterToday(draft.startDate)) {
      setDateError('Дата начала не может быть раньше сегодняшнего дня.')
      setMessage('')
      return
    }

    createApplication({
      userId: user.id,
      course: draft.course,
      startDate: draft.startDate,
      paymentMethod: draft.paymentMethod,
    })
    setDraft({ ...NEW_APPLICATION_INITIAL_VALUES })
    setDateError('')
    setMessage('Заявка успешно отправлена на рассмотрение администратору.')
    navigate({ to: '/applications' })
  }

  return (
    <PageShell>
      <SectionHeader brand={<BrandLink />} eyebrow="Личный кабинет" title={user.fullname}>
        <Button
          variant="secondary"
          onClick={() => {
            setCurrentUserId(null)
            setCurrentUserIdState(null)
            navigate({ to: '/login' })
          }}
        >
          Выйти
        </Button>
      </SectionHeader>

      <Panel>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="m-0 text-xl font-bold text-slate-800">Новая заявка</h2>
          <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/">
            На главную
          </Link>
        </div>

        <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit} noValidate>
          <FieldLabel>
            <span>Наименование курса</span>
            <SelectControl
              value={draft.course}
              onChange={(event) => setDraft((current) => ({ ...current, course: event.target.value }))}
            >
              {COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </SelectControl>
          </FieldLabel>

          <FieldLabel>
            <span>Желаемая дата начала</span>
            <TextControl
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={draft.startDate}
              onChange={(event) => {
                setDraft((current) => ({
                  ...current,
                  startDate: formatDateInput(event.target.value),
                }))
                setDateError('')
              }}
              placeholder="ДД.ММ.ГГГГ"
            />
            {dateError && <small className="text-sm font-normal text-red-700">{dateError}</small>}
          </FieldLabel>

          <FieldLabel>
            <span>Способ оплаты</span>
            <SelectControl
              value={draft.paymentMethod}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  paymentMethod: event.target.value as PaymentMethod,
                }))
              }
            >
              {PAYMENT_METHODS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectControl>
          </FieldLabel>

          <Button type="submit" className="w-full sm:w-fit">
            Отправить
          </Button>
        </form>

        {message && <Alert tone="success">{message}</Alert>}
      </Panel>

      <Panel>
        <h2 className="mb-5 mt-0 text-xl font-bold text-slate-800">Мои заявки</h2>
        <div className="flex flex-col max-h-150 overflow-scroll gap-4 rounded-3xl">
          {applications.length === 0 ? (
            <p className="m-0 text-slate-500">
              У вас пока нет заявок. После подачи заявки она появится здесь.
            </p>
          ) : (
            applications.map((application) => (
              <ApplicationCard key={application.id} application={application} user={user} />
            ))
          )}
        </div>
      </Panel>
    </PageShell>
  )
}
