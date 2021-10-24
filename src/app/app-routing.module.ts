import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard";
import { DevicesComponent } from "./devices/devices.component";
import { LogInFormComponent } from "./regestration/log-in-form/log-in-form.component";
import { RegestrationComponent } from "./regestration/regestration.component";
import { SignUpFormComponent } from "./regestration/sign-up-form/sign-up-form.component";

const routes:Routes = [
  {path : "" , component: RegestrationComponent ,
    children : [{path : "" , component: LogInFormComponent},{path : "signup" , component: SignUpFormComponent}]
  },
  {path : "devices" , component: DevicesComponent , children : [] , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule{
}
