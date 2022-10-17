import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './common/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { DateAgoPipe } from './pipes/date-ago.pipe';
import { DateLeftPipe } from './pipes/date-left.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReadSectionComponent } from './components/read-section/read-section.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { PrivateComponent } from './components/layouts/private/private.component';
import { PublicComponent } from './components/layouts/public/public.component';
import { NavBarComponent } from './components/layouts/nav-bar/nav-bar.component';
import { VerseAbbrogatedSideNavComponent } from './components/verse-abbrogated-side-nav/verse-abbrogated-side-nav.component';
import { ComparePageComponent } from './components/compare-page/compare-page.component';
import { AuthorInformationComponent } from './components/author-information/author-information.component';
import { VerseDetailComponent } from './components/verse-detail/verse-detail.component';
import { AbrogationsListComponent } from './components/information/abrogations/abrogations-list/abrogations-list.component';
import { AbrogationDetailComponent } from './components/information/abrogations/abrogation-detail/abrogation-detail.component';
import { DifferencesListComponent } from './components/information/differences/differences-list/differences-list.component';
import { DifferencesDetailComponent } from './components/information/differences/differences-detail/differences-detail.component';
import { DifferentReadingsListComponent } from './components/information/different-readings/different-readings-list/different-readings-list.component';
import { DifferentReadingDetailComponent } from './components/information/different-readings/different-reading-detail/different-reading-detail.component';
import { RepetitionsListComponent } from './components/information/repetitions/repetitions-list/repetitions-list.component';
import { RepetitionDetailComponent } from './components/information/repetitions/repetition-detail/repetition-detail.component';
import { ContributorSectionComponent } from './common/components/contributor-section/contributor-section.component';
import { TranslationDropdownComponent } from './common/components/translation-dropdown/translation-dropdown.component';
import { ShareComponent } from './common/components/share/share.component';
import { TopicsListComponent } from './components/information/topics/topics-list/topics-list.component';
import { TopicDetailComponent } from './components/information/topics/topic-detail/topic-detail.component';
import { VerseBackgroundDetailComponent } from './components/information/verse-background/verse-background-detail/verse-background-detail.component';
import { SooraDropdownComponent } from './common/components/soora-dropdown/soora-dropdown.component';
import { SignupComponent } from './components/signup/signup.component';
import { TermConditionsComponent } from './components/term-conditions/term-conditions.component';
import { FriendsListComponent } from './components/dashboard/friends/friends-list/friends-list.component';
import { ArticlesListComponent } from './components/articles/articles-list/articles-list.component';
import { ArticleDetailComponent } from './components/articles/article-detail/article-detail.component';
import { DonationComponent } from './components/donation/donation.component';
import { SearchComponent } from './components/dashboard/friends/search/search.component';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { NotesComponent } from './components/dashboard/notes/notes.component';
import { DashboardBarComponent } from './components/dashboard/dashboard-bar/dashboard-bar.component';
import { MyCourseComponent } from './components/dashboard/courses/my-course/my-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseHeaderComponent } from './components/layouts/course-header/course-header.component';
import { LanguageDropdownComponent } from './common/components/language-dropdown/language-dropdown.component';
import { StartPlanComponent } from './components/start-plan/start-plan.component';
import { InvitedFriendsComponent } from './components/dashboard/courses/invited-friends/invited-friends.component';
import { CurrentLessonComponent } from './components/current-lesson/current-lesson.component';
import { ReadLessonComponent } from './components/read-lesson/read-lesson.component';
// import { InviteFriendComponent } from './components/dashboard/courses/invite-friend/invite-friends.component';
import { InviteFriendsComponent } from './components/dashboard/courses/invite-friends/invite-friends.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { myFilterPipe } from './pipes/myFilter.pipe';
import { SooraBackgroundComponent } from './components/information/soora-background/soora-background.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { CompletedCourseComponent } from './components/dashboard/courses/completed-course/completed-course.component';
import { SavedCourseComponent } from './components/dashboard/courses/saved-course/saved-course.component';
import { CurrentSampleComponent } from './components/sample/current-sample/current-sample.component';
import { ReadSampleComponent } from './components/sample/read-sample/read-sample.component';
import { SampleMessageComponent } from './components/sample/sample-message/sample-message.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { SideSettingsComponent } from './components/dashboard/settings/side-settings/side-settings.component';
import { EditComponent } from './components/dashboard/settings/edit/edit.component';
import { EmailComponent } from './components/dashboard/settings/email/email.component';
import { PasswordComponent } from './components/dashboard/settings/password/password.component';
import { PictureComponent } from './components/dashboard/settings/picture/picture.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TermsAndConditionComponent } from './components/terms-and-condition/terms-and-condition.component';
import { DeleteComponent } from './components/dashboard/settings/delete/delete.component';
import { JoinCourseComponent } from './components/dashboard/courses/join-course/join-course.component';
import { NavbarAComponent } from './components/navbar-a/navbar-a.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import { NavDialogeComponent } from './components/nav-dialoge/nav-dialoge.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PrivateComponent,
    PublicComponent,
    HomeComponent,
    ReadSectionComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavBarComponent,
    VerseAbbrogatedSideNavComponent,
    ComparePageComponent,
    AuthorInformationComponent,
    VerseDetailComponent,
    AbrogationsListComponent,
    AbrogationDetailComponent,
    DifferencesListComponent,
    DifferencesDetailComponent,
    DifferentReadingsListComponent,
    DifferentReadingDetailComponent,
    RepetitionsListComponent,
    RepetitionDetailComponent,
    ContributorSectionComponent,
    TranslationDropdownComponent,
    LanguageDropdownComponent,
    ShareComponent,
    TopicsListComponent,
    TopicDetailComponent,
    VerseBackgroundDetailComponent,
    SooraDropdownComponent,
    SignupComponent,
    TermConditionsComponent,
    FriendsListComponent,
    ArticlesListComponent,
    ArticleDetailComponent,
    DonationComponent,
    SearchComponent,
    ActivityComponent,
    NotesComponent,
    DashboardBarComponent,
    MyCourseComponent,
    CoursesComponent,
    CourseHeaderComponent,
    DateAgoPipe,
    DateLeftPipe,
    StartPlanComponent,
    InvitedFriendsComponent,
    CurrentLessonComponent,
    ReadLessonComponent,
    InviteFriendsComponent,
    InviteFriendsComponent,
    myFilterPipe,
    SooraBackgroundComponent,
    DiscussionComponent,
    SearchPageComponent,
    CompletedCourseComponent,
    SavedCourseComponent,
    CurrentSampleComponent,
    ReadSampleComponent,
    SampleMessageComponent,
    SettingsComponent,
    SideSettingsComponent,
    EditComponent,
    EmailComponent,
    PasswordComponent,
    PictureComponent,
    ContactUsComponent,
    TermsAndConditionComponent,
    DeleteComponent,
    JoinCourseComponent,
    NavbarAComponent,
    NavDialogeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    AppRoutingModule,
    ShareButtonsModule,
    ShareIconsModule,
    SharedModule.forRoot(),
    MatSliderModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
