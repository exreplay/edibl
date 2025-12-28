import { cva, type VariantProps } from 'class-variance-authority';

export type ButtonProps = VariantProps<typeof buttonStyles>;

export const buttonStyles = cva(
  'relative flex items-center justify-center rounded-md border border-transparent text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
  {
    variants: {
      intent: {
        primary: 'text-white bg-pink-600 hover:bg-pink-700 focus:ring-pink-500',
        secondary:
          'text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-pink-500',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'
      },
      size: {
        small: 'px-3 py-1',
        'small-narrow': 'px-2 py-1',
        default: 'px-4 py-2',
        'default-narrow': 'p-2'
      },
      disabled: {
        false: null,
        true: 'cursor-not-allowed opacity-50'
      }
    },
    defaultVariants: {
      intent: 'primary',
      size: 'default',
      disabled: false
    }
  }
);
