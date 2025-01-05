import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors:{
            'hackit-grey': '#36454f',
            'hackit-orange': '#faa51d',
            'hackit-green': '#00ab5b',
            'hackit-dark-green': '#008d4b',
        },
        fontFamily:{
            'sans':['Montserrat']
        }
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
