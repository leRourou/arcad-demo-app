import React, { useState } from "react";
import { toast } from "react-toastify";
import { getAllProviders } from "../../services/providerServices";
import SearchBar from "../../components/searchBar";
import { createArticleProvider } from "../../services/articleServices"

export function AddProviderToArticleView(props) {
    const { article_id, removeModal } = props;

    const [providers, setProviders] = useState([]);

    function getProviders(searchTerm) {
        getAllProviders(5, searchTerm, 1).then((response) => {
            setProviders(response);
        })
    }

    function addProviderToArticle(provider) {
        if (window.confirm(`Are you sure you want to add the provider ${provider.name} to the article?`)) {
            createArticleProvider(article_id, provider.id).then(() => {
                toast.success(`The provider ${provider.name} has been added to the article`);
                removeModal();
            }).catch((error) => {
                toast.error(`Error: ${error}`);
            })
        }
    }

    return (
        <>
            <h1 id="section-title">Add a provider to an article</h1>
            <SearchBar
                placeholder="Search a provider"
                onSearch={(value) => {
                    getProviders(value)
                }
                }
            ></SearchBar>

            {providers.length !== 0 &&
                <table style={{ marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map((provider) => {
                            return (
                                <tr onClick={() => addProviderToArticle(provider)}>
                                    <td key={provider.id}>{provider.id}</td>
                                    <td key={provider.name}>{provider.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </>
    )
}