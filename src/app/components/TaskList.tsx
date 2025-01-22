import clipboard from '@/assets/clipboard.svg';
import Image from 'next/image';

const tasks = [
  { id: 1, title: 'Task 1', color: 'blue', completed: false },
  { id: 2, title: 'Task 2', color: 'red', completed: false },
  { id: 3, title: 'Task 3', color: 'green', completed: true },
];

const TaskList = () => {
  return (
    <div className='w-full '>
      <div className='flex justify-between gap-3 pt-16 text-white font-bold'>
        <div className='flex items-center gap-3 '>
          <p className='text-primaryText'>Tasks</p>
          <span className='bg-gray-600 text-sm px-2 rounded-xl py-0'>
            {tasks.length}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <p className='text-secondaryText'>Completed</p>
          <span className='bg-gray-600 text-sm px-2 rounded-xl py-0'>
            {tasks.filter((task) => task.completed).length}
          </span>
        </div>
      </div>
      <hr className='my-3 border-gray-600' />

      {tasks.length === 3 ? (
        <div className='flex flex-col gap-3 items-center justify-center pt-10 text-gray-500'>
          <Image
            src={clipboard}
            alt='clipboard'
            width={56}
            height={56}
            className='mx-auto'
          />
          <p className='font-bold '>You don't have any tasks registered yet.</p>
          <p>Create tasks and organize your to-do items</p>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between bg-${task.color}-500 text-white font-bold rounded-md p-3`}
            >
              <p>{task.title}</p>
              <span
                className={`bg-${task.color}-600 text-sm px-2 rounded-xl py-0`}
              >
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
