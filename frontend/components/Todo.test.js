import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Todo from './Todo'
import server from '../../backend/mock-server'
import { resetTodos } from '../../backend/helpers'

describe('Todos Component', () => {
  let user, laundry, dishes, groceries, input

  afterEach(() => { server.resetHandlers() })
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })
  beforeEach(async () => {
    resetTodos()
    render(<Todo />) 
    user = userEvent.setup()
  })

  test('all todos are present', async () => {
    // screen.debug()
    await waitFor(() => {
      expect(screen.findByText('laundry')).toBeInTheDocument()
      screen.findByText('dishes')
      screen.findByText('groceries')
    }) 
    await screen.findByText('laundry')


  })
  test('can do and undo todos', async () => {
  })
  test('can delete todos', async () => {

  })
  test('can create a new todo, complete it and delete it', async () => {

  })
})
