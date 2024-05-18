'use client';
import { FormEvent, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, flexbox, Stack } from '@chakra-ui/react'
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";


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

import { Radio, RadioGroup } from '@chakra-ui/react'


export default function Page() {

  /* 新規追加
  const new = () => {
  alert(`Email: ${email}\nPassword: ${password}`);
  };
  */
  //Bottomのレイアウト
  const containerStyle = {
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
    datasets: [
      {
        label: '収入',
        data: 73,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '支出',
        data: 23,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



  const labelsMonth = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const dataMonth = {
    labelsMonth,
    datasets: [
      {
        label: '収入',
        data: 73,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '支出',
        data: 53,
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


  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data = localStorage.getItem("data");
    if (!data) {
      localStorage.setItem(
        'data',
        JSON.stringify([Object.fromEntries(formData)])
      );
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(Object.fromEntries(formData));
      localStorage.setItem("data", JSON.stringify(parsedData))
    }
    onClose();
  }

  //データをlocalstorageから持ってくる．
  // localStorageからデータを取得
  const dataString = localStorage.getItem("data");
  const [dateTime, settime] = useState('');
  const [item, setItem] = useState('');
  const [inout, setInout] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  let dataArray = []


  if (dataString !== null) {
    // データがnullでない場合、文字列から配列に変換
    dataArray = JSON.parse(dataString);

    // console.log(item);
  } else {
    console.log("データが見つかりませんでした。");
  }



  return (
    <Box p={4}>
      {/* タイトル */}
      <Heading as="h1" size="lg">家計簿</Heading>

      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>週間グラフ</Tab>
          <Tab>年間グラフ</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>最近の支出入詳細</p>
            <TableContainer>
              <Table variant='simple'>

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
                  <>
                    {dataArray.map((date: any) => {
                      if (date.inout == 0) {
                        date.inout = '-';
                      } else {
                        date.inout = '+';
                      }
                      return (
                        <>
                          <Tr>
                            <Td>{date.year}/{date.month}/{date.date}</Td>
                            <Td>{date.item}</Td>
                            <Td>{date.inout}</Td>

                            <Td>{date.amount}</Td>
                            <Td>{date.details}</Td>
                          </Tr>
                        </>)
                    })}
                  </>
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
        <>
          <Button onClick={onOpen}>新規追加</Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSubmit}>
                <ModalHeader>支出入の入力をしてください．</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                  <FormControl mt={4}>
                    <FormLabel>年</FormLabel>
                    <Input name='year' ref={initialRef} placeholder='例）2012' type='number' required max='2024' />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>月</FormLabel>
                    <Input name='month' ref={initialRef} placeholder='例）8' type='number' required min='1' max='12' />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>日</FormLabel>
                    <Input name='date' ref={initialRef} placeholder='例）30' type='number' required min='1' max='31' />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>項目</FormLabel>
                    <Input name='item' placeholder='例）給料' required />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>支出入</FormLabel>
                    <RadioGroup name='inout' defaultValue='0'>
                      <Stack spacing={5} direction='row'>
                        <Radio colorScheme='green' value='0'>
                          -
                        </Radio>
                        <Radio colorScheme='red' value='1'>
                          +
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>金額</FormLabel>
                    <Input name='amount' placeholder='200000' type='number' required />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>詳細</FormLabel>
                    <Input name='details' placeholder='なし' required />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} type='submit'>
                    保存する
                  </Button>
                  <Button onClick={onClose}>キャンセル</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </>
        <Button colorScheme="teal" size="md" /*onClick={returnHome}*/>Homeへ戻る</Button>
      </div>
    </Box>
  );
}