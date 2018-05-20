import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PicturesService {

  obj: any;
  _obs = new BehaviorSubject(this.obj);
  obs = this._obs.asObservable();

  paths = {
    'Despliegue Ceibal 2008': {
      path: '/assets/python_joven/imgs/RAP_Ceibal_San_Jose_2008/', files: 9},
    'Orígenes 2009 - 2010': {
      path: '/assets/python_joven/imgs/TOC_Informatica_Peraza_2009_2010/', files: 10},
    'SqueakFest - 2011': {
      path: '/assets/python_joven/imgs/SqueakFest_Universidad_Catolica_2011/', files: 5},
    'Sugar Day - pyconar 2011': {
      path: '/assets/python_joven/imgs/PyConAr_2011/', files: 31},
    'Mayo 2012': {path: '/assets/python_joven/imgs/mayo_2012/', files: 9},
    'EduJAM 2012': {path: '/assets/python_joven/imgs/EduJAM_mayo_2012/', files: 7},
    'Junio 2012': {path: '/assets/python_joven/imgs/junio_2012/', files: 10},
    'MiniJAM Maragato 2012': {
      path: '/assets/python_joven/imgs/MiniJAM_Maragato_junio_2012/', files: 4},
    'Agosto 2012': {path: '/assets/python_joven/imgs/Butia_agosto_2012/', files: 41},
    'Setiembre 2012': {path: '/assets/python_joven/imgs/setiembre_2012/', files: 39},
    'Diciembre 2012': {path: '/assets/python_joven/imgs/1_dic_2012/', files: 14},
    'Varias 2013': {path: '/assets/python_joven/imgs/varias_2013/', files: 5},
    'Marzo 2013': {
      path: '/assets/python_joven/imgs/python_joven_butia_marzo_2013/', files: 12},
    'ANTEL Avanzá 2013': {
      path: '/assets/python_joven/imgs/Antel_Avanza_2013/', files: 6},
    'Febrero 2014': {path: '/assets/python_joven/imgs/Febrero_2014/', files: 8},
    'Chia - Colombia_2014': {path: '/assets/python_joven/imgs/Chia/', files: 26},
    'Sugar Camp - Chia - Colombia 2014': {
      path: '/assets/python_joven/imgs/SugarCamp_Chia_Colombia_2014/', files: 35},
    'Cabo San Juan - Colombia 2014': {
      path: '/assets/python_joven/imgs/Tyrona/', files: 56},
    'Diciembre 2014': {
      path: '/assets/python_joven/imgs/Diciembre_2014/', files: 7},
    'Agosto 2015': {
      path: '/assets/python_joven/imgs/Agosto_2015/', files: 11}
  };

  constructor() { }

  setPath(key: string) {
    this.obj = this.paths[key];
    this._obs.next(this.obj);
  }

}
