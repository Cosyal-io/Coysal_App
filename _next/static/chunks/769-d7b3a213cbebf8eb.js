"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[769],{6368:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return y}});let n=r(5213),o=r(622),a=r(5628),i=o._(r(3824)),l=n._(r(1761)),d=n._(r(7661)),s=r(4956),u=r(7129),f=r(6387);r(2105);let c=r(2058),p=n._(r(9608)),g=r(1007),m={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/Cosyal_App/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function h(e,t,r,n,o,a,i){let l=null==e?void 0:e.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&o(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,o=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>o,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{o=!0,t.stopPropagation()}})}(null==n?void 0:n.current)&&n.current(e)}}))}function v(e){return i.use?{fetchPriority:e}:{fetchpriority:e}}let b=(0,i.forwardRef)((e,t)=>{let{src:r,srcSet:n,sizes:o,height:l,width:d,decoding:s,className:u,style:f,fetchPriority:c,placeholder:p,loading:m,unoptimized:b,fill:w,onLoadRef:y,onLoadingCompleteRef:x,setBlurComplete:j,setShowAltText:C,sizesInput:_,onLoad:S,onError:P,...M}=e,R=(0,i.useCallback)(e=>{e&&(P&&(e.src=e.src),e.complete&&h(e,p,y,x,j,b,_))},[r,p,y,x,j,P,b,_]),O=(0,g.useMergedRef)(t,R);return(0,a.jsx)("img",{...M,...v(c),loading:m,width:d,height:l,decoding:s,"data-nimg":w?"fill":"1",className:u,style:f,sizes:o,srcSet:n,src:r,ref:O,onLoad:e=>{h(e.currentTarget,p,y,x,j,b,_)},onError:e=>{C(!0),"empty"!==p&&j(!0),P&&P(e)}})});function w(e){let{isAppRouter:t,imgAttributes:r}=e,n={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...v(r.fetchPriority)};return t&&l.default.preload?(l.default.preload(r.src,n),null):(0,a.jsx)(d.default,{children:(0,a.jsx)("link",{rel:"preload",href:r.srcSet?void 0:r.src,...n},"__nimg-"+r.src+r.srcSet+r.sizes)})}let y=(0,i.forwardRef)((e,t)=>{let r=(0,i.useContext)(c.RouterContext),n=(0,i.useContext)(f.ImageConfigContext),o=(0,i.useMemo)(()=>{let e=m||n||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[n]),{onLoad:l,onLoadingComplete:d}=e,g=(0,i.useRef)(l);(0,i.useEffect)(()=>{g.current=l},[l]);let h=(0,i.useRef)(d);(0,i.useEffect)(()=>{h.current=d},[d]);let[v,y]=(0,i.useState)(!1),[x,j]=(0,i.useState)(!1),{props:C,meta:_}=(0,s.getImgProps)(e,{defaultLoader:p.default,imgConf:o,blurComplete:v,showAltText:x});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(b,{...C,unoptimized:_.unoptimized,placeholder:_.placeholder,fill:_.fill,onLoadRef:g,onLoadingCompleteRef:h,setBlurComplete:y,setShowAltText:j,sizesInput:e.sizes,ref:t}),_.priority?(0,a.jsx)(w,{isAppRouter:!r,imgAttributes:C}):null]})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2949:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AmpStateContext",{enumerable:!0,get:function(){return n}});let n=r(5213)._(r(3824)).default.createContext({})},2625:(e,t)=>{function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},4956:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return l}}),r(2105);let n=r(9221),o=r(7129);function a(e){return void 0!==e.default}function i(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l(e,t){var r;let l,d,s,{src:u,sizes:f,unoptimized:c=!1,priority:p=!1,loading:g,className:m,quality:h,width:v,height:b,fill:w=!1,style:y,overrideSrc:x,onLoad:j,onLoadingComplete:C,placeholder:_="empty",blurDataURL:S,fetchPriority:P,decoding:M="async",layout:R,objectFit:O,objectPosition:D,lazyBoundary:I,lazyRoot:E,...z}=e,{imgConf:N,showAltText:k,blurComplete:A,defaultLoader:T}=t,F=N||o.imageConfigDefault;if("allSizes"in F)l=F;else{let e=[...F.deviceSizes,...F.imageSizes].sort((e,t)=>e-t),t=F.deviceSizes.sort((e,t)=>e-t);l={...F,allSizes:e,deviceSizes:t}}if(void 0===T)throw Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");let G=z.loader||T;delete z.loader,delete z.srcSet;let L="__next_img_default"in G;if(L){if("custom"===l.loader)throw Error('Image with src "'+u+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=G;G=t=>{let{config:r,...n}=t;return e(n)}}if(R){"fill"===R&&(w=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[R];e&&(y={...y,...e});let t={responsive:"100vw",fill:"100vw"}[R];t&&!f&&(f=t)}let U="",B=i(v),V=i(b);if((r=u)&&"object"==typeof r&&(a(r)||void 0!==r.src)){let e=a(u)?u.default:u;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(d=e.blurWidth,s=e.blurHeight,S=S||e.blurDataURL,U=e.src,!w){if(B||V){if(B&&!V){let t=B/e.width;V=Math.round(e.height*t)}else if(!B&&V){let t=V/e.height;B=Math.round(e.width*t)}}else B=e.width,V=e.height}}let q=!p&&("lazy"===g||void 0===g);(!(u="string"==typeof u?u:U)||u.startsWith("data:")||u.startsWith("blob:"))&&(c=!0,q=!1),l.unoptimized&&(c=!0),L&&u.endsWith(".svg")&&!l.dangerouslyAllowSVG&&(c=!0);let H=i(h),K=Object.assign(w?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:O,objectPosition:D}:{},k?{}:{color:"transparent"},y),J=A||"empty"===_?null:"blur"===_?'url("data:image/svg+xml;charset=utf-8,'+(0,n.getImageBlurSvg)({widthInt:B,heightInt:V,blurWidth:d,blurHeight:s,blurDataURL:S||"",objectFit:K.objectFit})+'")':'url("'+_+'")',W=J?{backgroundSize:K.objectFit||"cover",backgroundPosition:K.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:J}:{},Z=function(e){let{config:t,src:r,unoptimized:n,width:o,quality:a,sizes:i,loader:l}=e;if(n)return{src:r,srcSet:void 0,sizes:void 0};let{widths:d,kind:s}=function(e,t,r){let{deviceSizes:n,allSizes:o}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let n;n=e.exec(r);n)t.push(parseInt(n[2]));if(t.length){let e=.01*Math.min(...t);return{widths:o.filter(t=>t>=n[0]*e),kind:"w"}}return{widths:o,kind:"w"}}return"number"!=typeof t?{widths:n,kind:"w"}:{widths:[...new Set([t,2*t].map(e=>o.find(t=>t>=e)||o[o.length-1]))],kind:"x"}}(t,o,i),u=d.length-1;return{sizes:i||"w"!==s?i:"100vw",srcSet:d.map((e,n)=>l({config:t,src:r,quality:a,width:e})+" "+("w"===s?e:n+1)+s).join(", "),src:l({config:t,src:r,quality:a,width:d[u]})}}({config:l,src:u,unoptimized:c,width:B,quality:H,sizes:f,loader:G});return{props:{...z,loading:q?"lazy":g,fetchPriority:P,width:B,height:V,decoding:M,className:m,style:{...K,...W},sizes:Z.sizes,srcSet:Z.srcSet,src:x||Z.src},meta:{unoptimized:c,priority:p,placeholder:_,fill:w}}}},7661:(e,t,r)=>{var n=r(5036);Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return h},defaultHead:function(){return c}});let o=r(5213),a=r(622),i=r(5628),l=a._(r(3824)),d=o._(r(5498)),s=r(2949),u=r(1973),f=r(2625);function c(e){void 0===e&&(e=!1);let t=[(0,i.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,i.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(2105);let g=["name","httpEquiv","charSet","itemProp"];function m(e,t){let{inAmpMode:r}=t;return e.reduce(p,[]).reverse().concat(c(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return o=>{let a=!0,i=!1;if(o.key&&"number"!=typeof o.key&&o.key.indexOf("$")>0){i=!0;let t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?a=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(let e=0,t=g.length;e<t;e++){let t=g[e];if(o.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?a=!1:r.add(t);else{let e=o.props[t],r=n[t]||new Set;("name"!==t||!i)&&r.has(e)?a=!1:(r.add(e),n[t]=r)}}}}return a}}()).reverse().map((e,t)=>{let o=e.key||t;if(n.env.__NEXT_OPTIMIZE_FONTS&&!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,l.default.cloneElement(e,t)}return l.default.cloneElement(e,{key:o})})}let h=function(e){let{children:t}=e,r=(0,l.useContext)(s.AmpStateContext),n=(0,l.useContext)(u.HeadManagerContext);return(0,i.jsx)(d.default,{reduceComponentsToState:m,headManager:n,inAmpMode:(0,f.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9221:(e,t)=>{function r(e){let{widthInt:t,heightInt:r,blurWidth:n,blurHeight:o,blurDataURL:a,objectFit:i}=e,l=n?40*n:t,d=o?40*o:r,s=l&&d?"viewBox='0 0 "+l+" "+d+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+s+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(s?"none":"contain"===i?"xMidYMid":"cover"===i?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+a+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},6387:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ImageConfigContext",{enumerable:!0,get:function(){return a}});let n=r(5213)._(r(3824)),o=r(7129),a=n.default.createContext(o.imageConfigDefault)},7129:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{VALID_LOADERS:function(){return r},imageConfigDefault:function(){return n}});let r=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"],dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],unoptimized:!1}},9608:(e,t)=>{function r(e){let{config:t,src:r,width:n,quality:o}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+n+"&q="+(o||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n}}),r.__next_img_default=!0;let n=r},5498:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}});let n=r(3824),o=n.useLayoutEffect,a=n.useEffect;function i(e){let{headManager:t,reduceComponentsToState:r}=e;function i(){if(t&&t.mountedInstances){let o=n.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(o,e))}}return o(()=>{var r;return null==t||null==(r=t.mountedInstances)||r.add(e.children),()=>{var r;null==t||null==(r=t.mountedInstances)||r.delete(e.children)}}),o(()=>(t&&(t._pendingUpdate=i),()=>{t&&(t._pendingUpdate=i)})),a(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},6438:(e,t,r)=>{r.d(t,{G5:()=>W,H_:()=>U,JU:()=>G,Pb:()=>K,UC:()=>T,VF:()=>q,YJ:()=>F,ZL:()=>A,ZP:()=>J,bL:()=>N,hN:()=>V,l9:()=>k,q7:()=>L,wv:()=>H,z6:()=>B});var n=r(3824),o=r(5216),a=r(8460),i=r(4839),l=r(3928),d=r(5230),s=r(3),u=r(4764),f=r(5628),c="DropdownMenu",[p,g]=(0,i.A)(c,[s.UE]),m=(0,s.UE)(),[h,v]=p(c),b=e=>{let{__scopeDropdownMenu:t,children:r,dir:o,open:a,defaultOpen:i,onOpenChange:d,modal:c=!0}=e,p=m(t),g=n.useRef(null),[v=!1,b]=(0,l.i)({prop:a,defaultProp:i,onChange:d});return(0,f.jsx)(h,{scope:t,triggerId:(0,u.B)(),triggerRef:g,contentId:(0,u.B)(),open:v,onOpenChange:b,onOpenToggle:n.useCallback(()=>b(e=>!e),[b]),modal:c,children:(0,f.jsx)(s.bL,{...p,open:v,onOpenChange:b,dir:o,modal:c,children:r})})};b.displayName=c;var w="DropdownMenuTrigger",y=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,disabled:n=!1,...i}=e,l=v(w,r),u=m(r);return(0,f.jsx)(s.Mz,{asChild:!0,...u,children:(0,f.jsx)(d.sG.button,{type:"button",id:l.triggerId,"aria-haspopup":"menu","aria-expanded":l.open,"aria-controls":l.open?l.contentId:void 0,"data-state":l.open?"open":"closed","data-disabled":n?"":void 0,disabled:n,...i,ref:(0,a.t)(t,l.triggerRef),onPointerDown:(0,o.m)(e.onPointerDown,e=>{n||0!==e.button||!1!==e.ctrlKey||(l.onOpenToggle(),l.open||e.preventDefault())}),onKeyDown:(0,o.m)(e.onKeyDown,e=>{!n&&(["Enter"," "].includes(e.key)&&l.onOpenToggle(),"ArrowDown"===e.key&&l.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(e.key)&&e.preventDefault())})})})});y.displayName=w;var x=e=>{let{__scopeDropdownMenu:t,...r}=e,n=m(t);return(0,f.jsx)(s.ZL,{...n,...r})};x.displayName="DropdownMenuPortal";var j="DropdownMenuContent",C=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...a}=e,i=v(j,r),l=m(r),d=n.useRef(!1);return(0,f.jsx)(s.UC,{id:i.contentId,"aria-labelledby":i.triggerId,...l,...a,ref:t,onCloseAutoFocus:(0,o.m)(e.onCloseAutoFocus,e=>{var t;d.current||null===(t=i.triggerRef.current)||void 0===t||t.focus(),d.current=!1,e.preventDefault()}),onInteractOutside:(0,o.m)(e.onInteractOutside,e=>{let t=e.detail.originalEvent,r=0===t.button&&!0===t.ctrlKey,n=2===t.button||r;(!i.modal||n)&&(d.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});C.displayName=j;var _=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.YJ,{...o,...n,ref:t})});_.displayName="DropdownMenuGroup";var S=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.JU,{...o,...n,ref:t})});S.displayName="DropdownMenuLabel";var P=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.q7,{...o,...n,ref:t})});P.displayName="DropdownMenuItem";var M=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.H_,{...o,...n,ref:t})});M.displayName="DropdownMenuCheckboxItem";var R=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.z6,{...o,...n,ref:t})});R.displayName="DropdownMenuRadioGroup";var O=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.hN,{...o,...n,ref:t})});O.displayName="DropdownMenuRadioItem";var D=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.VF,{...o,...n,ref:t})});D.displayName="DropdownMenuItemIndicator";var I=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.wv,{...o,...n,ref:t})});I.displayName="DropdownMenuSeparator",n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.i3,{...o,...n,ref:t})}).displayName="DropdownMenuArrow";var E=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.ZP,{...o,...n,ref:t})});E.displayName="DropdownMenuSubTrigger";var z=n.forwardRef((e,t)=>{let{__scopeDropdownMenu:r,...n}=e,o=m(r);return(0,f.jsx)(s.G5,{...o,...n,ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});z.displayName="DropdownMenuSubContent";var N=b,k=y,A=x,T=C,F=_,G=S,L=P,U=M,B=R,V=O,q=D,H=I,K=e=>{let{__scopeDropdownMenu:t,children:r,open:n,onOpenChange:o,defaultOpen:a}=e,i=m(t),[d=!1,u]=(0,l.i)({prop:n,defaultProp:a,onChange:o});return(0,f.jsx)(s.Pb,{...i,open:d,onOpenChange:u,children:r})},J=E,W=z},6153:(e,t,r)=>{r.d(t,{B8:()=>O,UC:()=>I,bL:()=>R,l9:()=>D});var n=r(3824),o=r(5216),a=r(4839),i=r(6874),l=r(4255),d=r(5230),s=r(2146),u=r(3928),f=r(4764),c=r(5628),p="Tabs",[g,m]=(0,a.A)(p,[i.RG]),h=(0,i.RG)(),[v,b]=g(p),w=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,onValueChange:o,defaultValue:a,orientation:i="horizontal",dir:l,activationMode:p="automatic",...g}=e,m=(0,s.jH)(l),[h,b]=(0,u.i)({prop:n,onChange:o,defaultProp:a});return(0,c.jsx)(v,{scope:r,baseId:(0,f.B)(),value:h,onValueChange:b,orientation:i,dir:m,activationMode:p,children:(0,c.jsx)(d.sG.div,{dir:m,"data-orientation":i,...g,ref:t})})});w.displayName=p;var y="TabsList",x=n.forwardRef((e,t)=>{let{__scopeTabs:r,loop:n=!0,...o}=e,a=b(y,r),l=h(r);return(0,c.jsx)(i.bL,{asChild:!0,...l,orientation:a.orientation,dir:a.dir,loop:n,children:(0,c.jsx)(d.sG.div,{role:"tablist","aria-orientation":a.orientation,...o,ref:t})})});x.displayName=y;var j="TabsTrigger",C=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,disabled:a=!1,...l}=e,s=b(j,r),u=h(r),f=P(s.baseId,n),p=M(s.baseId,n),g=n===s.value;return(0,c.jsx)(i.q7,{asChild:!0,...u,focusable:!a,active:g,children:(0,c.jsx)(d.sG.button,{type:"button",role:"tab","aria-selected":g,"aria-controls":p,"data-state":g?"active":"inactive","data-disabled":a?"":void 0,disabled:a,id:f,...l,ref:t,onMouseDown:(0,o.m)(e.onMouseDown,e=>{a||0!==e.button||!1!==e.ctrlKey?e.preventDefault():s.onValueChange(n)}),onKeyDown:(0,o.m)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&s.onValueChange(n)}),onFocus:(0,o.m)(e.onFocus,()=>{let e="manual"!==s.activationMode;g||a||!e||s.onValueChange(n)})})})});C.displayName=j;var _="TabsContent",S=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:o,forceMount:a,children:i,...s}=e,u=b(_,r),f=P(u.baseId,o),p=M(u.baseId,o),g=o===u.value,m=n.useRef(g);return n.useEffect(()=>{let e=requestAnimationFrame(()=>m.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,c.jsx)(l.C,{present:a||g,children:r=>{let{present:n}=r;return(0,c.jsx)(d.sG.div,{"data-state":g?"active":"inactive","data-orientation":u.orientation,role:"tabpanel","aria-labelledby":f,hidden:!n,id:p,tabIndex:0,...s,ref:t,style:{...e.style,animationDuration:m.current?"0s":void 0},children:n&&i})}})});function P(e,t){return"".concat(e,"-trigger-").concat(t)}function M(e,t){return"".concat(e,"-content-").concat(t)}S.displayName=_;var R=w,O=x,D=C,I=S}}]);