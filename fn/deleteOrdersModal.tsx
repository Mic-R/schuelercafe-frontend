import axios from "axios";
import {closeAllModals, openModal} from '@mantine/modals';
import {Button, NumberInput} from "@mantine/core";
import React from "react";
import preOrdersModal from "./preOrdersModal";
import {IconTrashX} from "@tabler/icons";

const config = require('../config.json');

export default async function deleteOrdersModal() {
    const {data} = await axios.post(config.API_URL + '/preorder/list', {
        "token": sessionStorage.getItem('token')
    });
    let number = 0;
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
                    <NumberInput
                        placeholder="111"
                        label="Vorbestellungs-Nummer"
                        size="xl"
                        withAsterisk
                        hideControls
                        style={{width: "100%", marginBottom: "5%"}}
                        onChange={(value) => {
                            number = value || 0;
                        }}
                    />
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
