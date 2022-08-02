import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import styles from '../css/heroCard.module.less'
import { getQualityImage, getHeroImage } from '@/utils/markPlace/hero'
import { getAttribute } from "@/utils/markPlace/attribute"
import { lvPress } from "@/utils/markPlace/lvPress"
import useIntersectionObserver from '@/hooks/imgLazy'
import PaginationComponent from "../../component/PaginationComponent"
// BNB
import bnbUrl from '@/asset/img/markPlace/bnb.png'
import { Progress } from "antd"

interface marketType {
  nftData: any
  paginations: any
  currentAccount: string
  setNftData: any
}
function MarketPlace(props: marketType) {
  const { nftData, paginations } = props
  const domRef = useRef<any>([])
  const history = useHistory()

  useIntersectionObserver(domRef.current, [0.5])

  // useEffect(() => {
  //   if (sorting === 'horizontal') {
  //     setGrid({
  //       gutter: 24,
  //       xs: 2,
  //       sm: 2,
  //       md: 2,
  //       lg: 3,
  //       xl: 4,
  //       xxl: 5,
  //     })
  //   } else {
  //     setGrid({
  //       gutter: 24,
  //       column: 1,
  //     })
  //   }
  // }, [sorting])

  const cardHandler = (val: any) => {
    history.push({ pathname: '/NftDetail', state: { msg: val } })
  }
 
  return (
    <div className={styles.nftContain}>
      <div className={styles.cardsContion}>
        <div className={styles.gridContain}>
          {nftData && nftData.length > 0 && (
            nftData.map((item: any, index: any) => (
              <div key={index}>
                {item.Name && (
                  <div className={styles.nftCard} onClick={() => { cardHandler(item) }}>
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
            ))
          )}

        </div>
        <PaginationComponent paginations={paginations} type="Heros" />
      </div>
    </div>
  )
}
export default React.memo(MarketPlace)
