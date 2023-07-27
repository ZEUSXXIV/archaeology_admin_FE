import React from "react";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import { Col, Row } from "antd";
import axios from "axios";
import StatsList from "./StatsList";

const Dashboard = () => {
  const [data, setData] = useState();

  const [chartData, setChartData] = useState([]);

  const [pieChartData, setPieChartData] = useState([]);

  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/google/ga4").then((res, err) => {
        if (err) {
          console.log("err==>>", err);
          return;
        }


        setData(res.data.response.rows[0]?.metricValues);


        // let temp = [];
        // res.data.response.data?.rows.map((item) => {
        //   temp.push({
        //     name: item[0],
        //     value: parseInt(item[7]),
        //   });
        // });

        // setChartData(temp);

        // let bartemp = [];
        // res.data.response.data?.rows.map((item) => {
        //   bartemp.push({
        //     name: item[0],
        //     pageviews: parseInt(item[7]),
        //   });
        // });

        // setBarChartData(bartemp);
 });
} catch (e) {
  console.log("err", e);
}

 try {
  axios.get("http://localhost:5000/google/ga4monu").then((res, err) => {
    if (err) {
      console.log("err==>>", err);
      return;
    }



    let temp = [];
    res.data?.response?.rows.map((item) => {
      temp.push({
        name: item.dimensionValues[0].value,
        value: parseInt(item.metricValues[2].value),
      });
    });


    const fetchData = async (array) => {
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
            const site=res.data[0]?.site;
            return {
                name:site,
                value:pageviews,
              };
          })
        );


        setPieChartData(temp.filter((item) => item.name !== undefined));

      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData(temp);


    setChartData(temp);


  });



    } catch (e) {
      console.log("err", e);
    }
  }, []);

  return (
    <>
      {data && (
        <>
          <Row gutter={5}>
            <Col 
            span={8}
            >
              <Card
                title="Sessions"
                value={parseInt(data[0]?.value)}
              />
            </Col>
            <Col 
            span={8}
            >
              <Card
                title="Users"
                value={data[3]?.value}
              />
            </Col>
            <Col 
            span={8}
            >
              <Card
                title="Page Views"
                value={data[2]?.value}
              />
            </Col>
          </Row>
          <h1>Per Page View Statistics</h1>
          <Row style={{ marginTop: "5%" }} justify="space-between">
            <PieChart data={pieChartData} />
            <StatsList array={pieChartData} />
          </Row>

          <h1>Bar Graph Representation</h1>
          <Row>
            <BarChart data={pieChartData} />
          </Row>
        </>
      )}
    </>
  );
};

export default Dashboard;
