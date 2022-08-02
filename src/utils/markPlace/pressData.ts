export const pressData =(val:any,current:number,pageSize:number)=>{
    let arr = val.filter((item:any,index:number) => index >=(current-1)*pageSize&&index<current*pageSize)
    arr= arr.length>0?arr:[]
    return arr 
}