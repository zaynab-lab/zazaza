import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRecoilValue } from "recoil";
import { cartListState } from "../pages/cart";
import { styles } from "../public/js/styles";
import Loader from "./Loader";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaShoppingCart
} from "react-icons/fa";
import { langState } from "../pages/menu";

export default function TopBar({ title, page, cart, main }) {
  const cartList = useRecoilValue(cartListState);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const lang = useRecoilValue(langState);
  const dictionary = {
    cart: { en: "Cart", ar: "عربة التسوق" },
    left: { en: true }
  };

  useEffect(() => {
    cartList.length
      ? setQuantity(cartList.map((obj) => obj.quantity).length)
      : setQuantity(0);
  }, [cartList]);

  return (
    <>
      <div className="topBar">
        {!main ? (
          page ? (
            <div
              className="arrow"
              onClick={() => {
                setLoading(true);
                Router.back();
              }}
            >
              {dictionary.left[lang] ? <FaArrowLeft /> : <FaArrowRight />}
            </div>
          ) : (
            <div
              className="home"
              onClick={() => {
                setLoading(true);
                Router.push("/") || Router.back();
              }}
            >
              <FaHome />
            </div>
          )
        ) : (
          <div
            className="burger"
            onClick={() => {
              setLoading(true);
              Router.push("/menu");
            }}
          >
            |||
          </div>
        )}

        {title}

        {cart ? (
          <Link href="/cart">
            <div className="cart" onClick={() => setLoading(true)}>
              <span className="point">{quantity}</span>
              <span className="cartimg" role="img" aria-label="cart">
                <FaShoppingCart />
              </span>
              {quantity ? (
                <span className="showCart">
                  {dictionary.cart[lang]}
                  <span className="showCartArrow">
                    {dictionary.left[lang] ? <FaArrowRight /> : <FaArrowLeft />}
                  </span>
                </span>
              ) : (
                <></>
              )}
            </div>
          </Link>
        ) : (
          <div className="empty"></div>
        )}
      </div>
      {loading && <Loader />}
      <style jsx>{`
        .topBar {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          background-color: ${styles.primaryColorLight};
          color: white;
          height: 3rem;
          width: 100%;
          font-size: 1.3rem;
          padding: 0.6rem;
        }

        .burger {
          color: white;
          -webkit-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          transform: rotate(90deg);
          font-size: 1.6rem;
          padding: 0 0.2rem;
        }
        .arrow {
          font-size: 1.6rem;
          -webkit-transform: translateX(-0.2rem);
          -ms-transform: translateX(-0.2rem);
          transform: translateX(-0.2rem);
        }
        .home {
          font-size: 1.6rem;
          padding: 0 0.5rem;
        }
        .cart {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 1.8rem;
          background: white;
          border-radius: 0.2rem;
          padding: 0.2rem;
          padding-bottom: 0;
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }
        .cartimg {
          ${dictionary.left && "transform: scaleX(-1)"};
        }

        .showCart {
          font-size: 0.8rem;
          position: absolute;
          ${dictionary.left[lang] ? "right:3.2rem" : "left: 3.2rem"};
          color: white;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          opacity: 0;
          -webkit-animation-name: Arrow;
          animation-name: Arrow;
          -webkit-animation-duration: 4s;
          animation-duration: 4s;
          -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
        }
        .showCartArrow {
          padding: 0 0.2rem;
        }
        @-webkit-keyframes Arrow {
          0 {
            opacity: 0;
          }
          20% {
            opacity: 0;
          }
          80% {
            opacity: 100%;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes Arrow {
          0 {
            opacity: 0;
          }
          20% {
            opacity: 0;
          }
          80% {
            opacity: 100%;
          }
          100% {
            opacity: 0;
          }
        }

        .point {
          width: 1.4rem;
          height: 1.4rem;
          background: white;
          border: 1px solid ${styles.primaryColorLight};
          position: absolute;
          -webkit-transform: translate(
            ${dictionary.left[lang] ? "-1.2rem" : "1.2rem"},
            -0.85rem
          );
          -ms-transform: translate(
            ${dictionary.left[lang] ? "-1.2rem" : "1.2rem"},
            -0.85rem
          );
          transform: translate(
            ${dictionary.left[lang] ? "-1.2rem" : "1.2rem"},
            -0.85rem
          );
          border-radius: 1rem;
          font-size: 0.9rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          color: ${styles.primaryColor};
        }

        .empty {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
