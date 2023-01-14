import axios from "axios";
import {closeAllModals, openModal} from '@mantine/modals';
import {Button, Center, Grid} from "@mantine/core";
import React from "react";

const config = require('../../../../config.json');

export default async function productModal(category: string, setReceipt, setSum, receipt, sum) {
    const cache = await JSON.parse(sessionStorage.getItem('cache') || "{}");
    let data;
    let catcache = cache[category]
    if (typeof (catcache) === "undefined") {
        await axios.post(config.API_URL + '/products/itemsbycategory', {
            "category": category,
            "token": localStorage.getItem('token')
        }).then(async (response) => {
            data = response.data;
            await sessionStorage.setItem('cache', JSON.stringify({
                ...await JSON.parse(await sessionStorage.getItem('cache') || "{}",),
                [category]: data
            }))
        })
    } else {
        data = catcache;
    }
    await openModal({
        title: category,
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
                        }}>
                        &lt; Zurück
                    </Button>
                </div>
                <Grid sx={{width: "100%", height: "75%", marginTop: "5%"}}>
                    {
                        data.map((prod: any) => {
                            return (
                                <Grid.Col span={4} key={prod.Name}>
                                    <Button
                                        sx={{height: "15vmax", width: "100%"}}
                                        key={prod.Name}
                                        size="lg"
                                        onClick={() => {
                                            setSum(sum + prod.Preis);
                                            setReceipt([...receipt, {name: prod.Name, price: prod.Preis}]);
                                            closeAllModals();
                                        }}>
                                        <Center>
                                            {prod.Name} <br/> <br/>{prod.Preis.toFixed(2)}€
                                        </Center>
                                    </Button>
                                </Grid.Col>)
                        })
                    }
                </Grid>
            </div>
        )
    })
}
