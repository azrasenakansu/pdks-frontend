import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ExternalWorklogsPageComponent } from './pages/external-worklogs-page/external-worklogs-page.component';
import { ApprovalPageComponent } from './pages/approval-page/approval-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';

export const appRoutes: Route[] = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'reports'
    },
    // {
    //   path: 'dashboard',
    //   component: DashboardComponent,
    //   canActivate: [authGuard]
    // },
    {
      path: 'import',
      component: UploadPageComponent,
      canActivate: [authGuard]
    },
    {
      path: 'login',
      component: LoginPageComponent,
      canActivate: [loginGuard]
    },
    {
      path: 'users',
      component: UserPageComponent,
      canActivate: [authGuard]
    },
    {
      path: 'externals',
      component: ExternalWorklogsPageComponent,
      canActivate: [authGuard]
    },
    {
      path: 'approvals',
      component: ApprovalPageComponent,
      canActivate: [authGuard]
    },
    {
      path: 'reports',
      component: ReportPageComponent,
      canActivate: [authGuard]
    },
  ];
  