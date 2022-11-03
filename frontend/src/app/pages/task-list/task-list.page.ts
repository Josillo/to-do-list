import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { IMAGES_URL } from 'src/app/app.constants';
import { AddTaskEndpoint, Task, TasksService } from 'src/app/services';
import { AddTaskModalComponent } from './add-task-modal';
import { TaskAdd } from './task-list.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit, OnDestroy {

  public pageTitle = 'To Do List';
  public tasks: Task[] = [];
  public imagesUrl = IMAGES_URL;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private tasksService: TasksService, private toastController: ToastController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.refreshTasks();
  }

  public deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.presentToast('Delete success', 'success');
    }, (error) => { 
      this.presentToast('Error on delete', 'danger');
    });
    this.refreshTasks();
  }

  public updateTaskStatus(task: Task): void {
    const { description, ...params} = task;
    this.tasksService.updateTask(params).subscribe(() => {
      this.presentToast('Update success', 'success');
    }, (error) => { 
      this.presentToast('Error on delete', 'danger');
      this.refreshTasks(); // In case of error we refresh our list to get stored values.
    });
  }

  private async addTask(task: TaskAdd): Promise<void> {
    let blob = null;
      if (task.file) {
        const response = await fetch(task.file);
        blob = await response.blob();
      }
    const payload: AddTaskEndpoint = {
      description: task.description,
      ...(blob && {file: blob})
    };
    this.tasksService.addTask(payload).subscribe(data => {
      this.presentToast('Task added', 'success');
      this.refreshTasks();
    }, (error) => { 
      this.presentToast('An error happened while adding', 'danger');
    });
    this.refreshTasks();
  }

  private refreshTasks(): void {
    this.tasksService.getTasks().subscribe(data => this.tasks = data);
  }

  async presentToast(message: string, type: 'danger' | 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: type
    });

    await toast.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.addTask(data);
    }
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }

}
