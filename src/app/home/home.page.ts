import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService, Note } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: Note[] = [];

  constructor(
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.dataService.getNotes().subscribe((res) => {
      this.notes = res;
      this.changeDetectorRef.detectChanges();

      console.log('Notes: ', this.notes);
    });
  }

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
    });

    await modal.present();
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'title',
          placeholder: 'My cool note',
          type: 'text',
          attributes: { autoComplete: 'none' },
        },
        {
          name: 'text',
          placeholder: 'Learn Ionic',
          type: 'textarea',
        },
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
        },
        {
          text: 'Add Note',
          handler: (res) => {
            this.dataService.addNote({ title: res.title, text: res.text });
          },
        },
      ],
    });

    await alert.present();
  }
}
