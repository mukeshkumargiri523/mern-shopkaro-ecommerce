"use strict";(self.webpackChunkecomm_client=self.webpackChunkecomm_client||[]).push([[914],{8124:(s,e,t)=>{t.d(e,{c:()=>i});t(9060);var a=t(12),c=t(2496);const i=()=>(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("div",{className:"text-center p-2",style:{background:"linear-gradient(to right, #556270, #ff6b6b)",minHeight:"30vh",borderRadius:"10px"},children:(0,c.jsxs)("div",{className:"list-group",children:[(0,c.jsx)("h3",{style:{color:"peachpuff"},children:"Admin Panel"}),(0,c.jsx)(a.Af,{to:"/dashboard/admin/create-category",className:"list-group-item list-group-item-action",children:"Create Category"}),(0,c.jsx)(a.Af,{to:"/dashboard/admin/update-category",className:"list-group-item list-group-item-action",children:"Update Category"}),(0,c.jsx)(a.Af,{to:"/dashboard/admin/create-product",className:"list-group-item list-group-item-action",children:"Create Product"}),(0,c.jsx)(a.Af,{to:"/dashboard/admin/products",className:"list-group-item list-group-item-action ",children:"List Of Products"}),(0,c.jsx)(a.Af,{to:"/dashboard/admin/users",className:"list-group-item list-group-item-action ",children:"List Of Users"}),(0,c.jsx)(a.Af,{to:"/dashboard/admin/orders",className:"list-group-item list-group-item-action ",children:"List Of Users Orders"})]})})})},9832:(s,e,t)=>{t.r(e),t.d(e,{default:()=>n});var a=t(9060),c=t(8124),i=t(7908),r=t(8372),d=t(4320),l=t(12),o=t(2496);const n=()=>{const[s,e]=(0,a.useState)([]);return(0,a.useEffect)((()=>{(async()=>{try{const{data:s}=await r.c.get("/api/v1/product/get-all-product");null!==s&&void 0!==s&&s.success&&e(null===s||void 0===s?void 0:s.products)}catch(s){console.log(s),d.m4.error("Something went wrong")}})()}),[]),(0,o.jsx)(i.c,{clName:"bg-info-subtle",title:"Product list",children:(0,o.jsx)("div",{className:"container-fluid my-2 py-2 text-center",children:(0,o.jsxs)("div",{className:"row m-2 ",children:[(0,o.jsx)("div",{className:"col-md-3 pt-3 mt-2 bg-warning-subtle",children:(0,o.jsx)(c.c,{})}),(0,o.jsxs)("div",{className:"col-md-9 d-flex flex-column",children:[(0,o.jsx)("h3",{className:"text-center",children:"All Products List"}),(0,o.jsx)("div",{className:"adminProduct product_group",children:null===s||void 0===s?void 0:s.map((s=>(0,o.jsx)(l.cH,{to:"/dashboard/admin/product/".concat(s.slug),className:"product_link",children:(0,o.jsxs)("div",{className:"card",style:{width:"18rem"},children:[s&&(0,o.jsx)("img",{src:"/api/v1/product/product-photo/".concat(s._id),className:"card-img-top",alt:"product_image"}),(0,o.jsxs)("div",{className:"card-body",children:[(0,o.jsx)("h5",{className:"card-title",children:s.name}),(0,o.jsxs)("p",{className:"card-text",children:[s.description.substring(0,150),"..."]})]})]})},s._id)))})]})]})})})}}}]);
//# sourceMappingURL=914.97cfe570.chunk.js.map