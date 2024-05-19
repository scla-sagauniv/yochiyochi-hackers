'use client'
import * as React from 'react'
import './main.css'
import { useState } from 'react'
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  useToast,
  background,
  Stack,
} from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { flushAllTraces, getTraceEvents } from 'next/dist/trace'

import { v4 as uuidv4 } from 'uuid'
import useSWR from 'swr';

type TaskType = {
    id: string
    task: string
    isDone: boolean
  }


export function Tasklist(){
    const [tasks, setTask] = useState<TaskType[]>([])
  const [donetasks, setDoneTask] = useState<TaskType[]>([])
  const { handleSubmit, reset, register } = useForm()

  const uniqueId = uuidv4()

  // tasks配列に追加フォームに入れたtaskを入れる
  const handleClick = (taskItem: string): void => {
    setTask([...tasks, { id: uniqueId, task: taskItem, isDone: false }])
  }
  const addPost = async (taskTitle: string) => {
    if (!taskTitle) return //formに入力された値がない
    
    const res = await fetch('api/todo', {
      method: 'POST',
      headers: {
        //headersはHTTPリクエストのヘッダーを指定するオブジェクト
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: uniqueId,
        //bodyはHTTPリクエストの本文を指定する部分
        task: taskTitle
      }),
    })
  }
    //todo を削除する処理
    const deletePost = async (id: string) => {
        if (!id) return
        await fetch(`/api/todo/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          }),
        })
      }
  function onSubmit(values: any) {
    console.log('ssssss', values.t)
    console.log('value', values)
    if (values.t === '') {
      console.log('err')
      alert('タスクを入力してください')
    } else {
      console.log('sucsees')
      handleClick(values.t)
      addPost(values.t)
    }

    reset()
  }

  //donetasks配列に完了したdonetaskを入れる
  const DonehandleClick = (doneItem: TaskType): void => {
    setDoneTask([...donetasks, doneItem])
  }

  function DoneTaskfc(id: string) {
    console.log('donedone', id)
    // idを基にtaskを検索
    const donetask = tasks.filter(task => task.id === id)
    console.log('donedone', donetask)
    DonehandleClick(donetask[0])
    // tasksから削除
    setTask(tasks.filter(task => task.id != id))
  }

  function ReDofc(id: string) {
    console.log('rere', id)
    const redotask = donetasks.filter(donetask => donetask.id === id)
    // console.log('retask',redotask)
    console.log([...tasks, redotask[0]])
    setTask([...tasks, redotask[0]])
    setDoneTask(donetasks.filter(donetask => donetask.id != id))
  }

  //reset
  function Reset() {
    console.log('reset', 'aaa')

    setTask([])
    setDoneTask([])
    console.log(tasks)
  }

  //delete
  function TaskDelet(id: string) {
    console.log('delete', id)
    setTask(tasks.filter(task => task.id != id))
    deletePost(id)
  }
  return (
    <div>
      <h1>TODO管理アプリ</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <FormControl
          id="taskname"
          onSubmit={handleSubmit(data => {
            console.log('data: ', data)
          })}
        >
          <FormLabel htmlFor="task">
            <p className="label">タスクの追加</p>
          </FormLabel>
          <Input
            type="text"
            placeholder="タスクを入力"
            id="task"
            {...register('t')}
          />

          <Button colorScheme="orange" size="md" type="submit">
            追加
          </Button>
        </FormControl>
      </form>

      <div className="main">
        <Tabs>
          <TabList className="Tab">
            <Tab>Do</Tab>
            <Tab>Done</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              タスク
              <div className="taskAll">
                <ul>
                  {tasks.map(i => {
                    return (
                      <li key={i.id}>
                        {i.task}
                        <div>
                          <span>
                            <Button
                              className="DoneButton"
                              colorScheme="teal"
                              size="md"
                              onClick={() => DoneTaskfc(i.id)}
                            >
                              完了
                            </Button>
                          </span>
                          <span>
                            <Button
                              className="deleteButton"
                              colorScheme="orange"
                              size="md"
                              onClick={() => TaskDelet(i.id)}
                            >
                              削除
                            </Button>
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              完了済み
              <div className="DoneTask">
                <ul>
                  {donetasks.map(i => {
                    return (
                      <li key={i.id}>
                        {i.task}
                        <span>
                          <Button
                            className="ReDoButton"
                            colorScheme="teal"
                            size="md"
                            onClick={() => ReDofc(i.id)}
                          >
                            取り消し
                          </Button>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div className="reset">
        <Button colorScheme="orange" size="md" onClick={Reset}>
          リセット
        </Button>
      </div>
    </div>
  )
}