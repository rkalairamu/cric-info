import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material';
import {TreeModule} from '../tree/tree.module';
import {EditPlayerModule} from './editPlayer/editPlayer.module';
import {MatButtonModule} from '@angular/material/button';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';

import {PlayerComponent} from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        TreeModule,
        MatButtonModule,
        InfiniteScrollModule,
        EditPlayerModule,
        MatIconModule,
        HttpClientModule
      ],
      declarations: [PlayerComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
