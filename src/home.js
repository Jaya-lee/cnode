import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Log from './log.js'
class Home extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
            tab:'',
            tabs:['','good','share','ask','job'],
            page:1
        }
    }
    loadData(tab='',page=1){
        axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}`)  //拿到topics里的数据
        .then(res => this.setState({data:res.data.data}))
        //res.data里是axios封装的
    }
    componentWillMount(){
        this.loadData()
    }
    handleClick(tab){
        // axios.get('https://cnodejs.org/api/v1/topics?tab='+tab)  //拿到topics里的数据
        // .then(res => this.setState({data:res.data.data}))
        this.setState({tab})
        this.loadData(tab)
        console.log(tab)
    }
    select(page){
        this.setState({page}) //点击按钮上的数字是几，就显示第几页
        this.loadData(this.state.tab,page) //引进来
    }
    render(){
        let obj={
            share:'分享',
            ask:'问答',
            job:'招聘',
            good:'精华'
        }
        let style1={ //li中置顶和精华的样式
            background: '#80bd01',color:'#fff'
        }
        let style2={　//li中剩余别的样式
            background: '#e5e5e5',color:'#999'
        }
        let style3={ //顶部切换时点击按钮的样式
            background: '#80bd01',color:'#fff',padding:'2px',borderRadius:'3px'
        }
        let btns=[];
        for(let i=0;i<5;i++){  //底部５个按钮，分页
            let newPage=this.state.page< 3 ? i+1
            : this.state.page+i-2
            btns.push(
                <button key={newPage} className='page' style={{color:this.state.page===newPage?'#80bd01':'#999'}}
                onClick={this.select.bind(this,newPage)}>{newPage}</button>
            )
        }
        return(
            <div className='wrap'>
            <Log/>
            {　//上面的５个按钮，切换类别
                this.state.tabs.map((item,index) =>
                <a key={index} className='change'
                    onClick={this.handleClick.bind(this,item)}
                    style={this.state.tab===item?style3:{color:'#80bd01'}}>
                    {!item ? '全部':obj[item]}</a>
                )
            }
            <ul>
                {
                    this.state.data.length===0?'加载中.....':
                    this.state.data.map(item =>
                        <li key={item.id}>
                            <p>
                                <img src={item.author.avatar_url} alt='avatar'
                                    style={{width:'30px'}}/>
                                <span id='mes'>
                                    <span style={{fontSize:'14px',color:'#9e78c0'}}>{item.reply_count}/</span>
                                    <span style={{fontSize:'12px',color:'#b4b4b4'}}>{item.visit_count}</span>
                                </span>
                                <span style={item.top || item.good ? style1 : style2}>{item.top?'置顶': item.good?'精华':obj[item.tab]}</span>
                                {/* {item.top ? <span style={{background: '#80bd01',color:'#fff'}}>置顶</span>:
                                <span style={{background: '#e5e5e5',color:'#999'}}>{obj[item.tab]}</span>} */}
                                {/* <a id='link' href={`https://cnodejs.org/topic/${item.id}`}>{item.title}</a>  外链跳到外部，link跳到内部*/}
                                <Link id='link' to={`/topic/${item.id}`}>{item.title}</Link>
                            </p>
                            <span>{moment(item.create_at.slice(0,10)).fromNow()}</span>
                        </li>
                    )
                }
            </ul>
            {btns}
            </div>
        )
    }
}
export default Home;
