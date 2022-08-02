/* eslint-disable react-hooks/rules-of-hooks */
import { Checkbox, Divider, Drawer, Form,InputNumber,Button } from "antd"
import React, {  useState } from "react"
import styles from '../css/FilterContent.module.less'
import gloStyle from '@/asset/css/global.module.less'
import { DoubleRightOutlined } from '@ant-design/icons'
import intl from 'react-intl-universal'
import { getAttribute } from "@/utils/markPlace/attribute"
// QualityArr图片
import quUrl1 from '@/asset/img/markPlace/N.png'
import quUrl2 from '@/asset/img/markPlace/R.png'
import quUrl3 from '@/asset/img/markPlace/SR.png'
import quUrl4 from '@/asset/img/markPlace/SSR.png'
// statusArr图片
// import statusUrl1 from '@/asset/img/markPlace/icon_effect_01.png'
// import statusUrl2 from '@/asset/img/markPlace/icon_effect_02.png'
// import statusUrl3 from '@/asset/img/markPlace/icon_effect_03.png'
// import statusUrl4 from '@/asset/img/markPlace/icon_effect_04.png'
// levelArr图片
import levelUrl1 from '@/asset/img/markPlace/icon_lv.png'

function filterContent(props: any) {
    const {
        openFilterMenu,
        nowlteAp, setNowlteAp,
        nowgteAP, setNowgteAP,
        nowlteDEF, setNowlteDEF,
        nowgteDEF, setNowgteDEF,
        nowlteHP, setNowlteHP,
        nowgteHP, setNowgteHP,
        nowlteLUCK, setNowlteLUCK,
        nowgteLUCK, setNowgteLUCK,
        filterStatus,setFilterStatus,
        nowlteLV,setNowlteLV,
        nowgteLV,setNowgteLV,
        // nowCamp,setNowCamp,
        nowQualitity,setNowQualitity,
        paginations,setPaginations
    } = props
    const [openVisible, setOpenVisible] = useState<boolean>(false)
    // const [nowQuality, setNowQuality] = useState<any>([])
    // QuArr
    const qualityArr = [
        { id: 1, url: quUrl1, name: 'N' },
        { id: 2, url: quUrl2, name: 'R' },
        { id: 3, url: quUrl3, name: 'SR' },
        { id: 4, url: quUrl4, name: 'SSR' },
    ]
    // statusArr
    const statusArr = [
        { id: '1', url: getAttribute("HP"), name: 'HP', type: 'eHP', typeArr: [nowgteHP, nowlteHP], nameArr: ['nowgteHP', 'nowlteHP'] },
        { id: '2', url: getAttribute("AT"), name: 'AT', type: 'eAp', typeArr: [nowgteAP, nowlteAp], nameArr: ['nowgteAP', 'nowlteAp'] },
        { id: '3', url: getAttribute("DE"), name: 'DEF', type: 'eDEF', typeArr: [nowgteDEF, nowlteDEF], nameArr: ['nowgteDEF', 'nowlteDEF'] },
        { id: '4', url: getAttribute("LU"), name: 'LU', type: 'eLUCK', typeArr: [nowgteLUCK, nowlteLUCK], nameArr: ['nowgteLUCK', 'nowlteLUCK'] },
    ]
    // levelArr
    const levelArr = [
        { id: '1', url: levelUrl1, name: 'Level' },
    ]
    const clearFilter =() =>{
        setNowlteAp()
        setNowgteAP()
        setNowlteDEF()
        setNowgteDEF()
        setNowlteHP()
        setNowgteHP()
        setNowlteLUCK()
        setNowgteLUCK()
        setNowlteLV()
        setNowgteLV()
        setNowQualitity([])
    
    }
    const gtNumberChange =(item:any,val:string)=>{
        switch (item.type) {
            case 'eHP':
                setNowgteHP(val)
                break;
            case 'eAp':
                setNowgteAP(val)
                break;
            case 'eDEF':
                setNowgteDEF(val)
                break;
            case 'eLUCK':
                setNowgteLUCK(val)
                break;
        }
    }
    const ltNumberChange =(item:any,val:string)=>{
        switch (item.type) {
            case 'eHP':
                setNowlteHP(val)
                break;
            case 'eAp':
                setNowlteAp(val)
                break;
            case 'eDEF':
                setNowlteDEF(val)
                break;
            case 'eLUCK':
                setNowlteLUCK(val)
                break;
        }
    }
   const gtLVChange =(val:number)=>{
    setNowgteLV(val)
   }
   const ltLVChange =(val:number)=>{
    setNowlteLV(val)
}
    const filterMenus = (
        <div className={styles.filterContent}>
            <div className={styles.floor1}>
                <div className={styles.floor1Content}>
                    <div>{intl.get("filterTool")}</div>
                    <div onClick={clearFilter}>{intl.get("clearFilter")}</div>
                </div>
                <Divider className={styles.floorLine}></Divider>
            </div>
            <div className={styles.floor2}>
                <div className={[gloStyle.mt1, gloStyle.flbt].join(' ')}>
                    <div className={styles.floor2Right}>
                        <div className={styles.floor2Title}>Quality</div>
                        <div className={styles.floo2Check}>
                            <Checkbox.Group value={nowQualitity} onChange={(val) => {
                                  let arr = val
                                  setNowQualitity(arr)
                                  setPaginations({
                                      current:1,
                                      ...paginations
                                  })
                                }}>
                                {qualityArr.map((item: any) => (
                                    <div key={item.id} className={styles.floo2CheckItem}>
                                        <Checkbox id={item.id} value={item.id}>
                                            <img src={item.url} alt={item.name} />
                                        </Checkbox>
                                    </div>
                                ))}
                            </Checkbox.Group>
                        </div>
                    </div>
                </div>
                <Divider className={styles.floorLine}></Divider>
            </div>
            <Form onFinish={(val) => {
                let num =filterStatus+1
               setFilterStatus(num)
            }}>
                <div className={styles.floor3}>
                    <div className={styles.floorTitle}>
                        Status
                    </div>
                    {statusArr.map((item: any) => (
                        <div key={item.id} className={[gloStyle.flst, styles.floor3Item].join(' ')}>
                            <div className={styles.floor3Left}>
                                <img src={item.url} alt="" />
                                <div className={styles.floor3Name}>
                                    {item.name}
                                </div>
                            </div>
                            <div className={styles.floor3Right}>
                                <InputNumber
                                    style={{ width: '100%', height: '1.5rem', backgroundColor: '#393b67' }}
                                    name={item.nameArr[0]}
                                    max={2000}
                                    value={item.typeArr[0]}
                                    onChange={(val) => { gtNumberChange(item,val) }}
                                />
                                <div>-</div>
                                <InputNumber
                                    max={2000}
                                    min={0}
                                    style={{ width: '100%', height: '1.5rem', backgroundColor: '#393b67' }}
                                    name={item.nameArr[1]}
                                    value={item.typeArr[1]}
                                    onChange={(val) => { ltNumberChange(item,val)}}
                                />

                            </div>
                        </div>
                    ))}
                    <Divider className={styles.floorLine}></Divider>
                </div>
                <div className={styles.floor3}>
                    {levelArr.map((item: any) => (
                        <div key={item.id} className={[gloStyle.flst, styles.floor3Item].join(' ')}>
                            <div className={styles.floor3Left}>
                                <img src={item.url} alt="" />
                                <div className={styles.floor3lvName}>
                                    {item.name}
                                </div>
                            </div>

                            <div className={styles.floor3Right}>
                                <InputNumber value={nowgteLV} onChange={(val:number) =>{gtLVChange(val)}} style={{ width: '100%', height: '1.5rem', backgroundColor: '#393b67' }} />
                                <div >-</div>
                                <InputNumber value={nowlteLV} onChange={(val:number) =>{ltLVChange(val)}} style={{ width: '100%', height: '1.5rem', backgroundColor: '#393b67' }} />
                            </div>
                        </div>
                    ))}
                    <Divider className={styles.floorLine}></Divider>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() =>{
                        setOpenVisible(false)
                    }}>
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

    return (
        !openFilterMenu ? (
            <div className={styles.filterContain}>
                {filterMenus}
            </div>
        ) : (
            <div 
                className={styles.filterContain} 
                onClick={(e) =>{
                    // e.preventDefault()
                    // e.stopPropagation()
                    // setOpenVisible(false)
                }}>
                <div className={styles.openIcon}><DoubleRightOutlined 
                   onClick={(e) => { 
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenVisible(true) }} 
                    /></div>
                <Drawer
                    maskClosable={true}
                    title={null}
                    placement="left"
                    closable={false}
                    onClose={() => { setOpenVisible(false) }}
                    visible={openVisible}
                    getContainer={false}
                    style={{ position: 'absolute'}}
                >
                    <div>
                        {filterMenus}
                    </div>
                </Drawer>
            </div>
        )

    )

}
export default React.memo(filterContent) 