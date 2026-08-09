export type MenuType = {
  id?: number;
  type?: string;
  name: string;
  onClick?: () => void | Promise<void>;
};
