import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css"

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollelction } from "../../../lib/enums/product.enum";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";


/** REDUX SLICE **/ 
const actionDispatch = (dispatch: Dispatch) => ({
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
    setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
    setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});



export default function HomePage() {
    const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());

    useEffect(() => {
        // Backend server data fetching => Data
        const product = new ProductService();
        const member = new MemberService();
        product
            .getProducts({
                page: 1,
                limit: 4,
                order: "productViews",
                productCollection: ProductCollelction.DISH,
            })
            .then((data) => setPopularDishes(data))
            .catch((err) => console.log(err));
        product
            .getProducts({
                page: 1,
                limit: 4,
                order: "createdAt",
                // productCollection: ProductCollelction.DISH,
            })
            .then((data) => setNewDishes(data))
            .catch((err) => console.log(err));
        
        member
            .getTopUsers()
            .then((data) => setTopUsers(data))
            .catch((err) => console.log(err));
        
    }, []);

    return (
        <div className={"homepage"}>
            <Statistics/>
            <PopularDishes/>
            <NewDishes/>
            <Advertisement/>
            <ActiveUsers/>
            <Events/>
        </div>
    );
};