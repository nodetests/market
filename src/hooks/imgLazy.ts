/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'

const useIntersectionObserver = (domList:any, deps:any) => {
    // 接收两个参数，dom元素的class和指定交叉比例(threshold)的依赖项
    const ioRef = useRef<any>()
    let arr:any = []
    arr = domList.filter((item:any) => item)
    arr.forEach((item:any)  => ioRef.current.observe(item)); // observe 开始观察，接受一个DOM节点对象

    useEffect(() => {
        ioRef.current = new IntersectionObserver((entries) => { // 观察者
            entries.forEach((item) => { // entries 是被监听的dom集合，是一个数组
                if (item.intersectionRatio <= 0) 
                return // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
                const { target }:any = item
                target.src = target.dataset.src // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
            })
        }, {
            threshold: deps // 用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]。
        });

        return () => {
            ioRef.current.disconnect(); // 关闭观察器
        }
    }, [])

}

export default useIntersectionObserver
