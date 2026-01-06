
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ThumbsUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Issue } from '@/lib/types';

const initialIssues: Issue[] = [
    { 
        id: '#AL-1377861', 
        roomNumber: 'G-203', 
        category: 'Internet', 
        description: 'Slow Speed', 
        status: 'Closed', 
        raisedOn: new Date("2025-11-23T09:27:00"),
        closedOn: new Date("2025-11-23T09:34:00")
    },
    { 
        id: '#AL-1377377', 
        roomNumber: 'F-101', 
        category: 'Internet', 
        description: 'Slow Speed', 
        status: 'Closed', 
        raisedOn: new Date("2025-11-22T17:35:00"),
        closedOn: new Date("2025-11-23T09:35:00")
    },
    { 
        id: '#AL-1376779', 
        roomNumber: 'D-404', 
        category: 'Cleanliness', 
        description: 'Room', 
        status: 'Closed', 
        raisedOn: new Date("2025-11-22T09:28:00"),
        closedOn: new Date("2025-11-22T09:33:00")
    },
    { 
        id: '#AL-1379823', 
        roomNumber: 'B-102', 
        category: 'Electricity', 
        description: 'Fan not working', 
        status: 'Active', 
        raisedOn: new Date("2025-11-24T10:00:00")
    },
];


const statusVariantMapping = {
    Pending: 'destructive',
    Active: 'secondary',
    Closed: 'outline',
} as const;

export default function TicketHistoryPage() {
    const [filter, setFilter] = useState<'All' | 'Active' | 'Closed'>('All');

    const filteredIssues = initialIssues.filter(issue => {
        if (filter === 'All') return true;
        return issue.status === filter;
    });

    const formatDate = (date: Date) => {
        return format(date, "dd MMM '’'yy, h:mm a");
    }

    return (
        <div className="p-4 space-y-4">
            <header className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/hostel">
                        <ChevronLeft />
                    </Link>
                </Button>
                <h1 className="font-headline text-2xl font-bold">Tickets</h1>
            </header>

            <div className="flex gap-2 p-1 bg-muted rounded-lg">
                {(['All', 'Active', 'Closed'] as const).map(tab => (
                    <Button 
                        key={tab}
                        variant={filter === tab ? 'default' : 'ghost'}
                        onClick={() => setFilter(tab)}
                        className={cn("flex-1 justify-center rounded-md", filter === tab && "bg-accent text-accent-foreground shadow-sm")}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredIssues.map(issue => (
                    <Card key={issue.id}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <p className="font-semibold text-sm text-muted-foreground">{issue.id}</p>
                                <Badge variant={statusVariantMapping[issue.status]}>{issue.status}</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                                <p className="text-muted-foreground">Raised on:</p>
                                <p className="text-right font-medium">{formatDate(issue.raisedOn)}</p>
                                {issue.closedOn && (
                                    <>
                                        <p className="text-muted-foreground">Closed on:</p>
                                        <p className="text-right font-medium">{formatDate(issue.closedOn)}</p>
                                    </>
                                )}
                            </div>

                            <div className="border-t pt-4">
                                 <p className="font-semibold">{issue.category}</p>
                                 <p className="text-muted-foreground text-sm">{issue.description}</p>
                            </div>
                           
                            {issue.status === 'Closed' && (
                                <div className="flex justify-end mt-4">
                                    <Button variant="secondary" size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                        Satisfied
                                        <ThumbsUp className="ml-1.5 h-4 w-4" />
                                        <Sparkles className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
