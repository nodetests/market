/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import gloStyle from '@/asset/css/global.module.less'
import FilterContent from './component/FilterContent'
import MaterialMarket from './MaterialMarket'
import MyMaterial from './MyMaterial'
import MySell from './MySell'
import MyHistory from './MyHistory'
import intl from 'react-intl-universal'
import { getHttpData } from '@/api'
import { gql } from 'graphql-request'

import { Select, Spin } from 'antd'
import { getMaterialMarket, getMyMaterial } from './state'
import { getEquipImage } from '@/utils/markPlace/equip'
import { CText } from '@/layout/BaseLayout'
import { useContext } from 'react';
const { Option } = Select
// 市场类型数组

const materialTypeArr = [
    { id: 'materialMarket', name: intl.get('materialMarket') },
    { id: 'myMaterial', name: intl.get('myMaterial') },
    { id: 'mySell', name: intl.get('mySell') },
    { id: 'myHistory', name: intl.get('myHistory') },
]

const Material = (props: any) => {
    const { currentAccount, windowWidth } = useContext(CText)
    // 后端要传的值即为'1''2''3''4'
    const [nowMaterialType, setNowMaterialType] = useState<string>('1')
    const [nowMaterialStatus, setNowMaterialStatus] = useState<string>('materialMarket')
    const [nowSorting, setNowSorting] = useState<string>('default')
    const [materialData, setMaterialData] = useState<any>()
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
    const getmaterialData = () => {
        let query: string = ''
        switch (nowMaterialStatus) {
            case 'materialMarket':
                query = gql`
                query{
                    listing1155S(
                        first:${marketPaginations.pageSize},
                        skip:${marketPaginations.pageSize * (marketPaginations.current - 1)},
                        where:{
                            seller_not:"${currentAccount}",
                            status:"Active"
                        }) {
                        ${getMaterialMarket}
                    }
                  }
                `
                break
            case 'myMaterial':
                query = gql`
                query{
                    ksmbalances(where:{account:"${currentAccount.toLocaleLowerCase()}"}) {
                        ${getMyMaterial}
                      }
                }
                `
                break
            case 'mySell':
                query = gql`
                query{
                    listing1155S(
                        where:{
                            seller:"${currentAccount}",
                            status:"Active"
                        }) {
                        ${getMaterialMarket}
                    }
                  }
                `
                break
            // case 'myHistory':
                
            //     break
            default:
                break
        }
        setSpinning(true)
        query&&getHttpData(query).then((res: any) => {
            let arr = res.listing1155S ? res.listing1155S : res.ksmbalances
           
            if (nowMaterialStatus !== 'materialMarket') {
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
            setMaterialData(arr)
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
        getmaterialData()
    }, [nowMaterialStatus, nowMaterialType, noMarketPaginations.current, marketPaginations.current, marketPaginations.pageSize])





    return (
        <div className={styles.equipContain}>
            <div className={styles.fiterContain}>
                <FilterContent nowMaterialType={nowMaterialType} setNowMaterialType={setNowMaterialType} openFilterMenu={openFilterMenu} />
            </div>
            <div className={styles.mainContent}>
                <div className={[styles.mainContainTop, gloStyle.flbt].join(' ')}>
                    <div className={gloStyle.flst} style={{ width: '100%' }}>
                        {materialTypeArr.map((item: any) => (
                            <div key={item.id} className={[styles.markTypeItem, nowMaterialStatus === item.id ? styles.markTypeItemActive : null].join(' ')}
                                onClick={() => {
                                    setNowMaterialStatus(item.id)
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
                        {nowMaterialStatus === 'materialMarket' && (
                            <MaterialMarket
                                stlye={{ width: '100%', height: '100%' }}
                                materialData={materialData} setMaterialData={setMaterialData}
                                currentAccount={currentAccount}
                                paginations={marketPaginations}
                                setPaginations={setMarketPaginations}
                            />
                        )}
                        {nowMaterialStatus === 'myMaterial' && (
                            <MyMaterial stlye={{ width: '100%', height: '100%' }}
                                materialData={materialData} setMaterialData={setMaterialData}
                                getEquipImage={getEquipImage}
                                currentAccount={currentAccount}
                                nowMaterialStatus={nowMaterialStatus}

                                paginations={noMarketPaginations}
                                setPaginations={setNoMarketPaginations}
                            />
                        )}
                        {nowMaterialStatus === 'mySell' && (
                            <MySell
                                stlye={{ width: '100%', height: '100%' }}
                                materialData={materialData}
                                setMaterialData={setMaterialData}
                                currentAccount={currentAccount}
                                paginations={noMarketPaginations}
                                setPaginations={setNoMarketPaginations}
                            />
                        )}
                         {nowMaterialStatus === 'myHistory' && (
                            <MyHistory
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
export default Material