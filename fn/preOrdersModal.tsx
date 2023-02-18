import axios from "axios";
import {closeAllModals, openModal} from '@mantine/modals';
import {Button, Center, Grid} from "@mantine/core";
import React from "react";
import {IconPlus, IconTrashX} from "@tabler/icons";
import addOrdersModal from "./addOrdersModal";
import deleteOrdersModal from "./deleteOrdersModal";

const config = require('../config.json');

export default async function preOrdersModal(tempprice: any, setTempprice: any) {
    const {data} = await axios.post(config.API_URL + '/preorder/list', {
        "token": sessionStorage.getItem('token')
    });

    await openModal({
        title: "Vorbestellungen",
        withCloseButton: true,
        fullScreen: true,
        transitionDuration: 0,
        children: (
            <div style={{height: "100vmax"}}>
                {/* Back Button */}
                <div style={{width: "100%", height: "10%"}}>
                    <Button
                        style={{width: "100%", height: "100%"}}
                        onClick={() => {
                            closeAllModals();
                        }}
                    >
                        &lt; Zurück
                    </Button>
                </div>
                <Grid sx={{width: "100%", height: "75%", marginTop: "5%"}}>
                    <Grid.Col span={4}>
                        <Button
                            sx={{height: "15vmax", width: "100%"}}
                            size="lg"
                            onClick={() => {
                                closeAllModals();
                                addOrdersModal(tempprice, setTempprice);
                            }}
                        >
                            <IconPlus/>
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button
                            sx={{height: "15vmax", width: "100%"}}
                            size="lg"
                            color={"red"}
                            onClick={() => {
                                closeAllModals();
                                deleteOrdersModal(tempprice, setTempprice);
                            }}
                        >
                            <IconTrashX/>
                        </Button>
                    </Grid.Col>
                    {
                        data.map((pre: any) => {
                            let color;
                            if (pre.Status === 0) {
                                color = "green";
                            } else if (pre.Status === 1) {
                                color = "yellow";
                            }
                            return (
                                <Grid.Col span={4} key={pre.Nummer}>
                                    <Button
                                        sx={{height: "15vmax", width: "100%"}}
                                        key={pre.Nummer}
                                        size="lg"
                                        color={color}
                                        onClick={() => {
                                            let status = pre.Status;
                                            if (status === 0) {
                                                axios.post(config.API_URL + '/preorder/update', {
                                                    "token": sessionStorage.getItem('token'),
                                                    "number": pre.Nummer,
                                                    "status": 1
                                                }).then(() => {
                                                    closeAllModals();
                                                    preOrdersModal(tempprice, setTempprice);
                                                })
                                            }
                                            if (status === 1) {
                                                axios.post(config.API_URL + '/preorder/delete', {
                                                    "token": sessionStorage.getItem('token'),
                                                    "number": pre.Nummer
                                                }).then(() => {
                                                    closeAllModals();
                                                    preOrdersModal(tempprice, setTempprice);
                                                })
                                            }

                                        }}
                                    >
                                        <Center>
                                            {pre.Nummer} <br/> <br/>{pre.Produkt}
                                        </Center>
                                    </Button>
                                </Grid.Col>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    });
}
