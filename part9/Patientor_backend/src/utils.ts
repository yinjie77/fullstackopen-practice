/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender ,newPatient} from "./types";
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error(`Incorrect or missing Name ${name}`);
    }
    return name;
  };
  const isDate = (dob: string): boolean => {
    return Boolean(Date.parse(dob));
  };
  const parseDOB = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error(`Incorrect or missing DOB ${dateOfBirth}`);
    }
    return dateOfBirth;
  };
  const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error(`Incorrect or missing SSN ${ssn}`);
    }
    return ssn;
  };
  const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
  };
  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error(`Incorrect or missing Gender ${gender}`);
    }
    return gender;
  };
  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error(`Incorrect or missing Occupation ${occupation}`);
    }
    return occupation;
  };
  
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): newPatient => {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDOB(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries:object.entries,
    };
  };

export default toNewPatientEntry;