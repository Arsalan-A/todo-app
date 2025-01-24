'use client';

import TaskForm from '@/components/TaskForm';
import { tasks } from '@/components/TaskList';
import { taskSchema } from '@/FormSchemas/formSchemas';
import { useParams } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

const UpdateTask = () => {
  const { slug } = useParams();

  const task = tasks.find((task) => task.id === slug);

  const handleSubmit = (values: z.infer<typeof taskSchema>) => {
    console.log('Submitted values:', values);
    // ...call an API or do something with "values"
  };

  return (
    <TaskForm
      type='update'
      task={task}
      isSubmitLoading={false}
      handleSubmit={handleSubmit}
    />
  );
};

export default UpdateTask;
