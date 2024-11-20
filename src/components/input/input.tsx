import { cn } from '@/lib/cn';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export type InputProps<T extends FieldValues> = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: Path<T>;
  label?: React.ReactNode;
  containerClassName?: string | undefined;
  register?: UseFormRegister<T>;
  error?: string;
};

export const Input = <T extends FieldValues>({
  name,
  label,
  className,
  containerClassName,
  register,
  error,
  ...props
}: InputProps<T>) => {
  return (
    <div className={cn('flex w-full flex-col gap-2', containerClassName)}>
      {label && (
        <label
          htmlFor={props.itemRef}
          className={cn(
            'text-slate-500 font-semibold',
          )}
        >
          {label}
        </label>
      )}

      <div className={cn('relative flex flex-col gap-2')}>
        <input
          className={cn(
            "h-12 w-full px-4 text-base text-slate-300 border border-slate-700 rounded bg-indigo-950 bg-opacity-20 focus:outline-none focus:border-slate-400",
            error && 'border-red-400',
            className
          )}
          {...props}
          {...register?.(name)}
        />

        {error && <span className="text-2xs text-red-400">{error}</span>}
      </div>
    </div>
  );
}
