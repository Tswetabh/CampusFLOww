'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/recommend-hostel-activities.ts';
import '@/ai/flows/generate-study-suggestions.ts';
import '@/ai/flows/academic-risk-predictor.ts';
