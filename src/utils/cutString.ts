export function stringStr(val:string| number){
    if(val){
        val = val.toString()
        let str1 = val.slice(0,6)
        let str2 = val.slice(-5)   
        return str1+'......'+str2
    }
   
}