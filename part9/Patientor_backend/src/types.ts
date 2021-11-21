// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{
   
}
export interface diagnosesEntry {
    code:string;
    name:string;
    latin?:string;
}
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }
export interface patientsEntry{
    id:string;
    name:string;
    dateOfBirth:string;
    ssn:string;
    gender:Gender;
    occupation:string;
    entries:Entry[]
}
export type newPatient=Omit<patientsEntry,'id'>;
export type PublicPatient=Omit<patientsEntry,'ssn'|'entries'>;