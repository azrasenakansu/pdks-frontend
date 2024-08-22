import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem, menuItems } from '../../models/common/menu-item';
import { RoleEnum } from '../../models/common/role-enum';
import { NavigationEnd, Router } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'pdks-sidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent{
  router = inject(Router);
  state = inject(StateService);
  currentPath = signal(this.router.url);
  availableMenus = computed(() => {
    const permissions = this.state.$role();
    if(permissions === undefined){
      return [];
    }
    const roleEnum = permissions?.authority === "ADMIN" ? RoleEnum.ADMIN : RoleEnum.USER;
    return menuItems.filter((q) =>
      q.isAvailable(roleEnum!),
    );
  });


  constructor() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentPath.set(val.urlAfterRedirects);
      }
    });
  }

  onMenuClick(route: string): void {
    this.router.navigateByUrl(route);
  }
}
