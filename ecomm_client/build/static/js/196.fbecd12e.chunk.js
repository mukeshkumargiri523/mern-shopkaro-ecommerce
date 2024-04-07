"use strict";(self.webpackChunkecomm_client=self.webpackChunkecomm_client||[]).push([[196],{8124:(e,t,a)=>{a.d(t,{c:()=>c});a(9060);var s=a(12),o=a(2496);const c=()=>(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"text-center p-2",style:{background:"linear-gradient(to right, #556270, #ff6b6b)",minHeight:"30vh",borderRadius:"10px"},children:(0,o.jsxs)("div",{className:"list-group",children:[(0,o.jsx)("h3",{style:{color:"peachpuff"},children:"Admin Panel"}),(0,o.jsx)(s.Af,{to:"/dashboard/admin/create-category",className:"list-group-item list-group-item-action",children:"Create Category"}),(0,o.jsx)(s.Af,{to:"/dashboard/admin/update-category",className:"list-group-item list-group-item-action",children:"Update Category"}),(0,o.jsx)(s.Af,{to:"/dashboard/admin/create-product",className:"list-group-item list-group-item-action",children:"Create Product"}),(0,o.jsx)(s.Af,{to:"/dashboard/admin/products",className:"list-group-item list-group-item-action ",children:"List Of Products"}),(0,o.jsx)(s.Af,{to:"/dashboard/admin/users",className:"list-group-item list-group-item-action ",children:"List Of Users"}),(0,o.jsx)(s.Af,{to:"/dashboard/admin/orders",className:"list-group-item list-group-item-action ",children:"List Of Users Orders"})]})})})},3240:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var s=a(9060),o=a(7908),c=a(8124),l=a(8372),i=a(9632),r=a(4320),d=a(1560),n=a(2496);const{Option:u}=i.default;const m=function(){const[e,t]=(0,s.useState)([]),[a,m]=(0,s.useState)(""),[p,h]=(0,s.useState)(""),[v,g]=(0,s.useState)(""),[x,j]=(0,s.useState)(""),[b,f]=(0,s.useState)(""),[N,y]=(0,s.useState)(""),[w,C]=(0,s.useState)(""),[S,U]=(0,s.useState)(""),P=(0,d.i6)(),A=(0,d.W4)(),{slug:O}=A,[_,k]=(0,s.useState)("");return(0,s.useEffect)((()=>{(async()=>{try{const{data:e}=await l.c.get("/api/v1/category/get-all-category");null!==e&&void 0!==e&&e.success&&t(null===e||void 0===e?void 0:e.category)}catch(e){console.log(e),r.m4.error("Something went wrong")}})(),(async()=>{try{const{data:t}=await l.c.get("/api/v1/product/get-product/".concat(O));var e;m(),null!==t&&void 0!==t&&t.success&&(m(null===t||void 0===t?void 0:t.product.name),k(null===t||void 0===t?void 0:t.product._id),h(null===t||void 0===t?void 0:t.product.description),f(null===t||void 0===t?void 0:t.product.price),j(null===t||void 0===t?void 0:t.product.photo),y(null===t||void 0===t?void 0:t.product.quantity),C(null===t||void 0===t?void 0:t.product.shipping),U(null===t||void 0===t||null===(e=t.product)||void 0===e?void 0:e.brand),g(null===t||void 0===t?void 0:t.product.category._id))}catch(t){console.log(t),r.m4.error("Something went wrong")}})()}),[O]),(0,n.jsx)(o.c,{clName:"bg-info-subtle",title:"Update Product",children:(0,n.jsx)("div",{className:"container-fluid my-2 py-2 text-center",children:(0,n.jsxs)("div",{className:"row m-2",children:[(0,n.jsx)("div",{className:"col-md-4 pt-3 bg-warning-subtle mt-2",children:(0,n.jsx)(c.c,{})}),(0,n.jsxs)("div",{className:"col-md-8 mt-2  d-flex flex-column align-items-center",children:[(0,n.jsx)("h3",{children:"Update Product"}),(0,n.jsxs)("div",{className:"w-75 mb-1",children:[(0,n.jsx)(i.default,{placeholder:"Select A Category",size:"large",className:"form-select mb-3",onChange:e=>g(e),value:v,children:null===e||void 0===e?void 0:e.map((e=>(0,n.jsx)(u,{value:e._id,children:e.name},null===e||void 0===e?void 0:e._id)))}),(0,n.jsx)("div",{className:"mb-2",children:(0,n.jsxs)("label",{htmlFor:"uploadImg",className:"btn btn-outline-danger",children:[x?"Upload ".concat(x.name):"Upload Photo",(0,n.jsx)("input",{type:"file",name:"photo",accept:"image/*",onChange:e=>j(e.target.files[0]),id:"uploadImg",hidden:!0})]})}),(0,n.jsx)("div",{className:"mb-2",children:x?(0,n.jsx)("div",{className:"text-center",children:(0,n.jsx)("img",{src:URL.createObjectURL(x),alt:"product_photo",height:"200px",className:"img img-resposive"})}):(0,n.jsx)("div",{className:"text-center",children:_&&(0,n.jsx)("img",{src:"/api/v1/product/product-photo/".concat(_),alt:"product_photo",height:"200px",className:"img img-resposive"})})}),(0,n.jsx)("div",{className:"mb-2",children:(0,n.jsx)("input",{type:"text",value:a,placeholder:"Write product name",className:"form-control",onChange:e=>m(e.target.value)})}),(0,n.jsx)("div",{className:"mb-2",children:(0,n.jsx)("input",{type:"text",value:S,placeholder:"Write product brand",className:"form-control",onChange:e=>U(e.target.value)})}),(0,n.jsx)("div",{className:"mb-2",children:(0,n.jsx)("textarea",{type:"textarea",value:p,placeholder:"Write Product Desctiption",className:"form-control",onChange:e=>h(e.target.value)})}),(0,n.jsx)("div",{className:"mb-2",children:(0,n.jsx)("input",{type:"number",value:N,placeholder:"Write a quantity",className:"form-control",onChange:e=>y(e.target.value)})}),(0,n.jsx)("div",{className:"mb-2",children:(0,n.jsx)("input",{type:"number",value:b,placeholder:"Write product Price",className:"form-control",onChange:e=>f(e.target.value)})}),(0,n.jsx)("div",{className:"mb-2",children:(0,n.jsxs)(i.default,{placeholder:"Select Shipping",size:"large",className:"form-select mb-3",onChange:e=>{C(e)},value:w,children:[(0,n.jsx)(u,{value:"0",children:"No"}),(0,n.jsx)(u,{value:"1",children:"Yes"})]})}),(0,n.jsx)("div",{className:"mb-3",children:(0,n.jsx)("button",{className:"updBtn",onClick:async function(e){e.preventDefault();try{const e=new FormData;e.append("name",a),e.append("description",p),e.append("price",b),x&&e.append("photo",x),e.append("quantity",N),e.append("category",v),e.append("brand",S),e.append("shipping",w);const{data:t}=await l.c.put("/api/v1/product/update-product/".concat(_),e);null!==t&&void 0!==t&&t.success?(P("/dashboard/admin/products"),r.m4.success("".concat(null===t||void 0===t?void 0:t.product.name," updated successfully"))):r.m4.error(null===t||void 0===t?void 0:t.message)}catch(o){var t,s;r.m4.error(null===o||void 0===o||null===(t=o.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.message),r.m4.error("Something went wrong")}},children:"UPDATE PRODUCT"})}),(0,n.jsx)("div",{className:"mb-3",children:(0,n.jsx)("button",{className:"delBtn",onClick:async function(){try{if(!window.prompt("Are you sure to delete product ?"))return;await l.c.delete("/api/v1/product/delete-product/".concat(_)),r.m4.success("deleted successfully"),P("/dashboard/admin/products")}catch(e){console.log(e),r.m4.error("Something went wrong")}},children:"DELETE PRODUCT"})})]})]})]})})})}}}]);
//# sourceMappingURL=196.fbecd12e.chunk.js.map