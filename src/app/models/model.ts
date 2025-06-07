export interface JwtPayload {
  empId: string;
  email: string;
  firstName: string;
  lastName: string;
  designation: string;
  contact: string;
  dateOfBirth: string;
  address: string;
  roles: string[];
  iat: number;
  exp: number;
}