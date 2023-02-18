import axios from "axios";
import {closeAllModals, openModal} from '@mantine/modals';
import {Autocomplete, Button, NumberInput} from "@mantine/core";
import React from "react";
import preOrdersModal from "./preOrdersModal";
import {IconPlus} from "@tabler/icons";

const config = require('../config.json');

export default async function addOrdersModal() {
    const {data} = await axios.post(config.API_URL + '/preorder/list', {
        "token": sessionStorage.getItem('token')
    });

    let number = 0;
    let product = "";
    let price = 0;
    let options: any;

    //cache
    async function cache() {
        const cache = await JSON.parse(localStorage.getItem('cache') || "{}");
        let catcache = cache["preorderoptions"]
        if (typeof (catcache) === "undefined" || catcache === "null") {
            await axios.post(config.API_URL + '/preorder/autocomplete', {
                "token": sessionStorage.getItem('token')
            }).then(async (response) => {
                options = response.data.options;
                await localStorage.setItem('cache', JSON.stringify({
                    ...await JSON.parse(await localStorage.getItem('cache') || "{}"),
                    ["preorderoptions"]: options
                }))
            })
        } else {
            options = catcache;
        }
    }

    await cache();
    if (options !== undefined)
        await openModal({
            centered: false,
            title: "Vorbestellungen",
            withCloseButton: true,
            fullScreen: true,
            transitionDuration: 0,
            children: (
                <div style={{height: "100vh"}}>
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
                            style={{width: "100%", marginBottom: "1vh"}}
                            onChange={(value) => {
                                number = value || 0;
                            }}
                        />
                        <Autocomplete
                            placeholder="Sal. o. Zwieb."
                            label="Produkt-Name"
                            size="xl"
                            withAsterisk
                            style={{width: "100%", marginBottom: "1vh"}}
                            onItemSubmit={(value) => {
                                product = value.name || "";
                                price = value.price.toPrecision(2) || 0;
                            }}
                            data={options}
                        />
                        <Button
                            style={{height: "10vmax", width: "100%", marginTop: "5%"}}
                            size="lg"
                            onClick={() => {
                                if (number > 0 && product.length > 0) {
                                    axios.post(config.API_URL + '/preorder/add', {
                                        "token": sessionStorage.getItem('token'),
                                        "number": number,
                                        "product": product,
                                        "price": price
                                    }).then(() => {
                                        closeAllModals();
                                        preOrdersModal();
                                    });
                                    axios.post(config.API_URL + "/purchase/add", {
                                        "token": sessionStorage.getItem('token'),
                                        "products": [{name: product, price: price}]
                                    })
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
