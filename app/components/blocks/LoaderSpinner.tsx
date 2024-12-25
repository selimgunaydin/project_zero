import { twMerge } from 'tailwind-merge';

type LoaderSpinnerProps = {
  className?: string;
  wrapperClassName?: string;
  borderType?: 'solid' | 'dotted' | 'dashed';
};

export const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({
  borderType = 'solid',
  wrapperClassName,
  className
}) => {
  return (
    <div
      className={twMerge(
        'flex h-full w-full items-center justify-center',
        wrapperClassName
      )}
    >
      <div
        className={twMerge(
          'h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent',
          `border-${borderType}`,
          className
        )}
      />
    </div>
  );
};
