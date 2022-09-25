import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Task, TasksService } from 'src/app/services';
import { AddTaskModalComponent } from './add-task-modal';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  public pageTitle = 'To Do List';
  public tasks$: Observable<Task[]> = this.tasksService.tasksList$;

  constructor(private tasksService: TasksService, private toastController: ToastController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.tasksService.getTasks();
  }

  public deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.presentToast('Delete success', 'success');
    }, (error) => { 
      this.presentToast('Error on delete', 'danger');
    });
    this.tasksService.getTasks();
  }

  public updateTaskStatus(task: Task): void {
    const { description, ...params} = task;
    this.tasksService.updateTask(params).subscribe(() => {
      this.presentToast('Update success', 'success');
    }, (error) => { 
      this.presentToast('Error on delete', 'danger');
      this.tasksService.getTasks(); // In case of error we refresh our list to get stored values.
    });
  }

  private addTask(description: string): void {
    this.tasksService.addTask({description}).subscribe(data => {
      this.presentToast('Task added', 'success');
      this.tasksService.getTasks();
    }, (error) => { 
      this.presentToast('An error happened while adding', 'danger');
    });
    this.tasksService.getTasks();
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

}
