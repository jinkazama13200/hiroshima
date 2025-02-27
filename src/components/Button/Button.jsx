import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-colors", "uppercase"], {
  variants: {
    variant: {
      default: ["bg-secondary-default", "hover:bg-secondary-hover"],
      ghost: ["bg-transparent", "hover:bg-secondary-hover"],
    },
    size: {
      default: [
        "py-3",
        "px-10",
        "rounded-lg",
        "flex",
      ],
      icon: [
        "h-10",
        "w-10",
        "flex",
        "p-2.5",
        "justify-center",
        "items-center",
        "rounded-full",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Button = ({ className, variant, size, children, ...props }) => {
  return (
    <button
      className={twMerge(buttonStyles({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
