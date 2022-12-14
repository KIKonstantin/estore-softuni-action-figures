import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
// Category
import { CategoriesTableComponent } from './pages/categories/categories-table/categories-table.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
// Product
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
// Services
import { CategoriesService } from '@estore/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import {FieldsetModule} from 'primeng/fieldset';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { JwtInterceptor, UsersModule } from '@estore/users';
import { AppRoutingModule } from './app-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SidebarComponent,
        ShellComponent,
        CategoriesTableComponent,
        CategoriesFormComponent,
        ProductsListComponent,
        ProductsFormComponent,
        UsersListComponent,
        UsersFormComponent,
        OrdersListComponent,
        OrdersDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CardModule,
        ToolbarModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        FormsModule,
        ToastModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ColorPickerModule,
        InputNumberModule,
        InputTextareaModule,
        InputSwitchModule,
        DropdownModule,
        TagModule,
        InputMaskModule,
        FieldsetModule,
        ProgressSpinnerModule,
        UsersModule,
        AppRoutingModule,
        AngularEditorModule
        
    ],
    providers: [CategoriesService, MessageService, ConfirmationService, 
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}
