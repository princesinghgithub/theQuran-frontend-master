import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './common/guards/auth/auth.guard';

import { AuthorInformationComponent } from '@appComponents/author-information/author-information.component';
import { ComparePageComponent } from './components/compare-page/compare-page.component';
import { HomeComponent } from './components/home/home.component';
import { PublicComponent } from './components/layouts/public/public.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReadSectionComponent } from './components/read-section/read-section.component';
import { VerseDetailComponent } from './components/verse-detail/verse-detail.component';
import { AbrogationsListComponent } from './components/information/abrogations/abrogations-list/abrogations-list.component';
import { AbrogationDetailComponent } from './components/information/abrogations/abrogation-detail/abrogation-detail.component';
import { DifferencesListComponent } from './components/information/differences/differences-list/differences-list.component';
import { DifferencesDetailComponent } from './components/information/differences/differences-detail/differences-detail.component';
import { DifferentReadingsListComponent } from './components/information/different-readings/different-readings-list/different-readings-list.component';
import { DifferentReadingDetailComponent } from './components/information/different-readings/different-reading-detail/different-reading-detail.component';
import { RepetitionsListComponent } from './components/information/repetitions/repetitions-list/repetitions-list.component';
import { RepetitionDetailComponent } from './components/information/repetitions/repetition-detail/repetition-detail.component';
import { TopicsListComponent } from './components/information/topics/topics-list/topics-list.component';
import { TopicDetailComponent } from './components/information/topics/topic-detail/topic-detail.component';
import { VerseBackgroundDetailComponent } from './components/information/verse-background/verse-background-detail/verse-background-detail.component';
import { SignupComponent } from './components/signup/signup.component';
import { TermConditionsComponent } from './components/term-conditions/term-conditions.component';
import { ArticlesListComponent } from './components/articles/articles-list/articles-list.component';
import { ArticleDetailComponent } from './components/articles/article-detail/article-detail.component';
import { FriendsListComponent } from './components/dashboard/friends/friends-list/friends-list.component';
import { DonationComponent } from './components/donation/donation.component';
import { SearchComponent } from './components/dashboard/friends/search/search.component';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { NotesComponent } from './components/dashboard/notes/notes.component';
import { MyCourseComponent } from './components/dashboard/courses/my-course/my-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StartPlanComponent } from './components/start-plan/start-plan.component';
import { InvitedFriendsComponent } from './components/dashboard/courses/invited-friends/invited-friends.component';
import { CurrentLessonComponent } from '@appComponents/current-lesson/current-lesson.component';
import { ReadLessonComponent } from '@appComponents/read-lesson/read-lesson.component';
import { InviteFriendsComponent } from '@appComponents/dashboard/courses/invite-friends/invite-friends.component';
import { SooraBackgroundComponent } from '@appComponents/information/soora-background/soora-background.component';
import { DiscussionComponent } from '@appComponents/discussion/discussion.component';
import { SearchPageComponent } from '@appComponents/search-page/search-page.component';
import { CompletedCourseComponent } from '@appComponents/dashboard/courses/completed-course/completed-course.component';
import { SavedCourseComponent } from '@appComponents/dashboard/courses/saved-course/saved-course.component';
import { CurrentSampleComponent } from '@appComponents/sample/current-sample/current-sample.component';
import { ReadSampleComponent } from '@appComponents/sample/read-sample/read-sample.component';
import { SampleMessageComponent } from '@appComponents/sample/sample-message/sample-message.component';
import { SettingsComponent } from '@appComponents/dashboard/settings/settings.component';
import { EditComponent } from '@appComponents/dashboard/settings/edit/edit.component';
import { PictureComponent } from '@appComponents/dashboard/settings/picture/picture.component';
import { PasswordComponent } from '@appComponents/dashboard/settings/password/password.component';
import { EmailComponent } from '@appComponents/dashboard/settings/email/email.component';
import { ContactUsComponent } from '@appComponents/contact-us/contact-us.component';
import { DeleteComponent } from '@appComponents/dashboard/settings/delete/delete.component';
import { JoinCourseComponent } from '@appComponents/dashboard/courses/join-course/join-course.component';
import { NavbarAComponent } from '@appComponents/navbar-a/navbar-a.component';
const routes: Routes = [
  {path:'navbar',component:NavbarAComponent},
  {
    path: '',
    component: PublicComponent,
    children: [
  
      {
        path: '404',
        component: PageNotFoundComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'terms-conditions',
        component: TermConditionsComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'read',
        component: ComparePageComponent,
      },
      {
        path: 'read/issue/:sooraId/:verseId',
        component: ComparePageComponent,
      },
      {
        path: 'search/:type',
        component: SearchPageComponent,
      },
      // {
      //   path: 'compare',
      //   component: ComparePageComponent,
      // },
      {
        path: 'author',
        component: AuthorInformationComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'verse-detail/:sooraId/:verse/:translationId',
        component: VerseDetailComponent,
      },
      {
        path: 'join-course/:userId/:courseId',
        canActivate: [AuthGuard],
        component: JoinCourseComponent,
      },
      {
        path: 'information',
        children: [
          { path: '', redirectTo: 'abrogation-list', pathMatch: 'full' },
          {
            path: 'abrogations-list',
            component: AbrogationsListComponent,
          },
          {
            path: 'abrogation-detail/:sooraId/:verse/:translationId',
            component: AbrogationDetailComponent,
          },
          {
            path: 'differences-list',
            component: DifferencesListComponent,
          },
          {
            path: 'difference-detail/:sooraId/:verse/:translationId',
            component: DifferencesDetailComponent,
          },
          {
            path: 'different-readings-list',
            component: DifferentReadingsListComponent,
          },
          {
            path: 'different-reading-detail/:sooraId/:verse/:translationId/:narrationId/:reading',
            component: DifferentReadingDetailComponent,
          },
          {
            path: 'repetitions-list',
            component: RepetitionsListComponent,
          },
          {
            path: 'repetition-detail/:sooraId/:verse/:translationId',
            component: RepetitionDetailComponent,
          },
          {
            path: 'topics-list',
            component: TopicsListComponent,
          },
          {
            path: 'topic-detail/:topicId/:translationId',
            component: TopicDetailComponent,
          },
          {
            path: 'verse-background-detail/:verseBackgroundId/:translationId',
            component: VerseBackgroundDetailComponent,
          },
          {
            path: 'soora-background',
            component: SooraBackgroundComponent,
          },
        ],
      },
      {
        path: 'articles-list',
        component: ArticlesListComponent,
      },
      {
        path: 'article-detail/:articleId/:translationId',
        component: ArticleDetailComponent,
      },
      {
        path: 'lessons',
        component: CoursesComponent,
        // children: [
        //   {
        //     path: 'users/:userId/:courseId'
        //   }
        // ]
      },
      {
        path: 'start-lesson/:courseId',
        component: StartPlanComponent,
      },
      {
        path: 'start-lesson/:courseId/sample',
        component: CurrentSampleComponent,
      },
      {
        path: 'start-lesson/:courseId/sample/:currentDay/reference/:referenceId',
        component: ReadSampleComponent,
      },
      {
        path: 'start-lesson/:courseId/sample/:currentDay/message',
        component: SampleMessageComponent,
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'friends', pathMatch: 'full' },
          {
            path: 'activity',
            component: ActivityComponent,
            canActivateChild: [AuthGuard],
          },
          {
            path: 'notes',
            component: NotesComponent,
            canActivateChild: [AuthGuard],
          },
          {
            path: 'friends',
            component: FriendsListComponent,
            canActivateChild: [AuthGuard],
          },
          {
            path: 'settings',
            canActivateChild: [AuthGuard],
            children: [
              { path: '', redirectTo: 'edit', pathMatch: 'full' },
              {
                path: 'edit',
                component: EditComponent,
                canActivateChild: [AuthGuard],
              },
              {
                path: 'email',
                component: EmailComponent,
                canActivateChild: [AuthGuard],
              },
              {
                path: 'password',
                component: PasswordComponent,
                canActivateChild: [AuthGuard],
              },
              {
                path: 'picture',
                component: PictureComponent,
                canActivateChild: [AuthGuard],
              },
              {
                path: 'delete_account',
                component: DeleteComponent,
                canActivateChild: [AuthGuard],
              },
            ],
          },
          {
            path: 'search-content/:content',
            component: SearchComponent,
            canActivateChild: [AuthGuard],
          },
          {
            path: 'my-lessons',
            component: MyCourseComponent,
            canActivateChild: [AuthGuard],
            // children: [
            //   {
            //     path: 'read/:userId/:courseId',
            //     component: CurrentLessonComponent,
            //   },
            // ],
          },
          {
            path: 'my-lessons/completed',
            component: CompletedCourseComponent,
            canActivateChild: [AuthGuard],
          },
          {
            path: 'my-lessons/saved',
            component: SavedCourseComponent,
            canActivateChild: [AuthGuard],
          },
          //TODO ADD AuthGuard
          {
            path: 'my-lessons/read/user/:userId/course/:courseId',
            pathMatch: 'full',
            component: CurrentLessonComponent,
          },
          {
            path: 'my-lessons/read/user/:userId/course/:courseId/lesson/:lesson/reference/:reference',
            pathMatch: 'full',
            component: ReadLessonComponent,
          },
          {
            path: 'my-lessons/read/user/:userId/course/:courseId/lesson/:lesson/message',
            pathMatch: 'full',
            component: ReadLessonComponent,
          },
          {
            path: 'my-lessons/read/user/:userId/course/:courseId/lesson/:lesson/discussion',
            pathMatch: 'full',
            component: DiscussionComponent,
          },
          {
            path: 'invite-friends/course/:courseId',
            component: InviteFriendsComponent,
          },
          {
            path: 'invited-friends/:courseId',
            component: InvitedFriendsComponent,
            canActivateChild: [AuthGuard],
          },
        ],
      },

      {
        path: 'donation',
        component: DonationComponent,
      },
      {
        path: 'give',
        component: DonationComponent,
      },
    ],
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
