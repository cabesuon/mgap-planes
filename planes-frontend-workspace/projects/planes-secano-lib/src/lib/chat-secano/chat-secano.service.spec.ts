import { TestBed } from '@angular/core/testing';

import { ChatSecanoService } from './chat-secano.service';

describe('ChatSecanoService', () => {
  let service: ChatSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
