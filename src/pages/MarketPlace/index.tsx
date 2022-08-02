/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'

import Heros from './Heros'
import Euqips from './Euqips'
import Materail from './Material'
import RankingList from './RankList/RankingList'
// nft类型数组图片
import typeUrl1 from '@/asset/img/markPlace/Hero.png'
import typeUrl2 from '@/asset/img/markPlace/Badges.png'
import typeUrl3 from '@/asset/img/markPlace/Equip.png'
import typeUrl4 from '@/asset/img/markPlace/Rankinglist.png'
import styles from './index.module.less'
import intl from 'react-intl-universal'

function MarkPlace(props: any) {
  let hasBuy:boolean = false
  let hasBuyidentify = ''
   if( props.location?.state?.hasBuy){
     console.log(props.location?.state);
     
    hasBuy = props.location.state.hasBuy
    hasBuyidentify = props.location.state.hasBuyidentify
   }
  // NFT数据
  const [catData, setCatData] = useState<any>([])
  const [nowNftType, setNowNftType] = useState<string>('1')

  // nft类型数组
  const nftTypeArr = [
    { id: '1', url: typeUrl1, name:  intl.get('Heros') },
    { id: '2', url: typeUrl2, name:  intl.get('Material') },
    { id: '3', url: typeUrl3, name:  intl.get('Equip') },
    { id: '4', url: typeUrl4, name: intl.get('RankingList') },
  ]

  const [rankPaginations, setRankPaginations] = useState<any>({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal(total: number) {
      return `共 ${total} 条数据`
    },
  })

  return (
    <div className={styles.fatherContain}>
      <div className={styles.publicHeader}>
        {nftTypeArr.map((item: any) => (
          <div
            key={item.id}
            className={[styles.nftTypeItem, nowNftType === item.id ? styles.nftTypeActive : null].join(' ')}
            onClick={() => {
              setNowNftType(item.id)
            }}
          >
            <img src={item.url} alt="" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className={styles.publicCenter}>
        {nowNftType === '1' && (
          <Heros style={{ width: '100%', height: '100%' }} 
          nowNftType={nowNftType}
           setNowNftType={setNowNftType}
           hasBuy={hasBuy}
           hasBuyidentify={hasBuyidentify}
           />
        )}
           {nowNftType === '2' && (
          <Materail style={{ width: '100%', height: '100%' }} 
           nowNftType={nowNftType}
           setNowNftType={setNowNftType}
           />
        )}
        {nowNftType === '3' && (
          <Euqips style={{ width: '100%', height: '100%' }}></Euqips>
        )}
        {nowNftType === '4' && (
          <RankingList
            style={{ width: '100%', height: '100%' }}
            catData={catData}
            setCatData={setCatData}
            paginations={rankPaginations}
            setPaginations={setRankPaginations}
          />
        )}
      </div>
    </div>

  )
}
export default React.memo(MarkPlace)