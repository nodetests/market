import { GraphQLClient } from "graphql-request"

let URL = ''
if (process.env.REACT_APP_ENV === "testnet"){
  URL = "http://199.192.25.65:8000/subgraphs/name/kokosei/kksdev"
} else if (process.env.REACT_APP_ENV === "mainnet"){

} else {
  URL = 'http://10.1.0.82:8000/subgraphs/name/wangzc/imtoken'
}

const headers = {
  'Content-type':'application/json'
  }

const graphqlClient = new GraphQLClient(URL)
graphqlClient.setHeaders(headers)

export function getHttpData(mutation: any,variables?:any,operationName?:any) {
    return  graphqlClient.request(mutation)
} 

export function getNewData(method:any,data:any){
  return new Promise((reslove,reject)=>{
      let xhr=new XMLHttpRequest();
      if (method === 'GET') {
        xhr.open(method, URL+'?'+data, true);
        xhr.send();
    } else if (method === 'POST') {
        xhr.open(method, URL, true);
        xhr.setRequestHeader('Content-type','application/json')
        xhr.send(data);
    }
      xhr.onreadystatechange=function(){
          if(xhr.readyState===4&&xhr.status===200){
            reslove(xhr.responseText)
          }else{
            reject(xhr)
          }
      }
      xhr.send()
      
  })
  
}

// export async function getNftData(mutation: any,variables?:any,operationName?:any) {
//     await request(`https://foo.bar/graphql?name=${mutation}`, 
//     `{query {users}}`
//     )
// }