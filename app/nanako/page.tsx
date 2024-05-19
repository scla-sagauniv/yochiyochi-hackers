"use client";
import { useRef, useState } from "react";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const switchVisibleAnswer = () => {
    setIsVisibleAnswer(!isVisibleAnswer);
    console.log(isVisibleAnswer);
  };
  let flag = 0;
  function TransitionExample() {}

  const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
  const ep = process.env["NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT"];
  const azureApiKey = process.env["NEXT_PUBLIC_AZURE_OPENAI_API_KEY"];

  const messages = [
    { role: "system", content: "You must answer a JSON object array." },
    {
      role: "user",
      content:
        "Generate 10 sets of quiz questions and answers in a JSON object array format. Use Japanese for the question and the answer. competition quiz please.",
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
      <Button
        // isLoading={!quizData.length}
        colorScheme="teal"
        variant="solid"
        onClick={openai}
        spinnerPlacement="start"
      >
        クイズを生成する
      </Button>

      <Button colorScheme="gray" variant="outline" onClick={onOpen}>
        操作説明
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>操作説明</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <ul>
              <li>
                <Button colorScheme="teal" variant="solid">
                  クイズを生成する
                </Button>
                押すとAIがクイズを生成してくれます
              </li>
              <li>
                <div style={buttonContainer}>
                  <img src="答えのアイコン.png" width={40} />
                  <p>にカーソルを合わせると答えが表示されます</p>
                </div>
              </li>
              <li>
                <div>
                  <Button colorScheme="teal" variant="outline">
                    すべての解答を表示
                  </Button>
                  を押すとすべての解答の表示非表示を切り替えることができます
                </div>
              </li>
            </ul>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="blue">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                  <b>解 答</b>
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
                      ? "すべての解答を非表示"
                      : "すべての解答を表示"}
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

const buttonContainer = {
  display: "flex",
  "align-items": "center",
};
