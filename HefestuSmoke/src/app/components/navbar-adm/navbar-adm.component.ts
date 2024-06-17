import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-adm',
  standalone: true,
  imports: [NgbCollapseModule, RouterLink],
  templateUrl: './navbar-adm.component.html',
  styleUrl: './navbar-adm.component.scss'
})
export class NavbarAdmComponent {
  isMenuCollapsed = true;
}
