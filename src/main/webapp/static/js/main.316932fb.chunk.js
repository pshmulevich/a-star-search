(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,t,a){},39:function(e,t,a){e.exports=a(72)},72:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(34),c=a.n(r),i=a(11),l=a(8),s=a(12),u=a(3),d={from:"a",to:"q",nodes:{a:{x:1,y:1,key:"a"},b:{x:2,y:.4,key:"b"},c:{x:3,y:1,key:"c"},d:{x:1.7,y:1.95,key:"d"},e:{x:2,y:1.79941,key:"e"},f:{x:2.8835,y:3.9827,key:"f"},g:{x:.998,y:4,key:"g"},h:{x:1.053,y:5.59554,key:"h"},i:{x:4,y:.7,key:"i"},j:{x:3.4,y:2.1,key:"j"},k:{x:5,y:1,key:"k"},l:{x:3.3,y:3.104,key:"l"},m:{x:4.779,y:4,key:"m"},n:{x:4.5,y:4.5,key:"n"},o:{x:5.7,y:4.9,key:"o"},p:{x:4.7,y:5.8,key:"p"},q:{x:5.9,y:5.9,key:"q"},r:{x:3.7,y:4,key:"r"}},edges:[{from:"a",to:"b"},{from:"b",to:"c"},{from:"c",to:"l"},{from:"b",to:"d"},{from:"d",to:"e"},{from:"e",to:"f"},{from:"e",to:"g"},{from:"g",to:"h"},{from:"h",to:"r"},{from:"l",to:"r"},{from:"l",to:"j"},{from:"l",to:"m"},{from:"j",to:"i"},{from:"j",to:"k"},{from:"k",to:"o"},{from:"o",to:"m"},{from:"m",to:"r"},{from:"r",to:"p"},{from:"q",to:"n"},{from:"p",to:"q"}]},h=function(e){return{to:e.to,from:e.from,originalNodesMap:e.nodes,originalLinks:e.edges}},m=h(d),g=function(e){var t={},a=e.originalLinks.map(function(a){return a.source=e.originalNodesMap[a.from],a.target=e.originalNodesMap[a.to],t["".concat(a.from,",").concat(a.to)]=a,t["".concat(a.to,",").concat(a.from)]=a,a});e.links=a,e.linksMap=t;var n=Object.values(e.originalNodesMap).map(function(e,t){return e.x=200*e.x,e.y=200*e.y,e.index=t,e});return e.nodes=n,e},p=function(e,t){var a=Object(n.useState)(function(){try{var a=window.localStorage.getItem(e),n=a?JSON.parse(a):t;return("initialData"===e?g(n):null)||n}catch(o){return console.log(o),t}}),o=Object(u.a)(a,2),r=o[0],c=o[1];return[r,function(t){try{var a=t instanceof Function?t(r):t;c(a),window.localStorage.setItem(e,JSON.stringify(a))}catch(n){console.log(n)}}]},f=Object(n.createContext)(),y=function(e){var t=e.children,a=Object(n.useState)(-1),r=Object(u.a)(a,2),c=r[0],i=r[1],l=Object(n.useState)(!1),s=Object(u.a)(l,2),h=s[0],g=s[1],y=Object(n.useState)({x:0,y:0}),b=Object(u.a)(y,2),x=b[0],v=b[1],O=Object(n.useState)({x:0,y:0}),E=Object(u.a)(O,2),k=E[0],j=E[1],D=Object(n.useState)({x:0,y:0}),w=Object(u.a)(D,2),S=w[0],M=w[1],N=p("bestRoute",[]),C=Object(u.a)(N,2),F=C[0],T=C[1],A=p("scenarioData",d),I=Object(u.a)(A,2),R=I[0],J=I[1],B=p("initialData",m),q=Object(u.a)(B,2),L=q[0],z=q[1],W=p("zoomFactor",1),G=Object(u.a)(W,2),U=G[0],H=G[1];return o.a.createElement(f.Provider,{value:{dragging:h,setDragging:g,coordinates:x,setCoordinates:v,origin:k,setOrigin:j,graphData:L,setGraphData:z,scenarioData:R,setScenarioData:J,nodeOrigin:S,setNodeOrigin:M,activeNodeIndex:c,setActiveNodeIndex:i,bestRoute:F,setBestRoute:T,zoomFactor:U,setZoomFactor:H}},t)},b=a(74),x=function(e){var t=Object(n.useState)(!1),a=Object(u.a)(t,2),r=a[0],c=a[1],i=e.node,l=Object(n.useContext)(f),s=i.index,d=i.key===l.graphData.from?"green":i.key===l.graphData.to?"red":r?"orange":"#21D4FD",h=function(e){e.preventDefault(),c(!0);var t=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e;l.setOrigin({x:t.clientX,y:t.clientY}),l.setActiveNodeIndex(s),l.setNodeOrigin({x:i.x,y:i.y}),l.setDragging(!0)},m=function(e){c(!1),l.setDragging(!1),l.setActiveNodeIndex(-1)};return o.a.createElement("g",{style:{userSelect:"none"},onTouchStart:h,onTouchEnd:m,onMouseDown:h,onMouseUp:m},o.a.createElement("circle",{r:r?30:15,fill:d}),o.a.createElement("text",{dy:2,dx:18,fill:"gold",fontFamily:"arial"},"".concat(i.key.toUpperCase()," (").concat((i.x/200).toFixed(2),", ").concat((i.y/200).toFixed(2),")")))},v=function(e){var t=e.link;if(!t.source)return console.error("Link source does not exist",t),"";if(!t.target)return console.error("Link target does not exist",t),"";var a=(t.source.x+t.target.x)/2,n=(t.source.y+t.target.y)/2,r=t.source.x,c=t.source.y,i=t.target.x,l=t.target.y,s=Math.sqrt(Math.pow(i-r,2)+Math.pow(l-c,2)).toFixed(0);return o.a.createElement("g",null,o.a.createElement("line",{x1:r,y1:c,x2:i,y2:l,strokeWidth:t.strokeWidth||2,stroke:t.color||"lightBlue",strokeOpacity:.6}),o.a.createElement("text",{textAnchor:"middle",dy:n-4,dx:a,fill:"steelblue",fontFamily:"arial"}," (".concat((s/200).toFixed(2),")")))},O=a(35),E=a.n(O),k=function(e){var t=e.width,a=e.height,r=Object(n.useContext)(f),c=r.graphData,i=r.activeNodeIndex,l=function(e,t,a){e.forEach(function(e){var n="".concat(e.sourceKey,",").concat(e.targetKey),o=c.linksMap[n];o.color=t,o.strokeWidth=a})};console.log("appData.graphData: ",r.graphData);var u=function(e){if(e.preventDefault(),r.dragging){var t=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,a=(t.clientX-r.origin.x)/r.zoomFactor,n=(t.clientY-r.origin.y)/r.zoomFactor,o=r.nodeOrigin.x,l=r.nodeOrigin.y;c.nodes[i].x=o+a,c.nodes[i].y=l+n,r.setGraphData(c),r.setCoordinates({x:a,y:n})}},d=r.graphData.nodes.map(function(e){return e.x}),h=r.graphData.nodes.map(function(e){return e.y}),m=Math.max.apply(Math,Object(s.a)(h))-Math.min.apply(Math,Object(s.a)(h))+200,g=Math.max.apply(Math,Object(s.a)(d))-Math.min.apply(Math,Object(s.a)(d))+200,p=Math.min(t/g,a/m);return r.setZoomFactor(p),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){l(r.bestRoute,void 0,void 0),r.setBestRoute([]);var e="http://localhost:8085/api/findRoute",t={edges:r.graphData.links,nodes:r.graphData.nodes,originNode:r.graphData.from,destinationNode:r.graphData.to};console.log("post request to",e,"payload:",t),E.a.post(e,t).then(function(e){console.log("Route data: ",e.data),l(e.data.edges,"red",6),r.setBestRoute(e.data.edges)},function(e){console.error(e)})}},"Submit"),o.a.createElement("button",{onClick:function(){localStorage.clear(),window.location.reload(!1)}},"Reset"),o.a.createElement("div",null,o.a.createElement("svg",{width:t,height:a,viewBox:"0 0 ".concat(t/p," ").concat(a/p),onTouchMove:u,onMouseMove:u,onMouseLeave:function(e){e.preventDefault(),r.setDragging(!1),r.setActiveNodeIndex(-1)}},o.a.createElement("rect",{width:t/p,height:a/p,fill:"black"}),o.a.createElement(b.a,{graph:r.graphData,nodeComponent:x,linkComponent:v}))))},j=function(){var e=window.innerWidth-30,t=window.innerHeight-50;return o.a.createElement("div",{style:{width:e,height:t}},o.a.createElement(k,{width:e,height:t}))},D=a(13),w=a(14),S=a(16),M=a(15),N=a(17),C=(a(31),function(e){function t(){return Object(D.a)(this,t),Object(S.a)(this,Object(M.a)(t).apply(this,arguments))}return Object(N.a)(t,e),Object(w.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"dashboard"},o.a.createElement("div",{className:"menu"},o.a.createElement(i.b,{exact:!0,to:"/"},"Home"),o.a.createElement(i.b,{exact:!0,to:"/settings"},"Settings"),o.a.createElement(i.b,{exact:!0,to:"/about"},"About")),o.a.createElement("div",{className:"content"},this.props.children))}}]),t}(o.a.Component)),F=a(38),T=a.n(F),A=function(e){var t=e.history,a=Object(n.useContext)(f),r=Object(n.useState)(JSON.stringify(a.scenarioData,null,2)),c=Object(u.a)(r,2),i=c[0],l=c[1],s=Object(n.useState)(void 0),d=Object(u.a)(s,2),m=d[0],p=d[1];return o.a.createElement("div",null,o.a.createElement("h1",null,"Settings:"),o.a.createElement("p",null,"Enter new node data:"),o.a.createElement("div",null,o.a.createElement("textarea",{className:(m?"errorsFound ":"")+"scenarioData",value:i,onChange:function(e){return l(e.target.value)},placeholder:"Please Enter JSON data"})),o.a.createElement("button",{onClick:function(){p(void 0);try{var e=T.a.parse(i);console.log("settings:parseJsonInfo jsonObject:",e),a.setScenarioData(e),a.setGraphData(g(h(e))),t.push("/")}catch(n){console.error("Not a valid JSON",n),p(n)}}},"Submit Node Data"),o.a.createElement("div",{className:"errorMessage"},!m||m.toString()))},I=function(){Object(n.useContext)(f);return o.a.createElement("div",null,o.a.createElement("h1",null,"About"),o.a.createElement("h2",null,"This Application"),o.a.createElement("p",null,"This application has nodes which have edges between them depicting distances. By clicking the submit button you can find the most efficient path to the destination node. The nodes are moveable and the distances between the nodes will increase or decrease as you move the selected node. This Application was written with a Java Spring-Boot server side and a React User interface."),o.a.createElement("h2",null,"A-Star Search Algorithm"),o.a.createElement("p",null,"This algorithm is a graph-traversal or path-finding algorithm. It is known for its efficiency."))},R=function(e){function t(){return Object(D.a)(this,t),Object(S.a)(this,Object(M.a)(t).apply(this,arguments))}return Object(N.a)(t,e),Object(w.a)(t,[{key:"render",value:function(){return o.a.createElement("h1",null,"not found!")}}]),t}(o.a.Component),J=function(){return o.a.createElement("div",{id:"app"},o.a.createElement(y,null,o.a.createElement(i.a,null,o.a.createElement(C,null,o.a.createElement(l.c,null,o.a.createElement(l.a,{exact:!0,path:"/",component:j}),o.a.createElement(l.a,{exact:!0,path:"/settings",component:A}),o.a.createElement(l.a,{exact:!0,path:"/about",component:I}),o.a.createElement(l.a,{component:R}))))))},B=document.getElementById("root");c.a.render(o.a.createElement(J,null),B)}},[[39,1,2]]]);
//# sourceMappingURL=main.316932fb.chunk.js.map