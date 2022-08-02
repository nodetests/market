/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Table, Tooltip } from 'antd'
import styles from '../css/history.module.less'
import intl from 'react-intl-universal'

import quUrl1 from '@/asset/img/markPlace/R.png'
import quUrl2 from '@/asset/img/markPlace/SR.png'
import quUrl3 from '@/asset/img/markPlace/SSR.png'
import { getHeroImage } from '@/utils/markPlace/hero'
import { useEffect, useState } from 'react'
import { gql } from 'graphql-request'
import { getEquipMarket } from '../state'
import { getHttpData } from '@/api'
import { timeFormat } from '@/utils/time'
import { getEquipImage } from '@/utils/markPlace/equip'


const MyHistory = (props: any) => {
  const { currentAccount, windowWidth } = props
  const [historyData, setHistoryData] = useState<any>([])
  const [openTableItem, setOpenTableItem] = useState<boolean>(false)
  const [paginations, setPaginations] = useState<any>({
    total: 0,
    current: 1,
    pageSize: 8,
    onChange: (page: any, size: any) => {
      const pagination1 = paginations
      pagination1.current = page || 1
      pagination1.pageSize = size
      setPaginations(pagination1)
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal(n: any) {
      return ` ${n} Hero NFTs`
    },
  })
  // 浏览器的高度 默认设置为0；


  const [columns, setColumns] = useState<any>([])

  const expandChanges = (index: any, row: any) => {
    console.log(index, row);
  }

  const getData = () => {
    const query1 = gql`
    query{
      listingEquips(
        first:50,
        skip:0,
        where:{
            status:"Sold",
            buyer:"${currentAccount}" }) {
            ${getEquipMarket}
        }
    }`
    const query2 = gql`
      query{
        listingEquips(
          first:50,
          skip:0,
          where:{
              status:"Sold",
              seller:"${currentAccount}" }) {
              ${getEquipMarket}
          }
      }`
    let arr: any = []
    const p1 = getHttpData(query1)
    const p2 = getHttpData(query2)
    Promise.all([p1, p2]).then((res: any) => {
      arr = [...res[0].listingEquips, ...res[1].listingEquips]
      setHistoryData(arr)
    })
  }

  useEffect(() => {
    if (windowWidth < 900) {
      setOpenTableItem(true)
      setColumns([
        {
          dataIndex: 'Type',
          key: 'Type',
          title: 'Type',
          className: styles.pubLiccolumnHead,
          render(text: any, record: any) {
            return (
              <div>
                {currentAccount === record.seller.id && (
                  <div>{intl.get('historyTypeSell')}</div>
                )}
                {currentAccount === record.buyer.id && (
                  <div>{intl.get('historyTypeBuy')}</div>
                )}
              </div>
            )
          },
        },
        {
          dataIndex: 'quality',
          key: 'quality',
          title: intl.get('historyQuality'),
          className: styles.pubLiccolumnHead,
          render(text: any, record: any) {
            return (
              <div className={styles.qualityContain}>
                {record.Star === 1 && <img src={quUrl1} alt="" />}
                {record.Star === 2 && <img src={quUrl2} alt="" />}
                {record.Star === 3 && <img src={quUrl3} alt="" />}
              </div>
            )
          },
        },
        {
          dataIndex: 'price',
          key: 'price',
          title: intl.get('historyPrice'),
          className: styles.pubLiccolumnHead,
        },
        {
          dataIndex: 'soldTimestamp',
          key: 'Time',
          title: intl.get('historyTime'),
          className: styles.pubLiccolumnHead,
          defaultSortOrder: 'descend' as 'descend',
          sorter: (a: any, b: any) => parseInt(a.soldTimestamp) - parseInt(b.soldTimestamp),
          render(text: any, record: any) {
            return (
              record.buyer.id && (
                <Tooltip title={text}>
                  <div>{timeFormat(text)}</div>
                </Tooltip>
              )

            )
          },
        },
      ])
    } else {
      setOpenTableItem(false)
      setColumns(
        [
          {
            dataIndex: 'Type',
            key: 'Type',
            title: 'Type',
            className: styles.pubLiccolumnHead,
            render(text: any, record: any) {
              return (
                <div>
                  {currentAccount === record.seller.id && (
                    <div>{intl.get('historyTypeSell')}</div>
                  )}
                  {currentAccount === record.buyer.id && (
                    <div>{intl.get('historyTypeBuy')}</div>
                  )}
                </div>
              )
            },
          },
          {
            dataIndex: 'nft',
            key: 'nft',
            title: 'NFT',
            className: styles.pubLiccolumnHead,
            render(text: any, record: any) {
              return (
                <div className={styles.rowNft}>
                  <div><img src={getEquipImage(record?.Name)} alt="" /></div>
                  <div>#{record.token?.identifier}</div>
                  <div>{record.attr ? record.attr[0].Name : record.Name}</div>
                </div>
              )
            },
          },
          {
            dataIndex: 'quality',
            key: 'quality',
            title: intl.get('historyQuality'),
            className: styles.pubLiccolumnHead,
            render(text: any, record: any) {
              return (
                <div className={styles.qualityContain}>
                  {record.Star === 1 && <img src={quUrl1} alt="" />}
                  {record.Star === 2 && <img src={quUrl2} alt="" />}
                  {record.Star === 3 && <img src={quUrl3} alt="" />}
                </div>
              )
            },
          },
          {
            dataIndex: 'price',
            key: 'price',
            title: intl.get('historyPrice'),
            className: styles.pubLiccolumnHead,
          },
          {
            dataIndex: 'seller',
            key: 'seller',
            title: intl.get('historySeller'),
            className: styles.pubLiccolumnHead,
            render(text: any, record: any) {
              return (
                record.seller?.id && (
                  <Tooltip title={record.seller.id || ''}>
                    <div className={styles.publicColumnId}>{record.seller.id || ''}</div>
                  </Tooltip>
                )
              )
            },
          },
          {
            dataIndex: 'buyer',
            key: 'buyer',
            title: intl.get('historyBuyer'),
            className: styles.pubLiccolumnHead,
            render(text: any, record: any) {
              return (
                record.buyer.id && (
                  <Tooltip title={record.buyer.id}>
                    <div className={styles.publicColumnId}>{record.buyer.id || ''}</div>
                  </Tooltip>
                )

              )
            },
          },
          {
            dataIndex: 'soldTimestamp',
            key: 'Time',
            title: intl.get('historyTime'),
            className: styles.pubLiccolumnHead,
            defaultSortOrder: 'descend' as 'descend',
            sorter: (a: any, b: any) => parseInt(a.soldTimestamp) - parseInt(b.soldTimestamp),
            render(text: any, record: any) {
              return (
                record.buyer.id && (
                  <Tooltip title={text}>
                    <div>{timeFormat(text)}</div>
                  </Tooltip>
                )

              )
            },
          },
        ]
      )
    }
  }, [windowWidth])



  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setPaginations({
      ...paginations,
      total: historyData.length
    })
  }, [historyData])


  return (
    <div className={styles.historyContain}>
      <div className={styles.historyContent}>
        <Table
          style={{ width: '90%' }}
          rowKey="id" columns={columns}
          dataSource={historyData}
          pagination={paginations}
          expandable={{
            expandedRowRender: record =>
              <div style={{ margin: 0, display: 'flex', justifyContent: 'flex-start' }}>
                <div className={styles.rowNft} style={{ width: '60%' }}>
                  <div><img src={getHeroImage(record.Name)} alt="" /></div>
                  <div>#{record.token?.identifier}</div>
                  <div>{record.attr ? record.attr[0].Name : record.Name}</div>
                </div>
                <div style={{ width: '20%' }}>
                  <Tooltip title={record.seller.id || ''}>
                    <div className={styles.publicColumnId}>{record.seller.id || ''}</div>
                  </Tooltip>
                </div>
                <div style={{ width: '20%' }}>
                  <Tooltip title={record.buyer.id}>
                    <div className={styles.publicColumnId}>{record.buyer.id || ''}</div>
                  </Tooltip>
                </div>
              </div>,
            // rowExpandable: record => record.name !== 'Not Expandable',
            expandRowByClick: openTableItem,
            expandIconColumnIndex: -1,
          }}
          // 展开事件监听
          onExpand={expandChanges}
        />
      </div>


    </div>
  )
}
export default React.memo(MyHistory)
