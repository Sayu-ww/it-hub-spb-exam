import { useState } from 'react'
import type { FormEvent } from 'react'

import { REVIEW_RATINGS } from '../constants/app'
import { createReview, getReviewsForApplication } from '../lib/demoStore'
import type { ApplicationRecord, UserRecord } from '../types/app'
import { Button, FieldLabel, SelectControl, StatusBadge, TextAreaControl } from './ui'

export function ApplicationCard({
  application,
  user,
}: {
  application: ApplicationRecord
  user: UserRecord
}) {
  const [rating, setRating] = useState(REVIEW_RATINGS[0]!)
  const [reviewText, setReviewText] = useState('')
  const [reviewSent, setReviewSent] = useState(false)
  const reviews = getReviewsForApplication(application.id)

  const onReviewSubmit = (event: FormEvent) => {
    event.preventDefault()
    createReview({
      applicationId: application.id,
      userId: user.id,
      rating,
      text: reviewText,
    })
    setReviewSent(true)
    setReviewText('')
  }

  return (
    <article className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-4 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h3 className="mb-2 mt-0 text-lg font-bold text-slate-800">{application.course}</h3>
          <p className="m-0 text-slate-600">
            Дата начала: <strong className="text-slate-800">{application.startDate}</strong>
          </p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm text-slate-500">
        <span>
          Оплата:{' '}
          {application.paymentMethod === 'CASH' ? 'Наличными' : 'Переводом по номеру телефона'}
        </span>
        <span>Создана: {new Date(application.createdAt).toLocaleDateString('ru-RU')}</span>
      </div>

      {reviews.length > 0 && (
        <div className="mt-5 flex flex-col gap-3">
          <h4 className="m-0 font-bold text-slate-800">Отзывы</h4>
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-slate-200 bg-blue-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-amber-600">{'★'.repeat(review.rating)}</strong>
                <span className="text-sm text-slate-500">
                  {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <p className="mb-0 mt-2 text-slate-600">{review.text}</p>
            </div>
          ))}
        </div>
      )}

      {application.status === 'COMPLETED' && (
        <form
          className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4"
          onSubmit={onReviewSubmit}
          noValidate
        >
          <FieldLabel>
            <span>Оценка</span>
            <SelectControl value={rating} onChange={(event) => setRating(Number(event.target.value))}>
              {REVIEW_RATINGS.map((value) => (
                <option key={value} value={value}>
                  {value}/5
                </option>
              ))}
            </SelectControl>
          </FieldLabel>

          <FieldLabel>
            <span>Отзыв</span>
            <TextAreaControl
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              rows={3}
              placeholder="Напишите отзыв о качестве образовательных услуг"
            />
          </FieldLabel>

          <Button type="submit" variant="secondary" disabled={reviewSent}>
            {reviewSent ? 'Отзыв отправлен' : 'Оставить отзыв'}
          </Button>
        </form>
      )}
    </article>
  )
}
