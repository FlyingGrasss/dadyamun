export type CommitteeType = {
  id: number;
  name: string;
  imageUrl: string;
  link: string;
  lqip?: string; // For blur placeholders
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
};

export type SecretariatType = {
  id: number;
  name: string;
  imageUrl: string;
  link: string;
  lqip?: string; // For blur placeholders
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
};