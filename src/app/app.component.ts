import {  ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialog } from './master/dialog-component/dialog-component.component';
import { Data, InitialService } from 'src/assets/initial.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'weight'];

  subs: Subscription;
  finishedArr: any[] = [];
  inProgressArr: any[] = [];
  pendingArr: any[] = [];

  tableView: boolean = false;

  constructor(
    public dialog: MatDialog,
    private initialService: InitialService,
  ) {

    this.subs = new Subscription();
    this.initialService.initiateAtStart();

    this.loadLocalStorage();

  }



  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogContentExampleDialog, { height: '550px', width: '600px', data: { booleanValue: false, data: null } });
  }

  editDialog(data: Data, id: number) {

    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: '550px',
      width: '600px',
      data: { booleanValue: true, data: data, id: id, pending: this.pendingArr, inprogress: this.inProgressArr, finished: this.finishedArr },
    });
  }

  ////////////////////
  // LOAD LOCALDATA
  ////////////////////

  loadLocalStorage() {

    const key = "todos"
    const data = localStorage.getItem(key) as string;
    const parsedData = { ...JSON.parse(data) };

    this.finishedArr = parsedData.Finished;
    this.pendingArr = parsedData.Pending;
    this.inProgressArr = parsedData.InProgress;
  }

  /////////////////
  //// DRAG DROP
  /////////////////

  drop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container && event.currentIndex > 0) {}

    if(event.previousContainer !== event.container && event.currentIndex > 0) {
      
      const pickedData = event.previousContainer.data;
      const pickedDataJSON = pickedData.map((v: Data) => v);
      
      const droppedData = event.container.data;
      const drop = droppedData[0];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
      const newPayload: Data = {

        id: pickedDataJSON[event.previousIndex]?.id,
        description: pickedDataJSON[event.previousIndex]?.description,
        selection: drop.selection,
        created_at: pickedDataJSON[event.previousIndex]?.created_at,
        title: pickedDataJSON[event.previousIndex]?.title,
        updated_at: new Date().toISOString()

      }

      const ls = localStorage.getItem('todos') as string;
      const oldPending = (JSON.parse(ls)).Pending
      const oldFinished = (JSON.parse(ls)).Finished
      const oldInProgress = (JSON.parse(ls)).InProgress

      const newArr = [newPayload];

      if(drop.selection === "Pending"){

        const old = event.previousContainer.data[0].selection

        if(old === "Finished") {

          const updatedData = {
            Finished: this.finishedArr,
            Pending: oldPending.concat(newArr),
            InProgress: oldInProgress,
          };

          this.pendingArr = updatedData.Pending
          localStorage.setItem('todos', JSON.stringify(updatedData))
        }

        if(old === "InProgress") {

          const updatedData = {
            Finished: oldFinished,
            Pending: oldPending.concat(newArr),
            InProgress: this.inProgressArr,
          };

          this.pendingArr = updatedData.Pending
          localStorage.setItem('todos', JSON.stringify(updatedData))
        }
      }

      if(drop.selection === "Finished"){

        const old = event.previousContainer.data[0].selection

        if(old === "Pending") {

          const updatedData = {
            Finished: oldFinished.concat(newArr),
            Pending: this.pendingArr,
            InProgress: oldInProgress,
          };

          this.finishedArr = updatedData.Finished
          localStorage.setItem('todos', JSON.stringify(updatedData))
        }

        if(old === "InProgress") {

          const updatedData = {
            Finished: oldFinished.concat(newArr),
            Pending: oldPending,
            InProgress: this.inProgressArr,
          };

          this.finishedArr = updatedData.Finished
          localStorage.setItem('todos', JSON.stringify(updatedData))
          
        }    
      }

      if(drop.selection === "InProgress") {

        const old = event.previousContainer.data[0].selection
      
        if(old === "Pending") {

          const updatedData = {
            Finished: oldFinished,
            Pending: this.pendingArr,
            InProgress: oldInProgress.concat(newArr),
          };

          this.inProgressArr = updatedData.InProgress
          localStorage.setItem('todos', JSON.stringify(updatedData))
        }

        if(old === "Finished") {

          const updatedData = {
            Finished: this.finishedArr,
            Pending: oldPending,
            InProgress: oldInProgress.concat(newArr),
          };

          this.inProgressArr = updatedData.InProgress
          localStorage.setItem('todos', JSON.stringify(updatedData))
          
        } 
      }
    }
  }

  ////////////////
  //// extra /////
  ////////////////

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

}

