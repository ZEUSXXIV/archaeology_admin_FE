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
    title: 'Sessions',
    dataIndex: 'sessions',
    key: 'sessions',
  },
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'users',
  },
  {
    title: 'Page Views',
    dataIndex: 'pageviews',
    key: 'pageviews',
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

];

const StatsList= ({rows}) =>{

 const [data, setData] = useState([])

  useEffect(()=>{

    let temp = []

    const updatedRows = rows.filter((item)=>{
        if(item[0].includes("/monument/"))

        return item;

    })

      axios.get("http://localhost:5000/api/v1/monument",
    ).then((res)=>
    {
      console.log("res==>>", res.data)


      updatedRows.map((item)=>{
        {
            const id = item[0].replace("/monument/", "");
            const pageviews = item[7]

            if(res.data.some(monu => monu._id == id)){

                const index = res.data.findIndex(monu => monu._id == id)

                temp.push({
                    site:res.data[index]?.site,
                    sessions:item[5],
                    users:item[6],
                    pageviews:pageviews,
                })
            }
        }
      })

      setData(temp)
    })

    

  },[])
return <Table columns={columns} dataSource={data} />;

}

export default StatsList;