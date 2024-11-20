import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  iconLeft,
  iconRight,
  className,
  loading,
  ...props
}) => {
  return (
    <button
      className={cn(
        "h-12 min-h-12 px-4 text-base flex w-full items-center justify-center gap-2 text-white rounded outline-fips-light transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40",
        "bg-indigo-950 border border-indigo-950",
        className
      )}
      disabled={loading}
      {...props}
    >
      {iconLeft && iconLeft}
      {!loading ? text : <CircleNotch className={cn('animate-spin')} />}
      {iconRight && iconRight}
    </button>
  );
};
