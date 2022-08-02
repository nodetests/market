/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { InputNumber, message, Modal } from "antd"
import styles from '../css/materialCard.module.less'
import { WalletManager } from '@/utils/walletManager'
import { Wallet } from "@/utils/types"
import { getMaterialImg } from "@/utils/markPlace/material"
import { getEquipBgImage } from '@/utils/markPlace/equip'
// BNB
import bnbUrl from '@/asset/img/markPlace/bnb.png'
import PaginationComponent from "../../component/PaginationComponent"
import { pressData } from "@/utils/markPlace/pressData"
// import { C } from "@/layout/BaseLayout"

function MyMaterial(prop: any) {
 
  const { materialData, currentAccount, setMaterialData, paginations, setPaginations, nowMaterialStatus } = prop
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [nowInShop, setNowInShop] = useState<any>()
  const [buttonText, setButtonText] = useState<string>('')
  const [nowPrice, setNowPrice] = useState<any>()
  const [nowNum, setNowNum] = useState<number>(0)


  const oldList = localStorage.getItem('materialAuth') || null
  const newList = oldList ? JSON.parse(oldList) : null

  useEffect(() => {
    if (newList && newList[currentAccount]) {
      setButtonText('Sell')
    } else {
      setButtonText('Approve')
    }
  }, [nowMaterialStatus])

  // 点击卡片的回调
  const cardHandler = (val: any) => {
    setNowInShop(val)
    setIsModalVisible(true)
  }

  // 授权或出售
  const sellMaterial = () => {
    if (buttonText === "Approve") {
      WalletManager.instance.approveAllKsMaterial( (err: Error, data: Wallet) => {
        if (err) {
          console.log(err);
          
          message.warn('Authorization failure')
        }
        if (data) {
          if (newList) {
            const obj = newList
            obj[currentAccount] = true
            localStorage.setItem('materialAuth', JSON.stringify(obj))
          } else {
            const obj: any = {}
            obj[currentAccount] = true
            localStorage.setItem('materialAuth', JSON.stringify(obj))
          }
          message.success('Authorization success')
          setButtonText('Sell')
        }
      })
    } else {
      if (nowPrice>0&&nowNum>0) {
      // nftId: string,
      // listPrice: number,
      // amount: number,
      // callback: any
        WalletManager.instance.addListing1155(nowInShop.token.identifier, nowPrice,nowNum, (err: Error, data: Wallet) => {
          if (err) {
            if (err.message === 'not connected!') {
              message.warn('Please link your wallet first')
            } else {
              message.error('Contact technical personnel to repair the fault')
            }
          }
          if (data) {
            message.success('Sell successs')
            let arr = materialData
            let nowItem = arr.filter((item: any) => item.token.identifier === nowInShop.token.identifier)
            if(Number(nowItem[0].valueExact) - nowNum >0){
              arr = arr.map((item: any) => {
                if(item.token.identifier === nowInShop.token.identifier){
                  item.valueExact =`${Number(item.valueExact) - nowNum}`
                }
                return item
              })
            }else{
              arr = arr.filter((item:any) => item.token.identifier !== nowInShop.token.identifier)
            }
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
            setMaterialData(arr)
            setNowPrice(null)
            setNowNum(0)
            setIsModalVisible(false)
          }
        })
      } else {
        message.warn('Please enter price or num')
      }
    }
  }
  // 隐藏弹框
  const modalCancel = () => {
    setIsModalVisible(false)
    setNowInShop(null)
  }
  const priceChange = (val:number) =>{
    setNowPrice(val)
  }
  const reduceOne = () => {
    let num: number = nowNum - 1
    num =num<=0?0:num
    if (num > nowInShop.valueExact) {
      num = nowInShop.valueExact
    }
    setNowNum(num)
  }
  const reduceTen = () => {
    let num: number = nowNum - 10
    num =num<=0?0:num
    if (num > nowInShop.valueExact) {
      num = nowInShop.valueExact
    }
    setNowNum(num)
  }
  const addOne = () => {
    let num: number = nowNum + 1
    num =num<=0?0:num
    if (num > nowInShop.valueExact) {
      num = nowInShop.valueExact
    }
    setNowNum(num)
  }
  const addTen = () => {
    let num: number = nowNum + 10
    num =num<=0?0:num
    if (num > nowInShop.valueExact) {
      num = nowInShop.valueExact
    }
    setNowNum(num)
  }

  const InputChange =(val:number) =>{
    let num = val
    num = num <= 0 ? 0 : num
    if (num > nowInShop.amount) {
     num = nowInShop.amount
   }
   setNowNum(num)
  }

  return (
    <div className={styles.nftContain}>
      <div className={styles.cardsContion}>
        <div className={styles.gridContain}>
          {materialData&&materialData.length > 0 && (
             pressData(materialData,paginations.current,paginations.pageSize).map((item: any, index: any) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardsContent}>
                <div
                    className={styles.nftCard}
                    onClick={() => { cardHandler(item) }}
                    style={{ backgroundImage: `url(${getEquipBgImage("2")})` }}
                  >
                    <div className={styles.nftHeader} style={{ backgroundImage: `url(${getMaterialImg("Lstar")})` }} />
                    <div className={styles.nftFooter}>
                      <div  className={styles.nftFooterContent}>
                        <div className={styles.BurOrSellNum}>
                          <span className={styles.BurOrSellNumText}>拥有数量: </span>
                          <span className={styles.BurOrSellNumNum}>{item.valueExact}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.abstract}>
                          道具：英雄升星必备神石
                        </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <PaginationComponent type="material"  paginations={paginations}/>
      </div>

      <div className={styles.sellContian}>
        {/* Sell */}
        <Modal
          className={styles.sellContian}
          width={'40rem'}
          footer={null}
          onCancel={() => { modalCancel() }}
          visible={isModalVisible}
          cancelText="Exit"
        >
          {nowInShop&&nowInShop.valueExact&&(
              <div className={styles.myNft}>
              <div className={styles.myNftTop}>
                <div>购买</div>
              </div>
              <div className={styles.myNftBottom}>
                <div className={styles.myNftBottomContent}>
                  <div className={styles.myNftLeft} style={{ cursor: 'pointer' }}>
                  <div
                    className={styles.nftCard}
                    onClick={() => { cardHandler(nowInShop) }}
                    style={{ backgroundImage: `url(${getEquipBgImage("2")})` }}
                  >
                    <div className={styles.nftHeader} style={{ backgroundImage: `url(${getMaterialImg("Lstar")})` }} />
                    <div className={styles.nftFooter}>
                      <div  className={styles.nftFooterContent}>
                        <div className={styles.BurOrSellNum}>
                          <span className={styles.BurOrSellNumText}>拥有数量: </span>
                          <span className={styles.BurOrSellNumNum}>{nowInShop.valueExact}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.abstract}>
                          道具：英雄升星必备神石
                        </div>
                  </div>
                  </div>
                  <div className={styles.myNftRight}>
                    <div className={styles.myNftRightContain}>
                      {/* numTitle */}
                      <div className={styles.buyTitle}>  <span>数量</span> </div>
                      {/* num */}
                      <div className={styles.buyNum}>
                        <div className={styles.changeStep} onClick={reduceTen}>-10</div>
                        <div className={styles.changeStep} onClick={reduceOne}>-1</div>
                        <InputNumber min={1}  parser={(text:any)=>/^\d+$/.test(text)?text:0}  onChange={(val: number) => { InputChange(val)}} value={nowNum} />
                        <div className={styles.changeStep} onClick={addOne}>+1</div>
                        <div className={styles.changeStep} onClick={addTen}>+10</div>
                      </div>
                   
                      {/* price */}
                      <div className={styles.buyPrice}>
                        <div className={styles.buyTitle}> 单价</div>
                        <div className={styles.buyPriceContain}>
                        <InputNumber style={{width:'96%'}}  onChange={(val:number) =>{priceChange(val)}} value={nowPrice} />
                        </div>
                      </div>
                   
                      {/* sum */}
                      <div className={styles.buyTitle}>总计</div>
                      <div className={styles.price}>
                        <img src={bnbUrl} alt="" />
                        <span>{nowPrice*nowNum || 0}</span>
                        <span> BNB</span>
                      </div>
                      <div className={styles.sureSell}>
                        <div onClick={() => { sellMaterial() }}>
                          {buttonText}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        

        </Modal>
      </div>
    </div>

  )
}
export default React.memo(MyMaterial)