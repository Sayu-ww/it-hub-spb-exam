import { useEffect, useState } from 'react'

import { SLIDER_INTERVAL_MS, SLIDES } from '../constants/app'

export function Slider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDER_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-panel">
      <div className="relative h-52 overflow-hidden sm:h-72">
        {SLIDES.map((slide, slideIndex) => (
          <img
            key={slide}
            src={slide}
            alt={`Слайд ${slideIndex + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
              slideIndex === index ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-4 bottom-4 flex justify-between">
        <button
          type="button"
          className="grid size-11 place-items-center text-center rounded-xl border border-slate-200 bg-white/85 text-3xl text-slate-800 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-md active:scale-95"
          onClick={() => setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Назад"
        >
          ‹
        </button>
        <button
          type="button"
          className="grid size-11 place-items-center text-center rounded-xl border border-slate-200 bg-white/85 text-3xl text-slate-800 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-md active:scale-95"
          onClick={() => setIndex((current) => (current + 1) % SLIDES.length)}
          aria-label="Далее"
        >
          ›
        </button>
      </div>
    </div>
  )
}
