import { GetData } from '../get-data';
import { ChatSecano } from '../../chat-secano/chat-secano.model';

export class InitDbChat implements GetData {
  getData(payload: any, db?: any): any {
    const initialDbComponents: ChatSecano[] = [];
    return initialDbComponents;
  }
}
