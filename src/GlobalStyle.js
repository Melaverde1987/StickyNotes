import { createGlobalStyle } from 'styled-components';
import 'modern-normalize';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Grape+Nuts&family=Norican&display=swap');

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
            background-color: ${({ theme }) => theme.colors.primary600};
        }

        /* for Firefox */
        @-moz-document url-prefix() {
            scrollbar-width: thin;
            scrollbar-color: ${({ theme }) => theme.colors.primary600} ${({ theme }) => theme.colors.primary600};
        }
    }

    ::selection {
        background: ${({ theme }) => theme.colors.primary500};
        color: ${({ theme }) => theme.colors.white};
    }

    body {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 1.6rem;
        line-height: 1.4;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.white};
        margin: 0;
        overflow-x: hidden;
        width: 100%;
        height: auto;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: linear-gradient(to right bottom, rgb(255 255 255), rgb(137 132 132 / 30%));
    }

    ul,
    ol {
        list-style: none;
        font-family: 'Grape Nuts', cursive;
        font-size: 2.4rem;
        color: midnightblue;
    }

    h1 {
        margin-top: 2rem;
        color: saddlebrown;
        position: relative;
        display: flex;
        align-items: center;
        font-size: 4rem;
    }

    ul:not(ul ul) {
        padding: 2rem;
        padding-bottom: 4rem;
        display: grid;
        grid-template-columns: max-content;
        z-index: 1;
        position: relative;
        perspective: 50vw;
        transform-style: preserve-3d;

        .done {
            text-decoration: line-through;
        }

        > li {
            --levitate: 0;
            padding: 1.2rem 2rem;
            background-color: pink;
            position: relative;
            transform-style: preserve-3d;
            cursor: pointer;
            position: relative;
            transition: transform 0.3s;

            &::after {
                content: '';
                pointer-events: none;
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                opacity: 0;
                transition: opacity 0.3s;
                z-index: 1;
                mix-blend-mode: overlay;
                background-image: linear-gradient(to left, #ffe4b2, #c8b188);
            }

            &:hover {
                --levitate: 1;
                &::before {
                    transform: translate3d(6rem, 1rem, -1px) scale(calc(1 - var(--levitate) * 0.1)) rotate(1.5deg);
                    filter: blur(8px);
                }

                &::after {
                    opacity: 0.6;
                }
            }

            &.big {
                background-color: lightgreen;
                padding: 1.6rem 2rem;
                padding-bottom: 3rem;
            }

            ul {
                margin-top: 0.5em;
                margin-left: 1em;
                font-size: 0.8em;

                li {
                    z-index: 1;
                    &:first-letter {
                        font-size: 1.4em;
                    }
                }
            }

            &:not(:first-of-type) {
                margin-top: 3rem;
            }

            &:nth-child(3n) {
                transform: translate3d(-5px, calc(var(--levitate) * -5px), calc(var(--levitate) * 3rem)) rotate(-0.6deg) rotateX(calc(var(--levitate) * 6deg)) rotateY(calc(var(--levitate) * -3deg));
            }

            &:nth-child(3n-1) {
                transform: translate3d(7px, calc(var(--levitate) * -5px), calc(var(--levitate) * 3rem)) rotate(-0.5deg) rotateX(calc(var(--levitate) * 6deg)) rotateY(calc(var(--levitate) * -3deg));
            }

            &:nth-child(3n-2) {
                transform: translate3d(0px, calc(var(--levitate) * -5px), calc(var(--levitate) * 3rem)) rotate(0.5deg) rotateX(calc(var(--levitate) * 6deg)) rotateY(calc(var(--levitate) * -3deg));
            }

            &::before {
                content: '';
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                transition: all 0.3s;
                height: calc(100% - 2px);
                background-color: rgba(0, 0, 0, 0.4);
                z-index: -1;
                transform-origin: bottom left;
                transform: translate3d(8px, 2px, -1px) rotate(1deg);
                filter: blur(2px);
            }
        }
    }
`;
