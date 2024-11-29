import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStores } from "@/hooks/useStore"
import { Outlet, useNavigate } from "@tanstack/react-router"
import { LogOut, Settings } from 'lucide-react'
import { observer } from "mobx-react"

const Navbar = observer(() => {
    const { rootStore } = useStores()
    const navigate = useNavigate()

    const handleLogout = () => {
        rootStore.logout()
        navigate({ to: "/" })
    }

    return (
        <>
            <nav className="border-b">
                <div className="container mx-auto flex h-16 items-center px-4">
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">Workflow Dashboard</h1>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="User avatar" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span onClick={handleLogout}>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
})

export default Navbar;
