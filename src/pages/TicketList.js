import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';

import axios from 'axios';

const columns= [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Monument',
    dataIndex: 'monument_id',
    key: 'monument_id',
    render: async(monument_id) =>{

    const res = await axios.get(`http://localhost:5000/api/v1/monument/${monument_id}`)
    console.log("hi==>>", res.data[0].site)

    return await (<h1>{res.data[0].site}</h1>)

     }
  },
  { 
    title: 'Tickets',
    dataIndex: 'tickets',
    key: 'tickets',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },

  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) =>{ 
        return(
      <>

            <Tag color={"geekblue"} key={status}>
              {status?.toUpperCase()}
            </Tag>  

      </>
    )
    }

  },
//   {
//     title: 'Owner',
//     dataIndex: 'owner',
//     key: 'owner',
//   },
//   {
//     title: 'Police Station',
//     dataIndex: 'ps',
//     key: 'ps',
//   },
//   {
//     title: 'Status',
//     key: 'status',
//     dataIndex: 'status',
//     render: (_, { category }) => (
//       <>
//         {category.map((tag) => {
//           let color = 'geekblue'
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: '',
//     key: 'action',
//     render: (item) => (
//       <Space size="middle">
//         <Button onClick={()=> window.location.href = `/update/${item._id}`} >Update</Button>
//       </Space>
//     ),
//   },
//   {
//     title: '',
//     key: 'action',
//     render: (item) => (
//       <Space size="middle">
//         <Button onClick={()=> {
//           try{
//             axios.delete(`http://localhost:5000/api/v1/monument/${item._id}`).then((res)=>{
//               console.log("deleted==>>", res)
//               window.location.href = "/"
//             })
//           }catch(e){
//             console.log("error==>>", e)
//           }
//         }} >Delete</Button>
//       </Space>
//     ),
//   },
];

const TicketList= () =>{

 const [data, setData] = useState([])

  useEffect(()=>{



      axios.get("http://localhost:5000/api/v1/ticket",
    ).then((res)=>
    {
      console.log("res==>>", res.data)
      setData(res.data)
    })

    

  },[])
return <Table columns={columns} dataSource={data} />;

}

export default TicketList;