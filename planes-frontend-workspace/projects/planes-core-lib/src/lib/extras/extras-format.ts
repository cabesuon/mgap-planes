import { dateFromString, dateToString } from './extras-date';

export function formatValue(value: any, format: (v: any) => string): string {
  if (format) {
    return format(value);
  }
  return `${value}`;
}

export function formatDate(d: Date | string): string {
  if (!d) {
    return '';
  }
  if (d instanceof Date) {
    return dateToString(d);
  }
  return d;
}
