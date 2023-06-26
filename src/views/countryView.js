import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { TextField } from '../components/formField.js';
import { toast } from 'react-toastify';
import { Country } from "../classes/models/country.js";

import { getCountryById, updateCountry, } from '../services/countryServices'

export default function CountryView(props) {

    document.title = "Edit country";
    const { removeModal, type, itemId } = props;

    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);

    const getData = useCallback(async () => {
        setCountry(await getCountryById(itemId));
        setLoading(false);
    }, [itemId, type]);

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [getData]);

    // Modify country
    async function modifyCountry() {
        var nCountry = country;
        nCountry.id = country.id;
        const errors = Country.getErrors(country);

        if (errors.length > 0) {
            errors.forEach(error => toast(error, { type: "error" }));
            return;
        }

        updateCountry(nCountry).then(
            (response) => {
                if (response.status === 204) {
                    toast("Country updated successfully", { type: "success" })
                    removeModal(true);
                } else {
                    toast("An error occured while updating the country", { type: "error" })
                }
            }
        )
    }


    return (
        <Modal closeModal={() => removeModal(false)}>

                {
                    loading ? <Loading /> :
                        <>

                            <h1 id="section-title">{type === "adding" ? "Add a country" : "Country " + country.id} <img src={`https://flagsapi.com/${country.id}/flat/32.png`}></img></h1>

                            <div className="field-line">
                                <TextField
                                    for="name" label="Name" value={country.name}
                                    tooltip={<>The name of the country. <br></br> Can't be empty</>}
                                    onChange={(e) => {setCountry(prevState => ({...prevState, name: e.target.value}))
                                    }}
                                />
                                <TextField
                                    for="iso_code" label="ISO Code" value={country.iso_code}
                                    tooltip={<>The ISO Code of the country. <br></br> Must be 3 characters long</>}
                                    onChange={(e) => {
                                        setCountry(prevState => ({...prevState, iso_code: e.target.value}))
                                    }}
                                />
                            </div>

                            <div className="modify-buttons-list">
                                <button className="modify-button save-button" onClick={() => {

                                    if (window.confirm("Are you sure you want to save changes ?")) {
                                        modifyCountry()
                                    }

                                }}>{"Save changes"}</button>

                            </div>
                        </>
                }
        </Modal>
    );
}