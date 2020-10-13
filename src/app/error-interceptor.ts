import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialogService: MatDialog) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "An unknown error occurred!"
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                this.dialogService.open(ErrorComponent, { data: { message: errorMessage } });
                return throwError(error);
            })
        );
    }
}
