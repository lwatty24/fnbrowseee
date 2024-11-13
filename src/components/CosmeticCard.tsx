import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { X, Copy, Check, Download } from 'lucide-react';
import { useState, useCallback, useMemo, memo } from 'react';
import { Cosmetic } from '@/types';
import { SetDialog } from './SetDialog';
import { fetchSetItems } from '@/lib/api';
import { ScrollArea } from '@/components/ui/scroll-area';
import { findRelatedItems } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MarvelParticles } from './MarvelParticles';
import { DCParticles } from './DCParticles';
import { StarWarsParticles } from './StarWarsParticles';
import { IconParticles } from './IconParticles';
import { InfoItem } from '@/components/InfoItem';

const formatRarityLabel = (rarity: string) => {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1).toLowerCase();
};

type CosmeticProps = {
  cosmetic: Cosmetic;
  allItems?: Cosmetic[];
};

const rarityColors = {
  common: 'bg-gray-500',
  uncommon: 'bg-green-500',
  rare: 'bg-sky-400',
  epic: 'bg-purple-500',
  legendary: 'bg-orange-500',
  mythic: 'bg-yellow-500',
  gaminglegends: 'bg-indigo-500',
  marvel: 'bg-red-500',
  starwars: 'bg-yellow-400',
  dc: 'bg-blue-800',
  dark: 'bg-purple-900',
  frozen: 'bg-cyan-400',
  lava: 'bg-orange-600',
  shadow: 'bg-zinc-800',
  icon: 'bg-teal-400',
  default: 'bg-gray-500',
};

const handleDownload = async (imageUrl: string, itemName: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${itemName.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

export default memo(function CosmeticCard({ cosmetic, allItems = [] }: CosmeticProps) {
  const rarityColor = rarityColors[cosmetic.rarity.value.toLowerCase() as keyof typeof rarityColors] || rarityColors.default;
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSetDialogOpen, setIsSetDialogOpen] = useState(false);
  const [setItems, setSetItems] = useState<Cosmetic[]>([]);
  const [selectedItem, setSelectedItem] = useState<Cosmetic>(cosmetic);
  const [copied, setCopied] = useState(false);

  const relatedItems = useMemo(() => {
    return findRelatedItems(selectedItem, allItems);
  }, [selectedItem, allItems]);

  const handleViewSet = async () => {
    if (!cosmetic.set?.value) return;
    
    try {
      const items = await fetchSetItems(cosmetic.set.value);
      setSetItems(items);
      setIsSetDialogOpen(true);
    } catch (error) {
      console.error('Error loading set items:', error);
    }
  };

  const handleSetItemClick = (cosmetic: Cosmetic) => {
    setSelectedItem(cosmetic);
    setIsSetDialogOpen(false);
    // Force a re-render of the dialog content
    const dialogContent = document.querySelector('[role="dialog"]');
    if (dialogContent) {
      dialogContent.setAttribute('data-key', cosmetic.id);
    }
  };

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText(selectedItem.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [selectedItem.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative h-[300px] overflow-hidden cursor-pointer bg-black/40 hover:bg-black/60 backdrop-blur-xl border-white/5 transition-all duration-500 hover:scale-[1.02]">
          {/* Glass Morphism Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Rarity Indicator */}
          <div className={cn(
            "absolute bottom-0 inset-x-0 h-[3px] opacity-40 group-hover:opacity-100 transition-all duration-500",
            rarityColor
          )} />
          
          <CardContent className="p-4 h-full flex flex-col">
            {/* Image Container */}
            <div className="relative flex-1 flex items-center justify-center h-full">
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <img
                src={cosmetic.images.featured || cosmetic.images.icon}
                alt={cosmetic.name}
                className="absolute inset-0 w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-2"
                loading="lazy"
                decoding="async"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = '/placeholder.png';
                }}
              />
            </div>

            {/* Info Container */}
            <div className="relative mt-auto space-y-3 z-10">
              {/* Title with Blur Background */}
              <div className="relative">
                <div className="absolute inset-0 -m-2 bg-black/50 rounded-xl" />
                <h3 className="relative font-medium text-lg text-white/90 truncate">
                  {cosmetic.name}
                </h3>
              </div>

              {/* Badges with Glass Effect */}
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "px-2 py-0.5 text-[10px]",
                    "border border-white/10",
                    "shadow-lg shadow-black/20",
                    rarityColors[cosmetic.rarity.value.toLowerCase() as keyof typeof rarityColors] || rarityColors.default,
                    "text-white"
                  )}
                >
                  {formatRarityLabel(cosmetic.rarity.value)}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="px-2 py-0.5 text-[10px] bg-black/30 border-white/10 text-white/70"
                >
                  {cosmetic.type.value}
                </Badge>
              </div>   

              {/* Floating Description */}
              <div className="absolute -top-24 inset-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                <div className="bg-black/70 backdrop-blur-xl rounded-xl p-3 border border-white/[0.02] shadow-xl">
                  <p className="text-sm text-white/70 line-clamp-2">
                    {cosmetic.description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className={cn(
        "fixed left-1/2 top-1/2",
        "w-[calc(100vw-64px)] max-w-6xl",
        "h-[calc(100vh-64px)] max-h-[900px]",
        "bg-black/40 backdrop-blur-md",
        "shadow-[0_0_50px_-12px] shadow-black",
        "border border-white/[0.02]",
        "bg-gradient-to-b from-white/[0.05] to-transparent",
        "after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-br",
        "after:from-white/[0.08] after:to-transparent after:pointer-events-none",
        "before:absolute before:inset-0 before:rounded-lg before:opacity-10",
        rarityColor.replace('bg-', 'before:bg-')
      )}>
        {selectedItem.rarity.value.toLowerCase() === 'marvel' && <MarvelParticles />}
        {selectedItem.rarity.value.toLowerCase() === 'dc' && <DCParticles />}
        {selectedItem.rarity.value.toLowerCase() === 'starwars' && <StarWarsParticles />}
        {selectedItem.rarity.value.toLowerCase() === 'icon' && <IconParticles />}
        <ScrollArea className="h-full">
          <div className="relative p-8">
            {/* Ambient Glow */}
            <div className={cn(
              "absolute -inset-[150px] opacity-20 blur-[100px] -z-10",
              "animate-pulse-slow duration-[5000ms]",
              rarityColor
            )} />

            {/* Content Container */} 
            <div className="relative z-10 space-y-8">
              <div className="space-y-8">
                <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <DialogTitle className="text-2xl font-medium text-white/90">
                        {selectedItem.name}
                      </DialogTitle>
                      <DialogDescription className="text-white/70">
                        {selectedItem.description}
                      </DialogDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full p-2 bg-black/20 hover:bg-black/40 transition-colors ring-1 ring-white/10 hover:ring-white/20"
                        onClick={() => handleDownload(selectedItem.images.featured || selectedItem.images.icon, selectedItem.name)}
                      >
                        <Download className="h-5 w-5 text-white/70" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "rounded-full p-2 bg-black/20 hover:bg-black/40 transition-colors ring-1 ring-white/10 hover:ring-white/20",
                          copied && "bg-green-500/20"
                        )}
                        onClick={handleCopyId}
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-white/70" />
                        ) : (
                          <Copy className="h-5 w-5 text-white/70" />
                        )}
                      </Button>
                      <DialogClose className="rounded-full p-2 bg-black/20 hover:bg-black/40 transition-colors ring-1 ring-white/10 hover:ring-white/20 shadow-[0_0_15px_-3px] shadow-white/10">
                        <X className="h-5 w-5 text-white/70" />
                      </DialogClose>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 mt-4">
                    <Badge 
                      className={cn(
                        "px-3 py-1.5 text-sm font-medium",
                        "backdrop-blur-md border border-white/10",
                        "shadow-lg shadow-black/20",
                        "transition-all duration-300",
                        rarityColor,
                        "hover:opacity-90"
                      )}
                    >
                      {formatRarityLabel(selectedItem.rarity.value)}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "px-3 py-1.5 text-sm font-medium",
                        "text-white/80 bg-black/40 hover:bg-black/50",
                        "backdrop-blur-md border-white/10",
                        "shadow-lg shadow-black/20",
                        "transition-all duration-300"
                      )}
                    >
                      {selectedItem.type.value}
                    </Badge>
                  </div>
                </DialogHeader>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Section */}
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-sm border border-white/[0.02]">
                    <div 
                      className={cn(
                        "cursor-zoom-in h-full transition-all duration-500 p-8",
                        isZoomed && [
                          "fixed inset-0 z-50",
                          "bg-black/95 backdrop-blur-md",
                          "cursor-zoom-out p-4",
                          "animate-in fade-in-0 zoom-in-95"
                        ]
                      )}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <img
                        src={selectedItem.images.featured || selectedItem.images.icon}
                        alt={selectedItem.name}
                        className={cn(
                          "w-full h-full object-contain",
                          "transition-transform duration-500",
                          isZoomed ? "scale-100" : "hover:scale-105"
                        )}
                        loading="lazy"
                        decoding="async"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false"
                      />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <InfoItem 
                        label="Set" 
                        value={selectedItem.set?.value || 'No Set'} 
                        className="bg-black/20 backdrop-blur-sm border-white/[0.02]"
                        onClick={selectedItem.set?.value ? handleViewSet : undefined}
                      />
                      <InfoItem 
                        label="Rarity" 
                        value={selectedItem.rarity.value} 
                        className="bg-black/20 backdrop-blur-sm border-white/[0.02]"
                      />
                      <InfoItem 
                        label="Type" 
                        value={selectedItem.type.value} 
                        className="bg-black/20 backdrop-blur-sm border-white/[0.02]"
                      />
                      {selectedItem.series && (
                        <InfoItem 
                          label="Series" 
                          value={selectedItem.series.value} 
                          className="bg-black/20 backdrop-blur-sm border-white/[0.02]"
                        />
                      )}
                    </div>

                    {selectedItem.introduction && (
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/[0.02]">
                        <h4 className="text-sm font-medium text-white/70 mb-1">Introduction</h4>
                        <p className="text-sm text-white/90">{selectedItem.introduction.text}</p>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      className={cn(
                        "w-full",
                        "bg-black/20 backdrop-blur-sm",
                        "border border-white/[0.02]",
                        "text-white/70 hover:text-white/70",
                        "transition-all duration-300",
                        "hover:bg-black/30",
                        "shadow-lg shadow-black/10",
                        "hover:bg-opacity-10",
                        rarityColor.replace('bg-', 'hover:border-'),
                        "[&:hover]:ring-0",
                        "[&:focus]:ring-0",
                        "[&:focus-visible]:ring-0",
                        "[&:focus-visible]:ring-offset-0",
                        "[&:hover]:bg-black/30",
                        "hover:border-[var(--rarity-color)]",
                        `[--rarity-color:var(--${rarityColor.split('-')[1]}-500)]`
                      )}
                      onClick={() => handleDownload(selectedItem.images.featured || selectedItem.images.icon, selectedItem.name)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Image
                    </Button>
                  </div>
                </div>

                {/* Related Items Section */}
                {relatedItems.length > 0 && (
                  <div className="space-y-4 border-t border-white/5 pt-8 mt-8">
                    <h3 className="text-lg font-medium text-white/90">Related Items</h3>
                    <div className="relative -mx-8">
                      {/* Left fade */}
                      <div className="absolute left-8 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none" />
                      {/* Right fade */}
                      <div className="absolute right-8 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none" />
                      
                      <div className="overflow-x-auto px-8 pb-4 scrollbar-thin scrollbar-track-black/20 scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                        <div className="flex gap-6">
                          {relatedItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex-shrink-0 w-[180px] group relative aspect-square rounded-lg overflow-hidden bg-black/10 hover:bg-black/20 backdrop-blur-sm border border-white/[0.02] transition-all duration-300 cursor-pointer"
                              onClick={() => handleSetItemClick(item)}
                            >
                              <div className="absolute inset-0">
                                <img
                                  src={item.images.featured || item.images.icon}
                                  alt={item.name}
                                  className="absolute inset-0 w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110"
                                  loading="lazy"
                                  onContextMenu={(e) => e.preventDefault()}
                                  draggable="false"
                                />
                              </div>
                              
                              <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-md border-t border-white/5 p-3">
                                <h3 className="text-sm font-medium text-white/90 truncate mb-2">
                                  {item.name}
                                </h3>
                                <div className="flex gap-2">
                                  <Badge className="px-2 py-0.5 text-[10px] bg-black/30 hover:bg-black/40 text-white/70">
                                    {item.type.value}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>

      {cosmetic.set?.value && (
        <SetDialog
          isOpen={isSetDialogOpen}
          onOpenChange={setIsSetDialogOpen}
          setName={cosmetic.set.value}
          items={setItems}
          onItemClick={handleSetItemClick}
        />
      )}
    </Dialog>
  );
}, (prevProps, nextProps) => prevProps.cosmetic.id === nextProps.cosmetic.id);

