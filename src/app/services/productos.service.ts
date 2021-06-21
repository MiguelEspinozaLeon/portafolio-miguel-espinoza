import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos(){

    return new Promise<void>((resolve, reject) =>{
      
      this.http.get('https://angular-html-eef94-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
        this.productos=resp;
        
        resolve();
      });

    });

     

   }
   getProducto(id: string){
    return this.http.get(`https://angular-html-eef94-default-rtdb.firebaseio.com/productos/${id}.json`)

   }
   buscarProducto(termino: string){

    if (this.productos.length===0){
      this.cargarProductos().then(() =>{
        this.filtrarProductos(termino);
      });

    }
    else{
      this.filtrarProductos(termino);
    }




     this.productosFiltrado = this.productos.filter(producto =>{
       return true;
      
     });
     console.log(this.productosFiltrado);
   }


   private filtrarProductos(termino: string){
     this.productosFiltrado = [];

     termino = termino.toLowerCase();

    this.productos.forEach(prod =>{

      if(prod.categoria.indexOf( termino ) >= 0 || prod.titulo.indexOf(termino)){
        this.productosFiltrado.push(prod);
      }

    });

   }
}
