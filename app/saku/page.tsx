'use client';
import { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, flexbox } from '@chakra-ui/react'
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer} from '@chakra-ui/react'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
/*import faker from 'faker';*/

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Page() {

    /* 新規追加
    const new = () => {
    alert(`Email: ${email}\nPassword: ${password}`);
    };
    */
   //Bottomのレイアウト
   const containerStyle ={
    display: "flex",
    justifyContent: "space-between"
   }

   //タブ2のデータ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  


   const labelsWeek = ['日', '月', '火', '水', '木', '金', '土'];
   const dataDate = {
    labelsWeek,
    datasets:[
      {
        label: '収入',
        data:73,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '支出',
        data:23,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



    const labelsMonth = ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'];
    const dataMonth = {
     labelsMonth,
     datasets:[
       {
         label: '収入',
         data:73,
         borderColor: 'rgb(255, 99, 132)',
         backgroundColor: 'rgba(255, 99, 132, 0.5)',
       },
       {
         label: '支出',
         data:53,
         borderColor: 'rgb(53, 162, 235)',
         backgroundColor: 'rgba(53, 162, 235, 0.5)',
       },
     ],
   };
    /*[
        {
          label: 'Dataset 1',
          data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],*/
    





    return(
        <Box p={4}>
          {/* タイトル */}
          <Heading as="h1" size="lg">家計簿</Heading>

          <Tabs>
            <TabList>
              <Tab>Home</Tab>
              <Tab>graph1</Tab>
              <Tab>graph2</Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel>
                <p>最近の支出入</p>
                <TableContainer>
                  <Table variant='simple'>
                    <TableCaption>支出入一覧</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>日時</Th>
                        <Th>項目</Th>
                        <Th>支出入（＋－）</Th>
                        <Th>金額</Th>
                        <Th>詳細</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>2022/08/24</Td>
                        <Td>給料</Td>
                        <Th>+</Th>
                        <Td>250000</Td>
                        <Td>なし</Td>
                      </Tr>
                      <Tr>
                        <Td>2022/07/24</Td>
                        <Td>給料</Td>
                        <Th>+</Th>
                        <Td>250000</Td>
                        <Td>なし</Td>
                      </Tr>
                      <Tr>
                        <Td>2022/06/24</Td>
                        <Td>給料</Td>
                        <Th>+</Th>
                        <Td>250000</Td>
                        <Td>なし</Td>
                      </Tr>
                    </Tbody>
                   </Table>
                  </TableContainer>
              </TabPanel>
              <TabPanel>
              <p>支出の推移（月内での折れ線）</p>

                <div>
                  <Line
                    data={dataDate}
                    options={{ responsive: true, maintainAspectRatio: true }}
                  />
                </div>





              </TabPanel>
              <TabPanel>
                <p>毎月の支出（月ごとの金額で折れ線）</p>
                <div>
                  <Line
                    data={dataMonth}
                    options={{ responsive: true, maintainAspectRatio: true }}
                  />
                </div>       

                



              </TabPanel>
            </TabPanels>
          </Tabs>



        <div className='bottom-list' style={containerStyle}>
          <Button colorScheme="teal" variant='outline' size="md" /*onClick={new}*/ >新規追加</Button>
          <Button colorScheme="teal" size="md" /*onClick={returnHome}*/>Homeへ戻る</Button>
        </div>
          

        </Box>
        

    );
  
}