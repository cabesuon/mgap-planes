import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../core/core.state';

import { ChatSecano } from '../../entity-chat/entity-chat.state';
import { ChatSecanoDetailParams } from 'planes-secano-lib';
import { selectAllEntityChat } from '../../entity-chat/entity-chat.selectors';

import { createBaseChatSecano } from 'planes-secano-lib';

@Component({
  selector: 'app-vista-chat',
  templateUrl: './vista-chat.component.html',
  styleUrls: ['./vista-chat.component.scss']
})
export class VistaChatComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  mensajes: ChatSecano[] = [];

  ngOnInit(): void {
    this.store.pipe(select(selectAllEntityChat)).subscribe(mensajes => {
      this.mensajes = [
        createBaseChatSecano(
          '1',
          '2017-06-28T15:50:57',
          '3',
          'Observaciones de verificación',
          true,
          '0',
          '1'
        ),
        createBaseChatSecano(
          '3',
          '2018-04-16T15:09:24',
          '1',
          'Se ha vencido el plazo para la contrucción de terrazas para el plan número 9.\r\nEl problema se prensentó en: \r\n',
          false,
          '0',
          '9'
        ),
        createBaseChatSecano(
          '24',
          '2018-04-16T15:09:27',
          '1',
          'Se ha vencido el plazo para la contrucción de terrazas para el plan número 9.\r\nEl problema se prensentó en: \r\n',
          false,
          '0',
          '9'
        ),
        createBaseChatSecano(
          '9',
          '2017-11-13T15:20:01',
          '3',
          'Se ha deshabilitado la edición de la rotación del plan',
          true,
          '0',
          '4088'
        )
      ]; /*mensajes*/
    });
    console.log(this.mensajes);
  }
}
