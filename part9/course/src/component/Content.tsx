import React from 'react';
import  Part from './Part'
import { CoursePart } from '../types';

const Content=({courseParts}:{courseParts:CoursePart[]})=>{
    return(
        <div>
           {courseParts.map(c=><div key={c.name}><Part part={c}/></div>)}
        </div>
    )
}

export default Content