import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  note: Note = null;
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private changeDetectorRef: ChangeDetectorRef,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe((res) => {
      this.note = res;
      this.changeDetectorRef.detectChanges();
    });
  }

  async updateNote() {
    this.dataService.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Task Updated',
      duration: 2000,
    });
    await toast.present();
  }

  async deleteNote() {
    await this.dataService.deleteNote(this.note);
    this.modalCtrl.dismiss();
  }

  backToHome() {
    this.modalCtrl.dismiss();
  }
}
