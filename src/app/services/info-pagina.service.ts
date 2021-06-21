import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipoInfo } from '../interfaces/equipo-info-interface';
import { InfoPagina } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada: boolean = false;
  equipo: EquipoInfo = {};


  constructor(private http: HttpClient) { 
    console.log("Info cargada")
    this.cargarInfo();
    this.cargarEquipo();

  
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina)=>{
      this.cargada = true;
      this.info = resp;
      console.log(resp);
    });

  }
  private cargarEquipo(){
    this.http.get('https://angular-html-eef94-default-rtdb.firebaseio.com/equipo.json')
      .subscribe((resp: EquipoInfo) =>{
        this.equipo = resp;
        
      })

  }
  public getEquipo(){
    return this.equipo
  }
}
