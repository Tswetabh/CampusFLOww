"use client";

import { CgpaCalculatorCard } from '@/components/academics/cgpa-calculator-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function TrackerPage() {
  const [assignments, setAssignments] = useState(() => [
    { id: 1, title: 'DBMS Mini Project', due: 'In 3 days', status: 'Pending', editing: false },
    { id: 2, title: 'OS Lab Record', due: 'Next week', status: 'In Progress', editing: false },
    { id: 3, title: 'Maths Quiz Prep', due: 'Tomorrow', status: 'Pending', editing: false },
  ]);

  const [exams, setExams] = useState(() => [
    { id: 1, title: 'DBMS Internal', date: '24 Jan', time: '10:00 AM', editing: false },
    { id: 2, title: 'OS Mid-Sem', date: '28 Jan', time: '2:00 PM', editing: false },
    { id: 3, title: 'Maths Unit Test', date: '30 Jan', time: '9:00 AM', editing: false },
  ]);

  const [marks, setMarks] = useState(() => [
    { id: 1, subject: 'DBMS', score: '78/100', editing: false },
    { id: 2, subject: 'OS', score: '84/100', editing: false },
    { id: 3, subject: 'Maths', score: '91/100', editing: false },
    { id: 4, subject: 'CN', score: '76/100', editing: false },
  ]);

  const addAssignment = () => {
    const nextId = assignments.length ? assignments[assignments.length - 1].id + 1 : 1;
    setAssignments([...assignments, { id: nextId, title: 'New Assignment', due: 'TBD', status: 'Pending', editing: true }]);
  };

  const updateAssignment = (id: number, patch: Partial<any>) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, ...patch } : a));
  };

  const removeAssignment = (id: number) => setAssignments(assignments.filter(a => a.id !== id));

  const addExam = () => {
    const nextId = exams.length ? exams[exams.length - 1].id + 1 : 1;
    setExams([...exams, { id: nextId, title: 'New Exam', date: 'TBD', time: 'TBD', editing: true }]);
  };

  const updateExam = (id: number, patch: Partial<any>) => setExams(exams.map(e => e.id === id ? { ...e, ...patch } : e));
  const removeExam = (id: number) => setExams(exams.filter(e => e.id !== id));

  const addMark = () => {
    const nextId = marks.length ? marks[marks.length - 1].id + 1 : 1;
    setMarks([...marks, { id: nextId, subject: 'New', score: '0/0', editing: true }]);
  };

  const updateMark = (id: number, patch: Partial<any>) => setMarks(marks.map(m => m.id === id ? { ...m, ...patch } : m));
  const removeMark = (id: number) => setMarks(marks.filter(m => m.id !== id));

  return (
    <div className="mx-auto w-full max-w-[980px] space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tighter">Tracker</h1>
      <Tabs defaultValue="assignments">
        <TabsList className="grid w-full grid-cols-3 bg-white/50 border border-white/60 backdrop-blur-xl shadow-[0_8px_20px_rgba(255,255,255,0.45)]">
          <TabsTrigger value="assignments">Assignment Tracker</TabsTrigger>
          <TabsTrigger value="exams">Exam Tracker</TabsTrigger>
          <TabsTrigger value="marks">Marks</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments">
          <div className="flex justify-end">
            <button onClick={addAssignment} className="px-3 py-1 rounded bg-slate-900 text-white">Add Assignment</button>
          </div>
          <Card className="bg-white/45 backdrop-blur-2xl border border-white/70 shadow-[0_18px_45px_rgba(15,23,42,0.12)] mt-3">
            <CardHeader>
              <CardTitle className="font-headline">Assignment Tracker</CardTitle>
              <CardDescription>Keep tabs on upcoming submissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-white/70 bg-white/60 backdrop-blur-md p-4">
                  <div className="flex-1">
                    {item.editing ? (
                      <div className="flex gap-2">
                        <input value={item.title} onChange={(e) => updateAssignment(item.id, { title: e.target.value })} className="flex-1 rounded border p-1" />
                        <input value={item.due} onChange={(e) => updateAssignment(item.id, { due: e.target.value })} className="w-40 rounded border p-1" />
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-slate-800">{item.title}</p>
                        <p className="text-sm text-slate-500">Due: {item.due}</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={item.status} onChange={(e) => updateAssignment(item.id, { status: e.target.value })} className="rounded border p-1">
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </select>
                    {item.editing ? (
                      <button onClick={() => updateAssignment(item.id, { editing: false })} className="px-2 py-1 rounded bg-green-600 text-white">Save</button>
                    ) : (
                      <button onClick={() => updateAssignment(item.id, { editing: true })} className="px-2 py-1 rounded border">Edit</button>
                    )}
                    <button onClick={() => removeAssignment(item.id)} className="px-2 py-1 rounded border text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams">
          <div className="flex justify-end">
            <button onClick={addExam} className="px-3 py-1 rounded bg-slate-900 text-white">Add Exam</button>
          </div>
          <Card className="bg-white/45 backdrop-blur-2xl border border-white/70 shadow-[0_18px_45px_rgba(15,23,42,0.12)] mt-3">
            <CardHeader>
              <CardTitle className="font-headline">Exam Tracker</CardTitle>
              <CardDescription>Upcoming exams at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {exams.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-white/70 bg-white/60 backdrop-blur-md p-4">
                  <div className="flex-1">
                    {item.editing ? (
                      <div className="flex gap-2">
                        <input value={item.title} onChange={(e) => updateExam(item.id, { title: e.target.value })} className="flex-1 rounded border p-1" />
                        <input value={item.date} onChange={(e) => updateExam(item.id, { date: e.target.value })} className="w-32 rounded border p-1" />
                        <input value={item.time} onChange={(e) => updateExam(item.id, { time: e.target.value })} className="w-28 rounded border p-1" />
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-slate-800">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.date} • {item.time}</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.editing ? (
                      <button onClick={() => updateExam(item.id, { editing: false })} className="px-2 py-1 rounded bg-green-600 text-white">Save</button>
                    ) : (
                      <button onClick={() => updateExam(item.id, { editing: true })} className="px-2 py-1 rounded border">Edit</button>
                    )}
                    <button onClick={() => removeExam(item.id)} className="px-2 py-1 rounded border text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marks">
          <div className="flex justify-end">
            <button onClick={addMark} className="px-3 py-1 rounded bg-slate-900 text-white">Add Mark</button>
          </div>
          <div className="space-y-6">
            <Card className="bg-white/45 backdrop-blur-2xl border border-white/70 shadow-[0_18px_45px_rgba(15,23,42,0.12)] mt-3">
              <CardHeader>
                <CardTitle className="font-headline">Marks</CardTitle>
                <CardDescription>Scores for your latest assessments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {marks.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-white/70 bg-white/60 backdrop-blur-md p-4">
                    <div className="flex-1">
                      {item.editing ? (
                        <div className="flex gap-2">
                          <input value={item.subject} onChange={(e) => updateMark(item.id, { subject: e.target.value })} className="flex-1 rounded border p-1" />
                          <input value={item.score} onChange={(e) => updateMark(item.id, { score: e.target.value })} className="w-32 rounded border p-1" />
                        </div>
                      ) : (
                        <p className="font-semibold text-slate-800">{item.subject}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#22c55e] text-white">{item.score}</Badge>
                      {item.editing ? (
                        <button onClick={() => updateMark(item.id, { editing: false })} className="px-2 py-1 rounded bg-green-600 text-white">Save</button>
                      ) : (
                        <button onClick={() => updateMark(item.id, { editing: true })} className="px-2 py-1 rounded border">Edit</button>
                      )}
                      <button onClick={() => removeMark(item.id)} className="px-2 py-1 rounded border text-red-600">Delete</button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <CgpaCalculatorCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
