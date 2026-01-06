'use client';

import { useState } from 'react';
import WelcomeHeader from "@/components/dashboard/welcome-header";
import QuickStats from "@/components/dashboard/quick-stats";
import Timetable from "@/components/dashboard/timetable";
import TodoList from "@/components/dashboard/todo-list";
import { mockUser, mockTimetable } from "@/lib/data";
import type { TimetableEntry, Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
    const [timetable, setTimetable] = useState<TimetableEntry[]>(mockTimetable);
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleAddTask = (taskName: string) => {
        const newTask: Task = {
            id: Date.now(),
            suggestion: taskName,
            type: 'study', // default type
            duration: 'Flexible',
            completed: false,
        };

        setTasks(prevTasks => [...prevTasks, newTask]);

        setTimetable(prevTimetable => {
            const newTimetable = [...prevTimetable];
            const freeSlotIndex = newTimetable.findIndex(entry => entry.subject === 'Free Slot');

            if (freeSlotIndex !== -1) {
                newTimetable[freeSlotIndex] = {
                    ...newTimetable[freeSlotIndex],
                    subject: taskName,
                    type: 'lecture', // Or a new type like 'task'
                };
            }
            return newTimetable;
        });
    };

    const toggleTimetableStatus = (id: number) => {
        setTimetable(prev =>
            prev.map(entry => {
                if (entry.id === id) {
                    const originalEntry = mockTimetable.find(e => e.id === id);
                    if (entry.status === 'scheduled') {
                        return { ...entry, status: 'cancelled' };
                    } else {
                        // If it was cancelled, revert it back. If it was a task, it will become a free slot.
                         return { ...entry, status: 'scheduled', subject: originalEntry?.subject || 'Free Slot', type: originalEntry?.type || 'break' };
                    }
                }
                return entry;
            })
        );
    };
    
    return (
        <div className="space-y-6">
            <WelcomeHeader name={mockUser.name} />
            <QuickStats 
                productivityScore={mockUser.productivityScore} 
                academicRisk={mockUser.academicRisk} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Timetable timetable={timetable} toggleStatus={toggleTimetableStatus} />
                <TodoList tasks={tasks} onAddTask={handleAddTask} />
            </div>
        </div>
    )
}
