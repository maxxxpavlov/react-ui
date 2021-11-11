// Just some technical typings
export interface ValueLink {
  value: any;
  requestChange: (value: any) => void;
}
export type GetValueLink<State> = (key: keyof State) => ValueLink;
export type GetValuelinkCheckbox = (checkboxKey: string) => ValueLink;
// TODO: Do not use "I" for "Interface"
export interface IPagination {
  page: number;
  totalOrders: number;
}
