import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PicturesService } from '../../services/pictures.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public copyrigth = '';
  public videoSrc = '';
  public slideIndex = 0;
  public divSlide = undefined;
  public audioSrc = '';
  public slideIndex2 = 0;
  public divSlide2 = undefined;

  public Object = Object;
  public camisetas = Object.assign({'image3.png': '', 'image1.png': '', 'image2.png': ''});
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
  public videoLabel = '';

  public audios = {
    'Publicación de JAMedia (2010)': 'radiofutura flavio (2010).mp3',
    'Google code-in 2013 - Radio Sarandí (31 de enero de 2014)': 'Google code-in 2013 - Radio Sarandí (31 de enero de 2014).mp3',
    'Ignacio Rodríguez y Flavio Danesse (enero 2014)': 'Ignacio Rodríguez y Flavio Danesse (enero 2014).mp3'
  };
  public audioLabel = '';

  constructor(
    public picturesService: PicturesService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    for (const key of Object.keys(this.camisetas)) {
      this.getImage(key, this.camisetas);
    }
  }

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
      this.getVideo(0);
      // video.volume = 0.1;
    }
  }
    // FIXME:
    // https://github.com/angular/angularfire2/blob/master/docs/storage/storage.md
    // https://firebase.google.com/docs/reference/js/firebase.storage
    // https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/
    // http://javasampleapproach.com/frontend/angular/how-to-integrate-firebase-with-angular-4
    // https://firebase.google.com/docs/storage/security/?authuser=0
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

  changeAudio($event) {
    if (this.divSlide2 !== undefined) {
      this.divSlide2.classList.remove('media-item-selected');
    }
    this.divSlide2 = event.target as HTMLDivElement;
    this.divSlide2.classList.add('media-item-selected');

    const audio = document.getElementsByTagName('audio')[0] as HTMLAudioElement;
    if (audio !== undefined) {
      const key = this.divSlide2.id;
      this.audioLabel = key;
      this.getAudio(this.audios[key]);
    }
  }

  getAudio(url) {
    const ref = this.storage.storage.ref('Assets/Audio/' + url);
    ref.getDownloadURL()
      .then(success => {
        this.audioSrc = success; // FIXME cross origin: success.replace('https://firebasestorage.googleapis.com/v0/b/pythonjoven-c1888.appspot.com/o/', '');
      })
      .catch(
        err => {
          console.log('ERROR getAudio:', err);
        });
  }

  changeVideo(event) {
    if (this.divSlide !== undefined) {
      this.divSlide.classList.remove('media-item-selected');
    }
    this.divSlide = event.target as HTMLDivElement;
    this.divSlide.classList.add('media-item-selected');

    const video = document.getElementsByTagName('video')[0] as HTMLVideoElement;
    if (video !== undefined) {
      this.getVideo(this.videos.indexOf(this.divSlide.id));
    }
  }

  getVideo(ind) {
    const ref = this.storage.storage.ref('Assets/Videos/' + this.videos[ind]);
    ref.getDownloadURL()
      .then(success => {
        const url = this.videos[ind];
        this.videoLabel = url.replace('.webm', '');
        this.videoSrc = success; // FIXME cross origin: success.replace('https://firebasestorage.googleapis.com/v0/b/pythonjoven-c1888.appspot.com/o/', '');
      })
      .catch(
        err => {
          console.log('ERROR getVideo:', err);
        });
  }

  getImage (key: string, ret) {
    const ref = this.storage.storage.ref('Assets/Imagenes/' + key);
    ref.getDownloadURL()
      .then(success => {
        ret[key] = success; // FIXME cross origin: success.replace('https://firebasestorage.googleapis.com/v0/b/pythonjoven-c1888.appspot.com/o/', '');
      })
      .catch(
        err => {
          console.log('ERROR getImage:', err);
        });
  }

  goPictures(event) {
    const path = event.target.innerHTML;
    this.picturesService.setPath(path);
    this.router.navigate(['/pictureview']);
  }
}
