import React, { useState } from "react"
import styles from '../css/materialCard.module.less'

// BNB
import bnbUrl from '@/asset/img/markPlace/bnb.png'
import { Divider, InputNumber, message, Modal } from "antd"
import { WalletManager } from "@/utils/walletManager"
import { Wallet } from "@/utils/types"
import { getMaterialImg } from '@/utils/markPlace/material';
import { getEquipBgImage } from '@/utils/markPlace/equip'
import PaginationComponent from "../../component/PaginationComponent"

function MaterialMarket(prop: any) {
  // nowMarkStatus
  const { materialData, setMaterialData, paginations, setPaginations } = prop
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [nowInShop, setNowInShop] = useState<any>(null)
  const [nowNum, setNowNum] = useState<number>(0)

  const cardHandler = (val: any) => {
    setNowInShop(val)
    setIsModalVisible(true)
  }

  const buyMaterial = () => {
    // console.log(nowInShop.orderId, nowNum, nowNum*nowInShop.price,);
    if (nowNum > 0) {
      WalletManager.instance.purchaseListing1155(nowInShop.orderId, nowNum, `${nowNum * nowInShop.price}`, (err: Error, data: Wallet) => {
        if (err) {
          message.warn('Buy Failed')
          console.log(err);
        }
        if (data) {
          console.log("data", data);
          message.success('Buy Success')
          let arr = materialData
          const nowItem = arr.filter((item: any) => item.orderId === nowInShop.orderId)
          if (nowItem[0].amount - nowNum > 0) {
            arr = arr.map((item: any) => {
              if (item.orderId === nowInShop.orderId) {
                item.amount = item.amount - nowNum
              }
              return item
            })
          } else {
            arr = arr.filter((item: any) => item.orderId !== nowInShop.orderId)
          }
          if(paginations.current*paginations.pageSize %arr.length ===0){
            setPaginations({
              ...paginations,
              current:paginations.current - 1 || 1,
            })
          }
          setMaterialData(arr)
          setNowNum(0)
          setIsModalVisible(false)
          setNowInShop(null)
        }
      })
    } else {
      message.warn(`num cann't less 0`)
    }

  }
  const modalCancel = () => {
    setIsModalVisible(false)
    setNowInShop(null)
  }
  const reduceOne = () => {
    let num: number = nowNum - 1
    num = num <= 0 ? 0 : num
    if (num > nowInShop.amount) {
      num = nowInShop.amount
    }
    setNowNum(num)
  }
  const reduceTen = () => {
    let num: number = nowNum - 10
    num = num <= 0 ? 0 : num
    if (num > nowInShop.amount) {
      num = nowInShop.amount
    }
    setNowNum(num)
  }
  const addOne = () => {
    let num: number = nowNum + 1
    num = num <= 0 ? 0 : num
    if (num > nowInShop.amount) {
      num = nowInShop.amount
    }
    setNowNum(num)
  }
  const addTen = () => {
    let num: number = nowNum + 10
    num = num <= 0 ? 0 : num
    if (num > nowInShop.amount) {
      num = nowInShop.amount
    }
    setNowNum(num)
  }

  const InputChange = (val: number) => {
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
          {materialData && materialData.length > 0 && (
            materialData.map((item: any, index: any) => (
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
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <PaginationComponent type="material" paginations={paginations} />
        </div>
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
          {nowInShop && nowInShop.price && (
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
                          <span className={styles.BurOrSellNumText}>出售数量: </span>
                          <span className={styles.BurOrSellNumNum}>{nowInShop.amount}</span>
                        </div>

                        <div className={styles.nftPrice}>
                            <img src={bnbUrl} alt="" />
                            <span>单价：</span>
                            <span className={styles.priceNum}>{nowInShop.price} </span>
                            <span  className={styles.priceText}>BNB</span>
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
                      <div className={styles.buyTitle}>数量</div>
                      <div className={styles.buyNum}>
                        <div className={styles.changeStep} onClick={reduceTen}>-10</div>
                        <div className={styles.changeStep} onClick={reduceOne}>-1</div>
                        <InputNumber parser={(text: any) => /^\d+$/.test(text) ? text : 0} onChange={(val: number) => { InputChange(val) }} value={nowNum} />
                        <div className={styles.changeStep} onClick={addOne}>+1</div>
                        <div className={styles.changeStep} onClick={addTen}>+10</div>
                      </div>
                      <Divider className={styles.floorLine} />
                      <div className={styles.buyTitle}>单价：{nowInShop.price} </div>
                      <Divider className={styles.floorLine} />
                      <div className={styles.text}>总计</div>
                      <div className={styles.price}>
                        <img src={bnbUrl} alt="" />
                        <span>单价：</span>
                        <span>{nowNum * nowInShop.price}</span>
                        <span> BNB</span>
                      </div>
                      <div className={styles.sureSell}>
                        <div onClick={() => { buyMaterial() }}>
                          购买
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
export default React.memo(MaterialMarket)
