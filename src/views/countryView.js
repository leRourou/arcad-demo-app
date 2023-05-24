import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { TextField } from '../components/formField.js';
import { errorToast, successUpdate } from "../services/toastsServices";
import { Country } from "../classes/models/country.js";

import { getCountryById, updateCountry,  } from '../services/countryServices'
/**
 * Country view
 * @category Views
 * @param {props} props
 * @returns The JSX code for the country view
 */
export default function CountryView(props) {

    const { removeModal, type, itemId } = props;

    // Data state
    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);

    // Get country
    const getData = useCallback(async () => {
        // Get countries
        if (type === "adding") {
            setCountry(Country.empty());
            setLoading(false);
            return;
        }
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
            errors.forEach(error => errorToast(error));
            return;
        }

        updateCountry(nCountry).then(
            (response) => {
                if (response.status === 204) {
                    successUpdate();
                    removeModal(true);
                } else {
                    errorToast("An error occured while updating the country");
                }
            }
        )
    }


    return (
        <Modal>
            <div
                id="black-back"
                onClick={() => {
                    removeModal(false);
                }}
            />

            <div id="modify-view">
                {
                    loading ? <Loading /> :
                        <>

                            <h1 id="section-title">{type === "adding" ? "Add a country" : "Country " + country.id} </h1>

                                <div className="field-line">
                                <TextField
                                    for="name"
                                    label="Name"
                                    value={country.name}
                                    tooltip={<>The name of the country. <br></br> Can't be empty</>}
                                    onChange={(e) => {
                                        setCountry(prevState => ({
                                            ...prevState,
                                            name: e.target.value
                                        }))
                                    }}
                                />
                                <TextField
                                    for="iso_code"
                                    label="ISO Code"
                                    value={country.iso_code}
                                    tooltip={<>The ISO Code of the country. <br></br> Must be 3 characters long</>}
                                    onChange={(e) => {
                                        setCountry(prevState => ({
                                            ...prevState,
                                            iso_code: e.target.value
                                        }))
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
            </div>
        </Modal>
    );
}