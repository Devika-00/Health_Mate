import{j as e,L as l,e as o,U as i}from"./index-CRT0yd8N.js";import{u as m}from"./formik.esm-CqG4S5Jw.js";import{a as n}from"./axios-Cm0UX6qg.js";import{s as a}from"./toaster-DRgQ7L49.js";const b=()=>{const r=m({initialValues:{email:""},validate:({email:t})=>{let s={};return t.trim().length?o.test(t)||(s.email="Invalid email address"):s.email="Required*",s},onSubmit:({email:t})=>{n.post(i+"/forgot_password",{email:t}).then(({data:s})=>a(s.message,"success")).catch(({response:s})=>{a(s.data.message,"error")})}});return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-cover",children:e.jsxs("div",{className:"w-96 p-8 bg-gray-200 rounded-lg shadow-lg",children:[e.jsx("h2",{className:"font-extrabold text-blue-900 text-3xl mb-2",children:"Forgot Password"}),e.jsx("p",{className:"mt-2 text-xs text-blue-900 mb-6"}),e.jsxs("form",{onSubmit:r.handleSubmit,children:[e.jsx("div",{className:"mb-4",children:e.jsxs("label",{htmlFor:"email",children:[e.jsx("p",{className:"block text-blue-900 ml-1",children:"Email address"}),e.jsx("input",{type:"text",className:"w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500",placeholder:"Enter email address",...r.getFieldProps("email")}),!r.errors.email||r.touched.email&&e.jsx("p",{className:"text-red-500",children:r.errors.email})]})}),e.jsx("button",{type:"submit",className:"bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline mt-5 mb-5",children:"Reset Password"}),e.jsxs("p",{className:"text-center mr-16",children:["Remember password ?",e.jsx(l,{to:"/user/auth/login",className:"text-indigo-600 font-medium inline-flex space-x-1 items-center",children:e.jsx("span",{children:"Login now "})})]})]})]})})};export{b as default};
