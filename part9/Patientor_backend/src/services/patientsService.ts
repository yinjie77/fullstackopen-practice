/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import {PublicPatient,newPatient,patientsEntry} from '../types';
import { v4 as uuid } from 'uuid';
const id=uuid();

const getEntries=():Array<PublicPatient>=>{
    return patients.map(({id,name,dateOfBirth,gender,occupation})=>(
        {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        }
    ));
};

const addPatient=(entry:newPatient):patientsEntry=>{
    const newPatient={
        id,
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const findId=(id:string):patientsEntry|undefined=>{
    const patient=patients.find(p=>p.id===id);

    return patient;
};
export default{
    getEntries,
    addPatient,
    findId
};