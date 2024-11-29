import EditPage from '@/pages/workflow/editPage'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/workflow/$workflowId')({
    component: RouteComponent,
})

function RouteComponent() {
    return <EditPage />
}
