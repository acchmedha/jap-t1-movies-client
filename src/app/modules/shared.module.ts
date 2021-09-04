import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from "ngx-bootstrap/tabs";
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    TabsModule.forRoot(),
    NgbPaginationModule,
    NgbAlertModule,
    TooltipModule.forRoot(),

  ],
  exports: [
    ToastrModule,
    TabsModule,
    NgbPaginationModule,
    NgbAlertModule,
    TooltipModule
  ]

})
export class SharedModule { }
