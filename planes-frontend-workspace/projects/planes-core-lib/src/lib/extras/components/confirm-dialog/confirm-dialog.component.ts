import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ConfirmDialogResultType,
  ConfirmDialogData
} from '../confirm-dialog.model';

@Component({
  selector: 'lib-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  ngOnInit(): void {}

  onOk() {
    this.data.result = ConfirmDialogResultType.Ok;
    this.dialogRef.close(this.data);
  }

  onCancel() {
    this.data.result = ConfirmDialogResultType.Cancel;
    this.dialogRef.close(this.data);
  }
}
