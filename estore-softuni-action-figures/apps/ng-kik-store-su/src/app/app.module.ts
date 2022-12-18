import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@estore/products';
import { UiModule } from '@estore-softuni-action-figures/ui';
import { StyleClassModule } from 'primeng/styleclass';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@estore/orders';
import { JwtInterceptor, UsersModule } from '@estore/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'contact-page',
        component: ContactPageComponent,
    }
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, ContactPageComponent],
    imports:
        [
            BrowserModule,
            RouterModule.forRoot(routes),
            AccordionModule,
            BrowserAnimationsModule,
            ProductsModule,
            UiModule,
            StyleClassModule,
            HttpClientModule,
            OrdersModule,
            UsersModule,
            StoreModule.forRoot({}),
            EffectsModule.forRoot([])
        ],
    providers: [{
        provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }],
    bootstrap: [AppComponent],
    exports: [
    ]
})
export class AppModule { }
