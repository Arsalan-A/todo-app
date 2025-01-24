'use client';

import TaskForm from '@/components/TaskForm';

const CreateTask = () => {
  return (
    <TaskForm
      type='create'
      isSubmitLoading={false}
      handleSubmit={(values) => console.log('Values', values)}
    />
  );
};

export default CreateTask;
