
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WorkFlowInfo } from "@/stores/models"
import { CalendarIcon, ClockIcon, ImageIcon } from 'lucide-react'

interface WorkflowCardProps {
    workflow: WorkFlowInfo
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{workflow.title}</CardTitle>
            </CardHeader>
            <CardContent>
                {workflow.image ? (
                    <img
                        src={workflow.image}
                        alt={`${workflow.title} thumbnail`}
                        className="w-full h-40 object-cover mb-4 rounded-md"
                    />
                ) : (
                    <div className="w-full h-40 bg-muted flex items-center justify-center mb-4 rounded-md">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    <span>Created: {workflow.created}</span>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    <span>Updated: {workflow.updated}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

