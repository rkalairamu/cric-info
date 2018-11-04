import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material';
import {TreeModule} from '../tree/tree.module';
import {EditPlayerModule} from './editPlayer/editPlayer.module';
import {MatButtonModule} from '@angular/material/button';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {PlayerComponent} from './player.component';

@NgModule({
  declarations: [
    PlayerComponent
  ],
  exports: [
    PlayerComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    MatTabsModule,
    TreeModule,
    MatButtonModule,
    InfiniteScrollModule,
    EditPlayerModule
  ]
})
export class PlayerModule {
}
