declare module "*.css";

declare type Pet = {
  full_name: string;
  pictureUrl: string;
  breed: string;
  color: string;
  sex: "female" | "male";
  date_last_seen: string;
  last_location_lat: number;
  last_location_lng: number;
  createdAt?: string;
  updatedAt?: string;
  id?: number;
  published_by?: number;
  state?: "lost" | "found";
};

declare type PetToUpdate = {
  full_name: string;
  pictureUrl: string;
  breed: string;
  color: string;
  sex: "female" | "male";
  date_last_seen: string;
  last_location_lat: number;
  last_location_lng: number;
  id: number;
  state: "lost" | "found";
};
