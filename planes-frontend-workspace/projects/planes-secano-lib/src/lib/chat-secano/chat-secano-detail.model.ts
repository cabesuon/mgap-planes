import { DetailField } from 'planes-core-lib';
import { ChatSecano } from './chat-secano.model';

export const CHATSECANODETAIL_DEFAULT_FIELDS: DetailField[] = [
  { name: 'chatNombre', label: 'Chat' }
];

export interface ChatSecanoDetailParams {
  chat: ChatSecano;
  fields?: DetailField[];
}
