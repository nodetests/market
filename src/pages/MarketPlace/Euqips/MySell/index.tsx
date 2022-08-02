import React, { useRef, useState } from "react"
import { message, Popconfirm } from "antd"
import styles from '../css/equipCard.module.less'
import useIntersectionObserver from '@/hooks/imgLazy'
import { WalletManager } from '@/utils/walletManager'
import { getEquipImage, getEquipBgImage } from '@/utils/markPlace/equip'
import { getQualityImage } from "@/utils/markPlace/hero"
import { getAttribute } from '@/utils/markPlace/attribute'
import { pressData } from '@/utils/markPlace/pressData'
import { Wallet } from "@/utils/types"
import PaginationComponent from "../../component/PaginationComponent"

function MySell(props: any) {
  const { equipData, setEquipData, paginations, setPaginations } = props
  const [confirmButton, setConfirmButton] = useState<string>('')
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const domRef = useRef<any>([])

  useIntersectionObserver(domRef.current, [0.5])

  const confirmHandel = (val: any) => {
    setConfirmLoading(true);
    WalletManager.instance.cancelListing(true, val.token.identifier, (err: Error, data: Wallet) => {
      if (err) {
        message.error('cancelListing faied')
        setConfirmButton('');
        setConfirmLoading(false);
        return false
      }
      if (data) {
        console.log(equipData);
        let arr: any = equipData.filter((catDataItem: any) => catDataItem.token.identifier !== val.token.identifier)

        if (paginations.current * paginations.pageSize % arr.length === 0) {
          setPaginations({
            ...paginations,
            current: paginations.current - 1 || 1,
          })
        }
        setPaginations({
          ...paginations,
          total: paginations.total - 1,
        })
        setEquipData(arr)
        message.success('cancelListing success')
        setConfirmButton('');
        setConfirmLoading(false);
      }
    })
  }

  const confirmCancel = () => {
    setConfirmButton('');
  }
  // const cardClickHandler =() => {
  //   setConfirmButton('');
  // }
  return (

    <div className={styles.nftContain}>
      <div className={styles.cardsContion}>
        <div className={styles.gridContain}>
          {equipData && equipData.length > 0 && (
            pressData(equipData, paginations.current, paginations.pageSize).map((item: any, index: any) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardsContent}>
                  {item.token && (
                    <div className={styles.nftCard} style={{ backgroundImage: `url(${getEquipBgImage(item?.Star)})` }}>
                      <div className={styles.nftHeader} style={{ backgroundImage: `url(${getEquipImage(item.Name)})` }} />
                      {/* styles[`nftAttr_${getQualityImage(nowInShop.Star)}`] */}
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
                          <div className={styles.nftPriceContent} >
                            <Popconfirm
                              title="sure to cancelListing?"
                              visible={item?.token.identifier === confirmButton}
                              onConfirm={() => {
                                confirmHandel(item)
                              }}
                              okButtonProps={{ loading: confirmLoading }}
                              onCancel={() => {
                                confirmCancel()
                              }}
                            >
                              <div
                                style={{ width: '100%', maxHeight: '50px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  e.preventDefault()
                                  setConfirmButton(item.token.identifier)
                                }
                                }>
                                <div style={{ height: '30px', lineHeight: '30px' }}>下架</div>
                              </div>
                            </Popconfirm>
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
        <PaginationComponent paginations={paginations} type="Equips" />
      </div>
    </div>
  )
}
export default React.memo(MySell)
