import { Link, createRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import { AdminApplicationsTable } from '../components/AdminApplicationsTable'
import { BrandLink } from '../components/BrandLink'
import { Pagination } from '../components/Pagination'
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
import {
  ADMIN_PAGE_SIZE,
  APPLICATION_STATUSES,
  INITIAL_APPLICATION_FILTER,
  STATUS_LABELS,
} from '../constants/app'
import {
  getAllApplications,
  getAllUsers,
  getCurrentUserId,
  getUserById,
  loginUser,
  setCurrentUserId,
  updateApplicationStatuses,
} from '../lib/demoStore'
import { formatRegistrationInput } from '../lib/inputMasks'
import type { ApplicationStatus, ApplicationStatusFilter } from '../types/app'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
})

function AdminPage() {
  const navigate = useNavigate()
  const [currentUserId, setCurrentUserIdState] = useState<string | null>(null)
  const currentUser = getUserById(currentUserId)
  const [login, setLogin] = useState('Admin')
  const [password, setPassword] = useState('KorokNET')
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApplicationStatusFilter>(
    INITIAL_APPLICATION_FILTER,
  )
  const [page, setPage] = useState(1)
  const [applications, setApplications] = useState(getAllApplications)
  const [pendingStatuses, setPendingStatuses] = useState<Record<string, ApplicationStatus>>({})
  const [saveMessage, setSaveMessage] = useState('')
  const [saveFailed, setSaveFailed] = useState(false)

  useEffect(() => {
    setCurrentUserIdState(getCurrentUserId())
  }, [])

  const handleLogin = (event: FormEvent) => {
    event.preventDefault()
    const user = loginUser(login, password)

    if (!user || user.role !== 'ADMIN') {
      setError('Неверный логин или пароль для панели администратора.')
      return
    }

    setCurrentUserId(user.id)
    setCurrentUserIdState(user.id)
    setError('')
  }

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return (
      <PageShell>
        <BrandLink />
        <AuthPanel eyebrow="Администратор" title="Вход в панель">
          <form className="flex flex-col gap-4" onSubmit={handleLogin} noValidate>
            <FieldLabel>
              <span>Логин</span>
              <TextControl
                autoComplete="username"
                value={login}
                onChange={(event) => setLogin(formatRegistrationInput('login', event.target.value))}
                maxLength={64}
              />
            </FieldLabel>
            <FieldLabel>
              <span>Пароль</span>
              <TextControl
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FieldLabel>
            {error && <Alert tone="error">{error}</Alert>}
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
          <p className="mb-0 mt-5 text-center">
            <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/login">
              Вернуться на авторизацию
            </Link>
          </p>
        </AuthPanel>
      </PageShell>
    )
  }

  const users = getAllUsers()
  const filteredApplications =
    statusFilter === 'ALL'
      ? applications
      : applications.filter(
          (application) => (pendingStatuses[application.id] ?? application.status) === statusFilter,
        )
  const pagesCount = Math.max(1, Math.ceil(filteredApplications.length / ADMIN_PAGE_SIZE))
  const visibleApplications = filteredApplications.slice(
    (page - 1) * ADMIN_PAGE_SIZE,
    page * ADMIN_PAGE_SIZE,
  )
  const pendingCount = Object.keys(pendingStatuses).length

  const handleSave = () => {
    try {
      updateApplicationStatuses(
        Object.entries(pendingStatuses).map(([applicationId, status]) => ({ applicationId, status })),
      )
      setApplications(getAllApplications())
      setPendingStatuses({})
      setSaveMessage('Изменения сохранены.')
      setSaveFailed(false)
    } catch (saveError) {
      setSaveMessage(
        `Не удалось сохранить изменения: ${
          saveError instanceof Error ? saveError.message : 'неизвестная ошибка'
        }`,
      )
      setSaveFailed(true)
    }
  }

  return (
    <PageShell>
      <SectionHeader brand={<BrandLink />} eyebrow="Панель администратора" title="Управление заявками">
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
        <div className="mb-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-end">
          <FieldLabel className="sm:max-w-xs">
            <span>Фильтр по статусу</span>
            <SelectControl
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as ApplicationStatusFilter)
                setPage(1)
              }}
            >
              <option value="ALL">Все статусы</option>
              {APPLICATION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </SelectControl>
          </FieldLabel>
          <Button onClick={handleSave} disabled={pendingCount === 0}>
            Сохранить изменения{pendingCount > 0 ? ` (${pendingCount})` : ''}
          </Button>
        </div>

        {saveMessage && <Alert tone={saveFailed ? 'error' : 'success'}>{saveMessage}</Alert>}

        <AdminApplicationsTable
          applications={visibleApplications}
          users={users}
          pendingStatuses={pendingStatuses}
          onStatusChange={(applicationId, status) => {
            const application = applications.find((item) => item.id === applicationId)
            if (!application) return

            setPendingStatuses((current) => {
              if (status === application.status) {
                const remaining = { ...current }
                delete remaining[applicationId]
                return remaining
              }
              return { ...current, [applicationId]: status }
            })
            setSaveMessage('')
            setSaveFailed(false)
            setPage(1)
          }}
        />

        <Pagination page={page} pagesCount={pagesCount} onPageChange={setPage} />
      </Panel>
    </PageShell>
  )
}
