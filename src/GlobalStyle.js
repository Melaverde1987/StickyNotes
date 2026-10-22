import { createGlobalStyle } from 'styled-components';
import 'modern-normalize';

export const GlobalStyle = createGlobalStyle`

    html {
        scroll-behavior: smooth;
        font-size: 62.5%;

        &::-webkit-scrollbar {
            width: 6px;
            height: 5px;
        }

        &::-webkit-scrollbar-track {
            background-color: ${({ theme }) => theme.colors.gray800};
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${({ theme }) => theme.colors.primary500};
        }

        /* for Firefox */
        @-moz-document url-prefix() {
            scrollbar-width: thin;
            scrollbar-color: ${({ theme }) => theme.colors.primary500} ${({ theme }) => theme.colors.primary500};
        }
    }

    ::selection {
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.white};
    }

    body {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 1.6rem;
        line-height: 1.4;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
        overflow-x: hidden;
        width: 100%;
        height: auto;
        min-height: 100vh;
        background-image: linear-gradient(to right bottom, rgb(243 239 239), rgba(137, 132, 132, 0.3));
        width: 100%;
        max-width: 1100px;
        margin-left: auto;
        margin-right: auto;
    }

    button {
        cursor: pointer;
        border: none;
        background-color: transparent;
        padding: 0;
        font-size: 16px;
        transition: color ${({ theme }) => theme.transition.normal};
    }


    h1 {
        color: saddlebrown;
        position: relative;
        display: flex;
        align-items: center;
        font-size: 4rem;
        margin-top: 0;
        padding-top: 10px;
    }

    input, textarea {
        width: 100%;
        border: none;
        padding: 10px;
        background: transparent;
        border-bottom: 1px solid midnightblue;
        color: midnightblue;

        &:focus, &:focus-visible {
            border: none; 
            outline: none;
            border-bottom: 1px solid midnightblue;
        }
    }
`;
