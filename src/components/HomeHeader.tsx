import { Link } from '@tanstack/react-router'

import { BrandLink } from './BrandLink'
import { GUEST_NAVIGATION_LINKS } from '../constants/app'
import type { UserRole } from '../types/app'

export function HomeHeader({ userRole }: { userRole: UserRole | null }) {
  return (
    <header className="animate-slide-down flex flex-col justify-between gap-4 rounded-3xl border border-white/80 bg-white/70 p-4 shadow-panel backdrop-blur-xl sm:flex-row sm:items-center sm:px-5">
      <BrandLink />
      <nav className="flex items-center gap-3">
        {userRole ? (
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-semibold text-white transition hover:-translate-y-px hover:from-blue-700 hover:to-blue-800"
            to={userRole === 'ADMIN' ? '/admin' : '/applications'}
          >
            {userRole === 'ADMIN' ? 'Панель администратора' : 'Личный кабинет'}
          </Link>
        ) : (
          GUEST_NAVIGATION_LINKS.map((link) => (
            <Link
              className={
                link.primary
                  ? 'inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 font-semibold text-white transition hover:-translate-y-px hover:from-blue-700 hover:to-blue-800'
                  : 'font-semibold text-slate-700 hover:text-blue-700'
              }
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>
          ))
        )}
      </nav>
    </header>
  )
}
