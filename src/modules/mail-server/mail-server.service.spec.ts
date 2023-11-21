import { Test, TestingModule } from '@nestjs/testing';
import { MailServerService } from './mail-server.service';

describe('MailServerService', () => {
  let service: MailServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailServerService],
    }).compile();

    service = module.get<MailServerService>(MailServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
