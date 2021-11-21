import express=require('express');
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
const app=express();

app.use(express.json());
app.get('/Hello',(_req,res)=>{
    res.send('Hello Full Stack');
});
app.get('/bmi',(req,res)=>{
    const height=Number(req.query.height);
    const weight=Number(req.query.weight);
    if(!height||!weight)
    {
        throw new Error('malformatted parameters');
    }
    const bmi=calculateBmi(height,weight);

    res.send({
        weight,
        height,
        bmi
    });
});
app.post('/exercises',(req,res)=>{
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises,target}=req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({
          error: 'parameters missing'
        });
      }

      if (
        !daily_exercises ||
        isNaN(Number(target))
      ) {
        res.status(400).json({
          error: 'malformatted parameters'
        });
      }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
   res.send(calculateExercises(daily_exercises,target)) ;

    
});
const PORT=3004;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});