import { Record } from 'immutable';

export const AuthUserRecord = Record({
  id: '',
  organizationId: 0,
  sfId: null,
  email: '',
  firstName: '',
  lastName: '',
  permissions: [],
  lastLogin: new Date(),
  profile: null,
  timeZone: null,
  language: null,
  active: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date()
});

export class AuthUserModel extends AuthUserRecord {
  static from(data) {
    const {
      id,
      organization_id: organizationId,
      sf_id: sfId,
      email,
      first_name: firstName,
      last_name: lastName,
      permissions,
      last_login: lastLogin,
      profile,
      time_zone: timeZone,
      language,
      active,
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: deletedAt
    } = data;

    return new this({
      id,
      organizationId,
      sfId,
      email,
      firstName,
      lastName,
      permissions,
      lastLogin,
      profile,
      timeZone,
      language,
      active,
      createdAt,
      updatedAt,
      deletedAt
    });
  }
}
