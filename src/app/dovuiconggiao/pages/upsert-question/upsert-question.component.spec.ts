import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertQuestionComponent } from './upsert-question.component';

describe('UpsertQuestionComponent', () => {
  let component: UpsertQuestionComponent;
  let fixture: ComponentFixture<UpsertQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
