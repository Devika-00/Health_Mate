import{b,r as c,j as e,D as m}from"./index-D_qtDGRc.js";import{N as f}from"./navbar-D-e21DFw.js";import{a as n}from"./axiosService-B8rGkApi.js";import{s as h}from"./toaster-NRzXABDO.js";import"./axios-Cm0UX6qg.js";import"./index-VWaDGczM.js";const p=()=>{const{doctorId:l}=b(),[i,o]=c.useState(!1),[t,r]=c.useState({doctorName:"",department:"",profileImage:"",status:"",rejectedReason:"",email:"",phoneNumber:"",description:"",education:"",experience:"",age:"",lisenceCertificate:""}),d=()=>{o(!0)},u=async a=>{a.preventDefault();try{const s=await n.put(`${m}/reapply_verification/${l}`,{status:"pending"});s.status>=200&&s.status<300?(h("Reapply of verification successfull"),o(!1)):console.error("Failed to update doctor status")}catch(s){console.error("Error updating doctor status:",s)}};c.useEffect(()=>{(async()=>{try{const s=await n.get(`${m}/doctorDetails/${l}`);if(s.status>=200&&s.status<300)r(s.data.doctor);else throw new Error("Failed to fetch doctor details")}catch(s){console.error("Error fetching doctor details:",s)}})()},[l]);const x=()=>{switch(t.status){case"pending":return"text-orange-500";case"approved":return"text-green-500";case"rejected":return"text-red-500";default:return""}};return e.jsxs("div",{className:"flex items-center justify-center mb-16 mt-16",children:[e.jsxs("div",{className:"bg-gray-100 shadow-xl rounded-md p-12 md:w-4/12 w-full",children:[e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center md:items-start md:justify-between mb-8",children:[e.jsx("img",{src:t.profileImage,alt:"Doctor",className:"w-48 h-48 rounded mb-4 md:mr-4"}),e.jsxs("div",{className:"mr-24 mt-16",children:[e.jsx("p",{className:"text-2xl font-semibold",children:t.doctorName}),e.jsx("p",{className:"text-gray-500",children:t.department})]})]}),e.jsx("hr",{className:"my-4"}),e.jsxs("p",{className:`text-lg font-semibold ${x()}`,children:["Verification Status: ",t.status]}),t.status==="rejected"&&e.jsxs("p",{className:"text-red-500",children:["Rejected Reason: ",t.rejectedReason]}),t.status==="rejected"&&e.jsx("button",{className:"bg-blue-500 text-white rounded-md px-4 py-2 mt-4",onClick:d,children:"Reapply"})]}),i&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",children:e.jsxs("div",{className:"bg-white shadow-md rounded-md p-6 w-96 my-20",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Verification"}),e.jsxs("form",{onSubmit:u,children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",value:t.doctorName,readOnly:!0,className:"mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",value:t.email,readOnly:!0,className:"mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"phoneNumber",className:"block text-sm font-medium text-gray-700",children:"Phone Number"}),e.jsx("input",{type:"text",id:"phoneNumber",name:"phoneNumber",value:t.phoneNumber,onChange:a=>r({...t,phoneNumber:a.target.value}),className:"mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"education",className:"block text-sm font-medium text-gray-700",children:"Education"}),e.jsx("input",{type:"text",id:"education",name:"education",value:t.education,onChange:a=>r({...t,education:a.target.value}),className:"mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"medicalLicense",className:"block text-sm font-medium text-gray-700",children:"Medical License Image"}),e.jsx("img",{src:t.lisenceCertificate,alt:"Medical License",className:"mt-1 w-full"}),e.jsx("input",{type:"file",id:"medicalLicense",name:"medicalLicense",onChange:a=>r({...t,lisenceCertificate:a.target.value}),className:"mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"})]}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{type:"submit",className:"bg-blue-500 text-white rounded-md px-4 py-2",children:"Apply"}),e.jsx("button",{type:"button",className:"text-sm text-blue-500 hover:underline mt-2 ml-2",onClick:()=>o(!1),children:"Cancel"})]})]})]})})]})},k=()=>e.jsxs(e.Fragment,{children:[e.jsx(f,{}),e.jsx(p,{})]});export{k as default};