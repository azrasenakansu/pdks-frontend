import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

export const appRoutes: Route[] = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [authGuard]
    },
    {
      path: 'import-pdks',
      component: UploadPageComponent,
      canActivate: [authGuard]
    },
    {
      path: 'login',
      component: LoginPageComponent,
      canActivate: [loginGuard]
    },
    {
      path: 'user-page',
      component: UserPageComponent,
      canActivate: [authGuard]
    },
  ];
  