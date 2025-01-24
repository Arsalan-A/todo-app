'use client';

import clipboard from '@/assets/clipboard.svg';
import Image from 'next/image';
import TaskCard, { Task } from './TaskCard';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/queries/taskQueries';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

const TaskList = () => {
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ['tasks'], queryFn: getTasks });

  const tasksCount = tasks?.length ?? 0;
  const completedTasksCount = tasks?.filter(
    (task: Task) => task.completed
  ).length;

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[90%]'>
        <LoaderCircle className='animate-spin text-gray-500 ' size={50} />
      </div>
    );
  }

  return (
    <div className='w-full h-full'>
      <div
        className='flex justify-between gap-3 pt-16 pb-3 text-white font-bold md:w-[50%] w-[80%]
            max-w-[736px] mx-auto'
      >
        <div className='flex items-center gap-3 '>
          <p className='text-primaryText'>Tasks</p>
          <span className='bg-gray-600 text-sm px-2 rounded-xl py-0'>
            {tasks?.length}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <p className='text-secondaryText'>Completed</p>
          <span className='bg-gray-600 text-sm px-2 rounded-xl py-0'>
            {completedTasksCount > 0 ? (
              <span>
                {completedTasksCount} of {tasksCount}
              </span>
            ) : (
              0
            )}
          </span>
        </div>
      </div>
      <div className='w-full h-[83%] overflow-y-auto'>
        <div
          className='md:w-[50%] w-[80%]
            max-w-[736px] mx-auto'
        >
          {tasks?.length === 0 ? (
            <div className='flex flex-col gap-3 my-6 items-center justify-center pt-10 text-gray-500'>
              <Image
                src={clipboard}
                alt='clipboard'
                width={56}
                height={56}
                className='mx-auto'
              />
              <p className='font-bold '>
                You don't have any tasks registered yet.
              </p>
              <p>Create tasks and organize your to-do items</p>
            </div>
          ) : (
            <div className='flex flex-col gap-3 my-6'>
              {tasks?.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
