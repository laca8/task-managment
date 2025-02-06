import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { PlusCircle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
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
interface TaskFormProps {
    open: boolean;
    setColumns: (columns: Column[]) => void;
    onOpenChange: (open: boolean) => void;

    task: {
        id: string,

        property: string,
        assignee: string,
        priority: string,
        title: string,
        date: string,
        description: string
    }
    setTask: (task: {
        id: string,
        assignee: string,
        priority: string,
        date: string,
        title: string,
        description: string
        property: string
    }) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onOpenChange, task, setTask }) => {

    const columns: Column[] = JSON.parse(localStorage.getItem('columns') || '[]')
    const handleChangeTask = (name: string, value: string) => {
        setTask({
            ...task,
            [name]: value
        })
    }
    const handleSubmit = () => {

        console.log(columns);
        const updatedColumns = columns.map((x: Column) => {
            if (x.title === task.property) {
                x.tasks.push(task);

            }
            return x;
        });
        localStorage.setItem('columns', JSON.stringify(updatedColumns))
        onOpenChange(!open)


    }
    return (
        <div className=''>
            <Button onClick={() => onOpenChange(!open)} variant={'outline'} className='border-2 border-blue-400'>
                <PlusCircle className="mr-1 h-4 w-4" />
                New</Button>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>New task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="requester-name">title</label>
                            <Input
                                id="requester-name"
                                placeholder="Type here ..."
                                className="mt-1.5"
                                name='assignee'
                                onChange={(e) => handleChangeTask('title', e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="requester-name">Requester name</label>
                            <Input
                                id="requester-name"
                                placeholder="Type here ..."
                                className="mt-1.5"
                                name='assignee'
                                onChange={(e) => handleChangeTask('assignee', e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="requester-email">property</label>
                            <Select value={task.property} onValueChange={(value) => handleChangeTask('property', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a property" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="mt-1.5" >
                                        <SelectLabel>property</SelectLabel>
                                        <SelectItem value="Backlog">Backlog</SelectItem>
                                        <SelectItem value="Doing">Doing</SelectItem>
                                        <SelectItem value="On hold">On hold</SelectItem>

                                        <SelectItem value="Done">Done</SelectItem>
                                        <SelectItem value="Archived">Archived</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="requester-email">Priority</label>
                            <Select value={task.priority} onValueChange={(value) => handleChangeTask('priority', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="mt-1.5" >
                                        <SelectLabel>Priority</SelectLabel>
                                        <SelectItem value="low">low</SelectItem>
                                        <SelectItem value="medium">medium</SelectItem>
                                        <SelectItem value="high">high</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="task-description">
                                Task description
                                <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <Textarea
                                id="task-description"
                                placeholder="Type here ..."
                                className="mt-1.5"
                                onChange={(e) => handleChangeTask('description', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="due-date">Due date</label>
                            <Input
                                id="due-date"
                                type="date"
                                className="mt-1.5"
                                onChange={(e) => handleChangeTask('date', e.target.value)}
                            />
                        </div>
                        <Button className="w-full" onClick={() => handleSubmit()}>New task</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TaskForm;