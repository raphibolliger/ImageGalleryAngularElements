import { Component, Input, OnInit } from "@angular/core";
import { ImageSliderDto } from "../image-slider/image-slider.component";

@Component({
  selector: "app-planea-gallery",
  templateUrl: "./planea-gallery.component.html",
  styleUrls: ["./planea-gallery.component.scss"],
})
export class PlaneaGalleryComponent implements OnInit {
  @Input("urls") public urls: string;
  @Input("alts") public alts: string;

  public images: ImageSliderDto[] = [];
  public showSlider = false;

  ngOnInit(): void {
    console.log("urls", this.urls);
    try {
      const urlsArray = JSON.parse(this.urls) as string[];
      this.images = urlsArray.map((url, index) => ({
        id: index.toString(),
        imageUrl: url,
        thumbnailUrl: url,
        altText: this.alts?.[index] ?? "Referenzbild",
      }));
      console.log("urlsArray", urlsArray);

      console.log("images", this.images);
    } catch (e) {
      console.error("Could not parse urls", e);
    }
  }
}
