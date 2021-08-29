import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';
import { AlertsService } from '../service/alerts.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  tema: Theme = new Theme()
  listaTema: Theme[]

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private alert: AlertsService,
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.alert.showAlertInfo('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])
    }

    if (environment.tipo != 'adm') {
      this.alert.showAlertDanger("Você não possue permissão para cadastrar um novo tema!")
      this.router.navigate(['/home'])
    }

    this.findAllThemes()
  }

  findAllThemes() {
    this.themeService.getAllTheme().subscribe((resp: Theme[]) => {
      this.listaTema = resp
    })
  }

  cadastrar() {
    this.themeService.postTheme(this.tema).subscribe((resp: Theme) => {
      this.tema = resp
      this.alert.showAlertSuccess("Tema cadastrado com sucesso!")
      this.findAllThemes()
      this.tema = new Theme()
    })
  }

}