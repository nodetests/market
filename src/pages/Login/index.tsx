import { Button } from "antd";
// import { useState } from "react";
import intl from 'react-intl-universal';
const Login = (props:any) => {
  // const [isConnecting, setIsConnecting] = useState(false);
  // const detectProvider = () => {
  //   let provider;
  //   if (window.ethereum) {
  //     provider = window.ethereum;
  //   } else if (window.web3) {
  //     provider = window.web3.currentProvider;
  //   } else {
  //     window.alert("No Ethereum browser detected! Check out MetaMask");
  //   }
  //   return provider;
  // };

  const onLoginHandler = async () => {
    let windows:any = window
    let provider;
    if (windows.ethereum) {
      provider = windows.ethereum;
    } else if (windows.web3) {
      provider = windows.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    if (provider) {
      if (provider !== windows.ethereum) {
        window.alert("Not window.ethereum provider. Do you have multiple wallet installed ?");
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed ?"
        );
      }
      // setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });
      // setIsConnecting(false);
    }
    props.onLogin(provider);
  };

  return (
      <div>
        <Button onClick={onLoginHandler} >{intl.get('linkWallet')}</Button> 
          {/* <i onClick={onLoginHandler} className={styles.iconfont2}>&#xe613;</i> */}
      </div>
  
  );
};

export default Login;
