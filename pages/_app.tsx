import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {useEffect} from "react";
import {MantineProvider} from '@mantine/core';
import {ModalsProvider} from '@mantine/modals';

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();
    useEffect(() => {
        if (router.pathname.startsWith("/internal") && !sessionStorage.getItem('token')) {
            router.push("/");
        }
    });
    return <>
        <MantineProvider>
            <ModalsProvider>
                <div style={{backgroundColor: "whitesmoke", width: "100vw", height: "100vh"}}>
                    <Component {...pageProps} />
                </div>
            </ModalsProvider>
        </MantineProvider>
    </>
}

export default MyApp
