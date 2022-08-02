import React, { useState } from "react";
import styles from './css/RankingList.module.less'
import gloStyle from '@/asset/css/global.module.less'
import { Table, Tooltip } from "antd";
// QualityArr图片
import quUrl1 from '@/asset/img/markPlace/R.png'
import quUrl2 from '@/asset/img/markPlace/SR.png'
import quUrl3 from '@/asset/img/markPlace/SSR.png'
function RankingList(props: any) {
    const { catData, paginations } = props
    const [nowStatus, setNowStatus] = useState<any>('1')
    // 市场类型数组
    const markTypeArr = [
        { id: '1', name: '交易排行榜' },
        { id: '2', name: '价格排行榜' },
    ]

    const columns = [
        {
            dataIndex: 'rank',
            key: 'rank',
            title: '排名',
            className: styles.columnHead
        },
        {
            dataIndex: 'nft',
            key: 'nft',
            title: 'NFT',
            render(text: any, record: any) {
                return <div className={styles.rowNft}>
                    <img style={{ maxHeight: '3rem' }} src={record.url} alt="" />
                    <div className={gloStyle.flcc}>
                        #{record.token?.identifier}
                    </div>
                    <div className={gloStyle.flcc}>Lv{record.lv}</div>
                    <div className={gloStyle.flcc}>{record.attr ? record.attr[0].Name : record.Name}</div>
                </div>
            },
        },
        {
            dataIndex: 'quality',
            key: 'quality',
            title: '品质',
            className: styles.columnHead,
            render(text: any, record: any) {
                return <div className={styles.qualityContain}>
                    {record.Star === 1 && (
                        <img src={quUrl1} alt="" />
                    )}
                    {record.Star === 2 && (
                        <img src={quUrl2} alt="" />
                    )}
                    {record.Star === 3 && (
                        <img src={quUrl3} alt="" />
                    )}
                </div>
            },

        },
        {
            dataIndex: 'price',
            key: 'price',
            title: '价格',
            className: styles.columnHead,
        },
        {
            dataIndex: 'master',
            key: 'master',
            title: '拥有者',
            className: styles.columnHead,
            render(text: any, record: any) {
                return (

                    <Tooltip title={record.id}>
                        <div style={{ width: '4rem', height: '2rem', textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'center', whiteSpace: 'nowrap' }}>{record.id}</div>
                    </Tooltip>

                )
            }
        },
    ]
    return (
        <div className={styles.rankContain}>
            <div className={styles.rankContent}>
                <div className={styles.rankHeader}>
                    <div className={gloStyle.flst}>
                        {markTypeArr.map((item: any) => (
                            <div key={item.id} className={[styles.markTypeItem, nowStatus === item.id ? styles.markTypeItemActive : null].join(' ')} onClick={() => {
                                setNowStatus(item.id)
                            }}>{item.name}</div>
                        ))}
                    </div>
                </div>
                <div className={styles.tableContent}>
                    <Table
                        rowKey="id"
                        dataSource={catData}
                        columns={columns}
                        pagination={paginations}
                    ></Table>
                </div>
            </div>
        </div>
    )
}

export default RankingList