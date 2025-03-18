import{g as B,m as N,d as P,x as l,f as W,r as c,e as j}from"./app-5644b4fb.js";const k=t=>{const{componentCls:e,sizePaddingEdgeHorizontal:o,colorSplit:r,lineWidth:n,textPaddingInline:h,orientationMargin:d,verticalMarginInline:s}=t;return{[e]:Object.assign(Object.assign({},P(t)),{borderBlockStart:`${l(n)} solid ${r}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:s,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${l(n)} solid ${r}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${l(t.dividerHorizontalGutterMargin)} 0`},[`&-horizontal${e}-with-text`]:{display:"flex",alignItems:"center",margin:`${l(t.dividerHorizontalWithTextGutterMargin)} 0`,color:t.colorTextHeading,fontWeight:500,fontSize:t.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${r}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${l(n)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${e}-with-text-start`]:{"&::before":{width:`calc(${d} * 100%)`},"&::after":{width:`calc(100% - ${d} * 100%)`}},[`&-horizontal${e}-with-text-end`]:{"&::before":{width:`calc(100% - ${d} * 100%)`},"&::after":{width:`calc(${d} * 100%)`}},[`${e}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:h},"&-dashed":{background:"none",borderColor:r,borderStyle:"dashed",borderWidth:`${l(n)} 0 0`},[`&-horizontal${e}-with-text${e}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${e}-dashed`]:{borderInlineStartWidth:n,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:r,borderStyle:"dotted",borderWidth:`${l(n)} 0 0`},[`&-horizontal${e}-with-text${e}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${e}-dotted`]:{borderInlineStartWidth:n,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${e}-with-text`]:{color:t.colorText,fontWeight:"normal",fontSize:t.fontSize},[`&-horizontal${e}-with-text-start${e}-no-default-orientation-margin-start`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${e}-inner-text`]:{paddingInlineStart:o}},[`&-horizontal${e}-with-text-end${e}-no-default-orientation-margin-end`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${e}-inner-text`]:{paddingInlineEnd:o}}})}},T=t=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:t.marginXS}),H=B("Divider",t=>{const e=N(t,{dividerHorizontalWithTextGutterMargin:t.margin,dividerHorizontalGutterMargin:t.marginLG,sizePaddingEdgeHorizontal:0});return[k(e)]},T,{unitless:{orientationMargin:!0}});var G=globalThis&&globalThis.__rest||function(t,e){var o={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(t);n<r.length;n++)e.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(o[r[n]]=t[r[n]]);return o};const D=t=>{const{getPrefixCls:e,direction:o,className:r,style:n}=W("divider"),{prefixCls:h,type:d="horizontal",orientation:s="center",orientationMargin:a,className:S,rootClassName:x,children:g,dashed:y,variant:b="solid",plain:v,style:w}=t,z=G(t,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style"]),i=e("divider",h),[C,I,M]=H(i),m=!!g,f=c.useMemo(()=>s==="left"?o==="rtl"?"end":"start":s==="right"?o==="rtl"?"start":"end":s,[o,s]),$=f==="start"&&a!=null,p=f==="end"&&a!=null,O=j(i,r,I,M,`${i}-${d}`,{[`${i}-with-text`]:m,[`${i}-with-text-${f}`]:m,[`${i}-dashed`]:!!y,[`${i}-${b}`]:b!=="solid",[`${i}-plain`]:!!v,[`${i}-rtl`]:o==="rtl",[`${i}-no-default-orientation-margin-start`]:$,[`${i}-no-default-orientation-margin-end`]:p},S,x),u=c.useMemo(()=>typeof a=="number"?a:/^\d+$/.test(a)?Number(a):a,[a]),E={marginInlineStart:$?u:void 0,marginInlineEnd:p?u:void 0};return C(c.createElement("div",Object.assign({className:O,style:Object.assign(Object.assign({},n),w)},z,{role:"separator"}),g&&d!=="vertical"&&c.createElement("span",{className:`${i}-inner-text`,style:E},g)))},A=D;export{A as D};
