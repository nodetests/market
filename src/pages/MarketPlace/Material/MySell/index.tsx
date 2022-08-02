import React, { useRef, useState } from "react"
import { message, Popconfirm } from "antd"
import styles from '../css/materialCard.module.less'
import useIntersectionObserver from '@/hooks/imgLazy'
import bnbUrl from '@/asset/img/markPlace/bnb.png'
import { WalletManager } from '@/utils/walletManager'

import { getEquipBgImage } from '@/utils/markPlace/equip'
import { Wallet } from "@/utils/types"
import { getMaterialImg } from "@/utils/markPlace/material"
import { pressData } from "@/utils/markPlace/pressData"
import PaginationComponent from './../../component/PaginationComponent/index';

function MySell(prop: any) {
  const { materialData, setMaterialData,paginations,setPaginations } = prop
  const [confirmButton, setConfirmButton] = useState<string>('')
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const domRef = useRef<any>([])

  useIntersectionObserver(domRef.current, [0.5])

  const confirmHandel = (val: any) => {
    setConfirmLoading(true);
    WalletManager.instance.cancelListing1155( val.orderId, (err: Error, data: Wallet) => {
      if (err) {
        message.error('cancelListing faied')
        setConfirmButton('');
        setConfirmLoading(false);
        return false
      }
      if (data) {
        let arr: any = materialData.filter((catDataItem: any) => catDataItem.orderId !== val.orderId)
        setMaterialData(arr)
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
  
  const confirmCancel = () => {
    setConfirmButton('');
    setConfirmLoading(false);
  }

  return (

    <div className={styles.nftContain}>
      <div className={styles.cardsContion}>
        <div className={styles.gridContain}>
          {materialData && materialData.length > 0 && (
             pressData(materialData,paginations.current,paginations.pageSize).map((item: any, index: any) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardsContent}>
                  {item && item.amount && (
                      <div
                      className={styles.nftCard}
                      style={{ backgroundImage: `url(${getEquipBgImage("2")})` }}
                    >
                      <div className={styles.nftHeader} style={{ backgroundImage: `url(${getMaterialImg("Lstar")})` }} />
                      <div className={styles.nftFooter}>
                        <div  className={styles.nftFooterContent}>
                          <div className={styles.BurOrSellNum}>
                            <span className={styles.BurOrSellNumText}>出售数量: </span>
                            <span className={styles.BurOrSellNumNum}>{item.amount}</span>
                          </div>
  
                          <div className={styles.nftPrice}>
                              <img src={bnbUrl} alt="" />
                              <span>单价：</span>
                              <span className={styles.priceNum}>{item.price} </span>
                              <span  className={styles.priceText}>BNB</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.abstract}>
                            道具：英雄升星必备神石
                          </div>
                      <div className ={styles.nftCardBottom}>
                        <Popconfirm
                          title="sure to cancelListing?"
                          visible={item?.orderId === confirmButton}
                          onConfirm={() => {confirmHandel(item)}}
                          okButtonProps={{ loading: confirmLoading }}
                          onCancel={() => {confirmCancel()}}
                        >
                          <div
                            style={{ width: '100%', height: '50px', lineHeight: '50px' }}
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              setConfirmButton(item.orderId)
                            }
                            }>
                            下架
                          </div>
                        </Popconfirm>
                      </div>
                    </div>
                     
                   
                  )}

                </div>
              </div>
            ))
          )}

        </div>
        <div>
         < PaginationComponent type="material" paginations={paginations} />
        </div>
      </div>
    </div>
  )
}
export default React.memo(MySell)
