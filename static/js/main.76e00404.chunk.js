(this.webpackJsonpmeettorrent=this.webpackJsonpmeettorrent||[]).push([[0],{124:function(e,t){},126:function(e,t){},132:function(e,t){},133:function(e,t){},134:function(e,t){},139:function(e,t){},141:function(e,t){},146:function(e,t){},147:function(e,t){},149:function(e,t){},160:function(e,t){},162:function(e,t){},171:function(e,t){},173:function(e,t){},180:function(e,t){},184:function(e,t){},186:function(e,t){},194:function(e,t){},196:function(e,t){},201:function(e,t){},202:function(e,t,n){},203:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),o=n(97),i=n.n(o),a=n(30),u=n(1),s=n(6);function j(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),Array.from(t).map((function(e){return e.toString(16).padStart(2,"0")})).join("")}var f=n(5);function d(){var e=Object(c.useState)((function(){return j(20)})),t=Object(s.a)(e,1)[0],n=Object(c.useState)(""),r=Object(s.a)(n,2),o=r[0],i=r[1];return Object(f.jsxs)("div",{children:[Object(f.jsx)(a.b,{to:"/".concat(t),children:"New meeting"}),Object(f.jsx)("input",{placeholder:"Past meeting hash",value:o,onChange:function(e){return i(e.target.value)}}),o&&Object(f.jsx)(a.b,{to:"/".concat(o),children:"Join"})]})}var b=n(48),l=n(50),O=n(49),v=n(33),h=n(15),p=n(47),g=n.n(p),m=n(98),x=n(99),y=n.n(x),S=n(35),w=n.n(S),P=n(100),k=w.a.prototype._createPeer,C=j(20),E=new TextDecoder("utf-8");function T(){var e=Object(u.g)().meetingHash,t=Object(c.useState)({}),n=Object(s.a)(t,2),r=n[0],o=n[1],i=Object(c.useState)(),a=Object(s.a)(i,2),j=a[0],d=a[1],p=Object(c.useState)({}),x=Object(s.a)(p,2),S=x[0],T=x[1],I=Object(c.useState)(""),M=Object(s.a)(I,2),D=M[0],F=M[1],H=Object(c.useState)([]),J=Object(s.a)(H,2),L=J[0],V=J[1];return Object(c.useEffect)((function(){function e(){return(e=Object(m.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.getUserMedia({audio:!0,video:{width:{ideal:1280},height:{ideal:720}}});case 3:return t=e.sent,d(t),e.abrupt("return",(function(){t.getTracks().forEach((function(e){return e.stop()}))}));case 8:e.prev=8,e.t0=e.catch(0),console.error("Error while getting media",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(c.useEffect)((function(){if(j){w.a.prototype._createPeer=function(e){return k.call(this,Object(h.a)(Object(h.a)({},e),{},{stream:j}))};var t=new y.a({peerId:C,infoHash:e,announce:P.announceList});return t.on("peer",(function(e){console.log("Peer found",e),e.on("connect",(function(){console.log("New peer connected",e),o((function(t){return Object(h.a)(Object(h.a)({},t),{},Object(v.a)({},e.id,e))}))})),e.on("close",(function(){console.log("Peer disconnected",e),T((function(t){var n=e.id;t[n];return Object(l.a)(t,[n].map(O.a))})),o((function(t){var n=e.id;t[n];return Object(l.a)(t,[n].map(O.a))}))})),e.on("error",(function(t){console.log("Peer error",t,e)})),e.on("data",(function(e){V((function(t){return[].concat(Object(b.a)(t),[E.decode(e)])}))})),e.on("stream",(function(t){console.log("Received stream",e,t),T((function(n){return Object(h.a)(Object(h.a)({},n),{},Object(v.a)({},e.id,t))}))}))})),t.start(),function(){t.stop()}}}),[e,j]),Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{children:["Meeting hash: ",e]}),Object(f.jsxs)("div",{children:["Peers connected: ",Object.keys(r).length+1]}),j&&Object(f.jsx)("video",{ref:function(e){var t,n;if(e){var c=j.getVideoTracks(),r=Object(s.a)(c,1)[0],o=null!==(t=null===(n=e.srcObject)||void 0===n?void 0:n.getVideoTracks())&&void 0!==t?t:[void 0],i=Object(s.a)(o,1)[0];r.id!==(null===i||void 0===i?void 0:i.id)&&(e.srcObject=new MediaStream([r]))}},autoPlay:!0,playsInline:!0,controls:!1}),Object.values(S).map((function(e){return Object(f.jsx)("video",{ref:function(t){var n;return t&&(null===(n=t.srcObject)||void 0===n?void 0:n.id)!==e.id&&(t.srcObject=e)},autoPlay:!0,playsInline:!0,controls:!1},e.id)})),Object(f.jsxs)("form",{children:[Object(f.jsx)("input",{placeholder:"Message",value:D,onChange:function(e){return F(e.target.value)}}),Object(f.jsx)("button",{onClick:function(e){e.preventDefault(),Object.values(r).forEach((function(e){return e.send(D)})),V((function(e){return[].concat(Object(b.a)(e),[D])})),F("")},children:"Send"})]}),L.map((function(e,t){return Object(f.jsx)("div",{children:e},t)}))]})}function I(){return Object(f.jsx)(a.a,{basename:"/meettorrent",children:Object(f.jsxs)(u.c,{children:[Object(f.jsx)(u.a,{path:"/",element:Object(f.jsx)(d,{})}),Object(f.jsx)(u.a,{path:"/:meetingHash",element:Object(f.jsx)(T,{})})]})})}n(202);var M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,204)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),o(e),i(e)}))};i.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(I,{})}),document.getElementById("root")),M()}},[[203,1,2]]]);
//# sourceMappingURL=main.76e00404.chunk.js.map