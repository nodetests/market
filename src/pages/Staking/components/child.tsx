import React, { useMemo } from 'react'
function ChildComponent({name,children}:any){

    function changeXiaohong(name:any){

        console.log('小红跳舞了')
        return name+',小红跳舞了'
    }

    // const actionXiaohong = changeXiaohong(name)
    const actionXiaohong = useMemo(()=>changeXiaohong(name),[name])
    return (
        <>
            <div>{actionXiaohong}</div>
            <div>{children}</div>
        </>
    )
}
export default ChildComponent