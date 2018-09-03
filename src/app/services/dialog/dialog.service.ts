import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';

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
}
