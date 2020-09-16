export interface ItemAddResult {
  success: boolean;
  error: { code: number; description: string };
  id: string;
}
