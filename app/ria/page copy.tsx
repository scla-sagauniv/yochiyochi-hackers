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
} from '@chakra-ui/react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export default function Ria() {
  const { register, handleSubmit } = useForm()

  type TaskType = {
    id: number
    task: string
    isDone: boolean
  }
  const [text, getTask] = useState<string>('')
  const [tasks, setTask] = useState<TaskType[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    getTask(e.target.value)
  }

  const handleClick = (taskList:TaskType): void => {
    console.error(taskList)
    setTask([...tasks, taskList])
    // setTask([...tasks, { id: tasks.length++, task: text, isDone: false }])
  }
  function onSubmit(values) {
    console.log('ssssss', values.task)
    const tmpTask: TaskType = {
        id: values.id,
        task:values.task,
        isDone:values.isDone
    }
    handleClick(tmpTask)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          id="taskname"
          onSubmit={handleSubmit(data => {
            console.log('data: ', data)
          })}
        >
          <FormLabel htmlFor="task">タスクの追加</FormLabel>
          <Input
            type="text"
            placeholder="タスクを入力"
            id="task"
            {...register('task')}
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
                  <li>
                    課題
                    <span>
                      <Button
                        className="DoneButton"
                        colorScheme="teal"
                        size="md"
                      >
                        完了
                      </Button>
                    </span>
                  </li>
                  {tasks.map(i => {
                      console.log("li",i);
                      return (<li key={i.id}>{i.task}</li>)
                  }
                  )}
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              完了済み
              <div className="DoneTask">
                <ul>
                  <li>
                    レポート
                    <span>
                      <Button
                        className="ReDoButton"
                        colorScheme="teal"
                        size="md"
                      >
                        取り消し
                      </Button>
                    </span>
                  </li>
                </ul>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div className="reset">
        <Button colorScheme="orange" size="md">
          リセット
        </Button>
      </div>
    </div>
  )
}
