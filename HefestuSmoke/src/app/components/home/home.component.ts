import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { NovidadesComponent } from '../novidades/novidades.component';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [NgOptimizedImage, NovidadesComponent, NavBarComponent]
})
export class HomeComponent {

}
