/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.less'
import gloStyle from '@/asset/css/global.module.less'
import FilterContent from './component/FilterContent'
import EquipMarket from './EquipMarket'
import MyEquip from './MyEquip'
import MySell from './MySell'
import MyHistory from './MyHistory'
import intl from 'react-intl-universal'
import { getEquipMarket, getMyEquip } from './state'
import { getHttpData } from '@/api'
import { gql } from 'graphql-request'
import { GetNetworkConfig } from '@/utils/contractConfig'
import { Select, Spin } from 'antd'
import { getEquipImage } from '@/utils/markPlace/equip'
import { CText } from "@/layout/BaseLayout"
const { Option } = Select
const NetworkConfig = GetNetworkConfig()

// 市场类型数组
const equipTypeArr = [
    { id: 'equipMarket', name: intl.get('equipMarket') },
    { id: 'myEquip', name: intl.get('myEquip') },
    { id: 'mySell', name: intl.get('mySell') },
    { id: 'myHistory', name: intl.get('myHistory') },
]

const Euqips = (props: any) => {
    const { currentAccount, windowWidth } = useContext(CText)
    const [nowEquipType, setNowEquipType] = useState<string>('1')
    const [nowEquipStatus, setNowEquipStatus] = useState<string>('equipMarket')
    const [nowSorting, setNowSorting] = useState<string>('default')
    const [equipData, setEquipData] = useState<any>()
    const [spinning, setSpinning] = useState<any>(false)
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(false)


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

    const getEquipData = () => {
        let query: string = ''
        switch (nowEquipStatus) {
            case 'equipMarket':
                query = gql`
                query{
                    listingEquips(
                        first:${marketPaginations.pageSize},
                        skip:${marketPaginations.pageSize * (marketPaginations.current - 1)},
                        where:{
                            contract:"${NetworkConfig.KSEquip.toLocaleLowerCase()}",
                            status:"Active",
                            seller_not:"${currentAccount}" }) {
                            ${getEquipMarket}
                        }
                    }`
                break
            case 'myEquip':
                query = gql`
                query{
                    ksequiptokens(where:{owner:"${currentAccount.toLocaleLowerCase()}"}) {
                    ${getMyEquip}
                    }
                }`
                break
            case 'mySell':
                query = gql`
                query{
                    listingEquips(where:{contract:"${NetworkConfig.KSEquip.toLocaleLowerCase()}",status:"Active",seller:"${currentAccount.toLocaleLowerCase()}" }) {
                    ${getEquipMarket}
                    }
                }`
                break
            // case 'myHistory':
                
            //     break
            default:
                break
        }
        setSpinning(true)
        query&&getHttpData(query).then((res: any) => {
            let arr = res.ksequiptokens ? res.ksequiptokens : res.listingEquips
            if (nowEquipStatus !== 'equipMarket') {
                setNoMarketPaginations({
                    ...noMarketPaginations,
                    total: arr.length,
                })
            } else {
                setMarketPaginations({
                    ...marketPaginations,
                    total: arr[0]?.contract.sellingTotal ? arr[0]?.contract.sellingTotal : 0
                })
            }
            setEquipData(arr)
            setSpinning(false)
        }).catch((err: any) => {
            console.log(err)
            setSpinning(false)
        })
    }

    useEffect(() => {
        if (windowWidth < 1200) {
            setOpenFilterMenu(true)
        } else {
            setOpenFilterMenu(false)
        }
    }, [windowWidth])

    useEffect(() => {
        getEquipData()
    }, [nowEquipStatus, nowEquipType, marketPaginations.current, noMarketPaginations.current])

    return (
        <div className={styles.equipContain}>
            <div className={styles.fiterContain}>
                <FilterContent nowEquipType={nowEquipType} setNowEquipType={setNowEquipType} openFilterMenu={openFilterMenu} />
            </div>
            <div className={styles.mainContent}>
                <div className={[styles.mainContainTop, gloStyle.flbt].join(' ')}>
                    <div className={gloStyle.flst} style={{ width: '100%' }}>
                        {equipTypeArr.map((item: any) => (
                            <div key={item.id} className={[styles.markTypeItem, nowEquipStatus === item.id ? styles.markTypeItemActive : null].join(' ')}
                                onClick={() => {
                                    setNowEquipStatus(item.id)
                                }}>{item.name}</div>
                        ))}
                    </div>
                    <div>
                        <Select value={nowSorting} onChange={(val) => {
                            setNowSorting(val)
                        }}>
                            <Option value="default">id从高到低排列</Option>
                        </Select>
                    </div>
                </div>
                <Spin spinning={spinning}>
                    <div className={styles.mainContainBottom}>
                        {nowEquipStatus === 'equipMarket' && (
                            <EquipMarket
                                paginations={marketPaginations}
                                setPaginations={setMarketPaginations}
                                stlye={{ width: '100%', height: '100%' }}
                                equipData={equipData} setEquipData={setEquipData}
                                currentAccount={currentAccount}
                                windowWidth={windowWidth}
                            />
                        )}
                        {nowEquipStatus === 'myEquip' && (
                            <MyEquip stlye={{ width: '100%', height: '100%' }}
                                paginations={noMarketPaginations}
                                setPaginations={setNoMarketPaginations}
                                equipData={equipData} setEquipData={setEquipData}
                                getEquipImage={getEquipImage}
                                currentAccount={currentAccount}
                                nowEquipStatus={nowEquipStatus}
                                windowWidth={windowWidth}
                            />
                        )}
                        {nowEquipStatus === 'mySell' && (
                            <MySell
                                paginations={noMarketPaginations}
                                setPaginations={setNoMarketPaginations}
                                stlye={{ width: '100%', height: '100%' }}
                                equipData={equipData}
                                setEquipData={setEquipData}
                                currentAccount={currentAccount}
                                windowWidth={windowWidth}
                            />
                        )}
                        {nowEquipStatus === 'myHistory' && (
                            <MyHistory
                                paginations={noMarketPaginations}
                                setPaginations={setNoMarketPaginations}
                                stlye={{ width: '100%', height: '100%' }}
                                equipData={equipData}
                                setEquipData={setEquipData}
                                currentAccount={currentAccount}
                                windowWidth={windowWidth}
                            />
                        )}
                    </div>
                </Spin>
            </div>
        </div>
    )
}
export default Euqips