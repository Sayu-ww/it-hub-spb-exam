import { HOME_HIGHLIGHT_GROUPS } from '../constants/app'

export function HomeHighlights() {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      {HOME_HIGHLIGHT_GROUPS.map((group) => (
        <article
          className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          key={group.title}
        >
          <h2 className="mb-3 mt-0 text-lg font-bold text-slate-800">{group.title}</h2>
          <ul className="m-0 flex list-disc flex-col gap-2.5 pl-5 text-slate-600">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}
