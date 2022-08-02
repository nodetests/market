import { Pagination } from "antd"

interface propsType{
    paginations:any,
    type:string
}
const PaginationComponent  = (props:propsType) =>{
    const {paginations,type} = props
    return (
        <div>
            <div style={{marginTop:'36px',display:'flex',justifyContent:'space-between'}}>
                <div>{paginations?.total || 0} {type} NFTs</div>
                <Pagination
                hideOnSinglePage
                simple
                size="small"
                {...paginations}
                />
            </div>
        </div>
    )
   
}
export default PaginationComponent