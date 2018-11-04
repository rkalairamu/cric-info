import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {ContextMenuModule} from 'ngx-contextmenu';

import {TreeComponent} from './tree.component';

@NgModule({
  declarations: [
    TreeComponent
  ],
  exports: [
    TreeComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    ContextMenuModule.forRoot()
  ]
})
export class TreeModule {
}
