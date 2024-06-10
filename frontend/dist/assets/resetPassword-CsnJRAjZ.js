import{u as l,b as i,j as s,U as m}from"./index-CRT0yd8N.js";import{b as c}from"./validation-HurlSJvw.js";import{a as n}from"./axios-Cm0UX6qg.js";import{s as o}from"./toaster-DRgQ7L49.js";import{u}from"./formik.esm-CqG4S5Jw.js";const h=()=>{const a=l(),{id:t}=i(),e=u({initialValues:{password:"",confirmPassword:""},validate:c,onSubmit:({password:d})=>{n.post(m+`/reset_password/${t}`,{password:d}).then(({data:r})=>{o(r.message,"success"),a("/user/login")}).catch(({response:r})=>o(r.data.message,"error"))}});return s.jsx("div",{className:"bg-white-900 h-screen flex justify-center items-center",children:s.jsxs("div",{className:"max-w-md w-full bg-blue-100 p-8 rounded-lg shadow-md",children:[s.jsx("h1",{className:"text-2xl font-semibold mb-4 text-center text-blue-900",children:"Reset Password"}),s.jsxs("form",{onSubmit:e.handleSubmit,children:[s.jsxs("div",{className:"mb-6",children:[s.jsx("label",{htmlFor:"password",className:"block text-lg font-medium text-blue-900",children:"Password"}),s.jsx("input",{type:"password",id:"password",className:"mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-lg sm:text-lg border-gray-300 rounded-md py-2",...e.getFieldProps("password")}),!e.errors.password||e.touched.password&&s.jsx("p",{className:"text-red-500",children:e.errors.password})]}),s.jsxs("div",{className:"mb-6",children:[s.jsx("label",{htmlFor:"confirm-password",className:"block text-lg font-medium text-blue-900",children:"Confirm Password"}),s.jsx("input",{type:"password",id:"confirm-password",className:"mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-lg sm:text-lg border-gray-300 rounded-md py-2",...e.getFieldProps("confirmPassword")}),!e.errors.confirmPassword||e.touched.confirmPassword&&s.jsx("p",{className:"text-red-500",children:e.errors.confirmPassword})]}),s.jsx("div",{className:"text-center",children:s.jsx("button",{type:"submit",className:"w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100",children:"Reset Password"})})]})]})})};export{h as default};
