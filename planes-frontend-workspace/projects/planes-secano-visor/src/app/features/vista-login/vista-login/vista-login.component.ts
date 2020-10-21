import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';

import { authLoginRequest } from '../../../core/auth/auth.actions';

import { AppState } from '../../../core/core.state';
import { routeAnimations } from '../../../core/core.module';

@Component({
  selector: 'app-vista-login',
  templateUrl: './vista-login.component.html',
  styleUrls: ['./vista-login.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.Default
})
export class VistaLoginComponent implements OnInit {
  personaId$: Observable<number>;

  form = this.fb.group({
    token: ['', [Validators.required]]
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      const payload = {
        token: this.form.value.token
      };
      this.store.dispatch(authLoginRequest(payload));
    }
  }
}
