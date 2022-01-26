export type UserProps = {
  name: string;
  id: number;
};

export type ClipProps = {
  id: number;
  title: string;
  clipUrl: string;
  weaponId?: number;
  mapId?: number;
  authorId?: number;
  weapon?: WeaponProps;
  map?: MapProps;
  author?: UserProps;
};

export type WeaponProps = {
  name: string;
  id: number;
};

export type MapProps = {
  name: string;
  id: number;
};
