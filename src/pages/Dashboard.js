import React from 'react'
import PieChart from "../components/PieChart"
import BarChart from "../components/BarChart"
import { useState } from 'react'
import { useEffect } from 'react'
import Card from '../components/Card'
import { Col, Row } from 'antd'
import axios from 'axios'
import StatsList from './StatsList'

const Dashboard = () => {

    const [data, setData] = useState({})

    const [chartData, setChartData] = useState([])

    const [barChartData, setBarChartData] = useState([])

    useEffect(()=>{
        try{
        axios.get("http://localhost:5000/google/trial").then((res,err)=>{

        if(err){
            console.log("err==>>", err)
            return
        }

        console.log("res==>>", res.data.response.data)

        setData(res.data.response.data)
        let temp = []
        res.data.response.data?.rows.map((item)=>{
            temp.push({
                name: item[0],
                value: parseInt(item[7])
            })
        })

        setChartData(temp)

        let bartemp = []
        res.data.response.data?.rows.map((item)=>{
            bartemp.push({
                name: item[0],
                pageviews: parseInt(item[7])
            })
        })

        setBarChartData(bartemp)

        })

    }catch(e){
        console.log("err", e)
    }

    },[])

  return (
    <>
    {
    data?.totalsForAllResults
     && (<><Row gutter={5}>
        <Col span={8}><Card title="Sessions" value={data?.totalsForAllResults["ga:sessions"]} /></Col>
        <Col span={8}><Card title="Users" value={data?.totalsForAllResults["ga:users"]}/></Col>
        <Col span={8}><Card title="Page Views" value={data?.totalsForAllResults["ga:pageviews"]}/></Col>
    

    </Row>
    <h1>Per Page View Statistics</h1>
    <Row style={{marginTop:"5%"}} justify="space-between">
        
    <PieChart data={chartData} />
    <StatsList rows={data.rows} />
    </Row>

    <h1>Bar Graph Representation</h1>
    <Row>
    <BarChart data={barChartData}/>
    </Row>
    
    </>)}

    
    </>
  )
}

export default Dashboard