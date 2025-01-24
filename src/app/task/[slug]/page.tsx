'use client';

import { Task } from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { taskSchema } from '@/FormSchemas/formSchemas';
import { getTasks, updateTask } from '@/queries/taskQueries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import Wrapper from '@/components/Wrapper';
import { toast } from 'sonner';

const UpdateTask = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({ queryKey: ['tasks'], queryFn: getTasks });

  const singleSlug = Array.isArray(slug) ? slug[0] : slug;

  const { mutate, isPending } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      //Invalidate the query to refetch the tasks
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task has been updated');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again');
      router.push('/');
    },
  });

  const task = tasks?.find((task: Task) => task.id === slug);

  const handleSubmit = (values: z.infer<typeof taskSchema>) => {
    mutate({ ...values, id: singleSlug! });
    router.push('/');
  };

  if (isLoading) {
    return (
      <Wrapper>
        <div className='flex items-center justify-center h-full'>
          <LoaderCircle className='animate-spin text-gray-500 ' size={50} />
        </div>
      </Wrapper>
    );
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <TaskForm
      type='update'
      task={task}
      isSubmitLoading={isPending}
      handleSubmit={handleSubmit}
    />
  );
};

export default UpdateTask;
