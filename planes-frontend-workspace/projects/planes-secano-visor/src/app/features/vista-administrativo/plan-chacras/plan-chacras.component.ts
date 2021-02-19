import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TableActionEvent } from 'planes-core-lib';
import { PlanSecano, ChacraSecano } from 'planes-secano-lib';

export interface PlanChacrasParams {
  plan: PlanSecano;
  chacras: ChacraSecano[];
}

@Component({
  selector: 'app-plan-chacras',
  templateUrl: './plan-chacras.component.html',
  styleUrls: ['./plan-chacras.component.scss']
})
export class PlanChacrasComponent implements OnInit {
  private _params: PlanChacrasParams = null;
  @Input()
  get params(): PlanChacrasParams {
    return this._params;
  }
  set params(params: PlanChacrasParams) {
    this._params = params;
    this.update();
  }

  chacrasTableParams = { chacras: [] };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  reset() {
    this.chacrasTableParams = { chacras: [] };
  }

  update() {
    this.reset();
    if (!this.params) {
      return;
    }
    if (this.params.chacras) {
      this.chacrasTableParams = {
        chacras: this.params.chacras.filter(
          c => c.planId === this.params.plan.planId
        )
      };
    }
  }

  chacrasTableAction(action: TableActionEvent) {
    switch (action.value) {
      case 'GotoVistaMapa':
        this.router.navigate([
          '/features/mapa',
          {
            PlanId: action.obj.planId,
            ChacraId: action.obj.chacraId
          }
        ]);
        break;
    }
  }
}
