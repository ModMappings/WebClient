export interface Package {
  name: string;
  fullName: string;
  children?: Package[];
}
