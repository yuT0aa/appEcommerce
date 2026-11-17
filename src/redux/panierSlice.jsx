import {createSlice} from "@reduxjs/toolkit";

const panierSlice=createSlice({
    name:'panier',
    initialState:{
        items:[],
    },

    reducers:{
        addToCart:(state,action)=>{
            const existing=state.items.find((item)=>item.id===action.payload.id);
            if (existing){
                existing.qte+=1;
            }else{
                state.items.push({...action.payload,qte:1});
            }
        },

        removeFromCart:(state,action)=>{
            state.items=state.items.filter((item)=>item.id!==action.payload);
        },

        incrementQte:(state,action)=>{
            const item=state.items.find((i)=>i.id===action.payload);
            if(item)item.qte+=1;
        },

        decrementQte:(state,action)=>{
            const item=state.items.find((i)=>i.id===action.payload);
            if(item && item.qte>1){
                item.qte-=1;
            }else{
                state.items=state.items.filter((i)=>i.id!==action.payload);
            }
        },
    },
});

export const {addToCart,removeFromCart,incrementQte,decrementQte}=panierSlice.actions;
export default panierSlice.reducer;

