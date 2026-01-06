'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  const collegeTimetableData = [
    { time: '09:00 - 10:00', mon: 'Data Structures', tue: 'Algorithms', wed: 'Data Structures', thu: 'Algorithms', fri: 'Data Structures' },
    { time: '10:00 - 11:00', mon: 'Algorithms', tue: 'Data Structures', wed: 'Algorithms', thu: 'Data Structures', fri: 'Algorithms' },
    { time: '11:00 - 12:00', mon: 'Break', tue: 'Break', wed: 'Break', thu: 'Break', fri: 'Break' },
    { time: '12:00 - 14:00', mon: 'OS Lab', tue: 'DBMS Lab', wed: 'OS Lab', thu: 'DBMS Lab', fri: 'OS Lab' },
    { time: '14:00 - 15:00', mon: 'Lunch', tue: 'Lunch', wed: 'Lunch', thu: 'Lunch', fri: 'Lunch' },
    { time: '15:00 - 16:00', mon: 'Maths-3', tue: 'Compiler Design', wed: 'Maths-3', thu: 'Compiler Design', fri: 'Maths-3' },
  ];
  
  export function CollegeTimetable() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">College Timetable</CardTitle>
          <CardDescription>
            Your complete weekly college schedule.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Monday</TableHead>
                <TableHead>Tuesday</TableHead>
                <TableHead>Wednesday</TableHead>
                <TableHead>Thursday</TableHead>
                <TableHead>Friday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collegeTimetableData.map((row) => (
                <TableRow key={row.time}>
                  <TableCell className="font-medium">{row.time}</TableCell>
                  <TableCell>{row.mon}</TableCell>
                  <TableCell>{row.tue}</TableCell>
                  <TableCell>{row.wed}</TableCell>
                  <TableCell>{row.thu}</TableCell>
                  <TableCell>{row.fri}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  