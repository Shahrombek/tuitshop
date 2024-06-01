import React, { useContext, useState, useEffect } from "react";
import Wrapper from "./MainWrapper";
import Card from "../../components/Card";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import KorzinaMini from "../../components/KorzinaMini/KorzinaMini";
import Choose from "../../components/Choose";
import Modal from "../../components/Modal";
import SignIn from "../../Login/SignIn";
import SignUp from "../../Login/SignUp";
import { useSelector } from "react-redux";
import { pushProductToKorzina } from "../../firebase/functions";

import { ReactTyped } from "react-typed";

export default function Main() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [chooseProduct, setChooseProduct] = useState({});
  const [openKirish, setOpenKirish] = useState(true);

  const products = useSelector((state) => state.products);
  const userData = useSelector((state) => state.userData);

  const korzinaObj = userData.korzina || {};
  const korzina = Object.values(korzinaObj);

  const changeSoni = (isPlus) => {
    const obj = { ...chooseProduct };
    if (isPlus) {
      obj.soni = chooseProduct.soni + 1;
    } else {
      if (chooseProduct.soni === 1) return;
      obj.soni = chooseProduct.soni - 1;
    }
    setChooseProduct(obj);
  };

  const addProductToKorzina = (obj) => {
    if (userData.uid) {
      pushProductToKorzina(obj, userData.uid);
    } else {
      navigate("/signin");
    }
  };
  const addChoose = (data) => {
    setChooseProduct(data);
    setOpen(true);
  };
  const productsArr = Object.entries(products);

  return (
    <Wrapper className="text-center">
      {korzina.length > 0 && (
        <KorzinaMini
          price={korzina.reduce(
            (first, item) => first + item.soni * item.price,
            0
          )}
          soni={korzina.length}
          click={() => navigate("korzina")}
        />
      )}
      <Modal open={open} setOpen={setOpen}>
        <Choose
          data={chooseProduct}
          addProductToKorzina={addProductToKorzina}
          changeSoni={changeSoni}
          setOpen={setOpen}
        />
      </Modal>
      <Routes>
        <Route
          path="/signin"
          element={
            <Modal open={openKirish} setOpen={setOpenKirish} isNavigate={true}>
              <SignIn />
            </Modal>
          }
        />
        <Route
          path="/signup"
          element={
            <Modal open={openKirish} setOpen={setOpenKirish} isNavigate={true}>
              <SignUp />
            </Modal>
          }
        />
      </Routes>
      <Wrapper className="text-center">
        <Header setOpen={setOpenKirish} onChange={() => {}} />
        <main>
          <ReactTyped
            className="h1"
            strings={[
              "Sevimli brendlar",
              "Yozgi savdo!",
              "Bolalarga eng yaxshisi",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <p>
            Barcha uchun mazur bo'ladigan tovarlarning <br /> keng assortimenti
          </p>
          <button className="styledBtn">
            <a href="#categories">Mahsulotlarni ko'rish</a>
          </button>
        </main>
        <div className="container py-4" id="categories">
          <div className="row">
            {productsArr.map((item, i) => (
              <div key={item[0]} className="col-sm-4 col-md-2">
                <a className=" tabBtn  mb-3" href={`#${item[0]}`}>
                  {item[0][0].toLocaleUpperCase() +
                    item[0].slice(1).toLowerCase()}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          {productsArr.map((mass, j) => {
            const ProductsValues = Object.values(mass[1]);
            const ProductsName = mass[0];
            return (
              <div className="row mt-5" key={ProductsName} id={ProductsName}>
                <h2 className="mb-3 text-start category-title">
                  <span>
                    {ProductsName[0].toLocaleUpperCase() +
                      ProductsName.slice(1).toLowerCase()}
                  </span>
                </h2>

                {ProductsValues.map((item, index) => (
                  <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                    <Card
                      {...item}
                      key={index}
                      remove={() =>
                        addChoose({
                          price: item.price,
                          soni: 1,
                          img: item.img,
                          name: item.productName,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Wrapper>
    </Wrapper>
  );
}
