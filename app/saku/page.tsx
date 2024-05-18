'use client';
import { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, flexbox } from '@chakra-ui/react'
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer} from '@chakra-ui/react'


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
                <p>最近の支出</p>/////////////////////////////////////////////////タブ1↓
                <canvas height="280">
                
                </canvas>  
                <TableContainer>
                  <Table variant='simple'>
                    <TableCaption>支出一覧</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>日時</Th>
                        <Th>項目</Th>
                        <Th>支出</Th>
                        <Th>詳細</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>2022/08/24</Td>
                        <Td>給料</Td>
                        <Td>+250000</Td>
                        <Td>なし</Td>
                      </Tr>
                      <Tr>
                        <Td>2022/07/24</Td>
                        <Td>給料</Td>
                        <Td>+250000</Td>
                        <Td>なし</Td>
                      </Tr>
                      <Tr>
                        <Td>2022/06/24</Td>
                        <Td>給料</Td>
                        <Td>+250000</Td>
                        <Td>なし</Td>
                      </Tr>
                    </Tbody>
                   </Table>
                  </TableContainer>
              </TabPanel>
              <TabPanel>
              <p>支出の推移（月内での折れ線）</p>//////////////////////////////////////////タブ2↓
                <canvas height="280">
                  
                </canvas>




              </TabPanel>
              <TabPanel>
                <p>毎月の支出（月ごとの金額で折れ線）</p>////////////////////////////////////////タブ3↓         
                <canvas height="280">
                  
                </canvas>



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