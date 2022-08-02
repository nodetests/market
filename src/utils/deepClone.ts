export function deepClone(source:any){
    const targetObj:any =source.constructor === Array?[]:{}
    for (let key in source) {
        if(source.hasOwnProperty(key)){
            if (source[key] && typeof source[key] === 'object') {
                targetObj[key] = source[key].constructor === Array ? [] : {}
                targetObj[key] = deepClone(source[key])
            }else{
                targetObj[key] = source[key]
            }
        }
    }
    return targetObj
}