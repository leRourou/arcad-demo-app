import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { TextField} from '../components/formField.js';
import { successDelete, errorToast, successUpdate, successAdd } from "../services/toastsServices";
import { Familly } from "../classes/models/familly.js";

import { getFamillyById, updateFamilly, createFamilly, deleteFamilly } from '../services/famillyServices.js'
/**
 * Familly view
 * @category Views
 * @param {props} props
 * @returns The JSX code for the familly view
 */
export default function FamillyView(props) {

    const { removeModal, type, itemId } = props;

    // Data state
    const [familly, setFamilly] = useState({});
    const [loading, setLoading] = useState(true);

    // Get familly
    const getData = useCallback(async () => {
        // Get families
        if (type === "adding") {
            setFamilly(Familly.empty());
            setLoading(false);
            return;
        }
        setFamilly(await getFamillyById(itemId));
        setLoading(false);
    }, [itemId, type]);

    useEffect(() => {
        const fetchData = async () => {
            await getData();
        };

        fetchData();
    }, [getData]);

    // Add familly
    async function addFamilly() {
        var nFamilly = familly;
        nFamilly.description = nFamilly.description.trim()
        nFamilly.id = 0;    
        const errors = Familly.getErrors(familly);
    
        if (errors.length > 0) {
          errors.forEach(error => errorToast(error));
          return;
        }
    
        createFamilly(nFamilly).then(
          (response) => {
            if (response.status === 201) {
              successAdd();
              removeModal(true);
            } else {
              errorToast("An error occured while adding the familly");
            }
          }
        )
    }

    // Modify familly
    async function modifyFamilly() {
        var nFamilly = familly;
        nFamilly.description = nFamilly.description.trim()
        nFamilly.id = familly.id;
    
        const errors = Familly.getErrors(familly);
    
        if (errors.length > 0) {
          errors.forEach(error => errorToast(error));
          return;
        }
    
        updateFamilly(nFamilly).then(
          (response) => {
            if (response.status === 204) {
              successUpdate();
              removeModal(true);
            } else {
              errorToast("An error occured while updating the familly");
            }
          }
        )
    }

    // Delete familly
    function removeFamilly() {
        
        deleteFamilly(familly.id).then(
          (response) => {
            if (response.status === 204) {
              successDelete();
              removeModal(true);
            } else {
              errorToast("An error occured while deleting the familly");
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
                            <h1 id="section-title">{type === "adding" ? "Add a familly" : "Familly n°" + familly.id} </h1>
                            
                            <div className="field-line">

                                <TextField
                                    for="description"
                                    label="Description"
                                    value={familly.description}
                                    tooltip={<>A description of the familly. <br></br> Can't be empty</>}
                                    onChange={(e) => {
                                        setFamilly(prevState => ({
                                            ...prevState,
                                            description: e.target.value
                                        }))
                                    }}
                                />
                            </div>

                            <div className="modify-buttons-list">



                                <button className="modify-button save-button" onClick={() => {
                                    if (type === "adding") {
                                        if (window.confirm("Are you sure you want to add this familly ?")) {
                                            addFamilly()
                                        }
                                    } else {
                                        if (window.confirm("Are you sure you want to save changes ?")) {
                                            modifyFamilly()
                                        }
                                    }
                                }}>{type === "adding" ? "Add familly" : "Save changes"}</button>

                                {type === "adding" ?
                                    <button className="modify-button cancel-button" onClick={() => {
                                        if (window.confirm("Are you sure you want to cancel ?")) {
                                            removeModal(false)
                                        }
                                    }}>Cancel</button>
                                    :
                                    <button className="modify-button delete-button" onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this familly ?")) {
                                            removeFamilly(true)
                                        }
                                    }}>Delete familly</button>
                                }

                            </div>
                        </>
                }
            </div>
        </Modal>
    );
}