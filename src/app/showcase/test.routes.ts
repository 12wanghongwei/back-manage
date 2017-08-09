
import { TestComponent } from './test.component';
import { DataTableDemo }  from './datatabledemo/datatabledemo.component';
import { BackTestComponent }  from './backtest/backtest.component';

export const testRoutes = [
    {
        path: '',
        component: TestComponent
    },
    { path: 'datatable', component:DataTableDemo },
    { path: 'backtest', component:BackTestComponent },


];
