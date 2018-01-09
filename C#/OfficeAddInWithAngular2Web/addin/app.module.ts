import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { OfficeUiModule } from './office-ui/office-ui.module';
import { PluginModule as PluginModule } from './plugin/plugin.module';
import { CookieModule } from 'ngx-cookie';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpModule, CookieModule.forRoot(), RouterModule, OfficeUiModule, PluginModule],
    bootstrap: [ AppComponent ]
})
export class AppModule { }