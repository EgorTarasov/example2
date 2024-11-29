import Navbar from '@/components/navbar'
import Dashboard from '@/pages/dashboard'
import { rootStore } from '@/stores/RootStore'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({

    beforeLoad: async () => {
        if (!await rootStore.getToken()) {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    rootStore.saveToken(token)
                } catch (error) {
                    console.error(error)
                    throw redirect({ to: '/login' });
                }
            } else {
                throw redirect({ to: '/login' });
            }
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <Navbar />

}
