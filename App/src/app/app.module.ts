import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './modules/person/person.component';
import { AuthComponent } from './modules/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { GraphComponent } from './modules/graph/graph.component';
import { ProPertComponent } from './modules/pro-pert/pro-pert.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { CandlestickComponent } from './modules/candlestick/candlestick.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HistoryComponent } from './modules/History/history.component';
import { AccountInfo } from './modules/account-info/account-info.component';
import { Dashboard } from './modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ChangePassword } from './modules/changepass/changepass.component';
import { TradingComponent } from './modules/trading/trading.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { BuySell } from './modules/buy-sell/buy-sell.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { AuthenticatedGuard } from './modules/Guards/authenticated.guard';
import { StatsComponent } from './modules/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    AuthComponent,
    GraphComponent,
    ProPertComponent,
    CandlestickComponent,
    HistoryComponent,
    AccountInfo,
    Dashboard,
    ChangePassword,
    TradingComponent,
    BuySell,
    SidebarComponent,
    StatsComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'trading', canActivate: [AuthenticatedGuard], component: TradingComponent },
      { path: 'dashboard', canActivate: [AuthenticatedGuard], component: Dashboard },
      { path: 'changePassword', canActivate: [AuthenticatedGuard], component: ChangePassword },
      { path: '', component: AuthComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ], { onSameUrlNavigation: 'reload' }),
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    NgApexchartsModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}