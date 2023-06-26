import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationIntInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.headers.get("skip")) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + localStorage.getItem("jwt"))
      });
    }
    return next.handle(request);
  }
}
