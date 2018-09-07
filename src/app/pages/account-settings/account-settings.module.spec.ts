import { AccountSettingsModule } from './account-settings.module';

describe('AccountSettingsModule', () => {
  let accountSettingsModule: AccountSettingsModule;

  beforeEach(() => {
    accountSettingsModule = new AccountSettingsModule();
  });

  it('should create an instance', () => {
    expect(accountSettingsModule).toBeTruthy();
  });
});
