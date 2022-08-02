import { useState } from 'react'
import { Button, Dropdown, Menu, Tooltip } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import styles from '../css/publicHeader.module.less'
import logoImg from '@/asset/img/header/logo.png'
import Login from '@/pages/Login'
import { allMenu } from '@/config/menu'
import Cookie from 'react-cookies'
import intl from 'react-intl-universal'
import {
    UserOutlined,
    DownOutlined,
} from '@ant-design/icons'
import { stringStr } from '@/utils/cutString'
import React from 'react'

const PublicHeader = (props: any) => {
    const { currentAccount, isConnected, connectWallet,windowWidth } = props
    const [openKeys, setOpenKeys] = useState<any>([''])
    // const [defaultLanguage, setDefaultLanguage] = useState<string>('')
    const rootSubmenuKeys: any = new Set(['sub1', 'sub2', 'sub3', 'sub4', 'sub5'])
    const location = useLocation()
    // const [collapsed, setCollapsed] = useState(true)
    // const [tabList, setTabList] = useState<any>([])

    const getMenuNodes = (menuList: any) =>
        menuList.length > 0 &&
        menuList.map((item: any) => {
            return (
                // <Menu.Item key={item.key} icon={item.icon ? iconMap[item.icon] : ''}>
                <Menu.Item key={item.key}>
                    <NavLink to={item.key}> { intl.get(item.title)}</NavLink>
                </Menu.Item>
            )
        })
    // const language = intl.get('selectLanguage')
    let currentLocale = intl.determineLocale({
        cookieLocaleKey: "lang"
      })
      // 多语言 -当前语言
    // console.log(currentLocale);
   
    const topMenuList = (
        <Menu
            onClick={(e: any) => {
                Cookie.save('lang', e.key, { path: '/' })
                window.location.reload()
            }}
            defaultValue={currentLocale}
        >
            <Menu.Item key="zh-CN" icon={<UserOutlined />} >
                中文
            </Menu.Item>
            <Menu.Item key="en-US" icon={<UserOutlined />}>
                English
            </Menu.Item>
            <Menu.Item key="ja-JP" icon={<UserOutlined />}>
                日本语
            </Menu.Item>
        </Menu>
    )
    const onOpenChange = (keys: React.ReactText[]) => {
        const latestOpenKey = keys.find((key) => !openKeys.includes(key))
        if (!rootSubmenuKeys.has(latestOpenKey)) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }
    var loginWallet = function () {
        connectWallet(false)
    }
    // useEffect(() => {
    //     const { pathname } = location
    //     const obj = allMenu.find((item: any) => item.key === pathname)
    //     // if (obj?.children) {
    //     //   setTabList([])
    //     // }
    //   }, [location])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.headerLeft}>
                <div className={styles.headerLogo}>
                    <img src={logoImg} alt="" />
                </div>
                <div className={styles.headerMenu}>
                    <Menu
                        style={{
                            border: 'none',
                            fontSize: '1.5rem',
                        }}
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        // onClick={(val) => {
                        //     const obj: any = allMenu.find(
                        //         (item: any) => item.key === val.key
                        //     )
                        //     // obj.children ? setTabList(obj.children) : setTabList([])
                        // }}
                        >
                        {getMenuNodes(allMenu)}
                    </Menu>
                </div>
            </div>
            <div className={styles.headerRight}>
                        <div className={styles.address}>
                        <Tooltip title={currentAccount}>
                            {currentAccount?stringStr(currentAccount):''}
                        </Tooltip>
                    </div>
                <div>
                    {!isConnected&& (
                        <Login onLogin={loginWallet}></Login>
                    ) }
                </div>
                <div>
                    <Dropdown overlay={topMenuList}>
                        <div style={{ cursor: 'pointer' }}>
                            {windowWidth < 1200 && (
                                <i className={styles.iconfont} >&#xe642;</i>
                            )}
                            {windowWidth >= 1200 && (
                                <Button>
                                    {intl.get('selectLanguage')} <DownOutlined />
                                </Button>
                            )}
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}
export default React.memo(PublicHeader)