
import { useEffect, useState } from "react"
import { Search, SquareX, Zap } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge";
import Form from './Form'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
interface Task {
    id: string
    title: string
    assignee: string
    description: string
    cost?: string,
    date: string,
    priority: string
}

interface Column {
    id: string
    title: string
    color: string
    tasks: Task[]
}

export default function KanbanBoard() {
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const [task, setTask] = useState({
        id: Date.now().toString(),
        property: '',
        title: '',
        assignee: '',
        priority: '',
        description: '',
        date: ''
    })
    const initialColumns: Column[] = [
        {
            id: "1",
            title: "Backlog",
            color: "purple-500",
            tasks: [],
        },
        {
            id: "2",
            title: "Doing",
            color: "#6CB4EE",
            tasks: [],
        },
        {
            id: "3",
            title: "On hold",
            color: "pink-500",
            tasks: [],
        },
        {
            id: "4",
            title: "Done",
            color: "green-500",
            tasks: [],
        },
        {
            id: "5",
            title: "Archived",
            color: "orange-500",
            tasks: [],
        },
    ]
    const [columns, setColumns] = useState<Column[]>(JSON.parse(localStorage.getItem('columns') || '[]'))

    useEffect(() => {
        if (!localStorage.getItem('columns') || JSON.parse(localStorage.getItem('columns') || '[]').length == 0) {
            console.log('laca');

            localStorage.setItem('columns', JSON.stringify(initialColumns))
        }
        setColumns(JSON.parse(localStorage.getItem('columns') || '[]'))
    }, [columns])
    const handleDeleteTask = (columnId: string, taskIndex: string) => {
        const updatedColumns = columns.map((x) => {
            if (x.id == columnId) {
                x.tasks.splice(Number(taskIndex), 1)
            }
            return x
        })
        localStorage.setItem('columns', JSON.stringify(updatedColumns))
    }
    // const handleEdit = (columnId: string, taskId: string) => {
    //     console.log(columnId, taskId);

    // }
    return (
        <div className="flex h-screen flex-col">
            <header className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <img src="https://dynamic.brandcrowd.com/asset/logo/2d5dcea5-d3c1-4a79-a84d-b53ac82567b2/logo-search-grid-1x?logoTemplateVersion=1&v=637909702776570000" className="w-24 h-14" />
                        <nav className="flex items-center space-x-4 max-lg:hidden">
                            <Button variant="ghost">Reports</Button>
                            <Button variant="ghost">Form</Button>
                            <Button variant="ghost">Emails</Button>

                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex w-64 items-center space-x-2 max-md:hidden">
                            <Input type="search" placeholder="Search cards" className="w-full" />
                            <Button variant="ghost" size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button variant="ghost" size="icon">
                            <Zap className="h-4 w-4" />
                        </Button>
                        <Form open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen} setColumns={setColumns} task={task} setTask={setTask} />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-x-auto p-6">
                <div className="flex h-full space-x-4 max-md:flex max-md:flex-col max-md:items-center ">
                    {columns?.map((column) => (
                        <div key={column.id} className="flex w-80 flex-col rounded-lg bg-gray-50  max-md:w-full ">
                            <div className="mb-4 flex items-center justify-between">

                                <div className={`flex items-center space-x-2 bg-white p-4 w-full border-t-4 border-[${column.color}] shadow-md`}>
                                    <div className={`h-2 w-2 rounded-full bg-[${column.color}]`} />
                                    <h2 className={`font-medium `}>{column.title}</h2>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 h-96 overflow-y-auto pr-2 p-2">
                                {column?.tasks?.map((task, i) => (
                                    <div key={task.id} className="rounded-lg border  bg-white p-2 shadow-sm">
                                        <div className="flex gap-2 justify-between">
                                            <h3 className="font-medium">{task.title}</h3>
                                            <Badge className={`${task.priority == 'medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : task.priority == 'high' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 'bg-green-100 text-green-800 hover:bg-green-100'} `}>{task.priority}</Badge>
                                            <SquareX onClick={() => handleDeleteTask(column.id, i.toString())} className="bg-red-600 text-white hover:bg-red-400" />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src="" />
                                                    <AvatarFallback className="text-xs">{task.assignee[0]}</AvatarFallback>
                                                </Avatar>

                                                <span className="text-xs text-gray-500">{task.assignee}</span>
                                            </div>
                                            {task.date && <span className="text-sm text-gray-600">{task.date}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}


                </div>
            </main>
        </div>
    )
}

