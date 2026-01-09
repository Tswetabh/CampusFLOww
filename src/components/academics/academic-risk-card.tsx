'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  academicRiskPredictor,
  type AcademicRiskPredictorOutput,
} from '@/ai/flows/academic-risk-predictor';
import { Loader2, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';

const formSchema = z.object({
  attendancePercentage: z.coerce.number().min(0).max(100),
  assignmentsDelayed: z.coerce.number().min(0),
  productivityScore: z.coerce.number().min(0).max(100),
  selfReportedStress: z.coerce.number().min(1).max(5),
});

export function AcademicRiskCard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AcademicRiskPredictorOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendancePercentage: 75,
      assignmentsDelayed: 2,
      productivityScore: 60,
      selfReportedStress: 3,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await academicRiskPredictor(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to get AI analysis. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Academic Risk Predictor</CardTitle>
        <CardDescription>
          Get an AI-powered analysis of your current academic standing and
          actionable advice to stay on track.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="attendancePercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overall Attendance (%)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 85" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignmentsDelayed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delayed Assignments</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productivityScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Productivity Score</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 78"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="selfReportedStress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Self-Reported Stress (1=Low, 5=High):{' '}
                    <span className="font-bold">{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Analyze My Risk
            </Button>
            {result && (
              <Alert
                className={cn(
                  result.academicRiskScore > 65
                    ? 'bg-destructive/10 border-destructive'
                    : result.academicRiskScore > 40
                    ? 'bg-yellow-400/10 border-yellow-500'
                    : 'bg-green-500/10 border-green-500'
                )}
              >
                {result.academicRiskScore > 65 ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <ShieldCheck className="h-4 w-4" />
                )}
                <AlertTitle
                  className={cn(
                    'font-headline flex items-center justify-between',
                    result.academicRiskScore > 65
                      ? 'text-destructive'
                      : result.academicRiskScore > 40
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  )}
                >
                  <span>{result.riskAnalysis}</span>
                  <span className='text-2xl font-bold'>{result.academicRiskScore}</span>
                </AlertTitle>
                <AlertDescription className="mt-2">
                    <p className='font-semibold mb-2'>Preventive Actions:</p>
                  <ul className="list-disc pl-5 text-foreground/80">
                    {result.preventiveActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
