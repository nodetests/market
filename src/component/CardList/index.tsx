import React from "react";
// import styles from './index.module.less'
// import gloStyle from '../../../asset/css/global.module.less'

// // QualityArr图片
// import quUrl1 from '../../../asset/img/markPlace/R.png'
// import quUrl2 from '../../../asset/img/markPlace/SR.png'
// import quUrl3 from '../../../asset/img/markPlace/SSR.png'
// // statusArr图片
// import statusUrl1 from '../../../asset/img/markPlace/icon_effect_01.png'
// import statusUrl2 from '../../../asset/img/markPlace/icon_effect_02.png'
// import statusUrl3 from '../../../asset/img/markPlace/icon_effect_03.png'
// import statusUrl4 from '../../../asset/img/markPlace/icon_effect_04.png'
// // BNB
// import bnbUrl from '../../../asset/img/markPlace/bnb.png'

// import { Card } from "antd";
function CardList(props:any){
   const {data}  =props
    return(
      // <List
      // grid={grid}
      // dataSource={catData}
      // itemLayout={sorting}
      // pagination={paginations}
      // renderItem={(item: any, index: number) => (
      //   <List.Item key={item.id} style={{width:'19rem'}} className={sorting === 'horizontal' ? styles.contentItem : ''} onClick={() => {
      //     setNowInShop(item)
      //     // history.push({pathname:'/demo',state:{id:12,name:'dahuang'}})
      //     history.push({pathname:'/NftDetail' ,state:{msg:item} })
      //     // history.push(`/MarkPlace/Detail/?message=${JSON.stringify(item)}}`)
      //     // setIsModalVisible(true)
      //   }}>
      //     <Card >
      //       <div className={[styles.nftCard,item.quality==='R'?styles.nftCard_R:item.quality==='SR'?styles.nftCard_SR:styles.nftCard_SSR].join(' ')}>
      //         <div className={[styles.nftCardtop, gloStyle.flst].join(' ')}>
      //           {item.type === 'water' && (
      //             <div className={styles.nftCardTopImg}><img src={eleUrl1} alt="" /></div>
      //           )}
      //           {item.type === 'fire' && (
      //             <div className={styles.nftCardTopImg}><img src={eleUrl2} alt="" /></div>
      //           )}
      //           {item.type === 'wood' && (
      //             <div className={styles.nftCardTopImg}><img src={eleUrl3} alt="" /></div>
      //           )}
      //           <div>
      //             #{item.id}
      //           </div>
      //           {item.quality === 'R' && (
      //             <div className={styles.nftCardTopImg}><img src={quUrl1} alt="" /></div>
      //           )}
      //           {item.quality === 'SR' && (
      //             <div className={styles.nftCardTopImg}><img src={quUrl2} alt="" /></div>
      //           )}
      //           {item.quality === 'SSR' && (
      //             <div className={styles.nftCardTopImg}><img src={quUrl3} alt="" /></div>
      //           )}
      //         </div>
      //         <div className={styles.nftImg}>
      //           <img src={item.url} alt="" />
      //         </div>
      //         <div className={styles.nftName}>
      //             <div className={styles.nftNameContent}>
      //               <span>lv{item.lv}</span>
      //               <span>{item.name}</span>
      //             </div>
      //         </div>
      //         <div className={styles.nftAttribute}>
      //             <div style={{color:'#ff7d85'}}><img src={statusUrl2} alt="" /> AT 12</div>
      //             <div style={{color:'#fc9e10'}}><img src={statusUrl1} alt="" /> DE 11</div>
      //             <div style={{color:'#bfa4ff'}}><img src={statusUrl3} alt="" /> SP 31</div>
      //             <div style={{color:'#52ff4c'}}><img src={statusUrl4} alt="" /> HP 22</div>
      //         </div>
      //         <div className={styles.nftPrice}>
      //           <div  className={styles.nftPriceContent}>
      //             <img src={bnbUrl} alt="" />
      //             <span>{item.price} </span> 
      //             <span>BNB</span> 
      //           </div>
      //         </div>
      //       </div>
          
            {/* <div className={sorting !== 'horizontal' ? styles.flst : ''}>
                <div>
                  <div>
                    <img
                      key={`lazy-${item.id}`}
                      style={{ maxWidth: '100%', height: 200 }}
                      alt="this is a img"
                      data-src={item.url}
                      ref={el => domRef.current[index] = el}
                      className={styles.lazyImage}
                    />
                  </div>
                  <div>
                    <div className={styles.cardFooterContent}>
                      <span>price:</span>
                      <span style={{ fontWeight: 600 }}>{item.price}</span>
                    </div>
                    <div className={styles.cardFooterContent}>
                      <span>addTimestamp:</span>
                      <span style={{ fontWeight: 600 }}>{item.addTimestamp}</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: '12px' }}>
                  {sorting !== 'horizontal' && (
                    <div>123123</div>
                  )}
                </div>
            </div> */}
    //       </Card>
        
    //     </List.Item>
    //   )}>
    // </List>
    )
}
export default CardList