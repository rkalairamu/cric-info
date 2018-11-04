import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatCardModule} from '@angular/material';

import {CandidatesModule} from '../candidates/candidates.module';
import {JobsComponent} from './jobs.component';

import {JobService} from '../services/job.service';
import {Job} from '../services/job';

describe('JobPostComponent', () => {
    let component: JobsComponent;
    let fixture: ComponentFixture<JobsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                MatCheckboxModule,
                MatCardModule,
                CandidatesModule
            ],
            declarations: [JobsComponent],
            providers: [JobService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('get jobs', inject([JobService],(service: JobService) => {
        service.getJobs().subscribe(jobs => {
            expect(jobs.length).toEqual(4);
        });
    }));

    it('show candidates', () => {
        const job: Job = {
            id: 1,
            company: 'ABC1',
            title: 'Java Architect',
            created_date: '2018-09-01',
            status: 'Open'
        };
        component.showCandidates(job);
        expect(component.jobId).toEqual(job.id);
    });
});
