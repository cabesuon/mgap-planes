export enum TableValueType {
  ACTION = 'Action',
  LIST = 'List',
  LITERAL = 'Literal'
}

export interface TableValueAction {
  value: string;
  text: string;
  icon: string;
}

export type TableValueList = Array<any>;

export type TableValueLiteral = boolean | number | string;

export type TableValueSource = any;

export type TableValue =
  | TableValueAction
  | TableValueList
  | TableValueLiteral
  | TableValueSource;

export interface TableRow {
  [name: string]: TableValue;
}

export interface TableColumn {
  type: TableValueType;
  name: string;
  label?: string;
  sort?: boolean;
  filter?: boolean;
  sticky?: boolean;
}

export interface TableParams {
  columns: TableColumn[];
  values: TableRow[];
  filter?: boolean;
  pagination?: boolean;
}

export interface TableActionEvent {
  value: string;
  obj: any;
}
