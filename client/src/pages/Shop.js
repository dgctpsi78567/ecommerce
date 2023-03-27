import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ProductCard from '../components/card/ProductCard';
import { getlistProducts, filterSearch } from '../functions/product';
import { Checkbox, Menu, Radio, Slider } from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import SubMenu from 'antd/lib/menu/SubMenu';
import { categoriesList } from '../functions/category';
import Star from './Star';
import { subsList } from '../functions/sub';


const Shop = () => {

    const [product, setProduct] = useState([])
    const [ok, setOk] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search;
    const [star, setStar] = useState("")
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState([])
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"])
    const [brand, setBrand] = useState("")
    const [colors, setColors] = useState(["Black", "Silver", "White", "Blue"]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");


    useEffect(() => {
        loadAllProduct();
        categoriesList().then((res) => { setCategories(res.data) });
        subsList().then((res) => { setSubs(res.data) });

    }, [])

    // search
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchaProduct({ query: text })
            if(!text){
            loadAllProduct();
            }
        }, 300)
        return () => clearTimeout(delayed);
    }, [text])

    // price
    useEffect(() => {
        console.log("ok to request");
        fetchaProduct({ price });
    }, [ok]);


    const fetchaProduct = (arg) => {
        filterSearch(arg).then((res) => {
            console.log(res);
            setProduct(res.data);
        })
    }

    const loadAllProduct = () => {
        getlistProducts(12).then((p) => {
            setProduct(p.data);
        })
    }

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice(value);
        setCategoryIds([]);
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    }


    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        // console.log(e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        console.log(inTheState);
        fetchaProduct({ category: inTheState });
    };

    const handleStarClick = (num) => {
        console.log(num);
        setPrice([0, 0]);
        setCategoryIds([]);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setStar(num)
        fetchaProduct({ stars: num })
    }

    const showStar = () => {
        return (<div>
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>)
    }


    const handleSub = (sub) => {

        setSub(sub);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("")
        fetchaProduct({ sub })

    }

    const showBrands = () =>
        brands.map((b) => (
            <Radio
                value={b}
                name={b}
                checked={b === brand}
                onChange={handleBrand}
                className="pb-1 pl-4 pr-4"
            >
                {b}
            </Radio>
        ));

    const handleBrand = (e) => {
        setSub("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand(e.target.value);
        fetchaProduct({ brand: e.target.value });
    };


    const showColors = () =>
        colors.map((c) => (
            <Radio
                value={c}
                name={c}
                checked={c === color}
                onChange={handleColor}
                className="pb-1 pl-4 pr-4"
            >
                {c}
            </Radio>
        ));

    const handleColor = (e) => {
        setSub("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand("");
        setColor(e.target.value);
        setShipping("");
        fetchaProduct({ color: e.target.value });
    };

    const showShipping = () => (
        <>
            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShippingchange}
                value="Yes"
                checked={shipping === "Yes"}
            >
                Yes
            </Checkbox>

            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShippingchange}
                value="No"
                checked={shipping === "No"}
            >
                No
            </Checkbox>
        </>
    );

    const handleShippingchange = (e) => {
        setSub("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand("");
        setColor("");
        setShipping(e.target.value);
        fetchaProduct({ shipping: e.target.value });
    };



    return (
        <React.Fragment>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-3">
                        <h3> Search Filter Menu </h3>
                        <hr />
                        <Menu defaultOpenKeys={["1", "2"]} mode="inline">
                            <SubMenu key="1" title={
                                <span className='h6'>
                                    <DollarOutlined />Price
                                </span>
                            } >
                            </SubMenu>
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    tipFormatter={(v) => `$${v}`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max="4999"
                                />
                            </div>

                            <SubMenu
                                key="2"
                                title={
                                    <span className="h6">
                                        <DownSquareOutlined /> Categories
                                    </span>
                                }
                            >
                                <div style={{ maringTop: "-10px" }}>{
                                    categories.map((c) => (
                                        <div key={c._id}>
                                            <Checkbox
                                                onChange={handleCheck}
                                                className="pb-2 pl-4 pr-4"
                                                value={c._id}
                                                name="category"
                                                checked={categoryIds.includes(c._id)}
                                            >
                                                {c.name}
                                            </Checkbox>
                                            <br />
                                        </div>
                                    ))
                                }

                                </div>

                            </SubMenu>

                            <SubMenu
                                key="3"
                                title={
                                    <span className="h6">
                                        <StarOutlined /> Ratings
                                    </span>
                                }
                            >
                                <div className="mt-1"> {showStar()} </div>
                            </SubMenu>

                            <SubMenu
                                key="4"
                                title={
                                    <span className="h6">
                                        <DownSquareOutlined /> Subs
                                    </span>
                                }

                            >
                                <div style={{ maringTop: "-10px" }}>{
                                    subs.map((s) => (
                                        <div key={s._id}>
                                            <div className="d-flex flex-row mb-3">
                                                <div className="p-2" onClick={() => handleSub(s)}>{s.name}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </SubMenu>

                            <SubMenu
                                key="5"
                                title={
                                    <span className="h6">
                                        <DownSquareOutlined /> Brands
                                    </span>
                                }
                            >
                                <div style={{ maringTop: "-10px" }} className="pr-5">
                                    {showBrands()}
                                </div>
                            </SubMenu>


                            <SubMenu
                                key="6"
                                title={
                                    <span className="h6">
                                        <DownSquareOutlined /> Colors
                                    </span>
                                }
                            >
                                <div style={{ maringTop: "-10px" }} className="pr-5">
                                    {showColors()}
                                </div>
                            </SubMenu>

                            <SubMenu
                                key="7"
                                title={
                                    <span className="h6">
                                        <DownSquareOutlined /> Shipping
                                    </span>
                                }
                            >
                                <div style={{ maringTop: "-10px" }} className="pr-5">
                                    {showShipping()}
                                </div>
                            </SubMenu>


                        </Menu>


                    </div>
                    <div className="col-md-9">
                        Products
                        {product.length < 1 && <p> No Product Found </p>}
                        <div className="row">
                            {product.map((p, index) => {
                                return (
                                    <div className='col-4' key={index}>
                                        <ProductCard products={p} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Shop