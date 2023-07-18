
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Site',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Page Views',
    dataIndex: 'value',
    key: 'value',
  },
];

const StatsListTop = ({array}) => {
  const [data, setData] = useState(array);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/google/top');
        // const { topPages } = response.data;

        const topPages = array

        const updatedRows = topPages.filter((item) => item.name.includes('/monument/'));

        const temp = await Promise.all(
          updatedRows.map(async (item) => {
            const id = item.name.replace('/monument/', '');
            const pageviews = item.value;
            const res = await axios.get(`http://localhost:5000/api/v1/monument/${id}`);
            // console.log("data=>",res.data[0].site);
            const site=res.data[0]?.site;
            console.log("site=>",site)
            return {
                site,
                pageviews,
              };
          })
        );

        console.log("temp==>>", temp)

        setData(temp.filter((item) => item.site !== undefined));

      } catch (error) {
        console.log('Error:', error);
      }
    };

    // fetchData();
  }, []);

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default StatsListTop;


// import React, { useEffect, useState } from 'react';
// import { Button, Space, Table, Tag } from 'antd';

// import axios from 'axios';

// const columns= [
//   {
//     title: 'Site',
//     dataIndex: 'site',
//     key: 'site',
//     // render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Sessions',
//     dataIndex: 'sessions',
//     key: 'sessions',
//   },
//   {
//     title: 'Users',
//     dataIndex: 'users',
//     key: 'users',
//   },
//   {
//     title: 'Page Views',
//     dataIndex: 'pageviews',
//     key: 'pageviews',
//   },

// ];

// const StatsList= ({rows}) =>{

//  const [data, setData] = useState([])

//   useEffect(()=>{

//     let temp = []

//     const updatedRows = rows.filter((item)=>{
//         if(item[0].includes("/monument/"))

//         return item;

//     })

//       axios.get("http://localhost:5000/api/v1/monument",
//     ).then((res)=>
//     {
//       console.log("res==>>", res.data)


//       updatedRows.map((item)=>{
//         {
//             const id = item[0].replace("/monument/", "");
//             const pageviews = item[7]

//             if(res.data.some(monu => monu._id == id)){

//                 const index = res.data.findIndex(monu => monu._id == id)

//                 temp.push({
//                     site:res.data[index]?.site,
//                     sessions:item[5],
//                     users:item[6],
//                     pageviews:pageviews,
//                 })
//             }
//         }
//       })

//       setData(temp)
//     })

    

//   },[])
// return <Table columns={columns} dataSource={data} />;

// }

// export default StatsList;