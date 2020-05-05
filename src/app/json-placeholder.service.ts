import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { Album } from './album.model';
import { PhotoModel } from './photo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('https://jsonplaceholder.typicode.com/users');
  }

  getAlbumsByUserId(userId: number): Observable<Album[]> {
    return this.http.get<Album[]>(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
  }

  getPhotos(): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>('https://jsonplaceholder.typicode.com/photos?albumId=1')
      .pipe(
        map(photos => photos.slice(0, 10))
      );
  }
}
