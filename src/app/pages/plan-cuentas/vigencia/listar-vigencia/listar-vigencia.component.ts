import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { VigenciaHelper } from '../../../../@core/helpers/vigencia/vigenciaHelper';
import { RequestManager } from '../../../../@core/managers/requestManager';

@Component({
  selector: 'ngx-listar-vigencia',
  templateUrl: './listar-vigencia.component.html',
  styleUrls: ['./listar-vigencia.component.scss']
})
export class ListarVigenciaComponent implements OnInit {

  loadDataFunction: (...params) => Observable<any>;
  loadFormDataFunction: (...params) => Observable<any>;
  uuidReadFileName: string;
  formTitle: string;
  isOnlyCrud: boolean;
  settings: object;
  listColumns: object;
  vigencia: object;
  cambiotab: boolean = false;
  anularTab; boolean = false;

  areaFuncional = { '1': 'Rector', '2': 'Convenios'};
  centrosGestor = { '1': 'Universidad Distrital Francisco José de Caldas'};

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private translate: TranslateService,
    private vigenciaHelper: VigenciaHelper,
    private rqManager: RequestManager,
    
  ) { }

  ngOnInit() {

    this.loadDataFunction = this.vigenciaHelper.getFullVigencias;

    this.listColumns = {
      _id: {
        title: this.translate.instant('VIGENCIA.anio_vigencia'),
        filter: false,
        valuePrepareFunction: (value: any) => {
          return value;
        }
      },
      areaFuncional: {
        title: this.translate.instant('GLOBAL.area_funcional'),
        filter: {
          type: 'list',
          config: {
            selectText: 'Todas',
            list: [
              { value: '1', title: 'Rector' },
              { value: '2', title: 'Convenios' },
            ]
          },
        },
        valuePrepareFunction: (value: any) => {
          if (value === '1') {
            //return this.translate.instant('GLOBAL.rector');
            return 'Rector';
          } else {
            //return this.translate.instant('GLOBAL.convenios');
            return 'Convenios';
          }
        }
      },
      estado: {
        title: this.translate.instant('VIGENCIA.estado_vigencia'),
        filter: true,
        valuePrepareFunction: (value: any) => {
          return value;
        }
      },
      fechaCreacion: {
        title: this.translate.instant('VIGENCIA.fecha_inicio'),
        filter: true,
        valuePrepareFunction: (value: any) => {
          return value.substring(0, 10);
        }
      },
      fechaCierre: {
        title: this.translate.instant('VIGENCIA.fecha_cierre'),
        filter: true,
        valuePrepareFunction: (value: any) => {
          // tslint:disable-next-line: no-console
          console.log(value.substring(0, 1));
          if (value.substring(0, 1) === '2') {
            return value.substring(0, 10);
          } else {
            return '-';
          }
        }
      },
    };

    this.settings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
       /* custom: [
          { name: 'ver', title: '<i class="fas fa-eye" title="Ver" (click)="ver($event)"></i>'},
      ],*/
      position: 'right'
      },
      mode: 'external',
      columns: this.listColumns,
    };

    this.loadData();
  }

  loadData(): void {
      // tslint:disable-next-line: label-position
      vigencias: this.loadDataFunction(
      ).subscribe(res =>{
        const data = <Array<any>>res;
        console.log(data)
        this.source.load(data);
    });
  }

  onCustom(event: any) {
    console.log(event.data)
    event.data['Vigencia'] = event.data.valor;
    event.data['AreaFuncional'] = event.data.areaFuncional;
    event.data['Estado'] = event.data.estado;
    event.data['FechaInicio'] = event.data.fechaCreacion;
    event.data['FechaCierre'] = event.data.fechaCierre;

    switch (event.action) {
      case 'ver':
        this.verVigencia(event.data);
        break;
    }
  }

  verVigencia(vigencia) {
    this.vigencia = vigencia;
    this.onCambiotab();
  }

  onCambiotab(): void {
    this.cambiotab = !this.cambiotab;
  }

  returnToList() {
    this.anularTab = false;
    this.cambiotab = false;
  }
}
