'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import type { Task } from '@/lib/types';
import { cn } from '@/lib/utils';

type TodoListProps = {
    tasks: Task[];
    onAddTask: (taskName: string) => void;
};

export default function TodoList({ tasks, onAddTask }: TodoListProps) {
    const [newTask, setNewTask] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            onAddTask(newTask.trim());
            setNewTask('');
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Todo List</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button type="submit" size="icon">
                        <Plus className="h-4 w-4" />
                    </Button>
                </form>
                <ul className="space-y-2 mt-4">
                    {tasks.map(task => (
                        <li key={task.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                            <Check className="h-4 w-4 text-primary" />
                            <span>{task.suggestion}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
