export function formatValue(
  value: any,
  format: (v: any) => string
): string {
  if (format) {
    return format(value);
  }
  return `${value}`;
}

export function formatDate(d: Date) {
  const d2 = new Date(d);
  return `${d2.getDate()}/${d2.getMonth() + 1}/${d2.getFullYear()}`;
}
