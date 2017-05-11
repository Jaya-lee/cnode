import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class Log extends React.Component{
    constructor(){
        super();
        this.state={
            login:false,     //未登录状态
            uesr:{}
        }
    }
    login(){  //点击后发ajax请求，拿到响应，或者报错
        let token=this.input.value;
        console.log(token)
        axios.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:token})
        .then(res =>this.setState({uesr:res.data,login:true}))
        .catch(err =>alert(err))
    }
    render(){
        return(
            <div style={{display:'flex',justifyContent: 'spaceBetween'}}>
                 <h1>cnode　中文社区</h1>
                 {
                     this.state.login ? <h1 style={{fontSize:'14px'}}>欢迎您<Link
                          to={`/user/${this.state.uesr.loginname}`}>{this.state.uesr.loginname}</Link></h1>　:
                    <div>
                        <input ref={input=>this.input=input}/>
                        <button onClick={this.login.bind(this)}>登录</button>
                    </div>
                }
            </div>
        )
    }
}
export default Log;
