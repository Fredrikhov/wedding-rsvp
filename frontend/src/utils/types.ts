export interface ILoader {
  invitation: Tinvitation;
  attendance: Tattendance;
}

export type Tattendance = {
  comment: string;
  attending: boolean;
  allergy: string;
  createdAt: Ttimestamp;
  email: string;
  error?: string;
};

type Tinvitation = {
  guest2: Nullable;
  guest1: string;
  pin: string;
  error?: string;
};

export type Ttimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

type Nullable = string | null;
