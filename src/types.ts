export type Cosmetic = {
  id: string;
  name: string;
  description: string;
  rarity: {
    value: string;
  };
  type: {
    value: string;
  };
  images: {
    icon: string;
    featured?: string;
  };
  introduction?: {
    text: string;
  };
  set?: {
    value: string;
  };
  series?: {
    value: string;
  };
}; 