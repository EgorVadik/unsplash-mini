/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            colors: {
                'red-delete': '#EB5757',
                green: '#3DB46D',
                'gray-border': '#BDBDBD',
                'gray-border-dark': '#4F4F4F',
            },
            boxShadow: {
                'search-bar': '0px 1px 6px 0px rgba(0, 0, 0, 0.10)',
            },
            dropShadow: {
                'add-btn': '0px 4px 10px rgba(61, 180, 109, 0.20)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
