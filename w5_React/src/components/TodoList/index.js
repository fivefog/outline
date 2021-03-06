import React,{Component} from 'react';

import PropTypes from 'prop-types';

import TodoForm from './TodoForm';
import TodoContent from './TodoContent';

import MyContext from './MyContext'

class TodoList extends Component{
    constructor(){
        super();

        // state
        this.state = {
            data : [{
                key:1,
                content:'完成一个小目标，挣她一个亿',
                date:'2019-9-10',
                done:false
            },{
                key:2,
                content:'迎娶白富美，走上人生疯癫',
                date:'2029-9-10',
                done:false
            }]
        }

        // 常规做法：在constructor中统一改变事件处理函数的this指向
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
    }

    // 添加
    addItem(content){
        let data = [...this.state.data];
        data.unshift({
            key:data.length+1,
            content,
            date:Date.now(),
            done:false
        })
        this.setState({
            data
        })
    }

    // 删除
    removeItem(idx){
        // let data = [...this.state.data];
        // data.splice(idx,1)
        let data = this.state.data.filter((item,i)=>{
            return i != idx
        });
        this.setState({
            data
        })
    }

    // 修改
    completeItem(idx){console.log('complete:',idx)
        let data = this.state.data.map((item,i)=>{
            if(i === idx){
                item.done = true
            }
            return item
        })
        this.setState({
            data
        })
    }

    render(){
        let {removeItem,completeItem} = this;
        return (
            <div style={{padding:'15px'}}>
                {/* 2. 利用Provider的value属性给子组件提供数据 */}
                <MyContext.Provider value={{removeItem,completeItem,username:'laoxie'}}>
                    <TodoForm addItem={this.addItem}/>
                    <TodoContent 
                    data={this.state.data} 

                    username='laoxie'
                    age={26}
                    />
                </MyContext.Provider>
            </div>
        )
    }
}


export default TodoList;