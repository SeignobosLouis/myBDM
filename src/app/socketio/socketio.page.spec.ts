import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketioPage } from './socketio.page';

describe('SocketioPage', () => {
  let component: SocketioPage;
  let fixture: ComponentFixture<SocketioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
