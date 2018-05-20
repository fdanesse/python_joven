import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PicturesService } from '../../services/pictures.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public copyrigth = '';
  public videoSrc = '';
  slideIndex = 0;
  divSlide = undefined;

  public videos = [
    'Ezequiel Pereyra 22 de Agosto de 2017.webm',
    'Agustin Zubiaga 6 de febrero de 2013.webm',
    'Agustin Zubiaga 28 de febrero de 2013.webm',
    'Agustin Zubiaga 9 de setiembre de 2013.webm',
    'Agustin Zubiaga 2013.webm',
    'Agustin Zubiaga 4 de junio de 2014.webm',
    'Ignacio Rodriguez 1 de febrero de 2014.webm',
    'python_joven Antel Avanza 2013.webm',
    'Agustin y Daniel Antel Avanza 2013.webm',
  ];

  constructor(public picturesService: PicturesService, private router: Router) {  }

  ngOnInit() {
    const d = new Date();
    this.copyrigth = d.getFullYear() + '';
    setInterval(this.run_slider, 6000);
  }

  ngAfterViewInit() {
    this.divSlide = document.getElementsByClassName('media-item')[0] as HTMLDivElement;
    if (this.divSlide !== undefined) {
      this.divSlide.classList.add('media-item-selected');
    }
    const video = document.getElementsByTagName('video')[0] as HTMLVideoElement;
    if (video !== undefined) {
      video.src = '/assets/python_joven/videos/' + this.divSlide.id;
      video.volume = 0.1;
    }
  }
    // FIXME:
    // https://github.com/angular/angularfire2/blob/master/docs/storage/storage.md
    // https://firebase.google.com/docs/reference/js/firebase.storage
    // https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/
    // http://javasampleapproach.com/frontend/angular/how-to-integrate-firebase-with-angular-4
    // https://firebase.google.com/docs/storage/security/?authuser=0
    // const ref = this.storage.ref('python_joven/videos/22-08-2017-Ezequiel.webm');
    // this.vsrc = ref.getDownloadURL();

    // https://stackoverflow.com/questions/43450292/how-to-display-image-from-firebase-storage-using-javascript
    /*
    ref.getMetadata().subscribe(data => {
      if (data) {
        // this.videoSrc = data.fullPath;
        // console.log(data.fullPath);
        this.meta = data;
      }
    });
    */
    /*
    ref.getDownloadURL().subscribe(data => {
      if (data) {
        this.videoSrc = data;
        console.log(data);
        this.url = data;
      }
    });
    */

  run_slider() {
    const logoImg = document.getElementsByClassName('logo-img') as HTMLCollection;
    if (logoImg !== undefined) {

      let elem = logoImg[this.slideIndex] as HTMLElement;
      if (elem !== undefined) {
        elem.style.display = 'none';
      }

      if (this.slideIndex < logoImg.length - 1) {
        this.slideIndex += 1;
      }else {
        this.slideIndex = 0;
      }

      elem = logoImg[this.slideIndex] as HTMLElement;
      if (elem !== undefined) {
        elem.style.display = 'inline';
        elem.style.animation = 'fading 0.5s both';
      }
    }
  }

  changeVideo(event) {
    if (this.divSlide !== undefined) {
      this.divSlide.classList.remove('media-item-selected');
    }
    this.divSlide = event.target as HTMLDivElement;
    this.divSlide.classList.add('media-item-selected');

    const video = document.getElementsByTagName('video')[0] as HTMLVideoElement;
    if (video !== undefined) {
      video.src = '/assets/python_joven/videos/' + this.divSlide.id;
    }
  }

  goPictures(event) {
    const path = event.target.innerHTML;
    this.picturesService.setPath(path);
    this.router.navigate(['/pictureview']);
  }
}
