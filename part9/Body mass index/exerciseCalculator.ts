interface Result{
    days:number,
    trainingDays:number,
    target:number,
    average:number,
    success:boolean,
    rating:number,
    ratingDescription:string|undefined
}
export const calculateExercises=(time:Array<number>,target:number):Result=>{
  
    const days=Number(time.length);
    const trainingDays=Number(time.filter(t=>t!==0).length);
    const average=time.reduce((a,b)=>a+b)/days;
    const success=average>target;
    let rating,ratingDescription;
    if(average<target-1)
    {
        rating=1;
        ratingDescription='too bad';
    }
    else if(average>=target-1&&average<target)
    {
        rating=2;
        ratingDescription='not too bad but could be better';
    }
    else if(average>=target)
    {
        rating=3;
        ratingDescription='good';
    }
    if(rating===undefined)
    {
        throw new Error (`参数不合法`);
    }
    return{
        days,
        trainingDays,
        target,
        average,
        success,
        rating,
        ratingDescription
    };
};

// const time:Array<number>=process.argv.map(a=>(Number(a))).slice(2,process.argv.length-1);
// const target=Number(process.argv[process.argv.length-1]);

// console.log(calculateExercises( time,target));
