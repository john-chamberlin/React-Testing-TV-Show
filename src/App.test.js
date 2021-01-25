import React from 'react';
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import {fetchShow as mockFetchShow} from './api/fetchShow'
import {data} from './data/data'
import {act} from 'react-dom/test-utils'


jest.mock('./api/fetchShow')


test('api call made and app rendered without errors', async ()=> {
    mockFetchShow.mockResolvedValueOnce({
       data: data
    }) 
    await act(async()=> {
        render(<App/>)
        })
        expect(mockFetchShow).toBeCalledTimes(1)
})


test('api call made and episodes render when season is selected', async ()=> {
    mockFetchShow.mockResolvedValueOnce({
        data: data
    })
    await act(async()=> {
        render(<App/>)
        })
        expect(mockFetchShow).toBeCalled()

    const dropdown = screen.getByText(/select a season/i)

    userEvent.click(dropdown)
    userEvent.click(screen.getByText(/season 1/i))

    expect(screen.getAllByTestId('episode')).toHaveLength(8)
    
})