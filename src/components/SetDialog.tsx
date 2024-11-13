import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Cosmetic } from '@/types';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type SetDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setName: string;
  items: Cosmetic[];
  onItemClick: (item: Cosmetic) => void;
};

export function SetDialog({ isOpen, onOpenChange, setName, items, onItemClick }: SetDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "fixed left-1/2 top-1/2",
        "w-[calc(100vw-64px)] max-w-6xl",
        "h-[calc(100vh-64px)] max-h-[900px]",
        "bg-black/40 backdrop-blur-xl",
        "shadow-[0_0_50px_-12px] shadow-black",
        "after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-br",
        "after:from-white/[0.08] after:to-transparent after:pointer-events-none",
        "before:absolute before:inset-0 before:rounded-lg before:opacity-10"
      )}>
        <ScrollArea className="h-full">
          <div className="relative p-8">
            {/* Ambient Glow */}
            <div className="absolute -inset-[150px] opacity-20 blur-[100px] -z-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />

            {/* Content Container */}
            <div className="relative z-10 space-y-8">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <DialogTitle className="text-2xl font-medium text-white/90">
                      {setName}
                    </DialogTitle>
                    <DialogDescription className="text-white/70">
                      {items.length} items in this set
                    </DialogDescription>
                  </div>
                  <DialogClose className="rounded-full p-2 bg-black/20 hover:bg-black/40 transition-colors">
                    <X className="h-5 w-5 text-white/70" />
                  </DialogClose>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                  <DialogTrigger asChild key={item.id}>
                    <div 
                      className="group relative aspect-square rounded-lg overflow-hidden bg-black/10 hover:bg-black/20 backdrop-blur-sm border border-white/[0.02] transition-all duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        onItemClick(item);
                      }}
                    >
                      {/* Image */}
                      <div className="absolute inset-0 p-4">
                        <img
                          src={item.images.featured || item.images.icon}
                          alt={item.name}
                          className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Info Overlay */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="p-3 bg-black/60 backdrop-blur-md border-t border-white/5">
                          <h3 className="text-sm font-medium text-white/90 truncate mb-2">
                            {item.name}
                          </h3>
                          <div className="flex gap-2">
                            <Badge className="px-2 py-0.5 text-[10px] bg-black/30 hover:bg-black/40 text-white/70">
                              {item.type.value}
                            </Badge>
                            <Badge className="px-2 py-0.5 text-[10px] bg-black/30 hover:bg-black/40 text-white/70">
                              {item.rarity.value}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 