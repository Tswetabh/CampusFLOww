'use client';

import { AcademicRiskCard } from '@/components/academics/academic-risk-card';
import { AttendanceManager } from '@/components/academics/attendance-manager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AcademicsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tighter">
        Academic Health
      </h1>
      <Tabs defaultValue="attendance">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="attendance">Attendance Manager</TabsTrigger>
          <TabsTrigger value="risk">Risk Predictor</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance">
          <AttendanceManager />
        </TabsContent>
        <TabsContent value="risk">
          <AcademicRiskCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
