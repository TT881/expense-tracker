import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-Dialog',
  templateUrl: './Dialog.component.html',
  styleUrls: ['./Dialog.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class DialogComponent implements OnInit {
  constructor() {}

  @Inject(MAT_DIALOG_DATA) public data: any;

  ngOnInit() {}
}
