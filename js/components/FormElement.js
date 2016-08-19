/**
 * @author [xiege]
 * @description [退、换货、退款公用表单]
 */
import React,{Component} from 'react'
export default function FormElement(props){
    let {checked,title,data,content} = props.data;
    return (
        <form className="return-money">
            <h2 className="address-title">{title}</h2>
            {data.map((item,index)=>{
                return (
                    <label className={checked == index ? "checked" : ""} key={index}>
                        <input type="radio" name="abandon_reason" defaultValue={index} />{item}
                    </label>
                )
            })}
            {content!=undefined?(
                <div>
                    <textarea name="content" placeholder="给卖家留言" defaultValue={content} ></textarea>
                    <p>还可以输入<span>{50-content.length}</span>个字符</p>
                </div>
            ):""}
        </form>
    )
}