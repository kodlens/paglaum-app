import{aR as p,aO as j,j as e,aP as v}from"./app-5644b4fb.js";import{T as l,I as n}from"./TextInput-d82844ab.js";import{I as i}from"./InputLabel-e27042d8.js";import{P as g}from"./PrimaryButton-9ce9f15c.js";import{q as N}from"./transition-d3bbb5a3.js";function I({mustVerifyEmail:o,status:u,className:d=""}){const s=p().props.auth.user,{data:t,setData:m,patch:c,errors:r,processing:f,recentlySuccessful:x}=j({lname:s.lname,fname:s.fname,mname:s.mname,email:s.email}),h=a=>{a.preventDefault(),c(route("member.profile.update"))};return e.jsxs("section",{className:d,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Profile Information"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Update your account's profile information and email address."})]}),e.jsxs("form",{onSubmit:h,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"lname",value:"Last Name"}),e.jsx(l,{id:"lname",className:"mt-1 block w-full",value:t.lname,onChange:a=>m("lname",a.target.value),required:!0,isFocused:!0,autoComplete:"off"}),e.jsx(n,{className:"mt-2",message:r.fname})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"name",value:"First Name"}),e.jsx(l,{id:"name",className:"mt-1 block w-full",value:t.fname,onChange:a=>m("fname",a.target.value),required:!0,isFocused:!0,autoComplete:"off"}),e.jsx(n,{className:"mt-2",message:r.fname})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"mname",value:"Middle Name"}),e.jsx(l,{id:"mname",className:"mt-1 block w-full",value:t.mname,onChange:a=>m("mname",a.target.value),isFocused:!0,autoComplete:"off"}),e.jsx(n,{className:"mt-2",message:r.mname})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"email",value:"Email"}),e.jsx(l,{id:"email",type:"email",className:"mt-1 block w-full",value:t.email,onChange:a=>m("email",a.target.value),required:!0,autoComplete:"username"}),e.jsx(n,{className:"mt-2",message:r.email})]}),o&&s.email_verified_at===null&&e.jsxs("div",{children:[e.jsxs("p",{className:"text-sm mt-2 text-gray-800",children:["Your email address is unverified.",e.jsx(v,{href:route("verification.send"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Click here to re-send the verification email."})]}),u==="verification-link-sent"&&e.jsx("div",{className:"mt-2 font-medium text-sm text-green-600",children:"A new verification link has been sent to your email address."})]}),e.jsx("div",{className:"flex items-center gap-4",children:e.jsx(g,{disabled:f,children:"Save"})}),e.jsx(N,{show:x,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsxs("div",{className:"p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50",role:"alert",children:[e.jsx("span",{className:"font-medium",children:"Success alert!"})," Profile Updated."]})})]})]})}export{I as default};
