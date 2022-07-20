import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './myComponent/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './myComponent/home/home.component';
import { HeaderComponent } from './myComponent/header/header.component';
import { MainBodyPartComponent } from './myComponent/main-body-part/main-body-part.component';
import { SidebarComponent } from './myComponent/sidebar/sidebar.component';
import { PostComponent } from './myComponent/post/post.component';
import { StoryReelComponent } from './myComponent/story-reel/story-reel.component';
import { FriendListComponent } from './myComponent/friend-list/friend-list.component';
import { MessageComponent } from './myComponent/message/message.component';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './myComponent/profile/profile.component';
import { SearchResultComponent } from './myComponent/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MainBodyPartComponent,
    SidebarComponent,
    PostComponent,
    StoryReelComponent,
    FriendListComponent,
    MessageComponent,
    ProfileComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
