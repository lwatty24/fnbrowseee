import { cn } from '@/lib/utils';

export const InfoItem = ({ label, value, className, onClick }: { 
  label: string; 
  value: string; 
  className?: string;
  onClick?: () => void;
}) => (
  <div 
    className={cn(
      "space-y-1 rounded-xl bg-black/20 backdrop-blur-md p-3 border border-white/[0.05]",
      onClick && "cursor-pointer hover:bg-black/30 transition-colors",
      className
    )}
    onClick={onClick}
  >
    <h4 className="text-sm font-medium text-white/60">{label}</h4>
    <p className="text-sm text-white/90">{value}</p>
  </div>
); 