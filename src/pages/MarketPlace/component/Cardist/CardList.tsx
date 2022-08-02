import React from "react"
import styles from './Card.module.less'
import gloStyle from '@/asset/css/global.module.less'
import statusUrl1 from '@/asset/img/markPlace/icon_effect_01.png'
import statusUrl2 from '@/asset/img/markPlace/icon_effect_02.png'
import statusUrl3 from '@/asset/img/markPlace/icon_effect_03.png'
import statusUrl4 from '@/asset/img/markPlace/icon_effect_04.png'

const CardList = (props: any) => {
    const { nftData } = props

    const imgChoose = (val: any) => {
        let quality: string
        switch (val) {
            case 1:
                quality = 'N'
                break
            case 2:
                quality = 'R'
                break
            case 3:
                quality = 'SR'
                break
            case 4:
                quality = 'SSR'
                break
            default:
                quality = 'N'
                break
        }
        return quality
    }

    return (
        <div className={styles.mainContain}>
            <div className={styles.CardsContion}>
                <div className={styles.GridContain}>
                    {nftData.map((item: any) => (
                        <div className={styles.Cards}>
                            <div className={styles.CardsContent}>
                                <div className={styles.CardsHeader} style={{ backgroundImage: `url(/asset/img/hero/${item.attr[0].Name}.png)` }} />
                                <div className={styles.CardsFooter}>
                                    <div className={styles.nftCard}>
                                        <div className={`nftAttr_${imgChoose(item.attr[0].Qualitity)}`}>
                                            <div className="nftName">
                                                <div className={`nftNameContent_${imgChoose(item.attr[0].Qualitity)}`}>
                                                    <span>lv{item.lv}</span>
                                                    <span>{item.attr[0].Name}</span>
                                                </div>
                                            </div>
                                            <div className="nftAttribute">
                                                <div className="nftAttributeContent">
                                                    <div className="nftAttributeItem" style={{ color: '#ff7d85' }}>
                                                        <div className={gloStyle.flcc}>
                                                            <img src={statusUrl2} alt="" /> AT {item.attr[0].Ap}
                                                        </div>
                                                    </div>
                                                    <div className="nftAttributeItem" style={{ color: '#fc9e10' }}>
                                                        <div className={gloStyle.flcc}>
                                                            <img src={statusUrl3} alt="" /> DE {item.attr[0].Def}
                                                        </div>
                                                    </div>
                                                    <div className="nftAttributeItem" style={{ color: '#bfa4ff' }}>
                                                        <div className={gloStyle.flcc}>
                                                            <img src={statusUrl4} alt="" /> LU {item.attr[0].Luck}
                                                        </div>
                                                    </div>
                                                    <div className="nftAttributeItem" style={{ color: '#52ff4c' }}>
                                                        <div className={gloStyle.flcc} style={{ width: '100%' }}>
                                                            <img src={statusUrl1} alt="" /> HP {item.attr[0].Hp}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
export default React.memo(CardList) 