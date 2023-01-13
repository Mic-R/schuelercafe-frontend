import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {useEffect} from "react";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();
    useEffect(() => {
        if (router.pathname.startsWith("/internal") && !localStorage.getItem('token')) {
            router.push("/");
        }
    });
    return <>
        <div style={{backgroundColor: "whitesmoke", width: "100vw", height: "100vh"}}>
            <Component {...pageProps} />
        </div>
    </>
}

export default MyApp
