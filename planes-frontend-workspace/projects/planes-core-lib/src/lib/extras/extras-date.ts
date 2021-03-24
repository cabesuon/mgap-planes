export function dateToString(date: Date): string {
  if (!date) {
    return null;
  }
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

function pad(n: number) {
  if (n < 10) {
    return '0' + n;
  }
  return n;
}

export function dateToStringServerFormat(date: Date): string {
  if (!date) {
    return null;
  }
  return (
    date.getUTCFullYear() +
    '-' +
    pad(date.getUTCMonth() + 1) +
    '-' +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    ':' +
    pad(date.getUTCMinutes()) +
    ':' +
    pad(date.getUTCSeconds())
  );
}

export function dateFromStringServerFormat(str: string): Date {
  if (!str || str === '0000-00-00T00:00:00') {
    return null;
  }
  return new Date(Date.parse(str));
}
