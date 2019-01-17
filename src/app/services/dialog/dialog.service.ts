import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../../utils/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
  	private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  public openSnackBar(message: string, action?: string, duration: number = 3000): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
		  duration: duration
		});
  }

  public openDialog(component, config: MatDialogConfig = { width: "600px", autoFocus: false }): MatDialogRef<any> {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(component, config);
    return dialogRef;
  }

  public confirm(config: { title?: string, message?: string, hasCancel?: boolean, button?:string, color?: string, extraButton?: string, extraButtonFn?: () => void  }): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmComponent>;

    dialogRef = this.dialog.open(ConfirmComponent, {
      data: config
    });
    return dialogRef.afterClosed();
  }
}
