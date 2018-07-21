import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PicturesService {

  obj: any;
  _obs = new BehaviorSubject(this.obj);
  obs = this._obs.asObservable();

  paths = {
    'Despliegue Ceibal 2008': {
      path: 'RAP_Ceibal_San_Jose_2008/', files: 9},
    'Orígenes 2009 - 2010': {
      path: 'TOC_Informatica_Peraza_2009_2010/', files: 10},
    'SqueakFest - 2011': {
      path: 'SqueakFest_Universidad_Catolica_2011/', files: 5},
    'Sugar Day - pyconar 2011': {
      path: 'PyConAr_2011/', files: 31},
    'Mayo 2012': {path: 'mayo_2012/', files: 9},
    'EduJAM 2012': {path: 'EduJAM_mayo_2012/', files: 7},
    'Junio 2012': {path: 'junio_2012/', files: 10},
    'MiniJAM Maragato 2012': {
      path: 'MiniJAM_Maragato_junio_2012/', files: 4},
    'Agosto 2012': {path: 'Butia_agosto_2012/', files: 41},
    'Setiembre 2012': {path: 'setiembre_2012/', files: 39},
    'Diciembre 2012': {path: '1_dic_2012/', files: 14},
    'Varias 2013': {path: 'varias_2013/', files: 5},
    'Marzo 2013': {
      path: 'python_joven_butia_marzo_2013/', files: 12},
    'ANTEL Avanzá 2013': {
      path: 'Antel_Avanza_2013/', files: 6},
    'Febrero 2014': {path: 'Febrero_2014/', files: 8},
    'Chia - Colombia_2014': {path: 'Chia/', files: 26},
    'Sugar Camp - Chia - Colombia 2014': {
      path: 'SugarCamp_Chia_Colombia_2014/', files: 35},
    'Cabo San Juan - Colombia 2014': {
      path: 'Tyrona/', files: 56},
    'Diciembre 2014': {
      path: 'Diciembre_2014/', files: 7},
    'Agosto 2015': {
      path: 'Agosto_2015/', files: 11},
    'Varias': {
      path: 'Varias/', files: 8},
    'Algo de google': {
      path: 'Google/', files: 44},
    'Relanzamiento - julio - 2018': {
      path: 'Relanzamiento2018/', files: 15}
  };

  constructor() { }

  setPath(key: string) {
    this.obj = this.paths[key];
    this._obs.next(this.obj);
  }

}
