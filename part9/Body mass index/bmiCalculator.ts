export const calculateBmi=(height:number,weight:number):string=>{
    const bmi= weight/Math.pow(height/100,2);
    console.log(bmi);
    if(bmi<18.5)
    return 'under weight';
    else if(bmi>=18.5&&bmi<=24.9)
    return 'normal weight';
    else if(bmi>=25&&bmi<=29.9)
    return 'Obese';
    else 
    return 'extramely Obese';
};
// const height=Number(process.argv[2]); 
// const weight=Number(process.argv[3]);
// console.log(calculateBmi(height, weight));

