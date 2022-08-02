import React, { useRef, useState } from "react"
import styles from '../css/equipCard.module.less'
import { getEquipImage,getEquipBgImage } from '@/utils/markPlace/equip'
import { getQualityImage } from "@/utils/markPlace/hero"
import { getAttribute } from '@/utils/markPlace/attribute'
import useIntersectionObserver from '@/hooks/imgLazy'

// BNB
import bnbUrl from '@/asset/img/markPlace/bnb.png'
import { message, Modal } from "antd"
import { WalletManager } from "@/utils/walletManager"
import { Wallet } from "@/utils/types"
import PaginationComponent from "../../component/PaginationComponent"


function EquipMarket(prop: any) {
  const { equipData, setEquipData, paginations, setPaginations } = prop
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [nowInShop, setNowInShop] = useState<any>(null)
  const domRef = useRef<any>([])

  useIntersectionObserver(domRef.current, [0.5])


  const cardHandler = (val: any) => {
    setNowInShop(val)
    setIsModalVisible(true)
  }

  const buyEquip = () => {
    console.log(nowInShop.token.identifier, nowInShop.price);
    
    WalletManager.instance.purchaseListing(true, nowInShop.token.identifier, nowInShop.price, (err: Error, data: Wallet) => {
      if (err) {
        message.warn('Buy Failed')
        console.log(err);
      }
      if (data) {
        message.success('Buy Success')
        let arr =equipData
        arr = arr.filter((item:any) =>{return item.token.identifier !== nowInShop.token.identifier})
        setEquipData(arr)
        if(paginations.current*paginations.pageSize %arr.length ===0){
          setPaginations({
            ...paginations,
            current:paginations.current - 1 || 1,
          })
        }
        setIsModalVisible(false)
        setNowInShop(null)
      }
    })
  }
  const modalCancel = () => {
    setIsModalVisible(false)
    setNowInShop(null)
  }

  return (
    <div className={styles.nftContain}>
      <div className={styles.cardsContion}>
        <div className={styles.gridContain}>
          {equipData && equipData.length > 0 && (
            equipData.map((item: any, index: any) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardsContent}>
                  {item.Name && (
                    <div className={styles.nftCard} onClick={() => { cardHandler(item) }}  style={{backgroundImage:`url(${getEquipBgImage(item?.Star)})`}}>
                      <div className={styles.nftHeader} style={{ backgroundImage: `url(${getEquipImage(item.Name)})` }} />
                      <div className={[styles.nftFooter].join(' ')}>
                        <div className={styles.nftName}>
                          <div className={styles[`nftNameContent_${getQualityImage(item?.Qualitity)}`]}>
                            <span>lv{item.lv}</span>
                            <span>{item.Name}</span>
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
                              <img src={getAttribute("HP")} alt="" /> HP {item.Hp}
                            </div>
                          </div>
                        </div>
                        </div>
                        <div className={styles.nftCardBottom}>
                          <div className={styles.nftPrice}>
                            <div className={styles.nftPriceContent}>
                              <img src={bnbUrl} alt="" />
                              <span>{item.price} </span>
                              <span>BNB</span>
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
        <PaginationComponent paginations ={paginations} type="Equips" />
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
          {nowInShop && (
            <div className={styles.myNft}>
              <div className={styles.myNftTop}>
                <div>购买</div>
              </div>
              <div className={styles.myNftBottom}>
                <div className={styles.myNftBottomContent}>
                  <div className={styles.myNftLeft}>
                    <div className={styles.nftCard} style={{backgroundImage:`url(${getEquipBgImage(nowInShop?.Star)})`}}>
                      <div className={styles.nftHeader} style={{ backgroundImage: `url(${getEquipImage(nowInShop.Name)})` }} />
                      {/* styles[`nftAttr_${getQualityImage(nowInShop.Star)}`] */}
                      <div className={[styles.nftFooter].join(' ')} >
                        <div className={styles.nftName}>  
                          <div className={[nowInShop.Star === 1 ? styles.nftNameContent_R : nowInShop.Star === 2 ? styles.nftNameContent_SR : styles.nftNameContent_SSR].join(' ')}>
                            <span>lv{nowInShop.lv}</span>
                            <span>{nowInShop.Name}</span>
                          </div>
                        </div>
                        <div className={styles.nftAttribute}>
                          <div className={styles.nftAttributeContent}>
                            <div className={styles.nftAttributeItem} style={{ color: '#ff7d85' }}><img src={getAttribute("AT")} alt="" /> AT {nowInShop.Ap}</div>
                            <div className={styles.nftAttributeItem} style={{ color: '#fc9e10' }}><img src={getAttribute("DE")} alt="" /> DE {nowInShop.Def}</div>
                            <div className={styles.nftAttributeItem} style={{ color: '#bfa4ff' }}><img src={getAttribute("LU")} alt="" /> LU {nowInShop.Luck}</div>
                            <div className={styles.nftAttributeItem} style={{ color: '#52ff4c' }}><img src={getAttribute("HP")} alt="" /> HP {nowInShop.Hp}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.myNftRight}>
                    <div className={styles.myNftRightContain}>
                      <div className={styles.text}>购买价格</div>
                      <div className={styles.price}>
                        <div>
                          <img src={bnbUrl} alt="" />
                          <span>{nowInShop.price}</span>
                          <span> BNB</span>
                        </div>
                      </div>
                      <div className={styles.sureSell}>
                        <div onClick={() => { buyEquip() }}>
                          Buy
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
export default React.memo(EquipMarket)
