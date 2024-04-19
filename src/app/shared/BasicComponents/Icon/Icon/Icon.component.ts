import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-Icon',
  templateUrl: './Icon.component.html',
  styleUrls: ['./Icon.component.css'],
  imports: [MatIconModule, MatTooltipModule, CommonModule],
})
export class IconComponent implements OnInit {
  @Input() IconTooltip!: string;
  @Input() IconType!: string;
  @Input() row: any;
  @Input() column: any;
  @Output() clickIconEvent = new EventEmitter<{ data: ''; actionType: '' }>();

  constructor() {}

  ngOnInit() {}

  ClickIcon(data: any, actionType: any) {
    this.clickIconEvent.emit({ data: data, actionType: actionType });
  }
}
