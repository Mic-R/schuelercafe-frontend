import type {NextPage} from 'next'
import {Title} from '@mantine/core';
import {useRouter} from 'next/router'
import React, {useEffect} from "react";
import jsonwebtoken from "jsonwebtoken";

const config = require('../../../config.json');


const Home: NextPage = () => {
    const router = useRouter();

    async function admin() {
        const token = jsonwebtoken.decode(sessionStorage.getItem('token') || "");
        // if (!token || !token?.admin) {
        // router.push("/internal")
        // }
    }

    useEffect(() => {
        admin();
    })
    return (
        <>
            <div>
                <Title>
                    Schülercafé - Login
                </Title>
            </div>
        </>
    )
}

export default Home
