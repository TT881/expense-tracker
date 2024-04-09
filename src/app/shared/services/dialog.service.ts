import { Injectable, Component } from '@angular/core';
import { DialogComponent } from '../Dialog/Dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  // openDialog(data: any, dialogType?: any, width?: any, height?: any): any {
  //   let component: any;
  //   component = DialogComponent;
  //   return this.dialog.open(component, {
  //     width: width + 'px',
  //     height: height + '%',
  //     panelClass: 'custom-overlay-pane-class',
  //     data: data,
  //     dialogType: dialogType,
  //   });
  // }

  openDynamicDialog() {}
}
