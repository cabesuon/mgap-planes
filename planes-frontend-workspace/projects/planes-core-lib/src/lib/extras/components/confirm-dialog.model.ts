export enum ConfirmDialogResultType {
  Ok = 'Ok',
  Cancel = 'Cancel'
}

export interface ConfirmDialogData {
  title: string;
  question: string;
  result: ConfirmDialogResultType;
}
