import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { ExerciseTagPageComponent } from './pages/exercise-tag-page/exercise-tag-page.component';

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
      path: 'login',
      component: LoginPageComponent,
      canActivate: [loginGuard]
    },
    {
      path: 'exercise-tags',
      component: ExerciseTagPageComponent,
      canActivate: [authGuard]
    },
  ];
  