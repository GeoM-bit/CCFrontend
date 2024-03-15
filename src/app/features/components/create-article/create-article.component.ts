import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent implements OnInit{
  selectedImageFile: File;
    ngOnInit(): void {
    }
  onPhotoSelected(photoSelector: HTMLInputElement)
  {
    this.selectedImageFile= photoSelector.files[0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loaded",
      ev => {
        let readableString =  fileReader.result.toString();
        document.getElementById("article-preview-image");
        let articlePreviewImage = <HTMLImageElement>document.getElementById("article-preview-image")
        articlePreviewImage.src = readableString;
      }
    )
  }
}
