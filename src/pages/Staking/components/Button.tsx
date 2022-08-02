import React from "react";

const ButtonTest =(props:any) => {
 const {onClickButton,children} =props
    return (
        <div>
         <>
        <button style={{background:'#000',margin:'10px'}} onClick={onClickButton}>{children}</button>
            <span>{Math.random()}</span>
         </>
        </div>
    )
}
export default React.memo(ButtonTest)
//  这里或许会注意到 Button 组件的 React.memo 这个方法，此方法内会对 props 做一个浅层比较，如果如果 props 没有发生改变，则不会重新渲染此组件。
// import React from 'react';
// const ButtonTest = ({ onClickButton, children }:any) => {
//     return (
//       <>
//         <button onClick={onClickButton}>{children}</button>
//         <span>{Math.random()}</span>
//       </>
//     );
//   };
  
//   export default React.memo(ButtonTest);