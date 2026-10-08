import { createRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { HomeHeader } from '../components/HomeHeader'
import { HomeHero } from '../components/HomeHero'
import { HomeHighlights } from '../components/HomeHighlights'
import { PageShell } from '../components/ui'
import { Slider } from '../components/Slider'
import { getCurrentUserId, getUserById } from '../lib/demoStore'
import type { UserRole } from '../types/app'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

function HomePage() {
  const [userRole, setUserRole] = useState<UserRole | null>(null)

  useEffect(() => {
    setUserRole(getUserById(getCurrentUserId())?.role ?? null)
  }, [])

  return (
    <PageShell>
      <HomeHeader userRole={userRole} />
      <HomeHero userRole={userRole} />
      <Slider />
      <HomeHighlights />
    </PageShell>
  )
}
