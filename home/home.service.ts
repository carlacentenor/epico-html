import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { HomeFinancieroDto} from '../entidad/home-financiero-dto';

import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    private urlEndPoint: string

    constructor(private loginService: LoginService,
                private http: HttpClient,
                private router: Router) {
        this.urlEndPoint = environment.urlbackend;
    }

    getHomeFinanciero(userId: string): Observable<HomeFinancieroDto> {
        const headers= new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.loginService.token);

        return this.http.get<HomeFinancieroDto>(`${this.urlEndPoint}/api/finanzas/home/${userId}`, {'headers':headers}).pipe(
            catchError(
                e => {
                    if (e.status != 401) {
                        this.loginService.logout();
                        this.router.navigate(['/login']);
                    }
                    return throwError(e);
                }
            )
        );
    }

    getUltimosComentarios(userId: string): Observable<any> {
        const headers= new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.loginService.token);

        return this.http.get(`${this.urlEndPoint}/api/finanzas/notificaciones/${userId}`, {'headers':headers});
    }

}
