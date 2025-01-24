import { Task } from '@/components/TaskCard';
import { taskSchema } from '@/FormSchemas/formSchemas';
import { z } from 'zod';

export const getTasks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks`);
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return res.json();
};

export const createTask = async (task: z.infer<typeof taskSchema>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to create task');
  }

  return res.json();
};

export const updateTask = async (task: Task) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${task.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to update task');
  }

  return res.json();
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete task');
  }
};
