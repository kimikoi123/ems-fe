export interface User {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  emailAddress: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: boolean;
  homeAddress?: string;
  role?: string;
}
