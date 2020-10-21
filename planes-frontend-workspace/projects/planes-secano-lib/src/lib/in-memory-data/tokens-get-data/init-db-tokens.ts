import { GetData } from '../get-data';

export class InitDbTokens implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbTokens: Array<{ token: string; personaId: string }> = [
      {
        personaId: '1',
        token: '1'
      },
      {
        personaId: '2',
        token: '2'
      },
      {
        personaId: '3',
        token: '3'
      }
    ];
    return initialDbTokens;
  }
}
