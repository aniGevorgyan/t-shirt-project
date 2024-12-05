import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root',
})
export class ProductService {
    public mainUrl = 'https://demo.yansprint.com/api';

    public constructor(private http: HttpClient) {
    }

    public getById(id: string): Observable<any> {
        const url = `${this.mainUrl}/product/${id}`;
        const params = new HttpParams();
        return this.http.get(url, {params});
    }

    public uploadFile(file: File): Observable<any> {
        const url = `${this.mainUrl}/file-preview`;
        const formData = new FormData();
        formData.append('file_preview', file, file.name);
        return this.http.post(url, formData,);
    }
}
