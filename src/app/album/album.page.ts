import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonPlaceholderService } from '../json-placeholder.service';
import { Album } from '../album.model';
import { PhotoModel } from '../photo.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  userId: number;
  albums: Album[];
  photos: PhotoModel[];

  constructor(
    private route: ActivatedRoute,
    private jsonPlaceholderService: JsonPlaceholderService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.loadAlbumsAndPhotos();
  }

  loadAlbumsAndPhotos() {
    this.jsonPlaceholderService.getAlbumsByUserId(this.userId).subscribe(
      albums => {
        this.albums = albums;
        this.loadPhotos();
      },
      error => {
        console.error(error);
      });
  }

  loadPhotos() {
    this.jsonPlaceholderService.getPhotos().subscribe(
      photos => {
        this.photos = photos;
        this.albums.forEach((album, i) => {
          album.thumbnail = this.photos[i].thumbnailUrl;
        });
      },
      error => {
        console.error(error);
      });
  }

}
