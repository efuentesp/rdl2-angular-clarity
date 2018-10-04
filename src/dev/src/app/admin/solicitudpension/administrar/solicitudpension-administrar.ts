import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Solicitudpension } from '../solicitudpension.demo.model';
import { SolicitudpensionService } from '../solicitudpension.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../solicitudpension.demo.scss'],
  templateUrl: './solicitudpension-administrar.demo.html',
})
export class SolicitudpensionAdministrarDemo {
  solicitudpensionsArray: Solicitudpension[];

  constructor(
    private solicitudpensionService: SolicitudpensionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargaSolicitudpensions();
  }

  cargaSolicitudpensions() {
    this.solicitudpensionService.getRecuperaSolicitudpensions().subscribe(
      res => {
        if (res) {
          this.solicitudpensionsArray = res;
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the solicitudpensions.', 'error');
      }
    );
  }

  setClickedRowEditaSolicitudpension(index, solicitudpension) {
    console.log('Edita Solicitudpension:', solicitudpension);
    this.solicitudpensionService.setSolicitudpension(solicitudpension);
    this.router.navigate(['../../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaSolicitudpension(index, solicitudpension) {
    console.log('Elimina Solicitudpension:', solicitudpension);
    this.solicitudpensionService.setSolicitudpension(solicitudpension);
    this.router.navigate(['../../eliminar'], { relativeTo: this.route });
  }
}
