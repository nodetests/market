import AT from '@/asset/img/markPlace/icon_1.png'
import DE from '@/asset/img/markPlace/icon_2.png'
import HP from '@/asset/img/markPlace/icon_3.png'
import LU from '@/asset/img/markPlace/icon_4.png'

export const getAttribute = (val:any) => {
 if(val ==='AT'){
     return AT
 }else if(val ==='DE'){
     return DE
 }else if(val === 'HP'){
     return HP
 }else{
     return LU
 }
}