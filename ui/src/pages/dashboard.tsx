import { WorkflowList } from "@/components/workflowList"
import { useStores } from "@/hooks/useStore"
import { WorkFlowInfo } from "@/stores/models"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"

const Dashboard: React.FC = observer(() => {
    const [workflows, setWorkflows] = useState<WorkFlowInfo[]>([])
    const { rootStore } = useStores()

    useEffect(() => {
        rootStore.listWorkFlows().then((result) => {
            console.log(result)
            setWorkflows(result)
        })
    }, [])

    return (
        <div>
            <WorkflowList workflows={workflows} />
        </div>
    )
})

export default Dashboard