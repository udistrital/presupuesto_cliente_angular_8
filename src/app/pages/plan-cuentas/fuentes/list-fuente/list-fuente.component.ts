import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import 'style-loader!angular2-toaster/toaster.css';
import { FuenteHelper } from '../../../../@core/helpers/fuentes/fuenteHelper';
import { FORM_FUENTE } from '../form-fuente';
import { DependenciasComponent } from '../../dependencias/dependencias.component';
@Component({
  selector: 'ngx-list-fuente',
  templateUrl: './list-fuente.component.html',
  styleUrls: ['./list-fuente.component.scss']
})
export class ListFuenteComponent implements OnInit {
  uuidReadFieldName: string;
  uuidDeleteFieldName: string;
  deleteConfirmMessage: string;
  deleteMessage: string;
  loadDataFunction: (...params) => Observable<any>;
  deleteDataFunction: (...params) => Observable<any>;
  formEntity: any;
  formTittle: string;
  updateMessage: string;
  createMessage: string;
  updateConfirmMessage: string;
  createConfirmMessage: string;
  loadFormDataFunction: (...params) => Observable<any>;
  updateEntityFunction: (...params) => Observable<any>;
  createEntityFunction: (...params) => Observable<any>;
  isOnlyCrud: boolean;


  listColumns: object;

  constructor(
    private translate: TranslateService,
    private fuenteHelper: FuenteHelper
  ) {

  }

  ngOnInit() {
    this.isOnlyCrud = false;
    this.uuidReadFieldName = 'Codigo';
    this.uuidDeleteFieldName = 'Codigo';
    this.deleteConfirmMessage = 'FUENTE_FINANCIAMIENTO.confirmacion_actualizacion';
    this.deleteMessage = 'FUENTE_FINANCIAMIENTO.mensaje_eliminar';
    this.loadDataFunction = this.fuenteHelper.getFuentes;
    this.deleteDataFunction = this.fuenteHelper.fuenteDelete;
    this.formEntity = FORM_FUENTE;
    this.formTittle = 'FUENTE_FINANCIAMIENTO.asignar_fuente';
    this.updateMessage = 'FUENTE_FINANCIAMIENTO.mensaje_actualizar';
    this.createMessage = 'FUENTE_FINANCIAMIENTO.mensaje_registrar';
    this.updateConfirmMessage = 'FUENTE_FINANCIAMIENTO.confirmacion_actualizacion';
    this.createConfirmMessage = 'FUENTE_FINANCIAMIENTO.confirmacion_creacion';
    this.loadFormDataFunction = this.fuenteHelper.getFuentes;
    this.updateEntityFunction = this.fuenteHelper.fuenteUpdate;
    this.createEntityFunction = this.fuenteHelper.fuenteRegister;
    this.listColumns = {
      Nombre: {
        title: this.translate.instant('GLOBAL.nombre'),
        // type: 'string;',
        valuePrepareFunction: value => {
          return value;
        }
      },
      Descripcion: {
        title: this.translate.instant('GLOBAL.descripcion'),
        // type: 'string;',
        valuePrepareFunction: value => {
          return value;
        }
      }
    };
  }



}
