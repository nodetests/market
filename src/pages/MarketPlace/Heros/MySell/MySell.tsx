import React, { useState } from "react"
import { message, Popconfirm, Progress } from "antd"
import PaginationComponent from '../../component/PaginationComponent'
import styles from '../css/heroCard.module.less'

import { WalletManager } from '@/utils/walletManager'
import { getQualityImage, getHeroImage } from '@/utils/markPlace/hero'
import { getAttribute } from "@/utils/markPlace/attribute"
import {pressData} from '@/utils/markPlace/pressData'
import { Wallet } from "@/utils/types"
import { lvPress } from "@/utils/markPlace/lvPress"
interface MysellType{
  nftData: [] | any
  setNftData:any
  paginations:any
  setPaginations:any
  currentAccount:string
}

function MySell(prop: MysellType) {
    const { nftData,setNftData, paginations, setPaginations } = prop
    const [confirmButton,setConfirmButton] = useState<string>('')
    const [confirmLoading,setConfirmLoading] = useState<boolean>(false)
   
  const confirmHandler =(val:any) =>{
    setConfirmLoading(true);
    WalletManager.instance.cancelListing(false, val.token.identifier, (err: Error, data: Wallet) => {
        if(err){
            message.error('cancelListing faied')
            setConfirmButton('');
            setConfirmLoading(false);
            return false
        }
        if(data){
            let arr:any =  nftData.filter((nftDataItem:any) => nftDataItem.token.identifier !== val.token.identifier)
            setNftData(arr)
            if(paginations.current*paginations.pageSize %arr.length ===0){
              setPaginations({
                ...paginations,
                current:paginations.current - 1 || 1,
              })
            }
            setPaginations({
              ...paginations,
              total:paginations.total - 1,
            })
            message.success('cancelListing success')
            setConfirmButton('');
            setConfirmLoading(false);
        }
    })
  }
    
   return (
  
    <div className={styles.nftContain}>
    <div className={styles.cardsContion}>
      <div className={styles.gridContain}>
        {nftData&&nftData.length > 0 && (
          pressData(nftData,paginations.current,paginations.pageSize).map((item: any, index: any) => (
            <div key={index} className={styles.cardItem}>
              <div className={styles.cardsContent}>
                {item.token && (
                  <div className={styles.nftCard}>
                    <div className={styles.nftHeader} style={{ backgroundImage: `url(${getHeroImage(item.Name)})` }} >
                      <div className={[styles.nftHeaderId,styles[`nftId_${getQualityImage(item?.Qualitity)}`]].join(' ')}>#{item.token.identifier}</div>
                    </div>
                    <div className={[styles.nftFooter, styles[`nftAttr_${getQualityImage(item?.Qualitity)}`]].join(' ')}>
                    <div className={styles.nftName}>
                        <div className={styles[`nftNameContent_${getQualityImage(item?.Qualitity)}`]}>
                          <div>{item.Name}</div>
                        </div>
                      </div>
                      <div className={styles.nftLv}>
                        <div className={styles.nftLvContain}>
                          <div className={styles.nftLvText}>
                            lv<span style={{fontSize:'14px'}}>{item.Level}</span> 
                          </div>
                          <div className={styles.nftLvProcess}>
                            <Progress strokeColor="#ccc" width={100} percent={lvPress(item.Level,item.Exp)} format={(val) => `${val}%`} size="small" />
                          </div>
                        </div>
                      </div>
                      <div className={styles.nftAttribute}>
                        <div className={styles.nftAttributeContent}>
                          <div className={styles.nftAttributeItem} style={{ color: '#ff7d85' }}>
                            <div style={{ width: '100%' }}>
                              <img src={getAttribute("AT")} alt="" /> AT {item.Ap}
                            </div>
                          </div>
                          <div className={styles.nftAttributeItem} style={{ color: '#fc9e10' }}>
                            <div style={{ width: '100%' }}>
                              <img src={getAttribute("DE")} alt="" /> DE {item.Def}
                            </div>
                          </div>
                          <div className={styles.nftAttributeItem} style={{ color: '#bfa4ff' }}>
                            <div style={{ width: '100%' }}>
                              <img src={getAttribute("LU")} alt="" /> LU {item.Luck}
                            </div>
                          </div>
                          <div className={styles.nftAttributeItem} style={{ color: '#52ff4c' }}>
                            <div style={{ width: '100%' }}>
                              <img src={getAttribute("HP")} alt="" /> HP {item.HpMAX}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.nftCardBottom}>
                        <div className={styles.nftPrice} >
                          <div className={styles.nftPriceContent} >
                            <Popconfirm
                              title="sure to cancelListing?"
                              visible={item?.token.identifier === confirmButton}
                              onConfirm={() =>{confirmHandler(item) }}
                              okButtonProps={{ loading: confirmLoading }}
                              onCancel={() =>{
                                setConfirmButton('');
                              }}
                            >
                              <div 
                                style={{width:'100%',height:'50px',lineHeight:'50px'}} 
                                onClick={(e)=>{
                                e.stopPropagation()
                                e.preventDefault()
                                setConfirmButton(item.token.identifier)}
                                }>
                                下架
                              </div>
                            </Popconfirm>
                          </div>
                        </div>
                        </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))
        )}

      </div>
      <PaginationComponent paginations ={paginations}  type="Heros" />
    </div>
  </div>
  )
}
export default React.memo(MySell)
