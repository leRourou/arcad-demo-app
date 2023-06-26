import "../style/item-view.scss";
import React, { useCallback, useEffect, useState } from "react";
import Modal from '../components/modal.js';
import Loading from "./misc/loadingView.js";
import { TextField, NumberField, SelectField, TextAreaField } from '../components/formField.js';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTransition } from "@react-spring/web";
import { animated } from "@react-spring/web";
import { Article } from "../classes/models/article.js";
import { updateArticle, createArticle, deleteArticle, getArticleById } from "../services/articleServices";
import { getInformations, updateInformations, deleteInformations } from "../services/articleInfomationsServices.js";
import { getAllFamilies } from '../services/famillyServices.js';
import { getProvidersByArticles } from "../services/providerServices.js";
import { AddProviderToArticleView } from "./providers/addProviderToArticleView";
import { RemoveProviderToArticleView } from "./providers/removeProviderToArticleView";
import Section from "../components/section";

const TRANSITION_PROPERTIES = {
  from: { maxHeight: 0 },
  enter: { maxHeight: 300 },
  leave: { maxHeight: 0 },
  trail: 300
}

const EMPTY_ARTICLE_ID = "000000"

export default function ArticleView(props) {

  document.title = "Edit article"
  const { removeModal, type, itemId } = props;

  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [families, setFamilies] = useState([]);
  const [providers, setProviders] = useState([]);
  const [description, setDescription] = useState("");
  const [addProviderModal, setAddProviderModal] = useState(false);
  const [editProviderModal, setEditProviderModal] = useState(false);
  const [removeProviderModal, setRemoveProviderModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(true);
  const [openDescription, setOpenDescription] = useState(false);
  const [openProviders, setOpenProviders] = useState(false);

  const transitionEdit = useTransition(openEdit, TRANSITION_PROPERTIES);
  const transitionProviders = useTransition(openProviders, TRANSITION_PROPERTIES);
  const transitionDescription = useTransition(openDescription, TRANSITION_PROPERTIES);

  const closeAll = () => {
    setOpenEdit(false);
    setOpenDescription(false);
    setOpenProviders(false);
  }

  const getData = useCallback(async () => {

    setFamilies(formatFamilly(await getAllFamilies(1000, "", 1)));

    if (type === "adding") {
      setArticle(Article.getEmptyArticle());
      setLoading(false);
      document.title = "Add an article"
    } else {
      let desc = (await getInformations(itemId));
      setDescription(desc.DESCRIPTION);
      setProviders(await getProvidersByArticles(itemId));
      setArticle(await getArticleById(itemId));
      setLoading(false);
    }
  }, [itemId, type]);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [getData, addProviderModal, editProviderModal, removeProviderModal]);

  async function addArticle() {
    var nArticle = article;
    nArticle.description = nArticle.description.trim()
    nArticle.creation_date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    nArticle.id = EMPTY_ARTICLE_ID;

    const errors = Article.getErrors(article);

    if (errors.length > 0) {
      errors.forEach(error => toast(error, { type: "error" }));
      return;
    }
    const isSuccess = await createArticle(nArticle, description);
    if (isSuccess) {
      toast("Article created successfully !", { type: "success" })
      removeModal(true);
    } else {
      toast("An error occured during the article creation.", { type: "error" })
    }
  }

  async function modifyArticle() {
    var nArticle = article;
    nArticle.description = nArticle.description.trim()

    const errors = Article.getErrors(article);
    if (errors.length > 0) {
      errors.forEach(error => toast(error, { type: "error" }));
      return;
    }

    const isSuccess = await updateArticle(nArticle);
    const isSuccess2 = await updateInformations(nArticle.id, description);
    if (isSuccess && isSuccess2) {
      toast("Article updated successfully !", { type: "success" })
      removeModal(true);
    } else {
      toast("An error occured during the article update.", { type: "error" })
    }
  }

  async function removeArticle() {
    await deleteInformations(article.id);
    deleteArticle(article.id).then(
      (response) => {
        if (response.status === 204) {
          toast("Article deleted successfully !", { type: "success" })
          removeModal(true);
        } else {
          toast("An error occured during the article deletion.", { type: "error" })
        }
      }
    )
  }


  function displayProviders() {
    if (providers.length === 0) {
      return (
        <>
          <p>No providers</p>
          <div className="modify-buttons-list">
            <button className="modify-button save-button" onClick={() => setAddProviderModal(true)}>Add a provider</button>
          </div>
        </>
      )
    } else {
      return (
        <>
          <ul className="providers-list">
            {providers.map((provider) => (
              <li key={provider.id}>
                <Link className="providers-item" to={"/providers/" + provider.id}>{provider.name}</Link>
              </li>
            ))}
          </ul>

          <div className="modify-buttons-list">
            <button className="modify-button save-button" onClick={() => setAddProviderModal(true)}>Add a provider</button>
            <button className="modify-button delete-button" onClick={() => setRemoveProviderModal(true)}>Remove a provider</button>
          </div>
        </>
      )
    }
  }

  function displayButtons() {
    return (
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
    )
  }

  return (
    <Modal closeModal={() => removeModal(false)}>

      {
        loading ? <Loading /> :
          <>

            {addProviderModal && <Modal closeModal={() => setAddProviderModal(false)}><AddProviderToArticleView article_id={article.id} removeModal={() => setAddProviderModal(false)}></AddProviderToArticleView></Modal>}
            {removeProviderModal && <Modal closeModal={() => setRemoveProviderModal(false)}><RemoveProviderToArticleView article_id={article.id} providers={providers} removeModal={() => setRemoveProviderModal(false)}></RemoveProviderToArticleView></Modal>}

            <h1 id="section-title">{type === "adding" ? "Add an article" : "Article " + article.id}</h1>

            <Section title={"Description"} isOpen={openDescription} setIsOpen={setOpenDescription} closeAll={() => closeAll() }>
              <TextAreaField
                for="description" label="Edit description" value={description}
                tooltip={<>A description of the article. <br></br> Can't be empty</>}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}>
              </TextAreaField>
            </Section>

            <Section title={"Informations"} isOpen={openEdit} setIsOpen={setOpenEdit} closeAll={() => closeAll() }>
                  <div className="field-line">
                    <TextField
                      for="description" label="Informations" value={article.description}
                      tooltip={<>A description of the article. <br></br> Can't be empty</>}
                      onChange={(e) => {
                        setArticle(prevState => ({ ...prevState, description: e.target.value }))
                      }}
                    />
                  </div>

                  <div className="field-line">
                    <SelectField
                      for="familly" label="Familly" value={article.familly_id}
                      options={families}
                      tooltip={<>The article's familly<br></br>To add a family, go to the <Link className="link" to='/families'> families</Link> page</>}
                      onChange={(e) => {
                        setArticle(prevState => ({ ...prevState, familly_id: e.target.value }))
                      }}
                    />

                    <NumberField
                      for="sold_price" label="Reference sale price" value={article.sold_price}
                      tooltip={<>Must be a positive number with two decimals <b> Example: </b> 12.34</>}
                      min="0"
                      step="0.01"
                      max="9999999"
                      onChange={(e) => {
                        setArticle(prevState => ({ ...prevState, sold_price: e.target.value }))
                      }}
                    />

                    <NumberField
                      for="wholesale_price" label="Stock price" value={article.wholesale_price}
                      tooltip={<>Sum of a given product's cost price plus the manufacturer's profit margin<br></br>Must be a positive number with two decimals <b> Example: </b> 12.34</>}
                      min="0" step="0.01" max="9999999"
                      onChange={(e) => {
                        setArticle(prevState => ({ ...prevState, wholesale_price: e.target.value }))
                      }}
                    />
                  </div>

                  <div className="field-line">
                    <NumberField
                      for="stock" label="Stock" value={article.stock}
                      tooltip="Must be a positive or null integer"
                      min="0" step="1"
                      onChange={(e) => {
                        setArticle(prevState => ({ ...prevState, stock: e.target.value }))
                      }}
                    />
                    <NumberField
                      for="quantity_min" label="Minimum stock" value={article.quantity_min}
                      tooltip={<>The minimum quantity that a customer can order. <br></br> Must be positive or null</>}
                      min="0"
                      step="1"
                      onChange={(e) => {
                        setArticle(prevState => ({ ...prevState, quantity_min: e.target.value }))
                      }}
                    />
                  </div>
            </Section>

            {type === "modify" &&
              <>
                <Section title={"Providers"} isOpen={openProviders} setIsOpen={setOpenProviders} closeAll={() => closeAll() }>
                      {displayProviders()}
                </Section>
              </>
            }

            {displayButtons()}
          </>
      }
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