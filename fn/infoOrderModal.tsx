import axios from "axios";
import {closeAllModals, openModal} from '@mantine/modals';
import {Button, Center, Paper} from "@mantine/core";
import React from "react";
import preOrdersModal from "./preOrdersModal";
import {IconTrashX} from "@tabler/icons";

const config = require('../config.json');

export default async function infoOrderModal(number: number) {
    const {data} = await axios.post(config.API_URL + '/preorder/list', {
        "token": sessionStorage.getItem('token')
    });
    const item = data.find((item: any) => item.Nummer === number);
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
                            preOrdersModal();
                        }}
                    >
                        &lt; Zurück
                    </Button>
                </div>
                <div style={{width: "100%", height: "75%", marginTop: "5%"}}>
                    <Paper shadow="sm" p="md" withBorder>
                        <Center>
                            <h1>Nummer: {number}</h1>
                        </Center>
                        <Center>
                            <h1>Produkt: {item?.Produkt}</h1>
                        </Center>
                        <Center>
                            <h1>Preis: {item?.Preis.toFixed(2)}€</h1>
                        </Center>
                    </Paper>
                    <Button
                        style={{height: "15vmax", width: "100%", marginTop: "5%"}}
                        size="lg"
                        color={"red"}
                        onClick={() => {
                            if (number > 0) {
                                axios.post(config.API_URL + '/preorder/delete', {
                                    "token": sessionStorage.getItem('token'),
                                    "number": number,
                                }).then(() => {
                                    closeAllModals();
                                    preOrdersModal();
                                });
                            } else {
                                alert("Bitte fülle alle Felder aus!");
                            }
                        }}
                    >
                        <IconTrashX/>
                    </Button>
                </div>
            </div>
        )
    })
}
