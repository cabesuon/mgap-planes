export function dateToString(date: Date): string {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

export function dateFromString(str: string): Date {
  const [d, m, y]: number[] = str.split('/').map(s => Number(s));
  return new Date(y, m - 1, d);
}

export function randomDate(start: Date, end: Date) {
  return new Date(+start + Math.random() * (+end - +start));
}
