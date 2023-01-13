import type {NextPage} from 'next'
import {Button, Center, Paper, PasswordInput, Title} from '@mantine/core';
import {useRouter} from 'next/router'
import React, {useEffect, useState} from "react";
import axios from "axios";

const config = require('../config.json');


const Home: NextPage = () => {
    const router = useRouter();
    const [code, setCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push("/internal")
        }
    }, [router]);
    return (
        <>
            <Center sx={{height: "100vh", width: "100vw"}}>
                <Paper sx={{width: "75vw", height: "80vh"}} shadow="md" radius="md" p="xl" withBorder>
                    <Center style={{height: "30%"}}>
                        <Title>
                            Schülercafé - Login
                        </Title>
                    </Center>
                    <Center style={{height: "30%"}}>
                        <PasswordInput
                            pattern="[0-9]*"
                            inputMode={"numeric"}
                            placeholder="Login-Code"
                            radius="md"
                            size="xl"
                            withAsterisk
                            sx={{width: "80%"}}
                            onChange={(event) => {
                                setCode(event.currentTarget.value);
                                setError(null)
                            }}
                            error={error}
                        />
                    </Center>
                    <Center>
                        <Button
                            variant="light"
                            size="lg"
                            onClick={() => {
                                axios.post(config.API_URL + "/auth/login", {
                                    "code": code
                                }).then((response) => {
                                    if (response.data.success) {
                                        localStorage.setItem('token', response.data.token);
                                        router.push("/internal")
                                    } else {
                                        setError("Falscher Code");
                                    }
                                });
                            }}
                        >
                            Einloggen
                        </Button>
                    </Center>
                </Paper>
            </Center>
        </>
    )
}

export default Home
