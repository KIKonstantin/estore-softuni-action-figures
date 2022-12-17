import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of, map, catchError, concatMap } from 'rxjs'
import * as UsersFeature from './users.reducer';
import * as UsersAction from './users.actions';
import { LocalStorageService } from '../services/local-storage.service';
import { UsersService } from '../services/user.service';

@Injectable()
export class UsersEffects {
  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersAction.buildUserSession),
    concatMap(() => {
      if (this.localStorageService.isValidToken()) {
        const userId = this.localStorageService.getUserIdFromToken();
        if (userId) {
          return this.usersService.getUser(userId).pipe(
            map(user => { return UsersAction.buildUserSessionSuccess({ user: user });
           }),
           catchError(() => of(UsersAction.buildUserSessionFail()))
          );
        }else {
          return of(UsersAction.buildUserSessionFail())
        }
      } else {
        return of(UsersAction.buildUserSessionFail())
      }
    })
  ))
  constructor(private actions$: Actions, private localStorageService: LocalStorageService, private usersService: UsersService) { }
}
