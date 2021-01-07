import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { HomeFinancieroDto } from '../entidad/home-financiero-dto';
import { Tema } from '../entidad/tema';

import { LoginService } from '../login/login.service';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    public homeFinancieroDto: HomeFinancieroDto = new HomeFinancieroDto();

    public showMenu = false;

    constructor(private router: Router,
                public loginService: LoginService,
                private homeService: HomeService,
                private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.spinner.show();
        this.homeService.getHomeFinanciero(this.loginService.usuario.user.codigo).subscribe(
            homeFinancieroDto => {
                this.homeFinancieroDto = homeFinancieroDto;
                this.spinner.hide();
            },
            _err => {
                this.spinner.hide();
            }
        );
    }

    public reloadNotificaciones() {
        this.spinner.show();
        this.homeService.getUltimosComentarios(this.loginService.usuario.user.codigo).subscribe(
            ultimosComentariosList => {
                this.homeFinancieroDto.ultimosComentariosList = ultimosComentariosList;
                this.spinner.hide();
            },
            _err => {
                this.spinner.hide();
            }
        );
    }

    public verReporte(tema: Tema) {
        if (tema.construccion == "N") {
            this.router.navigate(['/reporte/' + tema.id]);
        } else {
            this.router.navigate(['/reporte-construccion']);
        }
    }

    public reloadPage() {
        window.location.reload()
    }

    public setShowMenu() {
        this.showMenu = !this.showMenu;
    }

}
