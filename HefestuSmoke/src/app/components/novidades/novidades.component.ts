import { Component } from '@angular/core';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";

@Component({
    selector: 'app-novidades',
    standalone: true,
    templateUrl: './novidades.component.html',
    styleUrl: './novidades.component.scss',
    imports: [BtnPrimaryComponent]
})
export class NovidadesComponent {

}
