import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';
import { RegisterComponent } from './pages/register/register.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import {PasswordModule} from 'primeng/password';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
    
]

@NgModule({
    imports: [CommonModule, 
        RouterModule.forChild(routes), 
        InputTextModule, 
        ButtonModule, 
        FormsModule, 
        DropdownModule,
        ReactiveFormsModule, 
        InputMaskModule,
        PasswordModule,
        StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer), 
        EffectsModule.forFeature([UsersEffects])],
    declarations: [LoginComponent, RegisterComponent],
    providers: [UsersFacade]
})
export class UsersModule { }
