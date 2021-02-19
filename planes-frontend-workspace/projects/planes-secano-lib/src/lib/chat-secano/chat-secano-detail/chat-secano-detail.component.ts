import { Component, OnInit, Input } from '@angular/core';
import { DetailField, DetailParams } from 'planes-core-lib';
import { PeriodosSecanoDetailParams } from '../../periodos-secano/periodos-secano-detail.model';
import { ChatSecanoDetailParams } from '../chat-secano-detail.model';

@Component({
  selector: 'lib-chat-secano-detail',
  templateUrl: './chat-secano-detail.component.html',
  styleUrls: ['./chat-secano-detail.component.css']
})
export class ChatSecanoDetailComponent implements OnInit {
  _params: ChatSecanoDetailParams = null;
  @Input()
  set params(value: ChatSecanoDetailParams) {
    this._params = value;
    if (!value) {
      return;
    }

    this.fields = value.fields;

    const rows = this.fields.map(f => ({
      label: f.label,
      value: value.chat[f.name]
    }));
    this.detailParams = {
      rows
    };
  }

  fields: DetailField[] = null;

  detailParams: DetailParams = null;

  chatsDetailParams: ChatSecanoDetailParams[] = [];

  constructor() {}

  ngOnInit(): void {}
}
