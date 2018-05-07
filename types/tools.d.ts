// tools
// date
export function dateFormat(date: Date, format?: string): string;
export function dateRange(start: string | number, end: string | number, format?: string): string[];

// number
export function numberComma(source: number, length?: number): string;
export function numberPad(source: number, length?: number): string;
export function numberRandom(min: number, max: number): number;

// md5
export function md5(content: string): string;

// cookie
export const Cookie: CookieImp;

interface CookieImp {
  get<TReturn = string>(name: string, options?: CookieGettingOptions<TReturn>): TReturn;
  set(name: string, value: any, options?: CookieSettingOptions): string;
  remove(name: string, options?: CookieSettingOptions): string;
}
type CookieConverter<T> = (content: string) => T;
type CookieGettingOptions<T> = CookieConverter<T> | { raw: boolean; converter: CookieConverter<T> };
interface CookieSettingOptions {
  path: string;
  raw: boolean;
  domain: string;
  expires: number | Date;
}

