import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostInfo } from '../Models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = 'https://localhost:7001/api/post';

  constructor(private http: HttpClient) { }

  getAllPost() : Observable<PostInfo[]>{
    return this.http.get<PostInfo[]>(this.baseUrl);
  }

  addPost(postInfo : PostInfo) : Observable<PostInfo>{
    postInfo.id = "00000000-0000-0000-0000-000000000000";
    return this.http.post<PostInfo>(this.baseUrl, postInfo);
  }

  likeUpdatePost(PostInfo: PostInfo): Observable<PostInfo>{
    PostInfo.like+=1;
    return this.http.put<PostInfo>(this.baseUrl+ '/'+PostInfo.id, PostInfo);
  }

  removePost(postInfo: PostInfo): Observable<PostInfo>{
    return this.http.delete<PostInfo>(this.baseUrl+ '/'+postInfo.id);
  }
  
}
