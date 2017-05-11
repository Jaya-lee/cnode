import React, { Component } from 'react';
import axios from 'axios'
class Topic extends Component {
    constructor(){
        super();
        this.state={
            data:{}  //数据类型一定要和拿到的保持一致
        }
    }
    componentWillMount(){
        axios.get(`https://cnodejs.org/api/v1/topic/${this.props.match.params.id}`)  //拿到topics里的数据
        .then(res => this.setState({data:res.data.data}))
        //res.data里是axios封装的
    }
  render() {
      console.log(this.props.match.params.id);
    return (
        // 正常浏览器会自动渲染标签，但是react里有一个机制
            <div>
                <div dangerouslySetInnerHTML={{__html: this.state.data.content}}></div>
            </div>

    )
}
}

export default Topic;
