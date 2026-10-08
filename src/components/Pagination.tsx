import { Button } from './ui'

export function Pagination({
  page,
  pagesCount,
  onPageChange,
}: {
  page: number
  pagesCount: number
  onPageChange: (page: number) => void
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      >
        Назад
      </Button>
      <span className="text-sm text-slate-600">
        {page} / {pagesCount}
      </span>
      <Button
        variant="secondary"
        disabled={page >= pagesCount}
        onClick={() => onPageChange(Math.min(pagesCount, page + 1))}
      >
        Вперед
      </Button>
    </div>
  )
}
