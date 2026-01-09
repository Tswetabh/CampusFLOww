'use client';

import { CgpaCalculatorCard } from '@/components/academics/cgpa-calculator-card';
import { AttendanceManager } from '@/components/academics/attendance-manager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AcademicRiskCard } from '@/components/academics/academic-risk-card';

export default function AcademicsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tighter">
        Academic Health
      </h1>
      <Tabs defaultValue="attendance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="cgpa">CGPA Calculator</TabsTrigger>
          <TabsTrigger value="risk">Risk Predictor</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance">
          <AttendanceManager />
        </TabsContent>
        <TabsContent value="cgpa">
          <CgpaCalculatorCard />
        </TabsContent>
        <TabsContent value="risk">
          <AcademicRiskCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
