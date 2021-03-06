import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';

//测试封装好的组件和本地组件
import {  DataTableModule} from 'ng-itoo-datatable';
// import { DataTableModule } from '.././components/datatable/datatable.module';
import { ComponentModule } from '.././components/component.module';


import { TestComponent} from './test.component';
import {testRoutes } from './test.routes';
import {BaseService } from './util/baseservice';
import {DataTableDemo  } from './datatabledemo/datatabledemo.component';
import { BackTestComponent }  from './backtest/backtest.component';
import { DropDownDemoComponent } from './drop-down-demo/drop-down-demo.component';


@NgModule({
  declarations: [
    TestComponent,
    DataTableDemo,
    BackTestComponent,
    DropDownDemoComponent
  ], 

  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ComponentModule,
    RouterModule.forChild(testRoutes)
    


  ],
providers:[BaseService],
exports:[DataTableDemo]
 

})
export class TestModule { }
