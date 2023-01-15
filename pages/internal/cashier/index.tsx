import type {NextPage} from 'next'
import {Button, Center, Grid, LoadingOverlay, ScrollArea, Text} from '@mantine/core';
import {useRouter} from 'next/router'
import React, {useEffect} from "react";
import axios from "axios";
import productModal from "../../../fn/productModal";
import {IconAlertTriangle, IconArrowLeft, IconCheck, IconCheckbox, IconList, IconTrashX} from '@tabler/icons';
import {closeAllModals, openModal} from '@mantine/modals';
import preOrdersModal from "../../../fn/preOrdersModal";

const config = require('../../../config.json');


const Home: NextPage = () => {
    const router = useRouter();
    const [categories, setCategories] = React.useState([]);
    const [receipt, setReceipt] = React.useState([]);
    const [sum, setSum] = React.useState(0.00);

    const customLoader = (
        <svg
            width="54"
            height="54"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke={"blue"}
        >
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </g>
        </svg>
    );

    useEffect(() => {
        axios.post(config.API_URL + "/products/category", {
            "token": localStorage.getItem('token')
        }).then((response) => {
            setCategories(response.data);
        });
    }, []);

    if (categories.length > 0) {
        return (<>
                <div style={{height: "30vh", maxHeight: "30vh"}}>
                    <Grid sx={{width: "100vw", height: "30vh", maxHeight: "30vh", border: "solid black"}} columns={4}
                          p="xl">
                        <Grid.Col span={1}>
                            <Grid columns={2} style={{height: "100%", width: "100%"}}>
                                <Grid.Col span={1}>
                                    <Button
                                        sx={{height: "100%", width: "100%"}}
                                        size="lg"
                                        color={"gray"}
                                        onClick={() => {
                                            router.push("/internal/")
                                        }}>
                                        <IconArrowLeft/>
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Button
                                        sx={{height: "100%", width: "100%"}}
                                        size="lg"
                                        color={"red"}
                                        onClick={() => {
                                            setSum(0.00);
                                            setReceipt([]);
                                        }}>
                                        <IconTrashX/>
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Button
                                        sx={{height: "100%", width: "100%"}}
                                        size="lg"
                                        color={"blue"}
                                        onClick={() => {
                                            preOrdersModal();
                                        }}>
                                        <IconList/>
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Center style={{height: "100%"}}>
                                <h3 style={{color: "black"}}>
                                    {sum.toFixed(2)}€
                                </h3>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={1} style={{border: "solid black", overflow: "scroll", maxHeight: "100%"}}>
                            <ScrollArea>
                                <div style={{overflow: "inherit"}}>
                                    <h3 style={{color: "black"}}>Rechnung</h3>
                                    <Grid columns={3} style={{width: "95%"}}>
                                        {
                                            receipt.map((item: any) => {
                                                return (
                                                    <>
                                                        <Grid.Col span={2}><Text style={{
                                                            color: "black",
                                                            wordWrap: "break-word"
                                                        }}>{item.name}</Text></Grid.Col>
                                                        <Grid.Col span={1}><Text
                                                            style={{color: "black"}}>{item.price.toFixed(2)}€</Text></Grid.Col>
                                                    </>
                                                )
                                            })
                                        }
                                    </Grid>
                                </div>
                            </ScrollArea>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Button
                                sx={{height: "100%", width: "100%"}}
                                color={"green"}
                                onClick={() => {
                                    axios.post(config.API_URL + "/purchase/add", {
                                        "token": localStorage.getItem('token'),
                                        "products": receipt
                                    }).then((response) => {
                                        if (receipt.length > 0) {
                                            if (response.data.success) {
                                                setSum(0.00);
                                                setReceipt([]);
                                                openModal({
                                                    title: "Erfolgreich",
                                                    children: (<IconCheckbox style={{width: "100%"}} size={"100%"}
                                                                             color={"green"}/>),
                                                });
                                                setTimeout(() => {
                                                    closeAllModals();
                                                }, 500);
                                            }
                                        } else {
                                            openModal({
                                                title: "Fehler",
                                                children: (<IconAlertTriangle style={{width: "100%"}} size={"100%"}
                                                                              color={"red"}/>),
                                            });
                                            setTimeout(() => {
                                                closeAllModals();
                                            }, 500);
                                        }
                                    }).catch(() => {
                                        openModal({
                                            title: "Fehler",
                                            children: (<IconAlertTriangle style={{width: "100%"}} size={"100%"}
                                                                          color={"red"}/>),
                                        });
                                        setTimeout(() => {
                                            closeAllModals();
                                        }, 500);
                                    })
                                }}
                            >
                                <IconCheck/> <br/> Einkauf abschließen
                            </Button>
                        </Grid.Col>
                    </Grid>
                </div>
                <Center style={{height: "60vh", width: "100vw"}}>
                    <Grid sx={{width: "80vw", height: "60vh"}}>
                        {
                            categories.map((category: any) => {
                                return (
                                    <Grid.Col span={4} key={category}>
                                        <Button
                                            sx={{height: "100%", width: "100%"}}
                                            key={category}
                                            size="lg"
                                            onClick={() => {
                                                productModal(category, setReceipt, setSum, receipt, sum)
                                            }}>
                                            {category}
                                        </Button>
                                    </Grid.Col>)
                            })
                        }
                    </Grid>
                </Center>
            </>
        )
    } else {
        return (<div>
            <LoadingOverlay loader={customLoader} visible/>;
        </div>)
    }
}

export default Home
