import React, {useState} from "react";
import { toast } from "react-toastify";
import { SelectField } from "../../components/formField";
import { deleteArticleProvider } from "../../services/articleServices";

export function RemoveProviderToArticleView(props) {

    const { article_id, providers, removeModal } = props;

    const [selectedProvider, setSelectedProvider] = useState(providers[0].id);

    function deleteProvider() {
        
        if (!window.confirm("Are you sure you want to delete this provider from the article?")) {
            return;
        }

        if (deleteArticleProvider(article_id, selectedProvider)) {
            toast.success("Provider deleted");
            removeModal();
        } else {
            toast.error("Error while deleting provider");
        }
    }


    return (
        <>
        <h1 id="section-title">Delete a provider in order</h1>
        <SelectField
            for="providers" label="Provider"
            options={providers.map((provider) => {
                return {
                    value: provider.name,
                    id: provider.id
                }
            })
            }
            tooltip={<>Provider to delete</>}
            onChange={(e) => {
                setSelectedProvider(e.target.value)
            }}
        />
        <div className="modify-buttons-list">
            <button onClick={() => deleteProvider()} className="modify-button delete-button">Delete article from the order</button>
        </div>
    </>
    )
}