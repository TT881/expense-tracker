import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { InputFieldComponent } from '../../BasicComponents/Input/InputField/InputField.component';
import { DropdownComponent } from '../../BasicComponents/Dropdown/Dropdown/Dropdown.component';
import { CheckboxComponent } from '../../BasicComponents/Checkbox/Checkbox/Checkbox.component';
import { ButtonComponent } from '../../BasicComponents/Buttons/Button/Button.component';
import { IconComponent } from '../../BasicComponents/Icon/Icon/Icon.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'app-SpreadSheet',
  templateUrl: './SpreadSheet.component.html',
  styleUrls: ['./SpreadSheet.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSortModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    FlexLayoutModule,
    ResizableModule,
    MatMenuModule,
    InputFieldComponent,
    DropdownComponent,
    CheckboxComponent,
    ButtonComponent,

    IconComponent,
  ],
})
export class SpreadSheetComponent implements OnInit {
  NextRecord() {
    throw new Error('Method not implemented.');
  }
  sortData($event: Sort) {
    throw new Error('Method not implemented.');
  }
  openFilterTemplate(
    $event: MouseEvent,
    _t30: HTMLElement,
    _t24: any,
    arg3: any,
    _t9: any
  ) {
    throw new Error('Method not implemented.');
  }
  SelectedRowIndex: any = 0;
  Inputfocused = '';

  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @Input() dc: any[] | undefined;
  @Input() displayedColumnsField: any[] = [];
  @Input()
  datasource!: MatTableDataSource<any>;
  @Input() tableLength: any;
  @Input() datasourceElement: any;
  @Input()
  tabledata: any[] = [];
  @Input() SwitchValue: any;
  @Input()
  Enablefooter: boolean = false;
  @Input() bgclass: string | undefined;
  @Input() ngstyle: any;
  @Input() ngfooterstyle: any;
  @Input() Dropdowndata: any;
  @Input()
  Saverecords: boolean = false;
  @Input() TableWidth: any;
  @Input() Tableheight: any;
  @Input()
  Sorts: MatSort = new MatSort();
  @Input()
  AutoRefresh: boolean = false;
  @Input() IntervalTime: number | undefined;
  @Input() TableLabelName: string | undefined;
  @Input() SavedataFlag: boolean = false;
  @Input() getValidationFun:
    | (() => (row: any, j: any, column: any) => (value: any) => any)
    | undefined;

  @Input() getCheckBoxValue:
    | (() => (row: any, j: any, column: any) => boolean)
    | undefined;

  @Input() DisableCheckBoxVal:
    | (() => (row: any, j: any, column: any) => boolean)
    | undefined;

  @Output() RowEvent = new EventEmitter<{ data: ''; actionType: '' }>();

  Records: any;
  FilteredDataLength: any;
  ShowUnFilter: any;
  Clearfilter: any;
  filterImg: any;
  contextMenuPosition: any;
  SelectedColumnValue: any;

  constructor() {}

  ngOnInit() {}

  onResizeEnd($event: ResizeEvent, arg1: any, _t12: number) {}
  highlight(_t61: any, _t60: any) {}
  Setselectedrowinfo(_t61: any) {
    throw new Error('Method not implemented.');
  }
  Filtering(_t134: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  Showall() {
    throw new Error('Method not implemented.');
  }

  UpdateSelectedRecord() {
    throw new Error('Method not implemented.');
  }
  PreviousRecord() {
    throw new Error('Method not implemented.');
  }

  getRowData(event: any) {
    this.RowEvent.emit(event);
  }
}
