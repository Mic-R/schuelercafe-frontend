import type {NextPage} from 'next'
import {Button, Center, Grid, List, Paper, Text} from '@mantine/core';
import {useRouter} from 'next/router'
import React, {useState} from "react";
import {IconArrowBack, IconDoorExit} from "@tabler/icons";


const Home: NextPage = () => {
    const router = useRouter();
    const [code, setCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    return (
        <>
            <Center sx={{height: "100vh", width: "100vw"}}>
                <Paper sx={{width: "75vw", height: "80vh"}} shadow="md" radius="md" p="xl" withBorder>
                    <Center sx={{height: "80%"}}>
                        <List size="lg">
                            <Text>Ich bestätige, dass ich...</Text>
                            <List.Item>die Kasse abgesperrt habe.</List.Item>
                            <List.Item>die Kasse zurückgebracht habe.</List.Item>
                            <List.Item>das Café aufgeräumt habe.</List.Item>
                            <List.Item>alle Produkte verräumt habe.</List.Item>
                        </List>
                    </Center>
                    <Grid columns={2} justify="center" align="center">
                        <Grid.Col span={1}>
                            <Center>
                                <Button leftIcon={<IconArrowBack/>} variant="light" onClick={() => {
                                    router.push("/internal/cashier")
                                }}>
                                    Abbrechen
                                </Button>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Center>
                                <Button rightIcon={<IconDoorExit/>} color="red" variant="light" onClick={() => {
                                    sessionStorage.clear();
                                    router.push("/")
                                }}>
                                    Ausloggen
                                </Button>
                            </Center>
                        </Grid.Col>
                    </Grid>
                    <div>
                        <Button color="gray" variant="light" style={{width: "100%", marginTop: "10%"}} compact
                                onClick={() => {
                                    sessionStorage.clear();
                                    router.push("/internal/cashier")
                                }}>
                            Cache leeren
                        </Button>
                    </div>
                </Paper>
            </Center>
        </>
    )
}

export default Home
