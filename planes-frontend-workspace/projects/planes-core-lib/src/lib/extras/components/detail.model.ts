export interface DetailRow {
  label: string;
  value: string;
}

export interface DetailParams {
  rows: DetailRow[];
}

export interface DetailField {
  name: string;
  label: string;
  format?: (v: any) => string;
}
