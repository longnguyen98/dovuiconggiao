import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportQuestionFromExcelComponent } from './import-question-from-excel.component';

describe('ImportQuestionFromExcelComponent', () => {
  let component: ImportQuestionFromExcelComponent;
  let fixture: ComponentFixture<ImportQuestionFromExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportQuestionFromExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportQuestionFromExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
