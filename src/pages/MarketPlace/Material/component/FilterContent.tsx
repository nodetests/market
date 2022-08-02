import { Checkbox, Divider, Drawer} from "antd"
import intl from 'react-intl-universal'
import styles from '../css/filterContent.module.less'
import gloStyle from '@/asset/css/global.module.less'
import { DoubleRightOutlined } from '@ant-design/icons'
// QualityArr图片
import quUrl1 from '@/asset/img/markPlace/N.png'
import quUrl2 from '@/asset/img/markPlace/R.png'
import quUrl3 from '@/asset/img/markPlace/SR.png'
import quUrl4 from '@/asset/img/markPlace/SSR.png'
import { useState } from "react"


// QuArr
const qualityArr = [
    { id: 1301, url: quUrl1, name: '武器' },
    { id: 1302, url: quUrl2, name: '帽子' },
    { id: 1303, url: quUrl3, name: '衣服' },
    { id: 1304, url: quUrl4, name: '鞋子' },
]

// interface propType{
//     nowEquipType:string,
//     setNowEquipType:any,
//     openFilterMenu:boolean
    
// }

const FilterContent =(props:any) =>{
    const {setNowEquipType,openFilterMenu} = props
    const [openVisible, setOpenVisible] = useState<boolean>(false)

    const filterMenus =(
        <div className={styles.filterContain}>
        <div className={styles.filterContent}>
            <div className={styles.floor1}>
                <div className={styles.floor1Content}>
                    <div>{intl.get("filterTool")}</div>
                    <div>{intl.get("clearFilter")}</div>
                </div>
                <Divider className={styles.floorLine}></Divider>
            </div>
            <div className={styles.floor2}>
                <div className={[gloStyle.mt1, gloStyle.flbt].join(' ')}>
                    <div className={styles.floor2Right}>
                        <div className={styles.floor2Title}>Type</div>
                        <div className={styles.floo2Check}>
                            <Checkbox.Group onChange={(val) => { setNowEquipType(val)  }}>
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
        </div>
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
export default FilterContent