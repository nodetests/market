
import { WalletManager } from "@/utils/walletManager";
import { Button } from "antd";
import React from "react";

function Test(){
    // function getType(val:any){
    //     const typeObj:any = {
    //         '[object String]': 'string',
    //         '[object Number]': 'number',
    //         '[object Boolean]': 'boolean',
    //         '[object Null]': 'null',
    //         '[object Undefined]': 'undefined',
    //         '[object Object]': 'object',
    //         '[object Array]': 'array',
    //         '[object Function]': 'function',
    //         '[object Date]': 'date', // Object.prototype.toString.call(new Date())
    //         '[object RegExp]': 'regExp',
    //         '[object Map]': 'map',
    //         '[object Set]': 'set',
    //         '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
    //         '[object WeakMap]': 'weakMap',
    //         '[object Window]': 'window',  // Object.prototype.toString.call(window)
    //         '[object Error]': 'error', // new Error('1')
    //         '[object Arguments]': 'arguments',
    //     }
    //     let name:string = Object.prototype.toString.call(val)
    //     return typeObj[name]
    // }

    function mintNft(){
        WalletManager.instance.mintNft(1, (err: Error, tx: any)=>{
            if (err) {
                console.log(err)
                return
            }

            console.log(tx)
        })
    }

    return(
        <div>  
           <Button onClick={mintNft}>MintNft</Button>
        </div>
    )
}
export default React.memo(Test)