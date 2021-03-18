import React from "react";
import {Helmet} from "react-helmet-async";

import {css} from "@linaria/core";

css`
    :global() {
        html {
            line-height: 1.15;
        }
        a {
            color: #19865c;
        }
        header {
            border-bottom: 1px solid #efefef;
        }
        body {
            max-width: 960px;
            color: #525252;
            font-family: Roboto, sans-serif;
            margin: 0 auto;
        }
        main {
            text-align: center;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        p,
        ul {
            padding: 0;
            margin: 0;
            font-weight: 400;
        }
        header {
            display: grid;
            grid-template-columns: auto auto;
            align-items: self-end;
            justify-content: space-between;
            gap: 7px;
            padding-top: 20px;
            padding-bottom: 10px;
        }
        .logo {
            font-weight: 700;
            font-size: 1.375rem;
            text-decoration: none;
        }
        .figure {
            margin-top: 19vh;
            max-width: 265px;
            position: relative;
            z-index: -9;
            overflow: visible;
        }
        .exhaust__line {
            animation: thrust 70ms 100 ease-in-out alternate;
        }
        .smoke {
            animation: smoke 0.1s 70 ease-in-out alternate;
        }
        @keyframes smoke {
            0% {
                transform: translate3d(-5px, 0, 0);
            }
            100% {
                transform: translate3d(5px, 0, 0);
            }
        }
        .flame {
            animation: burnInner2 0.1s 70 ease-in-out alternate;
        }
        @keyframes burnInner2 {
            0% {
                transform: translate3d(0, 0, 0);
            }
            100% {
                transform: translate3d(0, 3px, 0);
            }
        }
        @keyframes thrust {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0.5;
            }
        }
        @media (prefers-reduced-motion: reduce) {
            .exhaust__line,
            .smoke,
            .flame {
                animation: none;
            }
        }
        h1 {
            font-size: 1.375rem;
            max-width: 32rem;
            margin: 5px auto 0;
        }
        main p {
            line-height: 1.25;
            max-width: 26rem;
            margin: 15px auto 0;
        }
        footer {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 5px;
            padding: 25px 0;
            position: fixed;
            box-sizing: border-box;
            left: 50%;
            bottom: 0;
            width: 960px;
            transform: translateX(-50%);
            transform-style: preserve-3d;
            border-top: 1px solid #efefef;
        }
        .option {
            display: grid;
            grid-template-columns: min-content 1fr;
            gap: 10px;
            box-sizing: border-box;
            text-decoration: none;
        }
        .option svg {
            width: 1.5rem;
            height: 1.5rem;
            fill: gray;
            border: 1px solid #d6d6d6;
            padding: 5px;
            border-radius: 100%;
        }
        .option p {
            font-weight: 300;
            line-height: 1.25;
            color: #525252;
            display: table;
        }
        .option .option__heading {
            color: #19865c;
            font-size: 1.25rem;
            font-weight: 400;
        }
        @media (max-width: 996px) {
            body,
            footer {
                max-width: 780px;
            }
        }
        @media (max-width: 800px) {
            footer {
                height: 100%;
                grid-template-columns: 1fr;
                gap: 60px;
                position: relative;
                padding: 25px;
            }
            .figure {
                margin-top: 10px;
            }
            main {
                padding: 0 25px;
            }
            main h1 {
                font-size: 1.25rem;
            }
            header {
                grid-template-columns: 1fr;
                padding-left: 20px;
                padding-right: 20px;
            }
            footer {
                width: 100%;
                margin-top: 50px;
            }
        }
        @media (min-width: 801px) and (max-height: 730px) {
            .figure {
                margin-top: 80px;
            }
        }
        @media (min-width: 801px) and (max-height: 600px) {
            footer {
                position: relative;
                margin: 135px auto 0;
            }
            .figure {
                margin-top: 50px;
            }
        }
        .sr-only {
            clip: rect(1px, 1px, 1px, 1px);
            clip-path: inset(50%);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;
        }
    }
`;

const context = {
    environment: {
        STATIC_URL: "/static/",
    },
};

export default ({version}: {version: string}) => (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>The install worked successfully! Congratulations!</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
                rel="stylesheet"
                type="text/css"
                href={`${context.environment.STATIC_URL}admin/css/fonts.css`}
            />
            <link
                rel="stylesheet"
                type="text/css"
                href={`${context.environment.STATIC_URL}dist/main.css`}
            />
            <script defer src={`${context.environment.STATIC_URL}dist/bundle.js`} />
        </Helmet>
        <header>
            <a
                className="logo"
                href="https://www.djangoproject.com/"
                target="_blank"
                rel="noopener"
                onClick={() => alert("Look how easy that was")}
            >
                django reactivated
            </a>
            <p>
                View{" "}
                <a
                    href={`https://docs.djangoproject.com/en/${version}/releases/`}
                    target="_blank"
                    rel="noopener"
                >
                    release notes
                </a>{" "}
                for Django {version}
            </p>
        </header>
        <main>
            <svg className="figure" viewBox="0 0 508 268" aria-hidden="true">
                <path
                    d="M305.2 156.6c0 4.6-.5 9-1.6 13.2-2.5-4.4-5.6-8.4-9.2-12-4.6-4.6-10-8.4-16-11.2 2.8-11.2 4.5-22.9 5-34.6 1.8 1.4 3.5 2.9 5 4.5 10.5 10.3 16.8 24.5 16.8 40.1zm-75-10c-6 2.8-11.4 6.6-16 11.2-3.5 3.6-6.6 7.6-9.1 12-1-4.3-1.6-8.7-1.6-13.2 0-15.7 6.3-29.9 16.6-40.1 1.6-1.6 3.3-3.1 5.1-4.5.6 11.8 2.2 23.4 5 34.6z"
                    fill="#2E3B39"
                    fillRule="nonzero"
                />
                <path
                    d="M282.981 152.6c16.125-48.1 6.375-104-29.25-142.6-35.625 38.5-45.25 94.5-29.25 142.6h58.5z"
                    stroke="#FFF"
                    strokeWidth="3.396"
                    fill="#6DDCBD"
                />
                <path
                    d="M271 29.7c-4.4-10.6-9.9-20.6-16.6-29.7-6.7 9-12.2 19-16.6 29.7H271z"
                    stroke="#FFF"
                    strokeWidth={3}
                    fill="#2E3B39"
                />
                <circle fill="#FFF" cx="254.3" cy="76.8" r="15.5" />
                <circle
                    stroke="#FFF"
                    strokeWidth={7}
                    fill="#6DDCBD"
                    cx="254.3"
                    cy="76.8"
                    r="12.2"
                />
                <path
                    className="smoke"
                    d="M507.812 234.24c0-2.16-.632-4.32-1.58-6.24-3.318-6.72-11.85-11.52-21.804-11.52-1.106 0-2.212.12-3.318.24-.474-11.52-12.956-20.76-28.282-20.76-3.318 0-6.636.48-9.638 1.32-4.74-6.72-14.062-11.28-24.806-11.28-.79 0-1.58 0-2.37.12-.79 0-1.58-.12-2.37-.12-10.744 0-20.066 4.56-24.806 11.28a35.326 35.326 0 00-9.638-1.32c-15.642 0-28.282 9.6-28.282 21.48 0 1.32.158 2.76.474 3.96a26.09 26.09 0 00-4.424-.36c-8.058 0-15.01 3.12-19.118 7.8-3.476-1.68-7.742-2.76-12.324-2.76-12.008 0-21.804 7.08-22.752 15.96h-.158c-9.322 0-17.38 4.32-20.856 10.44-4.108-3.6-10.27-6-17.222-6h-1.264c-6.794 0-12.956 2.28-17.222 6-3.476-6.12-11.534-10.44-20.856-10.44h-.158c-.948-9-10.744-15.96-22.752-15.96-4.582 0-8.69.96-12.324 2.76-4.108-4.68-11.06-7.8-19.118-7.8-1.422 0-3.002.12-4.424.36.316-1.32.474-2.64.474-3.96 0-11.88-12.64-21.48-28.282-21.48-3.318 0-6.636.48-9.638 1.32-4.74-6.72-14.062-11.28-24.806-11.28-.79 0-1.58 0-2.37.12-.79 0-1.58-.12-2.37-.12-10.744 0-20.066 4.56-24.806 11.28a35.326 35.326 0 00-9.638-1.32c-15.326 0-27.808 9.24-28.282 20.76-1.106-.12-2.212-.24-3.318-.24-9.954 0-18.486 4.8-21.804 11.52-.948 1.92-1.58 4.08-1.58 6.24 0 4.8 2.528 9.12 6.636 12.36-.79 1.44-1.264 3.12-1.264 4.8 0 7.2 7.742 13.08 17.222 13.08h462.15c9.48 0 17.222-5.88 17.222-13.08 0-1.68-.474-3.36-1.264-4.8 4.582-3.24 7.11-7.56 7.11-12.36z"
                    fill="#E6E9EE"
                />
                <path fill="#6DDCBD" d="M239 152h30v8h-30z" />
                <path className="exhaust__line" fill="#E6E9EE" d="M250 172h7v90h-7z" />
                <path
                    className="flame"
                    d="M250.27 178.834l-5.32-8.93s-2.47-5.7 3.458-6.118h10.26s6.232.266 3.306 6.194l-5.244 8.93s-3.23 4.37-6.46 0v-.076z"
                    fill="#AA2247"
                />
            </svg>
            <h1>The install worked successfully! Congratulations!</h1>
            <p>
                You are seeing this page because{" "}
                <a
                    href={`https://docs.djangoproject.com/en/${version}/ref/settings/#debug`}
                    target="_blank"
                    rel="noopener"
                >
                    DEBUG=True
                </a>{" "}
                is in your settings file and you have not configured any URLs.
            </p>
        </main>
        <footer>
            <a
                className="option"
                href={`https://docs.djangoproject.com/en/${version}/`}
                target="_blank"
                rel="noopener"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                </svg>
                <p>
                    <span className="option__heading">Django Documentation</span>
                    <span className="sr-only">.</span>
                    <br />
                    Topics, references, &amp; how-to’s
                </p>
            </a>
            <a
                className="option"
                href={`https://docs.djangoproject.com/en/${version}/intro/tutorial01/`}
                target="_blank"
                rel="noopener"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
                <p>
                    <span className="option__heading">Tutorial: A Polling App</span>
                    <span className="sr-only">.</span>
                    <br />
                    Get started with Django
                </p>
            </a>
            <a
                className="option"
                href="https://www.djangoproject.com/community/"
                target="_blank"
                rel="noopener"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
                <p>
                    <span className="option__heading">Django Community</span>
                    <span className="sr-only">.</span>
                    <br />
                    Connect, get help, or contribute
                </p>
            </a>
        </footer>
    </>
);
