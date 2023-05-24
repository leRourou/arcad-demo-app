import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { TextField, NumberField, SelectField, TextAreaField } from '../components/formField.js';
import { Link } from "react-router-dom";
import { successDelete, errorToast, successUpdate, successAdd } from "../services/toastsServices";
import { useTransition } from "@react-spring/web";
import { animated } from "@react-spring/web";

import { Article } from "../classes/models/article.js";
import { updateArticle, createArticle, deleteArticle, getArticleById, getDescription, updateDescription } from "../services/articleServices";
import { getAllFamilies } from '../services/famillyServices.js'
import { getProvidersByArticles } from "../services/providerServices.js";
/**
 * Article view
 * @category Views
 * @param {props} props
 * @returns The JSX code for the article view
 */
export default function ArticleView(props) {

  const { removeModal, type, itemId } = props;

  // Data state
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [families, setFamilies] = useState([]);
  const [providers, setProviders] = useState([]);
  const [description, setDescription] = useState("");
  const [openEdit, setOpenEdit] = useState(true);
  const [openDescription, setOpenDescription] = useState(false);
  const [openProviders, setOpenProviders] = useState(false);

  const transitionEdit = useTransition(openEdit, {
    from: { height: 0 },
    enter: { height: 280 },
    leave: { height: 0 }
  });

  const transitionProviders = useTransition(openProviders, {
    from: { height: 0 },
    enter: { height: 50 },
    leave: { height: 0 }
  });

  const transitionDescription = useTransition(openDescription, {
    from: { height: 0 },
    enter: { height: 150 },
    leave: { height: 0 }
  });

  // Get article
  const getData = useCallback(async () => {
    // Get families
    setFamilies(formatFamilly(await getAllFamilies(1000, "", 1)));

    if (type === "adding") {
      setArticle(Article.empty());
      setLoading(false);
      document.title = "Add an article"
    } else {
      // Get providers
      setProviders(await getProvidersByArticles(itemId));
      // Get description
      setDescription(await getDescription(itemId))
      // Get article
      setArticle(await getArticleById(itemId));
      setLoading(false);
      document.title = "See an article"
    }
  }, [itemId, type]);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, [getData]);

  // Add article
  async function addArticle() {
    var nArticle = article;
    nArticle.description = nArticle.description.trim()
    nArticle.creation_date = new Date().toISOString().slice(0, 10); // Format : YYYY-MM-DD
    nArticle.id = "000000";

    const errors = Article.getErrors(article);

    if (errors.length > 0) {
      errors.forEach(error => errorToast(error));
      return;
    }

    createArticle(nArticle).then(
      (response) => {
        if (response.status === 201) {
          successAdd();
          removeModal(true);
        } else {
          errorToast("An error occured while adding the article");
        }
      }
    )
  }

  // Modify article
  async function modifyArticle() {
    var nArticle = article;
    nArticle.description = nArticle.description.trim()
    nArticle.id = article.id;

    const errors = Article.getErrors(article);

    if (errors.length > 0) {
      errors.forEach(error => errorToast(error));
      return;
    }

    updateDescription(description);

    updateArticle(nArticle).then(
      (response) => {
        if (response.status === 204) {
          successUpdate();
          removeModal(true);
        } else {
          errorToast("An error occured while updating the article");
        }
      }
    )
  }

  // Delete article
  function removeArticle() {
    deleteArticle(article.id).then(
      (response) => {
        if (response.status === 204) {
          successDelete();
          removeModal(true);
        } else {
          errorToast("An error occured while deleting the article");
        }
      }
    )
  }

  function displayProviders() {
    if (providers.length === 0) {
      return <p>No providers</p>
    } else {
      return (
        <ul className="providers-list">
          {providers.map((provider) => (
            <li key={provider.id}>
              <Link className="providers-item" to={"/providers/" + provider.id}>{provider.name}</Link>
            </li>
          ))}
        </ul>
      )
    }
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

              <h1 id="section-title">{type === "adding" ? "Add an article" : "Article n°" + article.id} </h1>

              <h2 onClick={() => setOpenDescription(!openDescription)} className="subtitle-itemview">Description {openDescription ? "⯆" : "⯈"}</h2>

              <div style={{ overflow: "hidden" }} >
                {transitionDescription((style, item) => item && (
                  <animated.div style={style}>
                    <TextAreaField
                      for="description"
                      label="Edit description"
                      value={description.DESCRIPTION}
                      tooltip={<>A description of the article. <br></br> Can't be empty</>}
                      onChange={(e) => {
                        setDescription(prevState => ({
                          ...prevState,
                          DESCRIPTION: e.target.value
                        }))
                      }}
                    >
                    </TextAreaField>
                  </animated.div>

                ))}
              </div>

              <h2 onClick={() => setOpenEdit(!openEdit)} className="subtitle-itemview">Informations {openEdit ? "⯆" : "⯈"}</h2>

              <div style={{ overflow: 'hidden' }}>

                {transitionEdit((style, item) => item && (
                  <animated.div style={style}>

                    <div className="field-line">
                      <TextField
                        for="description"
                        label="Informations"
                        value={article.description}
                        tooltip={<>A description of the article. <br></br> Can't be empty</>}
                        onChange={(e) => {
                          setArticle(prevState => ({
                            ...prevState,
                            description: e.target.value
                          }))
                        }}
                      />
                    </div>

                    <div className="field-line">
                      <SelectField
                        for="familly"
                        label="Familly"
                        value={article.familly_id}
                        options={families}
                        tooltip={<>The article's familly<br></br>To add a family, go to the <Link className="link" to='/families'> families</Link> page</>}
                        onChange={(e) => {
                          setArticle(prevState => ({
                            ...prevState,
                            familly_id: e.target.value
                          }))
                        }}
                      />

                      <NumberField
                        for="sold_price"
                        label="Reference sale price"
                        value={article.sold_price}
                        tooltip={<>Must be a positive number with two decimals <b> Example: </b> 12.34</>}
                        min="0"
                        step="0.01"
                        max="9999999"
                        regex={/\d+\.\d{2}/}
                        onChange={(e) => {
                          setArticle(prevState => ({
                            ...prevState,
                            sold_price: e.target.value
                          }))
                        }}
                      />

                      {<NumberField
                        for="wholesale_price"
                        label="Stock price"
                        value={article.wholesale_price}
                        tooltip={<>Sum of a given product's cost price plus the manufacturer's profit margin<br></br>Must be a positive number with two decimals <b> Example: </b> 12.34</>}
                        min="0"
                        step="0.01"
                        max="9999999"
                        regex={/\d+\.\d{2}/}
                        onChange={(e) => {
                          setArticle(prevState => ({
                            ...prevState,
                            wholesale_price: e.target.value
                          }))
                        }}
                      />}
                    </div>

                    <div className="field-line">

                      <NumberField
                        for="stock"
                        label="Stock"
                        value={article.stock}
                        tooltip="Must be a positive or null integer"
                        min="0"
                        step="1"
                        regex={/^\+?(0|[1-9]\d*)$/}
                        onChange={(e) => {
                          setArticle(prevState => ({
                            ...prevState,
                            stock: e.target.value
                          }))
                        }}
                      />

                      <NumberField
                        for="quantity_min"
                        label="Minimum stock"
                        value={article.quantity_min}
                        tooltip={<>The minimum quantity that a customer can order. <br></br> Must be positive or null</>}
                        min="0"
                        step="1"
                        regex={/^\+?(0|[1-9]\d*)$/}
                        onChange={(e) => {
                          setArticle(prevState => ({
                            ...prevState,
                            quantity_min: e.target.value
                          }))
                        }}
                      />
                    </div>
                  </animated.div>
                ))}

              </div>


              {type === "modify" &&
              <>
                <h2 className="subtitle-itemview" onClick={() => setOpenProviders(!openProviders)}>Suppliers ({providers.length}) {openProviders ? "⯆" : "⯈"}</h2>
                <div style={{ overflow: "hidden" }} >
                {transitionProviders((style, item) => item && (
                  <animated.div style={style}>
                    {displayProviders()}
                  </animated.div>
                ))}
                </div>
                </>
              }

              <div className="modify-buttons-list">

                <button className="modify-button save-button" onClick={() => {
                  if (type === "adding") {
                    if (window.confirm("Are you sure you want to add this article ?")) {
                      addArticle()
                    }
                  } else {
                    if (window.confirm("Are you sure you want to save changes ?")) {
                      modifyArticle()
                    }
                  }
                }}>{type === "adding" ? "Add article" : "Save changes"}</button>

                {type === "adding" ?
                  <button className="modify-button cancel-button" onClick={() => {
                    if (window.confirm("Are you sure you want to cancel ?")) {
                      removeModal(false)
                    }
                  }}>Cancel</button>
                  :
                  <button className="modify-button delete-button" onClick={() => {
                    if (window.confirm("Are you sure you want to delete this article ?")) {
                      removeArticle(true)
                    }
                  }}>Delete article</button>
                }

              </div>
            </>
        }
      </div>
    </Modal>
  );
}

function formatFamilly(families) {
  return families.map(item => {
    return {
      id: item.id,
      value: item.description
    };
  });
}