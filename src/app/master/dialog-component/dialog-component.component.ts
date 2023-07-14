import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faker } from '@faker-js/faker';
import { Data } from 'src/assets/initial.service';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})

export class DialogContentExampleDialog {

  formGroup = new FormGroup({
    title: new FormControl<string>('', []),
    description: new FormControl<string>('', []),
    selection: new FormControl<string>('', []),
  })


  constructor(@Inject(MAT_DIALOG_DATA) public data: { booleanValue: boolean, data: any, id: number, pending: Data[], inprogress: Data[], finished: Data[] },
    public dialog: MatDialog) {

    if (this.data.booleanValue) {

      this.formGroup.setValue({
        title: this.data?.data?.title,
        selection: this.data?.data?.selection,
        description: this.data?.data?.description,
      })
    }


  }

  closeDialog() {

    this.dialog.closeAll();
  }

  //////////////////////////
  // Saving to Local Storage
  //////////////////////////

  onSave(): void {

    const formGroupValue = this.formGroup.value;

    const payload: Data = {
      id: faker.string.uuid(),
      title: formGroupValue.title as string,
      description: formGroupValue.description as string,
      selection: formGroupValue.selection as string,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    if (payload.selection === "Pending") {

      const storedValue = localStorage.getItem('todos')
      const existingArr = storedValue ? JSON.parse(storedValue) : [];

      const newArr = [payload];

      if (storedValue === null || storedValue === undefined) {

        const outerValue = { Finished: [], Pending: newArr, InProgress: [] };
        localStorage.setItem('todos', JSON.stringify(outerValue));

      }
      else {
        const outerValue = { Finished: [...existingArr.Finished], Pending: [...existingArr.Pending.concat(newArr)], InProgress: [...existingArr.InProgress] };
        localStorage.setItem('todos', JSON.stringify(outerValue));
      }

    }

    else if (payload.selection === "Finished") {

      const storedValue = localStorage.getItem('todos')
      const existingArr = storedValue ? JSON.parse(storedValue) : [];

      const newArr = [payload];

      if (storedValue === null || storedValue === undefined) {

        const outerValue = { Finished: newArr, Pending: [], InProgress: [] };
        localStorage.setItem('todos', JSON.stringify(outerValue));

      }
      else {
        const outerValue = { Finished: [...existingArr.Finished.concat(newArr)], Pending: [...existingArr.Pending], InProgress: [...existingArr.InProgress] };
        localStorage.setItem('todos', JSON.stringify(outerValue));
      }

    }

    else if (payload.selection === "InProgress") {

      const storedValue = localStorage.getItem('todos')
      const existingArr = storedValue ? JSON.parse(storedValue) : [];

      const newArr = [payload];

      if (storedValue === null || storedValue === undefined) {

        const outerValue = { Finished: [], Pending: [], InProgress: newArr };
        localStorage.setItem('todos', JSON.stringify(outerValue));

      }
      else {
        const outerValue = { Finished: [...existingArr.Finished], Pending: [...existingArr.Pending], InProgress: [...existingArr.InProgress.concat(newArr)] };
        localStorage.setItem('todos', JSON.stringify(outerValue));
      }

    }

    location.reload();
  }

  onUpdate(): void {

    const formGroupValue = this.formGroup.value;

    const json = this.data.data

    const payload: Data = {
      id: this.data.data.id,
      title: formGroupValue.title as string,
      description: formGroupValue.description as string,
      selection: formGroupValue.selection as string,
      created_at: this.data.data.created_at,
      updated_at: new Date().toISOString(),
    }

    const ls = localStorage.getItem('todos') as string;

    if (payload.selection === "Pending") {

      if(this.data.data.selection === "Finished") {

        this.data.pending.push(payload);
        this.data.finished.splice(this.data.id,1)

        const updatedData = {
          Finished: this.data.finished,
          Pending: this.data.pending,
          InProgress: this.data.inprogress,
        };

        localStorage.setItem('todos', JSON.stringify(updatedData))
      }

      if(this.data.data.selection === "InProgress") {

        this.data.pending.push(payload);
        this.data.inprogress.splice(this.data.id,1)

        const updatedData = {
          Finished: this.data.finished,
          Pending: this.data.pending,
          InProgress: this.data.inprogress,
        };

        localStorage.setItem('todos', JSON.stringify(updatedData))
      }
    }

    if (payload.selection === "Finished") {

      if(this.data.data.selection === "Pending") {

        this.data.finished.push(payload);
        this.data.pending.splice(this.data.id,1)

        const updatedData = {
          Finished: this.data.finished,
          Pending: this.data.pending,
          InProgress: this.data.inprogress,
        };

        localStorage.setItem('todos', JSON.stringify(updatedData))
      }

      if(this.data.data.selection === "InProgress") {

        this.data.finished.push(payload);
        this.data.inprogress.splice(this.data.id,1)

        const updatedData = {
          Finished: this.data.finished,
          Pending: this.data.pending,
          InProgress: this.data.inprogress,
        };

        localStorage.setItem('todos', JSON.stringify(updatedData))
      }

    }

    if (payload.selection === "InProgress") {

      if(this.data.data.selection === "Pending") {

        this.data.inprogress.push(payload);
        this.data.pending.splice(this.data.id,1)

        const updatedData = {
          Finished: this.data.finished,
          Pending: this.data.pending,
          InProgress: this.data.inprogress,
        };

        localStorage.setItem('todos', JSON.stringify(updatedData))
      }

      if(this.data.data.selection === "Finished") {

        this.data.inprogress.push(payload);
        this.data.finished.splice(this.data.id,1)

        const updatedData = {
          Finished: this.data.finished,
          Pending: this.data.pending,
          InProgress: this.data.inprogress,
        };

        localStorage.setItem('todos', JSON.stringify(updatedData))
      }

    }

    this.closeDialog();

  }

}
