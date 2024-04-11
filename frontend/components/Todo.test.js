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
    console.log('second test begins')
    await user.click(laundry)
    expect(await screen.findByText('laundry ✔️')).toBeVisible()
    await user.click(laundry)
    expect(await screen.findByText('laundry')).toBeVisible()
    expect(laundry).toHaveTextContent('laundry')
  })

  test('can delete todos', async () => {

  })

  test('can create a new todo, complete it and delete it', async () => {

  })
})
