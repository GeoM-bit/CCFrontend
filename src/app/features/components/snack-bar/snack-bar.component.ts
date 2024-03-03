import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class SnackBarComponent {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      duration:5000,
      panelClass: ['snackBar']
    });
  }
}
