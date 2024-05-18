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
  {
    question:
      "兄が好きすぎて正月に帰省した時構ってくれなかったときには馬乗りになったというエピソードや、彼女が持つ美貌からオードリーヘップバーンを真似した「アオイ・ヘップバーン」の異名もある、現在は同じラジオで仲良くなった小原好美に「彼女は私の娘」と呼ばれるまで人気を博しているが、下積み時代にはご飯にお湯をかけポン酢で食べていたほど苦労が垣間見える、主な出演作に『先輩がうざい後輩の話』や『かぐや様は告らせたい』がある、女性声優は誰でしょう？",
    answer: "古賀葵",
  },
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
      <TableContainer whiteSpace="unset" maxWidth="100%">
        <Table colorScheme="black">
          <Thead>
            <Tr>
              <Td width="10%"></Td>
              <Td align="center" width="40%">
                問　題
              </Td>
              <Td align="center" width="10%">
                回　答
              </Td>
              <Td align="center" width="40%">
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
                <Td align="center" width="100">
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
