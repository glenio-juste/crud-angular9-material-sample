import { HeaderData } from './header-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MAT_PAGINATOR_INTL_PROVIDER_FACTORY } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  /* Dentro do BehaviorSubject existe o subject que faz o papel de "porteiro". 
  O BehaviorSubject vai detectar mdanças nos valores */
  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Início',
    icon: 'home',
    routeUrl: '',
  })

  constructor() { }


  get headerData(): HeaderData {
    return this._headerData.value;
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData);
  }


}
