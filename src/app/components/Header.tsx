import logo from '@/assets/logo.svg';
import Image from 'next/image';

const Header = () => {
  return (
    <div className='flex items-center justify-center h-[200px] bg-background z-0'>
      <Image src={logo} alt='logo' width={226} height={48} className='' />
    </div>
  );
};

export default Header;
