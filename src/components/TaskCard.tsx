'use client';

import Image from 'next/image';
import trash from '@/assets/trash.svg';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask, deleteTask } from '@/queries/taskQueries';
import { toast } from 'sonner';

interface TaskCardProps {
  task: Task;
}

export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTask,
    onMutate: async (newTask) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite the optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData(['tasks']);

      // Optimistically update to the new value
      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        old.map((task) => (task.id === newTask.id ? newTask : task))
      );

      // Return a context object with the snapshotted value
      return { previousTasks };
    },
    onSuccess: () => {
      toast.success('Task has been updated');
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
      toast.error('Something went wrong. Please try again');
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteTask,
    onMutate: async (deletedTaskId) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite the optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData(['tasks']);

      // Optimistically update to the new value
      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        old.filter((task) => task.id !== deletedTaskId)
      );

      // Return a context object with the snapshotted value
      return { previousTasks };
    },
    onSuccess: () => {
      toast.success('Task has been deleted');
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
      toast.error('Something went wrong. Please try again');
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const completed = e.target.checked;
    mutate({ ...task, completed });
  };

  const handleDelete = () => {
    deleteMutation(task.id);
  };

  return (
    <div className='flex items-center justify-between gap-3 p-4 pt-3 bg-accent-custom h-[72px] rounded-lg text-white '>
      <div className='flex items-center gap-3 w-full h-full'>
        <label className='flex items-center cursor-pointer relative mt-1'>
          <input
            id='task-checkbox'
            type='checkbox'
            checked={task.completed}
            onChange={handleUpdate}
            className='peer shrink-0 h-5 w-5 cursor-pointer transition-all appearance-none rounded-full bg-transparent shadow hover:shadow-md border-2 border-primary-custom checked:bg-secondary-custom checked:border-secondary-custom'
          />
          <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='1'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </span>
        </label>

        <Link
          href={`/task/${task.id}`}
          className={cn('w-full', { 'pointer-events-none ': task.completed })}
          aria-disabled={task.completed}
          tabIndex={task.completed ? -1 : 0}
        >
          <p
            className={cn('line-clamp-2 w-full cursor-pointer', {
              'line-through text-zinc-500': task.completed,
            })}
          >
            {task.title}
          </p>
        </Link>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className='self-start shrink-0 border-none bg-transparent hover:opacity-50 transition-opacity'>
            <Image src={trash} alt='trash' width={24} height={24} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              task and remove it from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-primary-custom text-white hover:bg-primary-custom hover:opacity-80 transition-opacity'
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TaskCard;
