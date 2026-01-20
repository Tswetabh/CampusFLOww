"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function InsightsPage() {
  const metricCards = [
    { title: 'Created Events', value: '41', delta: '+8' },
    { title: 'Completed Events', value: '16', delta: '+3' },
    { title: 'Rescheduled', value: '23%', delta: '0' },
    { title: 'Canceled', value: '50', delta: '+2' },
  ];

  return (
    <div className="mx-auto w-full max-w-[980px] space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tighter">Insights</h1>

      <section className="grid gap-4 md:grid-cols-4">
        {metricCards.map((m) => (
          <Card key={m.title} className="bg-white/45 backdrop-blur-2xl border border-white/70">
            <CardHeader>
              <CardTitle className="text-base">{m.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-semibold">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.delta}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card className="bg-white/45 backdrop-blur-2xl border border-white/70">
          <CardHeader>
            <CardTitle className="font-headline">Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="p-3 rounded border bg-white/60">
                <div className="text-sm text-muted-foreground">Total Attendance</div>
                <div className="text-2xl font-semibold">82%</div>
                <div className="text-xs text-muted-foreground">Target: 75%</div>
              </div>
              <div className="p-3 rounded border bg-white/60">
                <div className="text-sm text-muted-foreground">Present This Week</div>
                <div className="text-2xl font-semibold">18</div>
                <div className="text-xs text-muted-foreground">Out of 21 classes</div>
              </div>
              <div className="p-3 rounded border bg-white/60">
                <div className="text-sm text-muted-foreground">Lowest Subject</div>
                <div className="text-2xl font-semibold">Networks 67%</div>
                <div className="text-xs text-muted-foreground">Consider revision sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/45 backdrop-blur-2xl border border-white/70">
          <CardHeader>
            <CardTitle className="font-headline">Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Quick summary of recent meetings and durations.</p>
            <div className="mt-4 h-28 rounded-md border border-white/50 bg-white/30" />
          </CardContent>
        </Card>

        <Card className="bg-white/45 backdrop-blur-2xl border border-white/70">
          <CardHeader>
            <CardTitle className="font-headline">Time Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Distribution of deep work, meetings and shallow work.</p>
            <div className="mt-4 h-28 rounded-md border border-white/50 bg-white/30" />
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="bg-white/45 backdrop-blur-2xl border border-white/70">
          <CardHeader>
            <CardTitle className="font-headline">Customize Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <button className="w-full rounded-md border border-slate-900 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-900 hover:text-white">Filter Date Range</button>
              <button className="w-full rounded-md border border-slate-900 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-900 hover:text-white">Export Data</button>
              <button className="w-full rounded-md border border-slate-900 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-900 hover:text-white">Customize Dashboard</button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
