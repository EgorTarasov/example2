import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      {/* TODO: add navbar for internal */}
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
