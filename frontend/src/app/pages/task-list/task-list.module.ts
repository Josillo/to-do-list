import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskListPageRoutingModule } from './task-list-routing.module';

import { TaskListPage } from './task-list.page';
import { PhotoService, TasksService } from 'src/app/services';
import { AddTaskModalComponent } from './add-task-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskListPageRoutingModule
  ],
  declarations: [TaskListPage, AddTaskModalComponent],
  providers: [TasksService, PhotoService]
})
export class TaskListPageModule {}
