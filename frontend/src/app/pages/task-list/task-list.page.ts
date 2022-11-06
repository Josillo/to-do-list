import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IMAGES_URL } from 'src/app/app.constants';
import { AddTaskEndpoint, Task, TasksService } from 'src/app/services';
import { UserService } from 'src/app/services/user/user.service';
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

  private loading;

  user$ = this.userService.User$;

  constructor(
    private tasksService: TasksService,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.refreshTasks();
  }

  public deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.presentToast('Delete success', 'success');
      this.refreshTasks();
    }, (error) => { 
      this.presentToast('Error on delete', 'danger');
    });
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
  }

  private refreshTasks(): void {
    this.showLoading();
    //TODO: Remove delay, keep only to test loading
    this.tasksService.getTasks().pipe(delay(2000)).subscribe(data => {
      this.hideLoading();
      this.tasks = data;
      }, err => this.hideLoading());
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

  async presentActionSheet(task: Task) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Remove task',
      subHeader: `Are you sure that you want to remove the task "${task.description}"?`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if(result?.data?.action === 'delete') {
      this.deleteTask(task.id)
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      cssClass: 'custom-loading',
    });

    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }


  logout(): void {
    localStorage.clear();
    location.reload();
  }


  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }

}
