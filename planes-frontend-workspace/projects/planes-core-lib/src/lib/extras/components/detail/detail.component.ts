import { Component, OnInit, Input } from '@angular/core';

import { DetailParams } from '../detail.model';

@Component({
  selector: 'lib-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() params: DetailParams = null;

  constructor() {}

  ngOnInit(): void {}
}
