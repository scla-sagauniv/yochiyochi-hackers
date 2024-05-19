// 'use client'
import * as React from 'react'
import './main.css'
import {Tasklist} from "./tasklist"
type TaskType = {
  id: string
  task: string
  isDone: boolean
}

const fetcher = (url) =>
  fetch(url).then((res) => res.json());

export default async function Ria() {
  //リスト一覧を取得する処理
  // const getTodoList = async () => {
  //   const res = await fetch('../api/todo')
  //   const json = await res.json()
  //   console.log("res", res)
  //   console.log("json", json)
  //   return json.todos //dbのtodo tableの要素を全て返す
  // }
  // // const { data, error } = useSWR<Response>(
  // //   '/api/todo',
  // //   fetcher
  // // );
  // const todoList = await getTodoList()



  return (
     <Tasklist />  
  )
}
