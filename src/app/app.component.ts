import { Component, HostBinding, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AsyncPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'pdks-app-root',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, ToastModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @HostBinding('class') class = 'h-[100svh] flex-row bg-gray-300';
  router: Router = inject(Router);
  currentUrl = '';

  constructor() {
    this.router.events.subscribe(w => {
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }
}
