import React, { Component } from 'react';
import { Table, Divider, Tag, Button, Modal} from 'antd';
import { Tooltip } from 'antd';
export default class Tab extends Component {
    constructor(){
        super();
        this.state={
           data:[],
           url:''
        }
    }
    componentDidMount(){
        fetch('http://www.mocky.io/v2/5b766d7b3000005700848af9')
        .then(res=>res.json())
        .then(data=>{
            console.log(data.apis)
            this.setState({data:data.apis})
        })

    }
    showModal = (data) => {
      console.log(data);
      this.setState({
        visible: true,
        url:data.url
      });
    }
  
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  
    render() {
        const columns = [
            {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
          }, 
          {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 150,
            render:image => (
                <span>
                 <img src={image}  alt=""/>
                </span>
            )
          },{
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            className:'a',
            render:description=>(
              <Tooltip placement="topLeft" title={description}>
                {description}
              </Tooltip>
            )
            }, {
            title: 'URL',
            key: 'humanURL',
            dataIndex: 'humanURL',           
            width: 80,
            render:humanUrl=>(
              <span>
                <a href={humanUrl}>链接</a>
              </span>
            )
            }, {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 300,
            render: tags => (
                    <span>
                      {tags.map(tags => <Tag color="blue" key={tags}>{tags}</Tag>)}
                    </span>
                  ),
           
          },
          {
            title: 'properties',
            dataIndex: 'properties',
            key: 'properties',
            width: 150,
            render: properties => (
                    <span>
                      {properties.map(value => <Button onClick={()=>{this.showModal(value)}} color="blue" key={value.type}>{value.type}</Button>)}
                    </span>
                  ),
           
          }];
          
          const data = this.state.data
        return (
          <div>
            <Table  columns={columns} dataSource={data} pagination={{ 
                total:this.state.data.length, 
                pageSize: 3,  
                defaultPageSize:3,
              }  }/>
              <Modal
                title="链接"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <a href={this.state.url}>{this.state.url}</a>
              </Modal>
          </div>
        )
    }
}

