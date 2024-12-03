import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root',
})
export class ProductService {
    public constructor(private http: HttpClient) {}
    public getById(id: string): Observable<any> {
        const url = `https://demo.yansprint.com/api/product/${id}`;
        const params = new HttpParams();
        return this.http.get(url, { params });
    }
}