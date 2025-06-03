import { cn } from "@/shared/utils";

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

const Text = ({ children, className }: TextProps) => {
  return (
    <span className={cn("text-sm text-body", className)}>
      {children}
    </span>
  );
};

export default Text; 