import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addtocartAPI, removefromcartAPI } from "../Api.js/addtocartApi";
import { useState } from "react";
import { Loader } from "../loading";
const Mobilecard = ({
  id,
  image,
  title,
  price,
  category,
  rating,
  description,
  brand,
}) => {
  let dispatch = useDispatch()
  let [star, setstar] = useState(["hello"])
  let [quantity, setquantity] = useState(1)
  let [cartFlag, setcartFlag] = useState([])
  let [loading, setloading] = useState(false)
  let customerdata = useSelector((state) => state.Itemreducer)
  const cartincre = async () => {
    let data = await addtocartAPI({ product: { id, brand, price, image, description, title, quantity }, customerDetails: { customerid: customerdata.userInfo.id, customername: customerdata.userInfo.email } })
    setcartFlag([...cartFlag, data.data])
    if (data.newitem) {
      dispatch({ type: "Cartcountinc" })
    }
  };
  const cartdecre = async (title, price) => {
    try {
      setloading(true)
      let responsedata = await removefromcartAPI({ customerid: customerdata.userInfo.id, title: title, total: price })
      setloading(false)
      let tempData = cartFlag.filter(data => data !== title)
      setcartFlag(tempData)
      dispatch({ type: "cartcountdec" })
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  };
  let addFavourites = (title) => {
    if (!star.includes(title)) {
      setstar([...star, title])
    } else {
      let tempData = star.filter(data => data !== title)
      setstar(tempData)
    }
    console.log(star)
  }
  return (
    <>
      <div
        className="card-deck text-center"
        style={{
          width: "26vw",
          display: "inline-flex",
          margin: "40px 10px 10px 4%",
          textAlign: "center",
          overflow: "hidden",
        }}
        key={id}
      >
        <div
          className="card"
          style={{
            height: "560px",
            borderRadius: 20,
            backgroundColor: "lightgrey",
          }}
        >
          <img
            src={image}
            className="card-img-top"
            alt={title}
            style={{
              width: 366,
              height: 240,
              borderRadius: "20px 20px 0px 0px",
            }}
          />
          <div className="card-body" style={{ display: "inline-block" }}>
            <h4
              className="card-title p-2"
              style={{
                backgroundColor: "rgb(252, 122, 35)",
                color: "white",
                borderRadius: "20%",
              }}
            >
              {" "}
              {title}
            </h4>
            <h4 style={{ color: "red", fontWeight: "bolder" }}>
              Price:Rs.{price}
            </h4>
            <p>Category:{category}</p>
            <p>Rating:{rating}</p>
            <input type="number" style={{ width: 50 }} value={quantity} min={1} onChange={(e) => setquantity(e.target.value)} /><br />
            {cartFlag.includes(title) ? (
              <button
                type="button"
                className="btn btn-outline-dark m-2"
                onClick={() => cartdecre(title, price * quantity)}
                style={{ backgroundColor: "orange", color: "white" }}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-dark m-2"
                onClick={cartincre}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <button
        style={{
          position: "relative",
          border: "none",
          bottom: 200,
          right: 85,
          fontSize: 22,
          backgroundColor: "inherit",
          cursor: star.includes(title) ? "pointer" : "default",
          transition: "background-color 0.5s ease-in-out",
        }}
        onClick={() => { addFavourites(title) }}
      >
        <i className="fa fa-heart" style={{ color: star.includes(title) ? "red" : "grey", }}></i>
      </button>
      {loading && <Loader />}
    </>
  );
};
Mobilecard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  discountPercentage: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  rating: PropTypes.string,
  available: PropTypes.bool,
  description: PropTypes.string,
  stock: PropTypes.number,
  brand: PropTypes.string,
  title: PropTypes.string,
};
export default Mobilecard;
