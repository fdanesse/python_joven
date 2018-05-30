import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { PicturesService } from '../../services/pictures.service';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-pictureview',
  templateUrl: './pictureview.component.html',
  styleUrls: ['./pictureview.component.css']
})
export class PictureviewComponent implements AfterViewInit, OnDestroy {

  itemsVisibles = 6;
  items = undefined;
  pictures = [];
  currentItem: HTMLButtonElement = undefined;
  imgSrc = '';
  picturesobs: Subscription;

  constructor(
    public picturesService: PicturesService,
    private storage: AngularFireStorage) {
    this.picturesobs = this.picturesService.obs.subscribe(data => {
      const obj = Object.assign(data);
      const dirpath = obj['path'];
      const files = obj['files'];
      this.pictures = [];
      for (let x = 1; x < files + 1; x++) {
        const item = [x, dirpath + x + '.jpg'];
        this.pictures.push(item);
      }
    });
  }

  clicked(event) {
    this.currentItem.classList.remove('itemImg-selected');
    this.currentItem = event.target as HTMLButtonElement;
    this.currentItem.classList.add('itemImg-selected');
    this.changeItemSelected();
  }

  previous() {
    const index = parseInt(this.currentItem.innerHTML, 10) - 1;
    if (index - 1  >= 0) {
      this.currentItem.classList.remove('itemImg-selected');
      this.currentItem = this.items[index - 1] as HTMLButtonElement;
      this.currentItem.classList.add('itemImg-selected');
      this.changeItemSelected();
    }
  }

  next() {
    const index = parseInt(this.currentItem.innerHTML, 10);
    if (index < this.items.length) {
      this.currentItem.classList.remove('itemImg-selected');
      this.currentItem = this.items[index] as HTMLButtonElement;
      this.currentItem.classList.add('itemImg-selected');
      this.changeItemSelected();
    }
  }

  changeItemSelected() {
    if (this.currentItem.style.display === 'none') {
      this.currentItem.style.display = 'inline';
    }

    const index = parseInt(this.currentItem.innerHTML, 10) - 1;
    const first = index - this.itemsVisibles;
    const last = index + this.itemsVisibles;
    if (first >= 0) {
      const button = this.items[first] as HTMLButtonElement;
      button.style.display = 'none';
    }
    if (last < this.items.length) {
      const button = this.items[last] as HTMLButtonElement;
      button.style.display = 'none';
    }

    const btns = document.getElementsByClassName('item');
    const b2 = btns[0] as HTMLButtonElement;
    const b3 = btns[btns.length - 1] as HTMLButtonElement;
    let item = this.items[0] as HTMLButtonElement;
    if (item.style.display === 'none') {
      // b2.style.display = 'inline';
      b2.style.backgroundColor = 'rgba(255,255,255,0.7)';
    } else {
      // b2.style.display = 'none';
      b2.style.backgroundColor = 'rgba(255,255,255,0.1)';
    }
    item = this.items[this.items.length - 1] as HTMLButtonElement;
    if (item.style.display === 'none') {
      // b3.style.display = 'inline';
      b3.style.backgroundColor = 'rgba(255,255,255,0.7)';
    } else {
      // b3.style.display = 'none';
      b3.style.backgroundColor = 'rgba(255,255,255,0.1)';
    }

    this.getImage(this.currentItem.id);
  }

  getImage (path: string) {
    this.imgSrc = '';
    const ref = this.storage.storage.ref('Assets/Imagenes/' + path);
    ref.getDownloadURL()
      .then(success => {
        this.imgSrc = success; // FIXME cross origin: success.replace('https://firebasestorage.googleapis.com/v0/b/pythonjoven-c1888.appspot.com/o/', '');
      })
      .catch(
        err => {
          console.log('ERROR getImage:', err);
        });
  }

  ngAfterViewInit() {
    this.items = document.getElementsByClassName('itemImg');
    for (let x = 0; x < this.items.length; x++) {
      const item = this.items[x] as HTMLButtonElement;
      if (x + 1 > this.itemsVisibles) {
        item.style.display = 'none';
      } else {
        item.style.display = 'inline';
      }
    }
    this.currentItem = this.items[0] as HTMLButtonElement;
    if (this.currentItem) {
      this.currentItem.classList.add('itemImg-selected');
      this.changeItemSelected();
    }
  }

  ngOnDestroy() {
    this.picturesobs.unsubscribe();
  }
}
