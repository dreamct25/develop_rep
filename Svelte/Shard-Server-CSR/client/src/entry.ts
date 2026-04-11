import { mount } from 'svelte'
import App from './App.svelte'

mount(
    App,
    { target: document.querySelector('.app')! }
)

        const x = document.createElement('base')
        x.href = '/'

        document.head.appendChild(x)