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
    dataIndex: 'monu_name',
    key: 'monu_name',
    // render: async(monument_id) =>{

    // const res = await axios.get(`http://localhost:5000/api/v1/monument/${monument_id}`)
    // console.log("hi==>>", res.data[0].site)

    // return await (<h1>{res.data[0].site}</h1>)

    //  }
  },
  { 
    title: 'Booked',
    dataIndex: 'tickets',
    key: 'tickets',
  },

  { 
    title: 'Visited',
    dataIndex: 'visited',
    key: 'visited',
    render: (visited) =>{ 
      return(
    <>
        {visited ? visited : "-"}
    </>
    )}
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
];

const TicketList= () =>{

 const [data, setData] = useState([])

  useEffect(()=>{



      axios.get("http://localhost:5000/api/v1/ticket",
    ).then((res)=>
    {
      console.log("res==>>", res.data)

      fetchData(res.data);

      // setData(res.data)
    })


    const fetchData = async (array) => {
      try {
        // const response = await axios.get('http://localhost:5000/google/top');
        // const { topPages } = response.data;


        const temp = await Promise.all(
          array.map(async (item) => {
            const id = item.monument_id;
            const pageviews = item.value;
            const res = await axios.get(`http://localhost:5000/api/v1/monument/${id}`);
            const site=res.data[0]?.site;
            item.monu_name = site

            console.log("monu name==>>", item)
            return item
          })
        );


        setData(temp)

      } catch (error) {
        console.log('Error:', error);
      }
    };



    

  },[])
return <Table columns={columns} dataSource={data} />;

}

export default TicketList;