export type ProfileRole = "member" | "admin" | "super_admin";

export type ProfileAccountStatus = "active" | "suspended";

export type ProfileLanguagePreference = "en" | "es";

export interface ProfileRecord {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string | null;
  role: ProfileRole;
  gender: string | null;
  pronouns: string | null;
  dob: string | null;
  sexual_orientation: string | null;
  occupation: string | null;
  profile_picture: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  account_status: ProfileAccountStatus;
  race: string | null;
  nationality: string | null;
  language_preference: ProfileLanguagePreference | null;
  city: string | null;
  country: string | null;
}

export interface ProfileInsert {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string | null;
  role?: ProfileRole;
  gender?: string | null;
  pronouns?: string | null;
  dob?: string | null;
  sexual_orientation?: string | null;
  occupation?: string | null;
  profile_picture?: string | null;
  is_approved?: boolean;
  account_status?: ProfileAccountStatus;
  race?: string | null;
  nationality?: string | null;
  language_preference?: ProfileLanguagePreference | null;
  city?: string | null;
  country?: string | null;
}

export interface ProfileUpdate {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  phone?: string | null;
  role?: ProfileRole;
  gender?: string | null;
  pronouns?: string | null;
  dob?: string | null;
  sexual_orientation?: string | null;
  occupation?: string | null;
  profile_picture?: string | null;
  is_approved?: boolean;
  account_status?: ProfileAccountStatus;
  race?: string | null;
  nationality?: string | null;
  language_preference?: ProfileLanguagePreference | null;
  city?: string | null;
  country?: string | null;
}