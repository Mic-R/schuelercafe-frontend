import axios from "axios";
import {closeAllModals, openModal} from '@mantine/modals';
import {Button, NumberInput, TextInput} from "@mantine/core";
import React from "react";
import preOrdersModal from "./preOrdersModal";
import {IconPlus} from "@tabler/icons";

const config = require('../../../../config.json');

export default async function addOrdersModal() {
    const {data} = await axios.post(config.API_URL + '/preorder/list', {
        "token": localStorage.getItem('token')
    });
    let number = 0;
    let product = "";
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
                    <TextInput
                        placeholder="Sal. o. Zwieb."
                        label="Produkt-Name"
                        size="xl"
                        withAsterisk
                        onChange={(value) => {
                            product = value.target.value;
                        }}
                    />
                    <Button
                        style={{height: "15vmax", width: "100%", marginTop: "5%"}}
                        size="lg"
                        onClick={() => {
                            if (number > 0 && product.length > 0) {
                                axios.post(config.API_URL + '/preorder/add', {
                                    "token": localStorage.getItem('token'),
                                    "number": number,
                                    "product": product
                                });
                                closeAllModals();
                                setTimeout(() => {
                                    preOrdersModal();
                                }, 500);
                            } else {
                                alert("Bitte fülle alle Felder aus!");
                            }
                        }}
                    >
                        <IconPlus/>
                    </Button>
                </div>
            </div>
        )
    })
}
