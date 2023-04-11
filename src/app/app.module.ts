import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { IconsComponent } from './pages/solution/solution.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthModule } from "@auth0/auth0-angular";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    MatSidenavModule,
    MatSelectModule,
    RouterModule,
    AppRoutingModule,
    NgHttpLoaderModule.forRoot(),
    AuthModule.forRoot({
      domain: 'dev-pg885vf5puf75lpx.us.auth0.com',
      clientId: 'WtX01rYykVtUT2N9iT3XxUJT0jTvsyev',
    }),
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, CommentComponent, IconsComponent],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
