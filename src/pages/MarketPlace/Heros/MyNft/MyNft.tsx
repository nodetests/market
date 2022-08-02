/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react"
import { InputNumber, message, Modal, Progress } from "antd"
import styles from '../css/heroCard.module.less'
import useIntersectionObserver from '@/hooks/imgLazy'
import { WalletManager } from '@/utils/walletManager'
import { Wallet } from "@/utils/types"
import { getQualityImage, getHeroImage } from '@/utils/markPlace/hero'
import { getAttribute } from "@/utils/markPlace/attribute"
import { pressData } from '@/utils/markPlace/pressData'
import PaginationComponent from "../../component/PaginationComponent"
// BNB
import bnbUrl from '@/asset/img/markPlace/bnb.png'
import { lvPress } from "@/utils/markPlace/lvPress"
interface myNftType {
  nftData: [] | any
  currentAccount: string
  setNftData: any
  paginations: any
  setPaginations: any
  nowMarkStatus: string
}
function MyNft(prop: myNftType) {
  const { nftData, currentAccount, setNftData, paginations, nowMarkStatus, setPaginations } = prop
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [nowInShop, setNowInShop] = useState<any>()
  const [buttonText, setButtonText] = useState<string>('')
  const domRef = useRef<any>([])
  const [nowPrice, setNowPrice] = useState<any>()

  useIntersectionObserver(domRef.current, [0.5])
  const oldList = localStorage.getItem('nftAuth') || null
  const newList = oldList ? JSON.parse(oldList) : null

  useEffect(() => {
    if (newList && newList[currentAccount]) {
      setButtonText('Sell')
    } else {
      setButtonText('Approve')
    }
  }, [nowMarkStatus])

  // 点击卡片的回调
  const cardHandler = (val: any) => {
    setNowInShop(val)
    setIsModalVisible(true)
  }
  //  模态框隐藏回调
  const modalCancel = () => {
    setIsModalVisible(false)
    setNowPrice(null)
  }
  // 授权或出售
  const isAuthOrSell = () => {
    if (buttonText === "Approve") {
      WalletManager.instance.approveAllKsNft(false, (err: Error, data: Wallet) => {
        if (err) {
          message.warn('Authorization failure')
        }
        if (data) {
          if (newList) {
            const obj = newList
            obj[currentAccount] = true
            localStorage.setItem('nftAuth', JSON.stringify(obj))
          } else {
            const obj: any = {}
            obj[currentAccount] = true
            localStorage.setItem('nftAuth', JSON.stringify(obj))
          }
          message.success('Authorization success')
          setButtonText('Sell')
        }
      })
    } else {
      if (nowPrice) {
        WalletManager.instance.addListing(false, nowInShop.identifier, nowPrice, (err: Error, data: Wallet) => {
          if (err) {
            if (err.message === 'not connected!') {
              message.warn('Please link your wallet first')
            } else {
              message.error('Contact technical personnel to repair the fault')
            }
          }
          if (data) {
            message.success('Sell successs')
            let arr = nftData.filter((item: any) => item.identifier !== nowInShop.identifier)
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
            setNftData(arr)
            setIsModalVisible(false)
            setNowPrice(null)
          }
        })
      } else {
        message.warn('Please enter price')
      }
    }
  }


  return (
    <div className={styles.nftContain}>
      <div className={styles.cardsContion}>
        <div className={styles.gridContain}>
          {nftData && nftData.length > 0 && (
            pressData(nftData, paginations.current, paginations.pageSize).map((item: any, index: any) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardsContent}>
                  {item.attr && (
                    <div
                      className={styles.nftCard}
                      onClick={() => { cardHandler(item) }}
                    >
                      <div className={styles.nftHeader} style={{ backgroundImage: `url(${getHeroImage(item.attr[0]?.Name)})` }} >
                        <div className={[styles.nftHeaderId, styles[`nftId_${getQualityImage(item.attr[0]?.Qualitity)}`]].join(' ')}>#{item.identifier || ''}</div>
                      </div>
                      <div className={[styles.nftFooter, styles[`nftAttr_${getQualityImage(item.attr[0]?.Qualitity)}`]].join(' ')}>
                        <div className={styles.nftName}>
                          <div className={styles[`nftNameContent_${getQualityImage(item?.Qualitity)}`]}>
                            <div>{item.attr[0]?.Name}</div>
                          </div>
                        </div>
                        <div className={styles.nftLv}>
                          <div className={styles.nftLvContain}>
                            <div className={styles.nftLvText}>
                              lv<span style={{ fontSize: '14px' }}>{item.attr[0]?.Level}</span>
                            </div>
                            <div className={styles.nftLvProcess}>
                              <Progress strokeColor="#ccc" width={100} percent={lvPress(item.attr[0]?.Level, item.attr[0]?.Exp)} format={(val) => `${val}%`} size="small" />
                            </div>
                          </div>
                        </div>
                        <div className={styles.nftAttribute}>
                          <div className={styles.nftAttributeContent}>
                            <div className={styles.nftAttributeItem} style={{ color: '#ff7d85' }}>
                              <div style={{ width: '100%' }}>
                                <img src={getAttribute("AT")} alt="" /> AT {item.attr[0].Ap}
                              </div>
                            </div>
                            <div className={styles.nftAttributeItem} style={{ color: '#fc9e10' }}>
                              <div style={{ width: '100%' }}>
                                <img src={getAttribute("DE")} alt="" /> DE {item.attr[0].Def}
                              </div>
                            </div>
                            <div className={styles.nftAttributeItem} style={{ color: '#bfa4ff' }}>
                              <div style={{ width: '100%' }}>
                                <img src={getAttribute("LU")} alt="" /> LU {item.attr[0].Luck}
                              </div>
                            </div>
                            <div className={styles.nftAttributeItem} style={{ color: '#52ff4c' }}>
                              <div style={{ width: '100%' }}>
                                <img src={getAttribute("HP")} alt="" /> HP {item.attr[0].HpMAX}
                              </div>
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
        <PaginationComponent paginations={paginations} type="Heros" />
      </div>

      <div className={styles.sellContian}>
        {/* Sell */}
        <Modal
          className={styles.sellContian}
          width={'40rem'}
          footer={null}
          onCancel={() => { modalCancel() }}
          visible={isModalVisible}
          okText={buttonText}
          cancelText="Exit"
        >
          {currentAccount && nowInShop && (
            <div className={styles.myNft}>
              <div className={styles.myNftTop}>
                <div>出售</div>
              </div>
              <div className={styles.myNftBottom}>
                <div className={styles.myNftBottomContent}>
                  <div className={styles.myNftLeft}>
                    <div className={styles.nftCard}>
                      <div className={styles.nftHeader} style={{ backgroundImage: `url(${getHeroImage(nowInShop.attr[0]?.Name)})` }} >
                        <div className={[styles.nftHeaderId, styles[`nftId_${getQualityImage(nowInShop.attr[0]?.Qualitity)}`]].join(' ')}>#{nowInShop.identifier || ''}</div>
                      </div>
                      <div className={[styles.nftFooter, styles[`nftAttr_${getQualityImage(nowInShop.attr[0]?.Qualitity)}`]].join(' ')} >
                        <div className={styles.nftName}>
                          <div className={styles[`nftNameContent_${getQualityImage(nowInShop.attr[0]?.Qualitity)}`]}>
                            <div>{nowInShop.attr[0]?.Name}</div>
                          </div>
                        </div>
                        <div className={styles.nftLv}>
                          <div className={styles.nftLvContain}>
                            <div className={styles.nftLvText}>
                              lv<span style={{ fontSize: '14px' }}>{nowInShop.attr[0]?.Level}</span>
                            </div>
                            <div className={styles.nftLvProcess}>
                              <Progress strokeColor="#ccc" width={100} percent={lvPress(nowInShop.attr[0]?.Level, nowInShop.attr[0]?.Exp)} format={(val) => `${val}%`} size="small" />
                            </div>
                          </div>
                        </div>
                        <div className={styles.nftAttribute}>
                          <div className={styles.nftAttributeContent}>
                            <div className={styles.nftAttributeItem} style={{ color: '#ff7d85' }}>
                              <div>
                                <img src={getAttribute("AT")} alt="" />
                              </div>
                              <span>AT {nowInShop.attr[0]?.Ap}</span>
                            </div>
                            <div className={styles.nftAttributeItem} style={{ color: '#fc9e10' }}>
                              <div>
                                <img src={getAttribute("DE")} alt="" />
                              </div>
                              <span> DE {nowInShop.attr[0].Def}</span>
                            </div>
                            <div className={styles.nftAttributeItem} style={{ color: '#bfa4ff' }}>
                              <div >
                                <img src={getAttribute("LU")} alt="" />
                              </div>
                              <span>LU {nowInShop.attr[0]?.Luck}</span>
                            </div>
                            <div className={styles.nftAttributeItem} style={{ color: '#52ff4c' }}>
                              <div>
                                <img src={getAttribute("HP")} alt="" />
                              </div>
                              <span>HP {nowInShop.attr[0]?.HpMAX}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.myNftRight}>
                    <div className={styles.myNftRightContain}>
                      <div className={styles.text}>请输入出售价格</div>
                      <div className={styles.price}>
                        <div>
                          <img src={bnbUrl} alt="" />
                          <InputNumber value={nowPrice} style={{ width: '60%', border: 'none', margin: '0 0.2rem 0 0.2rem' }} min={0} controls={false} onChange={(val: number) => {
                            setNowPrice(val)
                          }}>
                          </InputNumber>
                          <span> BNB</span>
                        </div>
                      </div>
                      <div className={styles.sureSell}>
                        <div onClick={() => { isAuthOrSell() }}>
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
export default React.memo(MyNft)