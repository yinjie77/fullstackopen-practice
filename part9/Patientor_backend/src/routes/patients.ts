import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
const router=express.Router();

router.get('/',(_req,res)=>{
    res.send(patientsService.getEntries());
});

router.post('/',(req,res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newpatient=toNewPatientEntry(req.body);
    res.send(patientsService.addPatient(newpatient));
});

router.get('/:id',(req,res)=>{
    const patient=patientsService.findId(req.params.id);
    if(patient)
    res.send(patient);
    else
    res.status(404);
});
export default router;