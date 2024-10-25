import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateWarehouseAssistantComponent } from './create-warehouse-assistant.component';


describe('CreateWarehouseAssistantComponent', () => {
  let component: CreateWarehouseAssistantComponent;
  let fixture: ComponentFixture<CreateWarehouseAssistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWarehouseAssistantComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWarehouseAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
