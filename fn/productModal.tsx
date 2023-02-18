import axios from "axios";
import {closeAllModals, openModal} from '@mantine/modals';
import {Button, Center, Grid} from "@mantine/core";
import React from "react";

const config = require('../config.json');

export default async function productModal(category: string, setReceipt: any, setSum: any, receipt: any, sum: any, ref: any, refund: boolean, setRefundable: any) {
    const cache = await JSON.parse(localStorage.getItem('cache') || "{}");
    let data;
    let catcache = cache[category]
    if (typeof (catcache) === "undefined") {
        await axios.post(config.API_URL + '/products/itemsbycategory', {
            "category": category,
            "token": sessionStorage.getItem('token')
        }).then(async (response) => {
            data = response.data;
            await localStorage.setItem('cache', JSON.stringify({
                ...await JSON.parse(await localStorage.getItem('cache') || "{}"),
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
                                            if (refund) {
                                                setSum((sum + prod.Preis) * (-1));
                                                setRefundable(false);
                                            } else {
                                                setSum(sum + prod.Preis);
                                                setRefundable(false);
                                            }
                                            setReceipt([...receipt, {name: prod.Name, price: prod.Preis}]);
                                            closeAllModals();
                                            ref.current.scrollTo({top: ref.current.scrollHeight, behavior: 'smooth'});
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
