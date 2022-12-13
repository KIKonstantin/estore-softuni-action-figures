import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UsersService } from '@estore/users';
import { Subject, takeUntil } from 'rxjs';


@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit, OnDestroy{
    users: User[] = [];
    endsubs$ : Subject<any> = new Subject();

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private usersService: UsersService
        ){

    }
    ngOnInit(): void {
        this._getUsers();
    }
    ngOnDestroy(): void {
        this.endsubs$.complete();
    }

    _getUsers(){
        this.usersService.getUsers().pipe(takeUntil(this.endsubs$)).subscribe(u => {
            this.users = u;
        })
    }

    deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this user?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(userId).pipe(takeUntil(this.endsubs$)).subscribe(
                    ()=> {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is successfuly deleted' });
                    },
                    ()=>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not successfuly deleted' })
                    });
                    this._getUsers();
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            reject: () => {}
        });
    }

    getCountryName(countryKey: string): any {
        if (countryKey) return this.usersService.getCountry(countryKey);
      }
    updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }
}
