import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';

import {SharedModule} from './common/shared';

import { DropDownComponent } from './drop-down-component/drop-down.component';

import { AutoInputWidth } from './drop-down-component/auto-input-width.directive';




@NgModule({
  declarations: [
    DropDownComponent,
    AutoInputWidth
  ], 

  imports: [
    CommonModule,

    FormsModule,
    HttpModule,
    SharedModule

    


  ],
providers:[],
exports:[DropDownComponent]
 

})
export class ComponentModule { }
