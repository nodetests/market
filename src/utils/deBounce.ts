export const deBounce =(func: any, wait: any)=> {
      let timmer: any = null;
      return function (...args: any) {
        clearTimeout(timmer);//一定要清除定时器
        timmer = setTimeout(() => {
          func(...args);
        }, wait);
      };
}