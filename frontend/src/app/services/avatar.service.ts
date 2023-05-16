import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(private http: HttpClient) {}

    getAllAvatars(){
        return this.http.get<string[]>(`api/user/avatars`);
    }
}
