
import { WorkFlowInfo } from "@/stores/models"
import { WorkflowCard } from "./workflowCard"
import { NewWorkflowCard } from "./newWorkflowCard"


interface WorkflowListProps {
    workflows: WorkFlowInfo[]
}

export function WorkflowList({ workflows }: WorkflowListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
            {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
            <NewWorkflowCard />
        </div>
    )
}

