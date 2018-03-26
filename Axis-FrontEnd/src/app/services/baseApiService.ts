import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class BaseApiService {

    private baseDomain: string = "http://localhost:7070/axis/";
    private errorMessage: string;

    constructor(private _http: HttpClient) {}


    public getRequest(path: string, param?: any) {
        try {
            if(param) {
               return this._http.get(this.baseDomain + path + param);
            }
            else {
               return this._http.get(this.baseDomain + path);
            }
        } catch(ex) {
            this.errorMessage = ex;
        }
    }

    public postRequest(path: string, param: any) {
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        try {
           return this._http.post(this.baseDomain + path, param, {headers: headers});
        } catch(ex){
           return this.errorMessage = ex;
        }
        
    }


}