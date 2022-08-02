/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { InputNumber, message, Modal } from 'antd'

import styles from '../css/equipCard.module.less'
import { WalletManager } from '@/utils/walletManager'
import { Wallet } from '@/utils/types'
import { getQualityImage } from '@/utils/markPlace/hero'
import { getEquipBgImage } from '@/utils/markPlace/equip'
import { getAttribute } from '@/utils/markPlace/attribute'
import { pressData } from '@/utils/markPlace/pressData'
// BNB
import bnbUrl from '@/asset/img/markPlace/bnb.png'
import PaginationComponent from '../../component/PaginationComponent'

const MyEquip = (props: any) => {
    const { equipData, setEquipData, currentAccount, getEquipImage, nowEquipStatus, paginations, setPaginations } = props
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [nowInShop, setNowInShop] = useState<any>()
    const [buttonText, setButtonText] = useState<string>('')
    const [nowPrice, setNowPrice] = useState<any>()

    const oldList = localStorage.getItem('equipAuth') || null
    const newList = oldList ? JSON.parse(oldList) : null

    useEffect(() => {
        if (newList && newList[currentAccount]) {
            setButtonText('Sell')
        } else {
            setButtonText('Approve')
        }
    }, [nowEquipStatus])

    // 点击卡片的回调
    const cardHandler = (val: any) => {
        setNowInShop(val)
        setIsModalVisible(true)
    }
    //  模态框隐藏回调
    const modalCancel = () => {
        setIsModalVisible(false)
        setNowPrice(null)
    }
    // 授权或出售
    const isAuthOrSell = () => {
        if (buttonText === "Approve") {
            WalletManager.instance.approveAllKsNft(true, (err: Error, data: Wallet) => {
                if (err) {
                    message.warn('Authorization failure')
                }
                if (data) {
                    if (newList) {
                        const obj = newList
                        obj[currentAccount] = true
                        localStorage.setItem('equipAuth', JSON.stringify(obj))
                    } else {
                        const obj: any = {}
                        obj[currentAccount] = true
                        localStorage.setItem('equipAuth', JSON.stringify(obj))
                    }
                    message.success('Authorization success')
                    setButtonText('Sell')
                }
            })
        } else {
            if (nowPrice) {
                console.log(nowInShop.identifier);
                WalletManager.instance.addListing(true, `${nowInShop.identifier}`, nowPrice, (err: Error, data: Wallet) => {
                    if (err) {
                        if (err.message === 'not connected!') {
                            message.warn('Please link your wallet first')
                        } else {
                            message.error('Contact technical personnel to repair the fault')
                        }
                    }
                    if (data) {
                        message.success('Sell successs')
                        let arr = equipData.filter((item: any) => item.identifier !== nowInShop.identifier)
                        setEquipData(arr)
                        if (paginations.current * paginations.pageSize % arr.length === 0) {
                            setPaginations({
                                ...paginations,
                                current: paginations.current - 1 || 1,
                            })
                        }
                        setPaginations({
                            ...paginations,
                            total: paginations.total - 1,
                        })
                        setIsModalVisible(false)
                        setNowPrice(null)
                    }
                })
            } else {
                message.warn('Please enter price')
            }
        }
    }

    return (
        <div className={styles.nftContain}>
            <div className={styles.cardsContion}>
                <div className={styles.gridContain}>
                    {equipData && equipData.length > 0 && (
                        pressData(equipData, paginations.current, paginations.pageSize).map((item: any, index: any) => (
                            <div key={index} className={styles.cardItem}>
                                <div className={styles.cardsContent}>
                                    {item.attr && (
                                        <div
                                            className={styles.nftCard}
                                            onClick={() => { cardHandler(item) }}
                                            style={{ backgroundImage: `url(${getEquipBgImage(item.attr[0]?.Star)})` }}
                                        >
                                            <div className={styles.nftHeader} style={{ backgroundImage: `url(${getEquipImage(item.attr[0]?.Name)})` }} />
                                            <div className={styles.nftFooter}>
                                                <div className={styles.nftName}>
                                                    <div className={styles[`nftNameContent_${getQualityImage(item.attr[0]?.Star)}`]}>
                                                        <span>lv{item.lv}</span>
                                                        <span>{item.attr[0].Name}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.nftAttribute}>
                                                    <div className={styles.nftAttributeContent}>
                                                        <div className={styles.nftAttributeItem} style={{ color: '#ff7d85' }}>
                                                            <div style={{ width: '100%' }}>
                                                                <img src={getAttribute("AT")} alt="" /> AT {item.attr[0].Ap}
                                                            </div>
                                                        </div>
                                                        <div className={styles.nftAttributeItem} style={{ color: '#fc9e10' }}>
                                                            <div style={{ width: '100%' }}>
                                                                <img src={getAttribute("DE")} alt="" /> DE {item.attr[0].Def}
                                                            </div>
                                                        </div>
                                                        <div className={styles.nftAttributeItem} style={{ color: '#bfa4ff' }}>
                                                            <div style={{ width: '100%' }}>
                                                                <img src={getAttribute("LU")} alt="" /> LU {item.attr[0].Luck}
                                                            </div>
                                                        </div>
                                                        <div className={styles.nftAttributeItem} style={{ color: '#52ff4c' }}>
                                                            <div style={{ width: '100%' }}>
                                                                <img src={getAttribute("HP")} alt="" /> HP {item.attr[0].Hp}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ))
                    )}
                </div>
                <PaginationComponent paginations={paginations} type="Equips" />
            </div>

            <div className={styles.sellContian}>
                {/* Sell */}
                <Modal
                    className={styles.sellContian}
                    width={'40rem'}
                    footer={null}
                    onCancel={() => { modalCancel() }}
                    visible={isModalVisible}
                    okText={buttonText}
                    cancelText="Exit"
                >
                    {currentAccount && nowInShop && (
                        <div className={styles.myNft}>
                            <div className={styles.myNftTop}>
                                <div>出售</div>
                            </div>
                            <div className={styles.myNftBottom}>
                                <div className={styles.myNftBottomContent}>
                                    <div className={styles.myNftLeft}>
                                        <div className={styles.nftCard} style={{ backgroundImage: `url(${getEquipBgImage(nowInShop.attr[0]?.Star)})` }} >
                                            <div className={styles.nftHeader} style={{ backgroundImage: `url(${getEquipImage(nowInShop.attr[0]?.Name)})` }} />
                                            {/* styles[`nftAttr_${getQualityImage(nowInShop.attr[0]?.Star)}`] */}
                                            <div className={[styles.nftFooter].join(' ')} >
                                                <div className={styles.nftName}>
                                                    <div className={[nowInShop.attr[0]?.Star === 1 ? styles.nftNameContent_R : nowInShop.attr[0]?.Star === 2 ? styles.nftNameContent_SR : styles.nftNameContent_SSR].join(' ')}>
                                                        <span>lv{nowInShop.lv}</span>
                                                        <span>{nowInShop.attr[0]?.Name}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.nftAttribute}>
                                                    <div className={styles.nftAttributeContent}>
                                                        <div className={styles.nftAttributeItem} style={{ color: '#ff7d85' }}><img src={getAttribute("AT")} alt="" /> AT {nowInShop.attr[0]?.Ap}</div>
                                                        <div className={styles.nftAttributeItem} style={{ color: '#fc9e10' }}><img src={getAttribute("DE")} alt="" /> DE {nowInShop.attr[0]?.Def}</div>
                                                        <div className={styles.nftAttributeItem} style={{ color: '#bfa4ff' }}><img src={getAttribute("LU")} alt="" /> LU {nowInShop.attr[0]?.Luck}</div>
                                                        <div className={styles.nftAttributeItem} style={{ color: '#52ff4c' }}><img src={getAttribute("HP")} alt="" /> HP {nowInShop.attr[0]?.Hp}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.myNftRight}>
                                        <div className={styles.myNftRightContain}>
                                            <div className={styles.text}>请输入出售价格</div>
                                            <div className={styles.price}>
                                                <div>
                                                    <img src={bnbUrl} alt="" />
                                                    <InputNumber value={nowPrice} style={{ width: '60%', border: 'none', margin: '0 0.2rem 0 0.2rem' }} min={0} controls={false} onChange={(val: number) => {
                                                        setNowPrice(val)
                                                    }}>
                                                    </InputNumber>
                                                    <span> BNB</span>
                                                </div>
                                            </div>
                                            <div className={styles.sureSell}>
                                                <div onClick={() => { isAuthOrSell() }}>
                                                    {buttonText}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    )
}
export default MyEquip

