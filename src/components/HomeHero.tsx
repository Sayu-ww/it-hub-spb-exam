import { Link } from '@tanstack/react-router'

import heroImage from '../assets/branding/image01.webp'
import type { UserRole } from '../types/app'

export function HomeHero({ userRole }: { userRole: UserRole | null }) {
  return (
    <section className="animate-fade-up grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-panel md:grid-cols-[1.2fr_0.8fr] md:p-7">
      <div className="flex animate-fade-up flex-col justify-center gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
          Новый набор 2027
        </span>
        <h1 className="m-0 text-4xl font-bold leading-tight text-slate-800 sm:text-5xl">
          Выбирайте курс, который меняет карьеру.
        </h1>
        <p className="m-0 text-base leading-7 text-slate-600">
          Онлайн-образование для специалистов, которые хотят быстро закрыть пробелы в знаниях,
          получить практический навык и начать обучение без задержек.
        </p>
        {!userRole && (
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-semibold text-white transition hover:-translate-y-px hover:from-blue-700 hover:to-blue-800"
              to="/register"
            >
              Создать аккаунт
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-blue-50 px-5 py-3 font-semibold text-slate-800 transition hover:-translate-y-px hover:bg-blue-100"
              to="/login"
            >
              Есть аккаунт
            </Link>
          </div>
        )}
      </div>

      <div className="min-h-60">
        <img
          className="h-full min-h-60 w-full animate-fade-in rounded-2xl object-cover"
          src={heroImage}
          alt="Демонстрация обучения"
        />
      </div>
    </section>
  )
}
