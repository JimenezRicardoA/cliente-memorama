import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(
    http.get('http://localhost:3000/get-regions', ({ request, params, cookies }) => {
        return HttpResponse.json(
            { regions: ['Kanto', 'Johto', 'Hoenn', 'Sinnoh'] },
            {
                status: 202,
                statusText: 'Mocked status',
            },
        )
    }),

    http.post('http://localhost:3000/get-user', ({ request, params, cookies }) => {
        return HttpResponse.json(
            {
                authToken: 'XXXXXXXXXXXXXXXX',
            },
            {
                status: 202,
                statusText: 'Mocked status',
            }
        )
    })
)