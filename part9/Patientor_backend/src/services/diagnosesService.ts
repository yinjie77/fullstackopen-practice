import diagnoses from '../../data/diagnoses';
import {diagnosesEntry} from '../types';

const getEntries=():Array<diagnosesEntry>=>{
    return diagnoses;
};

export default{
    getEntries
};