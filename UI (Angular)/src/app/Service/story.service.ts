import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoryInfo } from '../Models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  baseUrl = 'https://localhost:7001/api/Story';

  constructor(private http : HttpClient) { }

  getAllStoryInfo() : Observable<StoryInfo[]>{
    return this.http.get<StoryInfo[]>(this.baseUrl);
  }

  addStory(storyInfo : StoryInfo) : Observable<StoryInfo>{
    storyInfo.storyId = "00000000-0000-0000-0000-000000000000";
    return this.http.post<StoryInfo>(this.baseUrl, storyInfo);
  }

  deleteStory (storyInfo : StoryInfo) : Observable<StoryInfo>{
    return this.http.delete<StoryInfo>(this.baseUrl + "/" + storyInfo.storyId);
  }
  
}
