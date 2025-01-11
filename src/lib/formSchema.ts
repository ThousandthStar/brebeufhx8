import { z } from 'zod';

const TypeEval = ['test', 'exam', 'quiz'] as const;

export const inFormSchema = z.object({
	topic: z.string().min(1).max(200),
	type_of_eval: z.enum(TypeEval),
	grade: z.number().int().min(1).max(12),
	date: z.string().date()
});

export type InFormSchema = typeof inFormSchema;
