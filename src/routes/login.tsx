import { Link, createRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import { BrandLink } from '../components/BrandLink'
import { Alert, AuthPanel, Button, FieldLabel, PageShell, TextControl } from '../components/ui'
import { getCurrentUserId, getUserById, loginUser, setCurrentUserId } from '../lib/demoStore'
import { formatRegistrationInput } from '../lib/inputMasks'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [currentUserId, setCurrentUserIdState] = useState<string | null>(null)
  const currentUser = getUserById(currentUserId)

  useEffect(() => {
    setCurrentUserIdState(getCurrentUserId())
  }, [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const user = loginUser(login, password)

    if (!user) {
      setError('Неверный логин или пароль.')
      return
    }

    setCurrentUserId(user.id)
    setCurrentUserIdState(user.id)
    navigate({ to: user.role === 'ADMIN' ? '/admin' : '/applications' })
  }

  if (currentUser) {
    const destination = currentUser.role === 'ADMIN' ? '/admin' : '/applications'

    return (
      <PageShell>
        <BrandLink />
        <AuthPanel title="Вы уже вошли в систему">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-semibold text-white transition hover:-translate-y-px"
              to={destination}
            >
              {currentUser.role === 'ADMIN' ? 'Панель администратора' : 'Личный кабинет'}
            </Link>
            <Button
              variant="secondary"
              onClick={() => {
                setCurrentUserId(null)
                setCurrentUserIdState(null)
              }}
            >
              Выйти
            </Button>
          </div>
        </AuthPanel>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <BrandLink />
      <AuthPanel eyebrow="Авторизация" title="Войдите в систему">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <FieldLabel>
            <span>Логин</span>
            <TextControl
              autoComplete="username"
              value={login}
              onChange={(event) => setLogin(formatRegistrationInput('login', event.target.value))}
              maxLength={64}
              placeholder="Введите логин"
            />
          </FieldLabel>

          <FieldLabel>
            <span>Пароль</span>
            <TextControl
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Введите пароль"
            />
          </FieldLabel>

          {error && <Alert tone="error">{error}</Alert>}

          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>

        <p className="mt-5 text-center text-slate-500">
          Еще не зарегистрированы?{' '}
          <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/register">
            Регистрация
          </Link>
        </p>
      </AuthPanel>
    </PageShell>
  )
}
