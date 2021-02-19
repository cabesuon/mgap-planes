import { Component, OnInit, Input } from '@angular/core';

import {
  IngenieroAgronomoCore,
  IngenierosCoreDetailParams,
  PersonaCore,
  EmpresaCore,
  EmpresasCoreDetailParams
} from 'planes-core-lib';
import {
  PlanSecano,
  PlanesSecanoDetailParams,
  ResponsablesSecanoDetailParams,
  WarnErrorSecanoParams
} from 'planes-secano-lib';

import { getEmpresaResponsableContacto } from '../../entity-empresas/entity-empresas.state';

export interface PlanDetallesParams {
  plan: PlanSecano;
  ingenieros: IngenieroAgronomoCore[];
  personas: PersonaCore[];
  empresas: EmpresaCore[];
}

@Component({
  selector: 'app-plan-detalles',
  templateUrl: './plan-detalles.component.html',
  styleUrls: ['./plan-detalles.component.scss']
})
export class PlanDetallesComponent implements OnInit {
  private _params: PlanDetallesParams = null;
  @Input()
  get params(): PlanDetallesParams {
    return this._params;
  }
  set params(params: PlanDetallesParams) {
    this._params = params;
    this.update();
  }

  planDetailParams: PlanesSecanoDetailParams = null;
  ingenieroDetailParams: IngenierosCoreDetailParams = null;
  propietarioDetailParams: EmpresasCoreDetailParams = null;
  propietarioResponsableDetailParams: ResponsablesSecanoDetailParams = null;
  arrendatarioDetailParams: EmpresasCoreDetailParams = null;
  arrendatarioResponsableDetailParams: ResponsablesSecanoDetailParams = null;
  warnErrorSecanoParams: WarnErrorSecanoParams = null;

  constructor() {}

  ngOnInit(): void {
    this.update();
  }

  reset() {
    this.planDetailParams = null;
    this.ingenieroDetailParams = null;
    this.propietarioDetailParams = null;
    this.propietarioResponsableDetailParams = null;
    this.arrendatarioDetailParams = null;
    this.arrendatarioResponsableDetailParams = null;
    this.warnErrorSecanoParams = null;
  }

  update() {
    this.reset();
    if (!this.params || !this.params.plan) {
      return;
    }
    this.planDetailParams = { plan: this.params.plan };

    if (
      (this.params.plan.errors && this.params.plan.errors.length > 0) ||
      (this.params.plan.warnings && this.params.plan.warnings.length > 0)
    ) {
      this.warnErrorSecanoParams = {
        errors: this.params.plan.errors,
        warnings: this.params.plan.warnings
      };
    }

    const ingeniero = this.params.ingenieros.find(
      i => i.ingenieroAgronomoId === this.params.plan.ingenieroAgronomoId
    );
    this.ingenieroDetailParams = {
      ingeniero,
      persona: this.params.personas.find(
        p => ingeniero.contacto && p.personaId === ingeniero.contacto.personaId
      )
    };

    // propietario
    let empresa = this.params.empresas.find(
      e => this.params.plan.propietarioId === e.empresaId
    );
    this.propietarioDetailParams = empresa ? { empresa } : null;
    this.propietarioResponsableDetailParams = {
      responsable: {
        contacto: getEmpresaResponsableContacto(empresa),
        celularValidado: null,
        emailValidado: null,
        empresaId: empresa.empresaId
      },
      persona: this.params.personas.find(
        p => p.personaId === this.params.plan.propietarioResponsableId
      )
    };

    // arrendatarios
    this.arrendatarioDetailParams = null;
    this.arrendatarioResponsableDetailParams = null;
    if (
      this.params.plan.tenedorCualquierTituloId &&
      this.params.plan.tenedorCualquierTituloId !== '0'
    ) {
      empresa = this.params.empresas.find(
        e => this.params.plan.tenedorCualquierTituloId === e.empresaId
      );
      if (empresa) {
        this.arrendatarioDetailParams = empresa ? { empresa } : null;
        this.arrendatarioResponsableDetailParams = {
          responsable: {
            contacto: getEmpresaResponsableContacto(empresa),
            celularValidado: null,
            emailValidado: null,
            empresaId: empresa.empresaId
          },
          persona: this.params.personas.find(
            p => p.personaId === this.params.plan.tctResponsableId
          )
        };
      }
    }
  }
}
