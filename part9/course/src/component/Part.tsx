import React from 'react'
import { CoursePart } from '../types';
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part=({part}:{part:CoursePart})=>{
    switch(part.type){
        case "normal":
            return(
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <i>{part.description}</i>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    project exercises {part.exerciseCount}
                </div>
            )
        case "submission":
            return(
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <i>{part.description}</i>
                    <div>{part.exerciseSubmissionLink}</div>
                </div>
            )
        case "special":
            return(
                <div>
                     <h3>{part.name} {part.exerciseCount}</h3>
                     <i>{part.description}</i>
                     required skils : {part.requirements}
                </div>
            )
        default:
            return assertNever(part)
    }
  }

  export default Part