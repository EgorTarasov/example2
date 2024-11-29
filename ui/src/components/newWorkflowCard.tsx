import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import { useState } from "react"
import { Input } from "./ui/input"
import { observer } from "mobx-react"
import { useStores } from "@/hooks/useStore"
import { useNavigate } from "@tanstack/react-router"

const NewWorkflowCard = observer(() => {
    const { rootStore } = useStores()
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)
    const [title, setTitle] = useState("")

    const handleCreateWorkflow = async () => {
        // TODO: Implement workflow creation logic
        console.log("Creating new workflow:", title)
        const newId = await rootStore.createWorkFlow(title)
        setIsExpanded(false)
        navigate({
            to: `/workflow/${newId}`
        })
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create New Workflow</CardTitle>
            </CardHeader>
            <CardContent>
                {isExpanded ? (
                    <div className="space-y-4">
                        <Input
                            placeholder="Enter workflow title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        className="w-full h-40 flex flex-col items-center justify-center gap-2"
                        onClick={() => setIsExpanded(true)}
                    >
                        <PlusIcon className="h-8 w-8" />
                        <span>Add New Workflow</span>
                    </Button>
                )}
            </CardContent>
            {isExpanded && (
                <CardFooter className="flex justify-end space-x-2">
                    <Button variant="ghost" onClick={() => setIsExpanded(false)}>Cancel</Button>
                    <Button onClick={handleCreateWorkflow} disabled={!title.trim()}>Create</Button>
                </CardFooter>
            )}
        </Card>
    )
})

export default NewWorkflowCard