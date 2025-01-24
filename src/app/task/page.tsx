'use client';

import Image from 'next/image';
import back from '@/assets/back.svg';
import Link from 'next/link';
import { taskSchema } from '@/FormSchemas/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import plusIcon from '@/assets/plus.svg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Wrapper from '@/components/Wrapper';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const COLORS = [
  '#FF3B30',
  '#FF9500',
  '#FFCC00',
  '#34C759',
  '#007AFF',
  '#5856D6',
  '#AF52DE',
  '#FF2D55',
  '#A2845E',
];

const Task = () => {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      color: '',
    },
  });

  const errors = form.formState.errors;

  const selectedColor = useWatch({
    control: form.control,
    name: 'color',
  });

  function onSubmit(values: z.infer<typeof taskSchema>) {
    //TODO - Submit data to backend
    console.log('values', values);
  }

  return (
    <Wrapper>
      <div
        className='md:w-[50%] w-[80%]
            max-w-[736px] mx-auto pt-12'
      >
        <Link href='/'>
          <Image src={back} alt='back button' width={14} height={14} />
        </Link>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-12 space-y-6'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primaryText'>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Ex: Brush your teeth' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label className='text-primaryText'>Color</Label>
              <div className='mt-2 flex items-center gap-2'>
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type='button'
                    onClick={() => {
                      form.setValue('color', color);
                      form.clearErrors('color');
                    }}
                    className={cn(
                      'h-8 w-8 rounded-full border-2 transition-colors',
                      {
                        'border-white': selectedColor === color,
                        'border-transparent': selectedColor !== color,
                      }
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
              {errors.color && (
                <p className='text-red-900 text-sm mt-2'>
                  {errors.color.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='
            flex
            items-center
            justify-center
            gap-2
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
              Add Task{' '}
              <Image src={plusIcon} alt='plus' width={16} height={16} />
            </button>
          </form>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Task;
