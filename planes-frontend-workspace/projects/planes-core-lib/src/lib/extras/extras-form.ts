export enum FormActionType {
  Add = 'Add',
  Update = 'Update'
}

export enum FormConfirmationType {
  Ok = 'Ok',
  Cancel = 'Cancel'
}

export function formValid(statuses: string[]): boolean {
  for (const status of statuses) {
    if (status !== 'VALID') {
      return false;
    }
  }
  return true;
}

export function compareFormStatus(s1: string, s2: string): number {
  if (s1 === s2) {
    return 0;
  }
  if (s1 === 'DISABLED') {
    return -1;
  }
  if (s2 === 'DISABLED') {
    return 1;
  }
  if (s1 === 'PENDING') {
    return -1;
  }
  if (s2 === 'PENDING') {
    return 1;
  }
  if (s1 === 'INVALID') {
    return -1;
  }
  if (s2 === 'INVALID') {
    return 1;
  }
  if (s1 === 'VALID') {
    return -1;
  }
  return 1;
}
