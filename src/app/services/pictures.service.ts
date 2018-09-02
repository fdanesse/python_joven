import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PicturesService {

  obj: any;
  _obs = new BehaviorSubject(this.obj);
  obs = this._obs.asObservable();

  // FIXME: SugarDay - Pyconar - 2011 tiene un archivo 0.png Revisar que es
  constructor() {
    this.obj = {titulo: 'Despliegue Ceibal 2008', path: 'Assets/Imagenes/RAP_Ceibal_San_Jose_2008/', files: 9};
    this._obs.next(this.obj);
  }

  setPath(path: string, titulo: string, files: number) {
    this.obj = {titulo: titulo, path: path, files: files};
    this._obs.next(this.obj);
  }

}
