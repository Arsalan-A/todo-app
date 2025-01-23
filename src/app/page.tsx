import Image from 'next/image';
import Wrapper from '@/components/Wrapper';
import plusIcon from '@/assets/plus.svg';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <Wrapper>
      <div
        className='w-[50%]
            max-w-[736px] relative mx-auto'
      >
        <button
          className='
            flex
            items-center
            justify-center
            gap-2
            absolute
            left-1/2
            top-0
            transform
            -translate-x-1/2
            -translate-y-1/2
            bg-primary-custom
            text-white
            font-semibold
            py-3
            rounded-lg
            shadow-md
            hover:bg-[#175c84]
            transition-colors
            w-full
          '
        >
          Create Task <Image src={plusIcon} alt='plus' width={16} height={16} />
        </button>
        <TaskList />
      </div>
    </Wrapper>
  );
}
