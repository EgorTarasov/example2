import LoginPage from '@/pages/login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return <LoginPage />
}
