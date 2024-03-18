import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.getItem("token")!=null){
      const Token = localStorage.getItem("token").split("\"")[3].trim();
      if (Token) {
        const cloned = req.clone({
          headers: req.headers.set("Authorization",
            "Bearer " + Token)
        });
        return next.handle(cloned);
      }
      else {
        return next.handle(req);
      }
    }
    else {
      return next.handle(req);
    }
  }
}
