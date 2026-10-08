import { Link } from '@tanstack/react-router'

import logo from '../assets/branding/image03.png'

export function BrandLink() {
  return (
    <Link
      to="/"
      className="inline-flex shrink-0 items-center gap-2.5 rounded-xl transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      aria-label="Корочки.есть — на главную"
    >
      <img className="h-11 w-16 object-contain" src={logo} alt="" />
      <span className="hidden sm:block">
        <strong className="block text-base text-slate-800">Корочки.есть</strong>
        <small className="block text-xs text-slate-500">Портал дополнительного образования</small>
      </span>
    </Link>
  )
}
