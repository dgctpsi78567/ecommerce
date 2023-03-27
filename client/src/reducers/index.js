import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import cartReducer from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./coupanReducer";


const rootReducer=combineReducers({
    user:userReducer,
    search:searchReducer,
    cart:cartReducer,
    drawer:drawerReducer,
    coupan:couponReducer

})


export default rootReducer