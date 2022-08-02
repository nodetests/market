/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import { message, Select, Spin } from 'antd'
// 获取合约地址
import { GetNetworkConfig } from '@/utils/contractConfig'
import FilterContent from './component/FilterContent'
import MarketPlace from './MarkPlace/MarketPlace'
import MyNft from './MyNft/MyNft'
import MySell from './MySell/MySell'
import MyHistory from './MyHistory'
import intl from 'react-intl-universal'

import { getHttpData } from '@/api'
import { gql } from 'graphql-request'
import styles from './index.module.less'
import gloStyle from '@/asset/css/global.module.less'
import { getSql } from './state';
import { CText } from '@/layout/BaseLayout';

const NetworkConfig = GetNetworkConfig()

function MarkPlace(props: any) {
  const { nowNftType, hasBuy, hasBuyidentify } = props
  const { currentAccount,windowWidth } = useContext(CText)
  const { Option } = Select
  const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(false)
  // NFT数据
  const [nftData, setNftData] = useState<any>([])
  const [spinning, setSpinning] = useState<any>(false)
  // 市场中NFT的状态
  const [nowMarkStatus, setNowMarkStatus] = useState<any>('heroMarket')
  const [nowSellStatus, setNowSellStatus] = useState<any>('default')
  //  几个筛选条件
  // const [filterNum, setFilterNum] = useState<any>(0)
  const [filterStatus, setFilterStatus] = useState<any>(0)
  // eAP
  // eDEF
  // eHP
  // elUCK
  const [nowgteAP, setNowgteAP] = useState<number>()
  const [nowlteAp, setNowlteAp] = useState<number>()
  const [nowgteDEF, setNowgteDEF] = useState<number>()
  const [nowlteDEF, setNowlteDEF] = useState<number>()
  const [nowgteHP, setNowgteHP] = useState<number>()
  const [nowlteHP, setNowlteHP] = useState<number>()
  const [nowgteLUCK, setNowgteLUCK] = useState<number>()
  const [nowlteLUCK, setNowlteLUCK] = useState<number>()
  const [nowgteLV, setNowgteLV] = useState<number>()
  const [nowlteLV, setNowlteLV] = useState<number>()
  // 阵营和质量
  // const [nowCamp, setNowCamp] = useState<any>([])
  const [nowQualitity, setNowQualitity] = useState<any>([])

  // 市场类型数组
  const markTypeArr = [
    { id: 'heroMarket', name: intl.get("market") },
    { id: 'myNft', name: intl.get("myNft") },
    { id: 'mySell', name: intl.get("mySell") },
    { id:'myHistory', name: intl.get("myHistory") },
  ]
  // 分页数据
  const [marketPaginations, setMarketPaginations] = useState<any>({
    total: 0,
    current: 1,
    pageSize: 8,
    onChange: (page: any, size: any) => {
      const pagination1 = marketPaginations
      pagination1.current = page || 1
      pagination1.pageSize = size
      setMarketPaginations(pagination1)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal(n: any) {
      return ` ${n} Hero NFTs`
    },
  })
  // 分页数据
  const [noMarketPaginations, setNoMarketPaginations] = useState<any>({
    total: 0,
    current: 1,
    pageSize: 8,
    onChange: (page: any, size: any) => {
      const pagination1 = noMarketPaginations
      pagination1.current = page || 1
      pagination1.pageSize = size
      setNoMarketPaginations(pagination1)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal(n: any) {
      return ` ${n} Hero NFTs`
    },
  })
  useEffect(() => {
    if (windowWidth < 1200) {
      setOpenFilterMenu(true)
    } else {
      setOpenFilterMenu(false)
    }
  }, [windowWidth])
  // get page data
  useEffect(() => {
    getDatas()
  }, [noMarketPaginations.current, marketPaginations.current, marketPaginations.pageSize, nowMarkStatus, filterStatus, nowNftType, nowQualitity, currentAccount])


  const getDatas = () => {
    let query = null
    switch (nowMarkStatus) {
      case 'heroMarket':
        query = gql`query{
          listings(
            first:${marketPaginations.pageSize},
            skip:${marketPaginations.pageSize * (marketPaginations.current - 1)},
            where:{
              seller_not:"${currentAccount}",
              Ap_gt:${nowgteAP || 0},
              Ap_lt:${nowlteAp || 2000},
              HpMAX_gt:${nowgteHP || 0},
              HpMAX_lt:${nowlteHP || 2000},
              Def_gt:${nowgteDEF || 0},
              Def_lt:${nowlteDEF || 2000},
              Luck_gt:${nowgteLUCK || 0},
              Luck_lt:${nowlteLUCK || 2000},
              Qualitity_in:${nowQualitity.length <= 0 ? `[1,2,3,4]` : `[${nowQualitity}]`},
              status:"Active",
            }
          )
          ${getSql.Market}
        }
        `
        break;
      case 'myNft':
        query = gql`query{
          ksnfttokens(
            where:{
              owner:"${currentAccount}",
              contract:"${NetworkConfig.KSNFT.toLocaleLowerCase()}",
            }
          )
          ${getSql.MyNft},
          }`
        break
      case 'mySell':
        query = gql`query{
          listings(
            where:{
              seller:"${currentAccount}",
              status:"Active"
              Ap_gt:${nowgteAP || 0},
              Ap_lt:${nowlteAp || 2000},
              HpMAX_gt:${nowgteHP || 0},
              HpMAX_lt:${nowlteHP || 2000},
              Def_gt:${nowgteDEF || 0},
              Def_lt:${nowlteDEF || 2000},
              Qualitity_in:${nowQualitity.length <= 0 ? `[1,2,3,4]` : `[${nowQualitity}]`},
            }
          )
          ${getSql.MySell}
        }`
        break
      // case 'myHistory':
          
      //     break
      default:
        query = gql`query{
          listings(
            where:{
              seller_not:"${currentAccount}",
              Ap_gt:${nowgteAP || 0},
              Ap_lt:${nowlteAp || 2000},
              HpMAX:${nowgteHP || 0},
              HpCurrent:${nowlteHP || 2000},
              Def_gt:${nowgteDEF || 0},
              Def_lt:${nowlteDEF || 2000},
              Qualitity_in:${nowQualitity.length <= 0 ? `[1,2,3,4]` : `[${nowQualitity}]`},
            }
          )
          ${getSql.Market}
        }
        `
        break
    }
    setSpinning(true)
    query&&getHttpData(query).then((res: any) => {
      let arr = res.ksnfttokens ? res.ksnfttokens : res.listings;
      if (hasBuy && hasBuyidentify && nowMarkStatus === 'heroMarket') {
        arr = arr.filter((item: any) => item.token.identifier !== hasBuyidentify)
      }
      if (nowMarkStatus !== 'heroMarket') {
        setNoMarketPaginations({
          ...noMarketPaginations,
          total: arr.length,
        })
      } else {
        // console.log(arr[0]?.contract.sellingTotal ? arr[0]?.contract.sellingTotal : 0);
        
        setMarketPaginations({
          ...marketPaginations,
          total: arr[0]?.contract.sellingTotal ? arr[0]?.contract.sellingTotal : 0
        })
      }
      setNftData(arr)
      setSpinning(false)
    }).catch((err: any) => {
      console.log(err);
      setSpinning(false)
      message.warn('获取数据失败')
    })
  }


  return (
    <div className={styles.heroContain}>
      <div className={styles.centerContain}>
        <div className={styles.filterContain}>
          <FilterContent
            openFilterMenu={openFilterMenu}
            setOpenFilterMenu={setOpenFilterMenu}
            nowlteAp={nowlteAp}
            setNowlteAp={setNowlteAp}
            nowgteAP={nowgteAP}
            setNowgteAP={setNowgteAP}
            nowlteDEF={nowlteDEF}
            setNowlteDEF={setNowlteDEF}
            nowgteDEF={nowgteDEF}
            setNowgteDEF={setNowgteDEF}
            nowlteHP={nowlteHP}
            setNowlteHP={setNowlteHP}
            nowgteHP={nowgteHP}
            setNowgteHP={setNowgteHP}
            nowlteLUCK={nowlteLUCK}
            setNowlteLUCK={setNowlteLUCK}
            nowgteLUCK={nowgteLUCK}
            setNowgteLUCK={setNowgteLUCK}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            nowgteLV={nowgteLV}
            setNowgteLV={setNowgteLV}
            nowlteLV={nowlteLV}
            setNowlteLV={setNowlteLV}
            // nowCamp={nowCamp}
            // setNowCamp={setNowCamp}
            nowQualitity={nowQualitity}
            setNowQualitity={setNowQualitity}
            paginations={nowMarkStatus ==='heroMarket'?marketPaginations:noMarketPaginations}
            setPaginations={nowMarkStatus ==='heroMarket'?setMarketPaginations:setNoMarketPaginations}
            windowWidth={windowWidth}
          />
        </div>
        <div className={styles.markPlaceContain}>
          <div className={styles.imgContain}>
            <div className={[styles.imgContainTop].join(' ')}>
              <div className={[gloStyle.flbt, styles.imgContainTopContent].join(' ')}>
                <div style={{ width: '80%' }} className={gloStyle.flst}  >
                  {markTypeArr.map((item: any) => (
                    <div key={item.id} className={[styles.markTypeItem, nowMarkStatus === item.id ? styles.markTypeItemActive : null].join(' ')}
                      onClick={() => {
                        setMarketPaginations({
                          ...marketPaginations,
                          current: 1,
                        })
                        setNoMarketPaginations({
                          ...noMarketPaginations,
                          current: 1,
                        })
                        setNowMarkStatus(item.id)
                      }}>{item.name}</div>
                  ))}
                </div>
                <div>
                  <Select value={nowSellStatus} onChange={(val) => {
                    setNowSellStatus(val)
                  }}>
                    <Option value="default">id从高到低排列</Option>
                  </Select>
                </div>
              </div>

            </div>
            <div className={styles.imgContainBottom}>
              <Spin spinning={spinning}>
                {nowMarkStatus === 'heroMarket' && <MarketPlace
                  nftData={nftData}
                  setNftData={setNftData}
                  currentAccount={currentAccount}
                  paginations={marketPaginations}
                />

                }
                {nowMarkStatus === 'myNft' && (
                  <MyNft
                    nowMarkStatus={nowMarkStatus}
                    nftData={nftData}
                    setNftData={setNftData}
                    currentAccount={currentAccount}
                    paginations={noMarketPaginations}
                    setPaginations={setNoMarketPaginations}
                  />

                )}
                {nowMarkStatus === 'mySell' && (
                  <MySell
                    nftData={nftData}
                    setNftData={setNftData}
                    currentAccount={currentAccount}
                    paginations={noMarketPaginations}
                    setPaginations={setNoMarketPaginations}
                  />

                )}
                {nowMarkStatus === 'myHistory' && (
                  <MyHistory
                    style={{ width: '100%', height: '100%' }}
                    nftData={nftData}
                    setNftData={setNftData}
                    currentAccount={currentAccount}
                    windowWidth={windowWidth}
                  >
                  </MyHistory>
                )}

              </Spin>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default React.memo(MarkPlace)