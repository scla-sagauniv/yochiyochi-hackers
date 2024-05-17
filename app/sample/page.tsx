'use client';

import { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';

export default function Home() {
  // 状態管理用のフック
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  // アラートを出す関数
  const handleAlert = () => {
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  // APIリクエストを送る関数

  // 外部（送信したjsonをそのまま返すAPI）
  const testOuterFetch = async () => {
    // リクエストの送り先を設定
    const endpoint = "https://jsonplaceholder.typicode.com/posts";
    // 送ってみる
    try {
      const response = await fetch(endpoint, {
        method: 'POST', // リクエストの種類を設定
        headers: {
          'Content-Type': 'application/json', // 送るデータ（body）についての情報を付与
        },
        body: JSON.stringify({ email, password }), // email, passwordをjsonに変換してbodyとする
      });

      // 成功した場合
      if (response.ok) {
        // 結果を受け取る
        const result = await response.json();
        // 表示など（今回はtoast コンポーネントを用いて表示してみた）
        toast({
          title: "Success",
          description: `Received email: ${result.email}, Received password: ${result.password}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      // 失敗した場合
      else {
        // エラーを表示
        toast({
          title: "Error",
          description: "Failed to submit data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      // リクエスト送信ができなかった場合
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  // 内部（app/api/sample/route.tsに作成）
  const testInnerFetch = async () => {
    const endpoint = "/api/sample";
    try {
      const response = await fetch(endpoint, {
        method: 'GET'
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Success",
          description: `Received response: ${JSON.stringify(result)}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }


  return (
    <Box p={4}>
      {/* タイトル */}
      <Heading as="h1" size="lg">UI Sample Page</Heading>

      {/* UI一覧へのリンク */}
      <Button size="sm" onClick={() => window.open("https://v2.chakra-ui.com/docs/components")}>→ Chakra UI components</Button>

      {/* メールアドレス入力フォーム */}
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* パスワード入力フォーム */}
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      {/* ↓アラートを出すボタン */}
      <Button colorScheme="teal" size="md" onClick={handleAlert}>Show Alert</Button>

      {/* ↓APIにリクエストを送るボタン */}
      <div>
        <Button colorScheme="orange" size="md" onClick={testOuterFetch}>test Outer API</Button>
        <Button colorScheme="orange" size="md" onClick={testInnerFetch}>test Inner API</Button>
      </div>
    </Box>
  );
}
