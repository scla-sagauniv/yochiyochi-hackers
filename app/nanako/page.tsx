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
];
type quiz = {
  question: string;
  answer: string;
};
export default function answer() {
  const [isVisibleAnswer, setIsVisibleAnswer] = useState(false);
  const [quizData, setArray] = useState<quiz[]>([]);
  const switchVisibleAnswer = () => {
    setIsVisibleAnswer(!isVisibleAnswer);
    console.log(isVisibleAnswer);
  };

  const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
  const ep = process.env["NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT"];
  const azureApiKey = process.env["NEXT_PUBLIC_AZURE_OPENAI_API_KEY"];

  const messages = [
    { role: "system", content: "You must answer a JSON object array." },
    {
      role: "user",
      content:
        "Generate 10 sets of quiz questions and answers in a JSON object array format. Answer in japanese.",
    },
  ];
  async function openai() {
    const client = new OpenAIClient(ep, new AzureKeyCredential(azureApiKey));
    const deploymentId = "yochiyochi-ai";
    const result = await client.getChatCompletions(deploymentId, messages);

    for (const choice of result.choices) {
      let data = JSON.parse(choice.message.content);
      setArray(data);
    }
  }

  return (
    <>
      <Heading color="teal" size="3xl">
        QUIZ
      </Heading>
      <br />
      <Button colorScheme="teal" variant="solid" onClick={openai}>
        クイズを生成する
      </Button>
      <TableContainer whiteSpace="unset" maxWidth="100%">
        <Table colorScheme="black">
          <Thead>
            <Tr>
              <Td width="5%"></Td>
              <Td width="52%">
                <div style={{ textAlign: "center" }}>
                  <b>問 題</b>
                </div>
              </Td>
              <Td width="15%">
                <div style={{ textAlign: "center" }}>
                  <b>回 答</b>
                </div>
              </Td>
              <Td align="center" width="28%">
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
            {quizData.map((data, index) => (
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
