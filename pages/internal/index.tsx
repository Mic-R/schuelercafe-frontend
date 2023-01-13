import type {NextPage} from 'next'
import {Button, Center, Paper} from '@mantine/core';
import {useRouter} from 'next/router'
import React from "react";

const config = require('../../config.json');


const Home: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <div>
                <Center sx={{height: "100vh", width: "100vw"}}>
                    <Paper sx={{width: "75vw", height: "80vh"}} shadow="md" radius="md" p="xl" withBorder>
                        <Center sx={{height: "50%"}}>
                            <Button color="indigo" size="xl"
                                    leftIcon={<svg xmlns="http://www.w3.org/2000/svg"
                                                   className="icon icon-tabler icon-tabler-receipt-2"
                                                   width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                                   stroke="currentColor"
                                                   fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"/>
                                        <path
                                            d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5"/>
                                    </svg>}
                                    onClick={() => {
                                        router.push("/internal/cashier")
                                    }}
                            >
                                Kasse
                            </Button>
                        </Center>
                        <Center sx={{height: "50%"}}>
                            <Button color="red" size="xl"
                                    leftIcon={<svg xmlns="http://www.w3.org/2000/svg"
                                                   className="icon icon-tabler icon-tabler-users" width="24" height="24"
                                                   viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                   fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                                    </svg>}
                                    onClick={() => {
                                        router.push("/internal/admin")
                                    }}
                            >
                                Admin
                            </Button>
                        </Center>
                    </Paper>
                </Center>
            </div>
        </>
    )
}

export default Home
