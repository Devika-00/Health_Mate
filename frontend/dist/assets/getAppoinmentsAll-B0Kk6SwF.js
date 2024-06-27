import{r as a,j as e,U as i}from"./index-D_qtDGRc.js";import{N as c}from"./navbar-LIVNJnVs.js";import{a as l}from"./axiosService-B8rGkApi.js";import"./toaster-NRzXABDO.js";import"./index-DgQuopTd.js";import"./iconBase-CT6M3Grx.js";import"./axios-Cm0UX6qg.js";import"./index-VWaDGczM.js";const p=()=>{const[r,o]=a.useState([]);a.useEffect(()=>{(async()=>{try{const s=await l.get(`${i}/allAppoinments`);o(s.data.bookings.bookingDetails)}catch(s){console.error("Error fetching appointments:",s)}})()},[]);const n=t=>{const s={year:"numeric",month:"long",day:"numeric"};return new Date(t).toLocaleDateString(void 0,s)};return e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold mb-8",children:"Appointments List"}),r.length===0?e.jsx("p",{className:"text-xl",children:"You have no appointments booked."}):e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full bg-white border border-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"w-full bg-gray-800 text-white",children:[e.jsx("th",{className:"py-2 px-4 border-b",children:"Name"}),e.jsx("th",{className:"py-2 px-4 border-b",children:"Age"}),e.jsx("th",{className:"py-2 px-4 border-b",children:"Date"}),e.jsx("th",{className:"py-2 px-4 border-b",children:"Time Slot"})]})}),e.jsx("tbody",{children:r.map(t=>e.jsxs("tr",{className:"hover:bg-gray-200 cursor-pointer transition duration-300",onClick:()=>window.location.href=`/appoinmentDetails/${t._id}`,children:[e.jsx("td",{className:"py-2 px-4 border-b text-center",children:t.patientName}),e.jsx("td",{className:"py-2 px-4 border-b text-center",children:t.patientAge}),e.jsx("td",{className:"py-2 px-4 border-b text-center",children:n(t.date)}),e.jsx("td",{className:"py-2 px-4 border-b text-center",children:t.timeSlot})]},t._id))})]})})]})},y=()=>e.jsxs(e.Fragment,{children:[e.jsx(c,{}),e.jsx(p,{})]});export{y as default};