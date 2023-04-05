import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';

import axios from 'axios';

const columns= [
  {
    title: 'Site',
    dataIndex: 'site',
    key: 'site',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Village',
    dataIndex: 'village',
    key: 'village',
  },
  {
    title: 'Taluka',
    dataIndex: 'taluka',
    key: 'taluka',
  },
  {
    title: 'Sno',
    dataIndex: 'sno',
    key: 'sno',
  },
  {
    title: 'SubDiv',
    dataIndex: 'subdiv',
    key: 'subdiv',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Police Station',
    dataIndex: 'ps',
    key: 'ps',
  },
  // {
  //   title: 'Category',
  //   key: 'category',
  //   dataIndex: 'category',
  //   render: (_, { category }) => (
  //     <>
  //       {category.map((tag) => {
  //         let color = 'geekblue'
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: '',
    key: 'action',
    render: (item) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <Button onClick={()=> window.location.href = `/update/${item._id}`} >Update</Button>
      </Space>
    ),
  },
  {
    title: '',
    key: 'action',
    render: (item) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <Button onClick={()=> {
          try{
            axios.delete(`http://localhost:5000/api/v1/monument/${item._id}`).then((res)=>{
              console.log("deleted==>>", res)
              window.location.href = "/"
            })
          }catch(e){
            console.log("error==>>", e)
          }
        }} >Delete</Button>
      </Space>
    ),
  },
];

const MonumentList= () =>{

 const [data, setData] = useState([])

  useEffect(()=>{



      axios.get("http://localhost:5000/api/v1/monument",
    ).then((res)=>
    {
      console.log("res==>>", res.data)
      setData(res.data)
    })

    

  },[])
return <Table columns={columns} dataSource={data} />;

}

export default MonumentList;