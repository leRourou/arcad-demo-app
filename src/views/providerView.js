import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { TextField, SelectField } from '../components/formField.js';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { Provider } from "../classes/models/provider.js";
import { getAllCountries } from "../services/countryServices.js";
import { getProviderById, updateProvider } from '../services/providerServices'

export default function ProviderView(props) {

    document.title = "Edit provider";
    const { removeModal, type, itemId } = props;

    // Data state
    const [provider, setProvider] = useState({});
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = useCallback(async () => {
        setCountries(await getAllCountries(500, "", 1));
        setProvider(await getProviderById(itemId));
        setLoading(false);
    }, [itemId, type]);

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [getData]);

    async function modifyProvider() {
        var nProvider = provider;
        nProvider.id = provider.id;
        const errors = Provider.getErrors(provider);

        if (errors.length > 0) {
            errors.forEach(error => toast(error, { type: "error" }));
            return;
        }

        updateProvider(nProvider).then(
            (response) => {
                if (response.status === 204) {
                    toast("Provider updated successfully", { type: "success" })
                    removeModal(true);
                } else {
                    toast("An error occured while updating the provider", { type: "error" })
                }
            }
        )
    }


    return (
        <Modal closeModal={() => removeModal(false)}>

            {
                loading ? <Loading /> :
                    <>

                        <h1 id="section-title">{"Provider " + provider.id} </h1>

                        <div className="field-line">
                            <TextField
                                for="name"
                                label="Name"
                                value={provider.name}
                                tooltip={<>The name of the provider. <br></br> Can't be empty</>}
                                onChange={(e) => {
                                    setProvider(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }))
                                }}
                            />
                            {/*<TextField
                                for="phone"
                                label="Phone"
                                value={provider.phone}
                                tooltip={<>The phone number of the provider <br></br> Must be less than 15 characters long</>}
                                onChange={(e) => {
                                    setProvider(prevState => ({
                                        ...prevState,
                                        phone: e.target.value
                                    }))
                                }}
                            />
                            <TextField
                                for="email"
                                label="Email"
                                value={provider.email}
                                tooltip={<>The email address of the provider. <br></br> Must be less than 50 characters long</>}
                                onChange={(e) => {
                                    setProvider(prevState => ({
                                        ...prevState,
                                        email: e.target.value
                                    }))
                                }}
                            />*/}
                        </div>

                        <div className="field-line">
                            <TextField
                                for="address"
                                label="Address"
                                value={provider.address}
                                tooltip={<>The address of the provider <br></br>Must be less than 50 characters long</>}
                                onChange={(e) => {
                                    setProvider(prevState => ({
                                        ...prevState,
                                        address: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div className="field-line">
                            <TextField
                                for="zipcode"
                                label="ZIP Code"
                                value={provider.zipCode}
                                tooltip={<>The ZIP Code of the provider's address <br></br>Must be less than 10 characters long</>}
                                onChange={(e) => {
                                    setProvider(prevState => ({
                                        ...prevState,
                                        zipCode: e.target.value
                                    }))
                                }}
                            />
                            <TextField
                                for="city"
                                label="City"
                                value={provider.city}
                                tooltip={<>The city of the provider's address <br></br>Must be less than 30 characters long</>}
                                onChange={(e) => {
                                    setProvider(prevState => ({
                                        ...prevState,
                                        city: e.target.value
                                    }))
                                }}
                            />
                            <SelectField
                                for="country"
                                label="Country"
                                value={provider.country_id}
                                options={countries.map((country) => {
                                    return {
                                        value: country.name,
                                        id: country.id
                                    }
                                })
                                }
                                tooltip={<>Country of the provider's address<br></br>To modify a country, go to the <Link className="link" to='/countries'>countries</Link> page</>}
                                onChange={(e) => {
                                    setProvider(prevState => ({
                                        ...prevState,
                                        country_id: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div className="modify-buttons-list">
                            <button className="modify-button save-button" onClick={() => {

                                if (window.confirm("Are you sure you want to save changes ?")) {
                                    modifyProvider()
                                }

                            }}>{"Save changes"}</button>

                        </div>
                    </>
            }
        </Modal>
    );
}