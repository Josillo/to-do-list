import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services';
import { TaskAdd } from '../task-list.model';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
})
export class AddTaskModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private photoService: PhotoService) { }

  public description: string;
  public capturedPhoto: string = '';
  private task: TaskAdd;


  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.task = {
      description: this.description,
      ...(this.capturedPhoto !== '' && { file: this.capturedPhoto }),
    };
    return this.modalCtrl.dismiss(this.task, 'confirm');
  }

  public setInputDescription(event): void {
    this.description = event.target.value;
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      if(data) {
        this.capturedPhoto = data.webPath;
      }
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

}
