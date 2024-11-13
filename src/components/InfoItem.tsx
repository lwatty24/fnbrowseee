import { cn } from '@/lib/utils';

interface InfoItemProps {
  label: string;
  value: string;
  className?: string;
  onClick?: () => void;
}

export function InfoItem({ label, value, className, onClick }: InfoItemProps) {
  return (
    <div 
      className={cn(
        "group space-y-1 rounded-xl bg-black/20 backdrop-blur-md p-3 border border-white/[0.05]",
        "transition-all duration-300",
        onClick && "cursor-pointer hover:bg-black/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20",
        className
      )}
      onClick={onClick}
    >
      <h4 className="text-sm font-medium text-white/60 group-hover:text-white/70 transition-colors">{label}</h4>
      <p className="text-sm text-white/90">{value}</p>
    </div>
  );
} 