/* eslint-disable camelcase */
export type MfaDevice = {
  id: number;
  active: boolean;
  type: string;
  phone_number?: string;
  email?: string;
  last_used_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};
