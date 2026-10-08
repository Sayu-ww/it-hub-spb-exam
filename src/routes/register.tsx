import { Link, createRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { BrandLink } from '../components/BrandLink'
import { Alert, AuthPanel, Button, FieldLabel, PageShell, TextControl } from '../components/ui'
import { REGISTRATION_FIELDS, REGISTRATION_INITIAL_VALUES } from '../constants/app'
import type { RegistrationFieldName, RegistrationValues } from '../types/app'
import { createUser, setCurrentUserId } from '../lib/demoStore'
import { formatRegistrationInput } from '../lib/inputMasks'
import { validateRegistration } from '../lib/validators'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState<RegistrationValues>(() => ({ ...REGISTRATION_INITIAL_VALUES }))
  const [errors, setErrors] = useState<Partial<Record<RegistrationFieldName, string>>>({})
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (field: RegistrationFieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: formatRegistrationInput(field, value) }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setApiError('')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateRegistration(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccess('')
      return
    }

    const createdUser = createUser(values)
    if (!createdUser) {
      setApiError('Логин или адрес электронной почты уже заняты.')
      setSuccess('')
      return
    }

    setCurrentUserId(createdUser.id)
    setSuccess('Регистрация успешна. Перенаправляем в личный кабинет...')
    setErrors({})
    setApiError('')

    window.setTimeout(() => navigate({ to: '/applications' }), 700)
  }

  return (
    <PageShell>
      <BrandLink />
      <AuthPanel eyebrow="Регистрация" title="Создайте аккаунт">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {REGISTRATION_FIELDS.map((field) => (
            <FieldLabel key={field.name}>
              <span>{field.label}</span>
              <TextControl
                type={field.type}
                inputMode={field.inputMode}
                autoComplete={
                  field.name === 'password'
                    ? 'new-password'
                    : field.name === 'fullname'
                      ? 'name'
                      : field.name === 'phone'
                        ? 'tel'
                        : field.name
                }
                value={values[field.name]}
                onChange={(event) => handleChange(field.name, event.target.value)}
                maxLength={field.name === 'phone' ? 15 : undefined}
                aria-invalid={Boolean(errors[field.name])}
                className={errors[field.name] ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <small className="text-sm font-normal text-red-700">{errors[field.name]}</small>
              )}
            </FieldLabel>
          ))}

          {apiError && <Alert tone="error">{apiError}</Alert>}
          {success && <Alert tone="success">{success}</Alert>}

          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </form>

        <p className="mt-5 text-center text-slate-500">
          Уже зарегистрированы?{' '}
          <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/login">
            Войти
          </Link>
        </p>
      </AuthPanel>
    </PageShell>
  )
}
