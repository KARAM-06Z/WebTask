import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { SignUpFormComponent } from './regestration/sign-up-form/sign-up-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { LogInFormComponent } from './regestration/log-in-form/log-in-form.component';
import { ErrorInterceptor } from './error-interceptor';
import { DevicesComponent } from './devices/devices.component';
import { HeaderComponent } from './devices/header/header.component';
import { TableDataComponent } from './devices/table-data/table-data.component';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegestrationComponent,
    SignUpFormComponent,
    LogInFormComponent,
    DevicesComponent,
    HeaderComponent,
    TableDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass: ErrorInterceptor , multi: true},
    {provide : HTTP_INTERCEPTORS , useClass: AuthInterceptor , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
