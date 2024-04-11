import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Todo from './Todo'
import server from '../../backend/mock-server'
import { resetTodos } from '../../backend/helpers'

describe('Todos Component', () => {

  let user, laundry, dishes, groceries, del, input

  afterEach(() => { server.resetHandlers() })
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })
  beforeEach(async () => {
    resetTodos()
    render(<Todo />) 
    user = userEvent.setup()

    await waitFor(() => {
      laundry = screen.getByText('laundry')
      dishes = screen.getByText('dishes')
      groceries = screen.getByText('groceries')
      input = screen.getByPlaceholderText('type todo')
    }) 
  })

  test('all todos are present', async () => {
    // screen.debug()
    expect(laundry).toBeVisible()
    expect(dishes).toBeVisible()
    expect(groceries).toBeVisible()
  })

  test('can do and undo todos', async () => {
    const tasks = ['laundry', 'dishes', 'groceries']
    for (const task of tasks) {
      let element = screen.getByText(task)
      await user.click(element)
      expect(await screen.findByText(`${task} ✔️`)).toBeVisible()
      await user.click(element)
      expect(await screen.findByText(task)).toBeVisible()
      expect(element).toHaveTextContent(task)
    }
  })

  test('can delete todos', async () => {
    const tasks = ['laundry', 'dishes', 'groceries']
    for (const task of tasks) {
      console.log('initiating ', task, ' deletion')
      del = screen.getByText(task).nextSibling
      await user.click(del)
      await waitFor(() => {
        expect(screen.queryByText('laundry')).toBeNull()
      })
    }
  })

  test('can create a new todo, complete it and delete it', async () => {
    const newTask = 'test it'
    await user.type(input, newTask)
    expect(await input.value).toBe(newTask)
    await user.keyboard('[ENTER]')
    let newElement = await screen.findByText(newTask)
    expect(newElement).toBeInTheDocument()

    await user.click(newElement)
    await waitFor(() => {
      expect(newElement).toHaveTextContent(`${newTask} ✔️`)
    })

    await user.click(newElement.nextSibling)
    await waitFor(() => {
      expect(screen.queryByText(`${newTask} ✔️`)).toBeNull()
    })
  })
})