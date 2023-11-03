import { Component } from '@angular/core';
import { ColDef, Column, RowRenderer } from 'ag-grid-community';
import { ChangeDetectorRef } from '@angular/core';
import { Directive, ViewContainerRef } from '@angular/core';

interface Cars {
  make: string;
  model: string;
  price: number;
}

// [rowData] = "rowData"
@Component({
  selector: 'app-root',
  template: `
   <input type="file" (change)="handleFileInput($event)"/>
  <ag-grid-angular
    style="width: 1000px; height: 500px;"
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [rowDragManaged]="true"
    [animateRows]="true">
</ag-grid-angular>`,
  styleUrls: ['./app.component.css']
})


export class AppComponent {


  columnDefs: ColDef[] = [
    { field: 'make', editable: true, sortable: true, filter: true, rowDrag: true },
    { field: 'model', editable: true, sortable: true, filter: true, },
    { field: 'price', editable: true, sortable: true, filter: true, }
  ];




  rowData: any[] = [];

  handleFileInput(event: any): void {

    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContent = fileReader.result as string;
      const rows = fileContent.split(',');
      const csvData: any[] = [];
      const data: any[] = [];
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].indexOf('\r') == -1) {
          csvData.push(rows[i]);
        } else {
          const cols = rows[i].split('\r');
          for (let j = 0; j < cols.length; j++)
            csvData.push(cols[j]);
        }
      }


      for (let i = 3; i < csvData.length; i += 3) {
        data.push({ make: csvData[i], model: csvData[i + 1], price: csvData[i + 2] })
      }
      this.rowData = data;
      console.log(csvData);
      console.log(this.rowData);
    };
    fileReader.readAsText(file);

  }




}

