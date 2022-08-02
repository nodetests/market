import React,{useEffect} from "react"
import { SpinePlayer } from '@esotericsoftware/spine-player';
import { message } from 'antd';
import { BaseUrl } from "@/config/baseUrl";

const heroModalUrl = BaseUrl.REACT_APP_HEROMODEL

const Spine =(props) =>{
    const {heroModelName} = props
    useEffect(() =>{
        console.log(heroModelName);
        if(heroModelName){
            new SpinePlayer('player-container', {
                jsonUrl: `${heroModalUrl}/${heroModelName}.json`,
                atlasUrl: `${heroModalUrl}/${heroModelName}.atlas`,
                animation:"daiji",
                // animations: ["aida"],
                premultipliedAlpha: false,
                // backgroundColor: '#1e2749',
                alpha: true, 
                backgroundColor: "#00000000",
                // viewport: {
                //     debugRender: false,
                // },
                skin:heroModelName === 'hero_yuhongyi' || heroModelName === 'hero_suqianru' ?'skin_01' :'default',
                showControls: false,
                // debug: {
                //     bones: true, 
                //     regions: true,
                //     meshes: true,
                //     bounds: true,
                //     paths: true,
                //     clipping: true,
                //     points: true,
                //     hulls: true
                //  }
                // success: function (player) {
                //     player.setAnimation("run", true);
                //  },
                 error: function (player, reason) {
                   message.warn('加载超时')
                 }
            })
        }
     
    },[heroModelName])
    return (<div  style={{opcity:'0.8'}} id="player-container" />)
}
export default Spine


