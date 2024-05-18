"use client";
import { useState } from "react";
import {
  Tooltip,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Stack,
  Heading,
} from "../common/components";

let testData = [
  { question: "hoge", answer: "fuga" },
  { question: "piyo", answer: "fuga" },
  { question: "hoge", answer: "fuga" },
  { question: "hoge", answer: "fuga" },
  { question: "hoge", answer: "fuga" },
  { question: "hoge", answer: "fuga" },
  { question: "hoge", answer: "fuga" },
  { question: "hoge", answer: "fuga" },
  { question: "hoge", answer: "fuga" },
  { question: "hoge", answer: "fuga" },
];

export default function Nanako() {
  const [isVisibleAnswer, setIsVisibleAnswer] = useState(false);
  const switchVisibleAnswer = () => {
    setIsVisibleAnswer(!isVisibleAnswer);
    console.log(isVisibleAnswer);
  };

  return (
    <>
      <Heading color="red" size="md">
        QUIZ
      </Heading>
      <TableContainer>
        <Table colorScheme="black">
          <Thead>
            <Tr>
              <Td width="20"></Td>
              <Td align="center" width="1800">
                問　題
              </Td>
              <Td align="center" width="">
                回　答
              </Td>
              <Td align="center" width="">
                <Stack direction="row" spacing={4} align="center">
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={switchVisibleAnswer}
                  >
                    {isVisibleAnswer
                      ? "すべての回答を非表示"
                      : "すべての回答を表示"}
                  </Button>
                </Stack>
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {testData.map((data, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td align="center" height={30}>
                  {data.question}
                </Td>
                <Td align="center">
                  <Tooltip label={data.answer} placement="right">
                    <img
                      src="答えのアイコン.png"
                      alt="answer image"
                      width={80}
                    />
                  </Tooltip>
                </Td>
                {/* ボタンによって表示切替 */}
                <Td>{isVisibleAnswer ? data.answer : ""}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
