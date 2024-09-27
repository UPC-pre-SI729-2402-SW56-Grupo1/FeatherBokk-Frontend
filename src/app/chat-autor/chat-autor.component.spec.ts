import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAutorComponent } from './chat-autor.component';

describe('ChatAutorComponent', () => {
  let component: ChatAutorComponent;
  let fixture: ComponentFixture<ChatAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
