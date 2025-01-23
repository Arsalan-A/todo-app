interface TaskCardProps {
  task: Task;
}

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className='flex items-start gap-3 p-4 pt-3 bg-accent h-[72px] rounded-lg text-white '>
      <label className='flex items-center cursor-pointer relative mt-1'>
        <input
          id='task-checkbox'
          type='checkbox'
          className='peer shrink-0 h-5 w-5 cursor-pointer transition-all appearance-none rounded-full bg-transparent shadow hover:shadow-md border-2 border-primary checked:bg-secondary checked:border-secondary'
        />
        <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3.5 w-3.5'
            viewBox='0 0 20 20'
            fill='currentColor'
            stroke='currentColor'
            stroke-width='1'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            ></path>
          </svg>
        </span>
      </label>

      <label htmlFor='task-checkbox' className='line-clamp-2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Alias reiciendis iure at natus
        perspiciatis! Ipsam voluptatem tempore, nobis saepe nostrum, odit
        corporis eaque debitis maiores, id dolorem.
      </label>
    </div>
  );
};

export default TaskCard;
