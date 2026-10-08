import { ADMIN_TABLE_COLUMNS, APPLICATION_STATUSES, PAYMENT_METHODS, STATUS_LABELS } from '../constants/app'
import type { ApplicationRecord, ApplicationStatus, UserRecord } from '../types/app'
import { SelectControl } from './ui'

export function AdminApplicationsTable({
  applications,
  users,
  pendingStatuses,
  onStatusChange,
}: {
  applications: ApplicationRecord[]
  users: UserRecord[]
  pendingStatuses: Record<string, ApplicationStatus>
  onStatusChange: (applicationId: string, status: ApplicationStatus) => void
}) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            {ADMIN_TABLE_COLUMNS.map((column) => (
              <th
                className="border-b border-slate-200 px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500"
                key={column}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => {
            const applicant = users.find((user) => user.id === application.userId)
            const paymentLabel =
              PAYMENT_METHODS.find((method) => method.value === application.paymentMethod)?.label ?? '—'
            const details = [
              { key: 'course', value: application.course },
              { key: 'date', value: application.startDate },
              { key: 'payment', value: paymentLabel },
            ]

            return (
              <tr key={application.id}>
                <td className="border-b border-slate-200 px-3 py-3 align-top">
                  <div>{applicant?.fullname ?? 'Пользователь'}</div>
                  <small className="text-slate-500">{applicant?.email ?? '—'}</small>
                </td>
                {details.map(({ key, value }) => (
                  <td className="border-b border-slate-200 px-3 py-3 align-top" key={key}>
                    {value}
                  </td>
                ))}
                <td className="border-b border-slate-200 px-3 py-3 align-top">
                  <SelectControl
                    aria-label={`Статус заявки: ${applicant?.fullname ?? application.course}`}
                    value={pendingStatuses[application.id] ?? application.status}
                    onChange={(event) =>
                      onStatusChange(application.id, event.target.value as ApplicationStatus)
                    }
                  >
                    {APPLICATION_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {STATUS_LABELS[status]}
                      </option>
                    ))}
                  </SelectControl>
                </td>
              </tr>
            )
          })}
          {applications.length === 0 && (
            <tr>
              <td className="px-3 py-5 text-center text-slate-500" colSpan={ADMIN_TABLE_COLUMNS.length}>
                Заявок с таким статусом нет.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
