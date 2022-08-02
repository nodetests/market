/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from 'react';
import './App.css';
import Router from './router'
// import zhCN from 'antd/lib/locale/zh_CN';
// import zh_TW from 'antd/lib/locale/zh_TW';
// import ja_JP from 'antd/lib/locale/ja_JP';

import intl from 'react-intl-universal';

const locales = {
  "en-US": require('./locales/en-US.json'),
  "zh-CN": require('./locales/zh-CN.json'),
  "ja-JP": require('./locales/ja-JP.json'),
};


function App() {
  const [initDone,setInitDone]= useState<any>(false)

  let currentLocale = intl.determineLocale({
    cookieLocaleKey: "lang"
  })
  // 多语言 -当前语言
  // console.log(currentLocale);
  
  useEffect(() =>{
    loadLocales()
  },[])

  const loadLocales=()=>{
    // react-intl-universal 是单例模式, 只应该实例化一次
    intl.init({
      currentLocale, // TODO: determine locale here
      locales,
    })
    .then(() => {
      setInitDone(true);
    });

  }
 
  return (
    <div className="App">
      {initDone && < Router/>} 
    </div>
  );
}

export default App;

// import React from 'react';
// import './App.css';
// import Router from './router'
// import { ConfigProvider } from 'antd'
// import us from 'antd/lib/locale-provider/en_US'

// import { NetworkContextName } from './connects';
// import Web3Provider from 'web3';
// import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
// import { useState } from 'react';
// const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)


// function App() {

//   function getLibrary(provider:any, connector:any) {
//     return new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
//   }
//   return (
//     <div className="App">
//       <Web3ReactProvider getLibrary={getLibrary}>
//         ​<Web3ProviderNetwork getLibrary={getLibrary}>
//           <ConfigProvider locale={us}>
//             < Router />
//           </ConfigProvider>
//         </Web3ProviderNetwork>
//       </Web3ReactProvider>
//     </div>
//   );
// }

// export default App;

