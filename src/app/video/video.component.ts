import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alphavideo-videos',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public videoId: string;

  constructor() { }

  ngOnInit(): void {

    // extract video id if specified in url
    const urlParams = new URLSearchParams(window.location.search);
    this.videoId = urlParams.get('alphavideoid');

  }

}
