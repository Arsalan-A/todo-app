'use client';

import TaskForm from '@/components/TaskForm';
import { taskSchema } from '@/FormSchemas/formSchemas';
import { createTask } from '@/queries/taskQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

const CreateTask = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success('Task has been created');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      toast.error('Something went wrong. Please try again');
    },
  });

  const handleSubmit = (values: z.infer<typeof taskSchema>) => {
    mutate(values);
    router.push('/');
  };

  return (
    <TaskForm
      type='create'
      isSubmitLoading={isPending}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateTask;
