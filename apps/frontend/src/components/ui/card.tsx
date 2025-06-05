import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-background rounded-lg shadow-sm p-4",
        className
      )}
    >
      {children}
    </div>
  )
}

Card.displayName = 'Card';

export { Card }