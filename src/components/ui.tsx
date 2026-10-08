import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

import type { ApplicationStatus } from '../types/app'
import { STATUS_LABELS, STATUS_STYLES } from '../constants/app'

export function PageShell({ children }: PropsWithChildren) {
  return (
    <main className="animate-page-enter mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-5 px-3 py-6 pb-12 sm:px-4">
      {children}
    </main>
  )
}

export function Panel({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={`animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-panel transition-shadow duration-300 hover:shadow-xl sm:p-6 ${className}`}
    >
      {children}
    </section>
  )
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }
>) {
  const variantClass =
    variant === 'primary'
      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
      : 'border border-slate-200 bg-blue-50 text-slate-800 hover:bg-blue-100'

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm disabled:active:scale-100 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Alert({
  children,
  tone,
}: PropsWithChildren<{ tone: 'error' | 'success' }>) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`animate-fade-in rounded-xl px-4 py-3 ${
        tone === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'
      }`}
    >
      {children}
    </div>
  )
}

export function FieldLabel({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return (
    <label className={`flex flex-col gap-2 font-semibold text-slate-800 ${className}`}>
      {children}
    </label>
  )
}

export function TextControl({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
      {...props}
    />
  )
}

export function SelectControl({
  children,
  className = '',
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function TextAreaControl({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
      {...props}
    />
  )
}

export function AuthPanel({
  eyebrow,
  title,
  children,
}: PropsWithChildren<{ eyebrow?: string; title: string }>) {
  return (
    <Panel className="my-auto w-full max-w-xl self-center">
      <div className="mb-5">
        {eyebrow && (
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
            {eyebrow}
          </span>
        )}
        <h1 className="m-0 text-2xl font-bold leading-tight text-slate-800">{title}</h1>
      </div>
      {children}
    </Panel>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  brand,
  children,
}: PropsWithChildren<{ eyebrow: string; title: string; brand: ReactNode }>) {
  return (
    <header className="animate-slide-down flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex flex-wrap justify-between w-full gap-4">
        {brand}
        <div>
          <span className="block text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
            {eyebrow}
          </span>
          <h1 className="m-0 text-2xl font-bold leading-tight text-slate-800">{title}</h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </header>
  )
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full px-3 py-2 text-xs font-bold ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
