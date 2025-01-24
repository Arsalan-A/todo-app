'use client';

import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, {
    message: 'Please enter a task title',
  }),
  color: z.string().min(1, {
    message: 'Please select a color',
  }),
  completed: z.boolean().default(false),
});
