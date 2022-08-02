/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, createContext } from 'react'
import { Button, message, Modal } from 'antd'
import { ExclamationOutlined } from '@ant-design/icons'

import styles from './index.module.less'

import { WalletManager, } from '../utils/walletManager'
import { Wallet } from '../utils/types'
import { Spin } from 'antd';

import { getHttpData } from '@/api'
import { GetNetworkConfig } from '@/utils/contractConfig'
import { gql } from 'graphql-request'
import PublicHeader from './component/publicHeader'

const NetworkConfig = GetNetworkConfig()
export const CText = createContext<string | null | any>(null)

function BaseLayout(props: any) {
  const { children } = props
  const [linkSpinning, setLinkSpinning] = useState(false)
  // 是否链接
  const [isConnected, setIsConnected] = useState<any>(false)
  const [isSpin, setIsSpin] = useState<any>(false)
  const [currentAccount, setCurrentAccount] = useState<any>(null)
  const [windowWidth, setWindowWidth] = useState(0);

  // 错误原因
  const [errorText, setErrorTest] = useState("please connect wallect")

  // let walletAccount: any = localStorage.getItem('walletAccount')
  // const newWalletAccount = walletAccount ? JSON.parse(walletAccount) : ''

  useEffect(() => {
    // nft auth
    if (currentAccount) {
      const oldList = localStorage.getItem('nftAuth') || null
      const newList = oldList ? JSON.parse(oldList) : null
      if (!newList || !newList[currentAccount]) {
        lookNftProAuthorized().then((res) => {
          if (res && res.ksnftoperators.length > 0) {
            let obj: any = {}
            obj[currentAccount] = true
            localStorage.setItem('nftAuth', JSON.stringify(obj))
          }
        })
      }
    }
    // equip auth
    if (currentAccount) {

      const oldList = localStorage.getItem('equipAuth') || null
      const newList = oldList ? JSON.parse(oldList) : null

      if (!newList || !newList[currentAccount]) {
        lookEquipProAuthorized().then((res) => {
          // console.log("equip重新查询", res);

          if (res && res.ksequipoperators.length > 0) {


            let obj: any = {}
            obj[currentAccount] = true
            localStorage.setItem('equipAuth', JSON.stringify(obj))
          } else {
            // console.log(res);
          }
        })
      }
    }

    // material auth
    if (currentAccount) {

      const oldList = localStorage.getItem('materialAuth') || null
      const newList = oldList ? JSON.parse(oldList) : null

      if (!newList || !newList[currentAccount]) {
        lookMaterialProAuthorized().then((res) => {
          // console.log("material重新查询", res);
          if (res && res.ksmoperators.length > 0) {
            let obj: any = {}
            obj[currentAccount] = true
            localStorage.setItem('materialAuth', JSON.stringify(obj))
          } else {
            // console.log(res);
          }
        })
      }
    }
  }, [currentAccount])

  // hero
  const lookNftProAuthorized = () => {
    const sql = gql`query{
      ksnftoperators(where:{owner:"${currentAccount.toLowerCase()}", operator:"${NetworkConfig.KSMarket.toLowerCase()}", approved:true}) {
        id
        approved
      }
    }
    `
    return getHttpData(sql)
  }
  // equip
  const lookEquipProAuthorized = () => {
    const sql = gql`query{
      ksequipoperators(where:{owner:"${currentAccount.toLowerCase()}", operator:"${NetworkConfig.KSMarket.toLowerCase()}", approved:true}) {
        id
        approved
      }
    }
    `
    return getHttpData(sql)
  }
  //  meterial
  const lookMaterialProAuthorized = () => {
    const sql = gql`query{
      ksmoperators(where:{owner:"${currentAccount.toLowerCase()}", operator:"${NetworkConfig.KSMaterial.toLowerCase()}", approved:true}) {
        id
        approved
      }
    }`
    return getHttpData(sql)
  }

  // listen  account's change  
  let emitter = WalletManager.instance.eimiier
  emitter.on("accountsChanged", (accounts: any) => {
    window.location.reload()
    connectWallet(false)
  })

  // listen  newwork's  change  
  emitter.on("chainChanged", (accounts: any) => {
    connectWallet(false)
  })

  emitter.on('disconnect', (error: any) => {
    // message.warn('Disconnect the current network connection and switch to another network...')
  })

  useEffect(() =>{
    console.log("currentAccount:",currentAccount);
    
  },[currentAccount])
  const onSwitchNetwork = ()=>{
    setIsSpin(true)
    WalletManager.instance.trySwitchNetwork().then((res: any) => {
      setIsSpin(false)
      message.success('Switch Success')
    }).catch((err: any) => {
      setIsSpin(false)
      message.success('Switch Failed')
    })
  }

  // Connect wallect
  const connectWallet = function (requestLogin: boolean) {
    setLinkSpinning(true)
    setIsSpin(false)

    // Get account message
    WalletManager.instance.getWallet(false, (err: Error, data: Wallet) => {
      if (err) {
        localStorage.setItem('walletAccount', '')
        setLinkSpinning(false)
        return
      }

      if (data) {
        setLinkSpinning(false)
        if (`${data.chainId}` !== `${NetworkConfig.ChainId}`) {
          setErrorTest("Wrong chainId")
          setIsSpin(true)
          return
        }
        setCurrentAccount(data.address)
        localStorage.setItem('walletAccount', JSON.stringify(data))
        setIsConnected(true)
      } else {
      
        // setCurrentAccount('')
        setLinkSpinning(false)
        setIsConnected(false)
      }
    })
  }

  //页面首次进入先设置当前宽度加判断 
  const resizeUpdate = (e: any) => {
    // 通过事件对象获取浏览器窗口的高度
    let w = e.target.innerWidth;
    setWindowWidth(w);
  };

  useEffect(() => {
    connectWallet(false)
  }, [])
  //页面首次进入先设置当前宽度加判断 
  useEffect(() => {
    let w = window.innerWidth;
    setWindowWidth(w)
    // 页面变化时获取浏览器窗口的大小 
    window.addEventListener('resize', resizeUpdate);
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate);
    }
  }, [])

  return (
    <div className={styles.contains}>
      <Spin spinning={linkSpinning}>
        <div className={styles.headerContain} >
          <PublicHeader
            currentAccount={currentAccount}
            isConnected={isConnected}
            connectWallet={connectWallet}
            windowWidth={windowWidth}
          ></PublicHeader>
        </div>
        {currentAccount ? (
          <div className={styles.mainContent} style={{ overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#191b49' }}>
            <CText.Provider value={{ currentAccount: currentAccount,windowWidth:windowWidth }}>
              {children}
            </CText.Provider>
          </div>
        ) : (
          <div>{errorText}</div>
        )}

      </Spin>

      <Modal visible={isSpin} footer={null} onCancel={()=>{ setIsSpin(false) }}>
        <div style={{ fontSize: '1rem', color: '#f50', textAlign: 'center' }}>
          <span> NewWork Error</span><ExclamationOutlined /> 
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <span></span>
          <Button
            type="ghost"
            onClick={onSwitchNetwork}>Switch</Button>
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(BaseLayout)
