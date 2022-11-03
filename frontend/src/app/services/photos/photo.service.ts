import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async takePhoto(): Promise<Photo | void> { 
    // Take a photo
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });
      return capturedPhoto;
    } catch(error) {
      console.log("Take photo cancelled");
    }
    return null;
  }

  public async pickImage(): Promise<GalleryPhoto> {
    // Take a photo
    const capturedPhotos = await Camera.pickImages({
      limit: 1,
      quality: 100
    });

    return capturedPhotos.photos[0];
  }

}
