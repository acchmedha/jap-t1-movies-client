import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from "ngx-bootstrap/tabs";
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


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
    Ng2SearchPipeModule

  ],
  exports: [
    ToastrModule,
    TabsModule,
    NgbPaginationModule,
    NgbAlertModule,
    TooltipModule,
    Ng2SearchPipeModule
  ]

})
export class SharedModule { }
