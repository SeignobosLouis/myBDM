import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyStepsPage } from './survey-steps.page';

describe('SurveyStepsPage', () => {
  let component: SurveyStepsPage;
  let fixture: ComponentFixture<SurveyStepsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyStepsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
