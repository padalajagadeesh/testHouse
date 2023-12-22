import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs';
import { exhaustMap, flatMap, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { loadApi, loadSuccess, signdataSuccess, signinload } from './house.action';

@Injectable()
export class ApiEffects {
  constructor(private action: Actions, private service: CommonService) {}
  //House Data..
  loadData = createEffect(() =>
    this.action.pipe(
      ofType(loadApi),
      switchMap(() =>
        this.service.getDBHouseData().pipe(
          map((res) => {
            return loadSuccess({ apiData: res });
          })
        )
      )
    )
  );
  // Registation calls..
  loadRegister = createEffect(() =>
    this.action.pipe(
      ofType(signinload),
      switchMap(() =>
        this.service.registerData().pipe(
          map((res) =>{
            return signdataSuccess({registerData:res})
          })
        )
      )
    )
  )
}