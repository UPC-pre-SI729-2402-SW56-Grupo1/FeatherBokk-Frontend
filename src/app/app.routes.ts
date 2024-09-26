import { Routes } from '@angular/router';
/*import { InicioComponent } from './inicio/inicio.component';
import { LibrosSubidosComponent } from './libros-subidos/libros-subidos.component';
import { HistorialComponent } from './historial/historial.component';
import { SuscripcionComponent } from './suscripcion/suscripcion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ForoComponent } from './foro/foro.component';
import { LecturaComponent } from './lectura/lectura.component';
import { ChatConAutoresComponent } from './chat-con-autores/chat-con-autores.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';*/
import { BookDetailComponent } from './book-preview/book-detail/book-detail.component';

export const routes: Routes = [
  /*{ path: '', component: InicioComponent },
  { path: 'libros-subidos', component: LibrosSubidosComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'suscripcion', component: SuscripcionComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'foro', component: ForoComponent },
  { path: 'lectura', component: LecturaComponent },
  { path: 'chat-con-autores', component: ChatConAutoresComponent },
  { path: 'biblioteca', component: BibliotecaComponent },*/
  { path: 'libro-vista-previa', component: BookDetailComponent },
];
