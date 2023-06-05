import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { ToDoListItem } from "../models/todo-list-item";

@Injectable()
export class ToDoListService {

    apiUrl = 'https://api.thisnameischeapbecauseitsverylong.com/v1/todolist/';

    //apiUrl = 'https://localhost:57408/todolist/';

    constructor(private http: HttpClient) {}

    getAll(): Observable<ToDoListItem[]> {

        return this.http.get<ToDoListItem[]>(this.apiUrl + 'get', this.getOptions());
    }

    add(data: any): Observable<ToDoListItem> { 

        return this.http.post<ToDoListItem>(this.apiUrl + `add`, data, this.getOptions());
    }

    update(data: any) : Observable<ToDoListItem> {
        return this.http.post<ToDoListItem>(this.apiUrl + `update`, data, this.getOptions());
    }

    delete(id: number): Observable<ToDoListItem> { 

        return this.http.get<ToDoListItem>(this.apiUrl + `delete/${id}`, this.getOptions());
    }

    getOptions() {
        return {
            headers: new HttpHeaders()
                .set('Content-type', 'application/json')
        };
    }
}