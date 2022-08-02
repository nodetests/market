import React from "react";
import styles from './index.module.less'
import { CaretLeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { getHeroModelImage } from '@/utils/markPlace/hero'
// statusArr图片
import statusUrl1 from '@/asset/img/markPlace/icon_effect_01.png'
import statusUrl2 from '@/asset/img/markPlace/icon_effect_02.png'
import statusUrl3 from '@/asset/img/markPlace/icon_effect_03.png'
import statusUrl4 from '@/asset/img/markPlace/icon_effect_04.png'
import { Button, message, Progress } from "antd";
// BNB
import bnbUrl from '@/asset/img/markPlace/bnb.png'
// heroBottom
import gloryUrl from '@/asset/img/markPlace/hero_bottom.png'
// 钱包管理
import { WalletManager } from '@/utils/walletManager'
import { Wallet } from "@/utils/types"
import { lvPress } from "@/utils/markPlace/lvPress";
import Spine from "./component/Spine";
import { getSkillName } from "@/utils/markPlace/skill";


function NftDetail(props: any) {
  const detailData = props.location.state.msg ? props.location.state.msg : null
  // console.log(getSkillName(detailData.ModelId));
  const skillArr = getSkillName(detailData.ModelId)
  console.log(skillArr);
  
  const heroModelName  = getHeroModelImage(detailData.ModelId) || ''
  const history = useHistory()
  const buyNft =() =>{
    WalletManager.instance.purchaseListing(false, detailData.token.identifier, detailData.price, (err: Error, data: Wallet) => {
      if (err) {
        message.warn('Buy Failed')
        console.log(err);
      }
      if (data) {
        message.success('Buy Success')
        history.push('/MarkPlace', {hasBuy:true,hasBuyidentify:detailData.token.identifier});
      }
    })
  }
  return (
    detailData &&detailData.Name&&heroModelName? (
      <div className={[styles.detailContain,
       detailData.Star === 1 ? styles.detailContain_N : detailData.Star === 2 ? styles.detailContain_R:detailData.Star === 3 ? styles.detailContain_SR : styles.detailContain_SSR].join(' ')}
       >
        {/*  头部 */}
        <div className={styles.back} onClick={() => { history.push('/MarkPlace') }}>
          <CaretLeftOutlined style={{}} />
          <span>Back</span>
        </div>
        {/*  主体 */}
        <div className={styles.detailContent}>
          <div className={styles.detailLeft}>
            <div className={styles.detailImgContent} id="player-container">
              <Spine heroModelName={heroModelName} />
              {/* <div className={styles.detailImgContentContain}>
                <div className={styles.detailImgItem}>
                  <div className={styles.nftHeader} style={{ backgroundImage: `url(${getHeroImage(detailData.Name)})` }} />
                </div>
              </div> */}
            </div>

          </div>
          <div className={styles.detailRight}>
            <div className={styles.floor1}>
              <div className={styles.nftId}>#{detailData.token.identifier}</div>
              <div className={styles.nftLv}>
                <div className={styles.nftLvContain}>
                  <div className={styles.nftLvText}>
                     <span className={styles.nftLvTextLeft}>lv</span> 
                     <span className={styles.nftLvTextRight}>{detailData.Level}</span> 
                  </div>
                  <div className={styles.nftLvProcess}>
                    <Progress strokeColor="#ccc" width={100} percent={lvPress(detailData.Level,detailData.Exp)} format={(val) => `${val}%`} size="small" />
                  </div>
                </div>
              </div>
            
            </div>
            <div className={styles.floor2}>
              <div className={styles.floor2Contain}>
                <div className={styles.nftAttribute}>
                  <div className={styles.nftAttributeItem} style={{ color: '#ff7d85' }}><img src={statusUrl1} alt="" /> AT {detailData.attr ? detailData.attr[0].Ap : detailData.Ap}</div>
                  <div className={styles.nftAttributeItem} style={{ color: '#fc9e10' }}><img src={statusUrl4} alt="" /> DE {detailData.attr ? detailData.attr[0].Def : detailData.Def}</div>
                </div>
                <div className={styles.nftAttribute}>
                  <div className={styles.nftAttributeItem} style={{ color: '#bfa4ff' }}><img src={statusUrl2} alt="" /> SP {detailData.attr ? detailData.attr[0].Luck : detailData.Luck}</div>
                  <div className={styles.nftAttributeItem} style={{ color: '#52ff4c' }}><img src={statusUrl3} alt="" /> HP {detailData.attr ? detailData.attr[0].Hp : detailData.HpMAX}</div>
                </div>
              </div>
            </div>
            <div className={styles.floor3}>
              {skillArr.map((item: any, index) => (
                <div key={item.name} className={styles.floor3Item}>
                  <div className={styles.floor3ItemImg}>
                    {item.name==='普通攻击'?(
                      <img src={"https://dweb.link/ipfs/bafybeicx7m366r5jjg7i543wpk2gkw5p6v46afhve7q6ng635ihx5ywrhy/skillicon/sk_240201.png"} alt="" />
                    ):(
                      <img src={item.url} alt="" />
                    )}
                   
                  </div>
                  <div className={styles.floor3ItemText}>
                    <div className={styles.floor3ItemSkill}> {item.name}</div>
                    <div className={styles.floor3ItemAbstruct}>{item.skillIntro}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 底部 */}
        <div className={styles.detailBottom}>
          <div className={styles.detailBottomLeft} style={{ width: '50%',height:'153px' }}>
              <div className={styles.detailImg}> <img src={gloryUrl} alt="" /></div>
          </div>
          <div className={styles.detailBottomRight}>
            <div className={styles.buyRightPrice}>
                <img src={bnbUrl} alt="" />
                <span>{detailData.price}BNB</span>
            </div>
            <div className={styles.buyRightButton}>
              <Button
                className={styles.buyText}
                onClick={() => {buyNft()}}>Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        连接错误，请重新链接
      </div>
    )
  )
}

export default React.memo(NftDetail)