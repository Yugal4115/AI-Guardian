(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,98276,46117,73895,99487,8682,e=>{"use strict";let t,n;function i(){return(i=Object.assign.bind()).apply(null,arguments)}e.s(["default",()=>i],46117);var o=e.i(12839);e.s(["useThree",()=>o.C],73895);var o=o,r=e.i(7565),a=e.i(91415),s=e.i(79387),l=Object.defineProperty;class c{constructor(){((e,t,n)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?l(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n})(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let n=this._listeners;void 0===n[e]&&(n[e]=[]),-1===n[e].indexOf(t)&&n[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let n=this._listeners;return void 0!==n[e]&&-1!==n[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let n=this._listeners[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners[e.type];if(void 0!==t){e.target=this;let n=t.slice(0);for(let t=0,i=n.length;t<i;t++)n[t].call(this,e);e.target=null}}}var d=Object.defineProperty,u=(e,t,n)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?d(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n,n};let f=new s.Ray,p=new s.Plane,h=Math.cos(Math.PI/180*70),m=(e,t)=>(e%t+t)%t;class v extends c{constructor(e,t){super(),u(this,"object"),u(this,"domElement"),u(this,"enabled",!0),u(this,"target",new s.Vector3),u(this,"minDistance",0),u(this,"maxDistance",1/0),u(this,"minZoom",0),u(this,"maxZoom",1/0),u(this,"minPolarAngle",0),u(this,"maxPolarAngle",Math.PI),u(this,"minAzimuthAngle",-1/0),u(this,"maxAzimuthAngle",1/0),u(this,"enableDamping",!1),u(this,"dampingFactor",.05),u(this,"enableZoom",!0),u(this,"zoomSpeed",1),u(this,"enableRotate",!0),u(this,"rotateSpeed",1),u(this,"enablePan",!0),u(this,"panSpeed",1),u(this,"screenSpacePanning",!0),u(this,"keyPanSpeed",7),u(this,"zoomToCursor",!1),u(this,"autoRotate",!1),u(this,"autoRotateSpeed",2),u(this,"reverseOrbit",!1),u(this,"reverseHorizontalOrbit",!1),u(this,"reverseVerticalOrbit",!1),u(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),u(this,"mouseButtons",{LEFT:s.MOUSE.ROTATE,MIDDLE:s.MOUSE.DOLLY,RIGHT:s.MOUSE.PAN}),u(this,"touches",{ONE:s.TOUCH.ROTATE,TWO:s.TOUCH.DOLLY_PAN}),u(this,"target0"),u(this,"position0"),u(this,"zoom0"),u(this,"_domElementKeyEvents",null),u(this,"getPolarAngle"),u(this,"getAzimuthalAngle"),u(this,"setPolarAngle"),u(this,"setAzimuthalAngle"),u(this,"getDistance"),u(this,"getZoomScale"),u(this,"listenToKeyEvents"),u(this,"stopListenToKeyEvents"),u(this,"saveState"),u(this,"reset"),u(this,"update"),u(this,"connect"),u(this,"dispose"),u(this,"dollyIn"),u(this,"dollyOut"),u(this,"getScale"),u(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>d.phi,this.getAzimuthalAngle=()=>d.theta,this.setPolarAngle=e=>{let t=m(e,2*Math.PI),i=d.phi;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let o=Math.abs(t-i);2*Math.PI-o<o&&(t<i?t+=2*Math.PI:i+=2*Math.PI),v.phi=t-i,n.update()},this.setAzimuthalAngle=e=>{let t=m(e,2*Math.PI),i=d.theta;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let o=Math.abs(t-i);2*Math.PI-o<o&&(t<i?t+=2*Math.PI:i+=2*Math.PI),v.theta=t-i,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),l=a.NONE},this.update=(()=>{let t=new s.Vector3,o=new s.Vector3(0,1,0),r=new s.Quaternion().setFromUnitVectors(e.up,o),u=r.clone().invert(),m=new s.Vector3,y=new s.Quaternion,E=2*Math.PI;return function(){let w=n.object.position;r.setFromUnitVectors(e.up,o),u.copy(r).invert(),t.copy(w).sub(n.target),t.applyQuaternion(r),d.setFromVector3(t),n.autoRotate&&l===a.NONE&&z(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(d.theta+=v.theta*n.dampingFactor,d.phi+=v.phi*n.dampingFactor):(d.theta+=v.theta,d.phi+=v.phi);let S=n.minAzimuthAngle,x=n.maxAzimuthAngle;isFinite(S)&&isFinite(x)&&(S<-Math.PI?S+=E:S>Math.PI&&(S-=E),x<-Math.PI?x+=E:x>Math.PI&&(x-=E),S<=x?d.theta=Math.max(S,Math.min(x,d.theta)):d.theta=d.theta>(S+x)/2?Math.max(S,d.theta):Math.min(x,d.theta)),d.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,d.phi)),d.makeSafe(),!0===n.enableDamping?n.target.addScaledVector(g,n.dampingFactor):n.target.add(g),n.zoomToCursor&&T||n.object.isOrthographicCamera?d.radius=H(d.radius):d.radius=H(d.radius*b),t.setFromSpherical(d),t.applyQuaternion(u),w.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),!0===n.enableDamping?(v.theta*=1-n.dampingFactor,v.phi*=1-n.dampingFactor,g.multiplyScalar(1-n.dampingFactor)):(v.set(0,0,0),g.set(0,0,0));let A=!1;if(n.zoomToCursor&&T){let i=null;if(n.object instanceof s.PerspectiveCamera&&n.object.isPerspectiveCamera){let e=t.length();i=H(e*b);let o=e-i;n.object.position.addScaledVector(M,o),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new s.Vector3(P.x,P.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/b)),n.object.updateProjectionMatrix(),A=!0;let o=new s.Vector3(P.x,P.y,0);o.unproject(n.object),n.object.position.sub(o).add(e),n.object.updateMatrixWorld(),i=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;null!==i&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(i).add(n.object.position):(f.origin.copy(n.object.position),f.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(f.direction))<h?e.lookAt(n.target):(p.setFromNormalAndCoplanarPoint(n.object.up,n.target),f.intersectPlane(p,n.target))))}else n.object instanceof s.OrthographicCamera&&n.object.isOrthographicCamera&&(A=1!==b)&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/b)),n.object.updateProjectionMatrix());return b=1,T=!1,!!(A||m.distanceToSquared(n.object.position)>c||8*(1-y.dot(n.object.quaternion))>c)&&(n.dispatchEvent(i),m.copy(n.object.position),y.copy(n.object.quaternion),A=!1,!0)}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",q),n.domElement.addEventListener("pointercancel",J),n.domElement.addEventListener("wheel",$)},this.dispose=()=>{var e,t,i,o,r,a;n.domElement&&(n.domElement.style.touchAction="auto"),null==(e=n.domElement)||e.removeEventListener("contextmenu",et),null==(t=n.domElement)||t.removeEventListener("pointerdown",q),null==(i=n.domElement)||i.removeEventListener("pointercancel",J),null==(o=n.domElement)||o.removeEventListener("wheel",$),null==(r=n.domElement)||r.ownerDocument.removeEventListener("pointermove",Q),null==(a=n.domElement)||a.ownerDocument.removeEventListener("pointerup",J),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ee)};const n=this,i={type:"change"},o={type:"start"},r={type:"end"},a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=a.NONE;const c=1e-6,d=new s.Spherical,v=new s.Spherical;let b=1;const g=new s.Vector3,y=new s.Vector2,E=new s.Vector2,w=new s.Vector2,S=new s.Vector2,x=new s.Vector2,A=new s.Vector2,O=new s.Vector2,L=new s.Vector2,_=new s.Vector2,M=new s.Vector3,P=new s.Vector2;let T=!1;const j=[],C={};function U(){return Math.pow(.95,n.zoomSpeed)}function z(e){n.reverseOrbit||n.reverseHorizontalOrbit?v.theta+=e:v.theta-=e}function D(e){n.reverseOrbit||n.reverseVerticalOrbit?v.phi+=e:v.phi-=e}const I=(()=>{let e=new s.Vector3;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),g.add(e)}})(),R=(()=>{let e=new s.Vector3;return function(t,i){!0===n.screenSpacePanning?e.setFromMatrixColumn(i,1):(e.setFromMatrixColumn(i,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),g.add(e)}})(),N=(()=>{let e=new s.Vector3;return function(t,i){let o=n.domElement;if(o&&n.object instanceof s.PerspectiveCamera&&n.object.isPerspectiveCamera){let r=n.object.position;e.copy(r).sub(n.target);let a=e.length();I(2*t*(a*=Math.tan(n.object.fov/2*Math.PI/180))/o.clientHeight,n.object.matrix),R(2*i*a/o.clientHeight,n.object.matrix)}else o&&n.object instanceof s.OrthographicCamera&&n.object.isOrthographicCamera?(I(t*(n.object.right-n.object.left)/n.object.zoom/o.clientWidth,n.object.matrix),R(i*(n.object.top-n.object.bottom)/n.object.zoom/o.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function B(e){n.object instanceof s.PerspectiveCamera&&n.object.isPerspectiveCamera||n.object instanceof s.OrthographicCamera&&n.object.isOrthographicCamera?b=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function V(e){if(!n.zoomToCursor||!n.domElement)return;T=!0;let t=n.domElement.getBoundingClientRect(),i=e.clientX-t.left,o=e.clientY-t.top,r=t.width,a=t.height;P.x=i/r*2-1,P.y=-(o/a*2)+1,M.set(P.x,P.y,1).unproject(n.object).sub(n.object.position).normalize()}function H(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function k(e){y.set(e.clientX,e.clientY)}function F(e){S.set(e.clientX,e.clientY)}function Y(){if(1==j.length)y.set(j[0].pageX,j[0].pageY);else{let e=.5*(j[0].pageX+j[1].pageX),t=.5*(j[0].pageY+j[1].pageY);y.set(e,t)}}function G(){if(1==j.length)S.set(j[0].pageX,j[0].pageY);else{let e=.5*(j[0].pageX+j[1].pageX),t=.5*(j[0].pageY+j[1].pageY);S.set(e,t)}}function W(){let e=j[0].pageX-j[1].pageX,t=j[0].pageY-j[1].pageY,n=Math.sqrt(e*e+t*t);O.set(0,n)}function X(e){if(1==j.length)E.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);E.set(n,i)}w.subVectors(E,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(z(2*Math.PI*w.x/t.clientHeight),D(2*Math.PI*w.y/t.clientHeight)),y.copy(E)}function Z(e){if(1==j.length)x.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);x.set(n,i)}A.subVectors(x,S).multiplyScalar(n.panSpeed),N(A.x,A.y),S.copy(x)}function K(e){var t;let i=ei(e),o=e.pageX-i.x,r=e.pageY-i.y,a=Math.sqrt(o*o+r*r);L.set(0,a),_.set(0,Math.pow(L.y/O.y,n.zoomSpeed)),t=_.y,B(b/t),O.copy(L)}function q(e){var t,i,r;!1!==n.enabled&&(0===j.length&&(null==(t=n.domElement)||t.ownerDocument.addEventListener("pointermove",Q),null==(i=n.domElement)||i.ownerDocument.addEventListener("pointerup",J)),r=e,j.push(r),"touch"===e.pointerType?function(e){switch(en(e),j.length){case 1:switch(n.touches.ONE){case s.TOUCH.ROTATE:if(!1===n.enableRotate)return;Y(),l=a.TOUCH_ROTATE;break;case s.TOUCH.PAN:if(!1===n.enablePan)return;G(),l=a.TOUCH_PAN;break;default:l=a.NONE}break;case 2:switch(n.touches.TWO){case s.TOUCH.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&W(),n.enablePan&&G(),l=a.TOUCH_DOLLY_PAN;break;case s.TOUCH.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&W(),n.enableRotate&&Y(),l=a.TOUCH_DOLLY_ROTATE;break;default:l=a.NONE}break;default:l=a.NONE}l!==a.NONE&&n.dispatchEvent(o)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case s.MOUSE.DOLLY:if(!1===n.enableZoom)return;V(e),O.set(e.clientX,e.clientY),l=a.DOLLY;break;case s.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;F(e),l=a.PAN}else{if(!1===n.enableRotate)return;k(e),l=a.ROTATE}break;case s.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;k(e),l=a.ROTATE}else{if(!1===n.enablePan)return;F(e),l=a.PAN}break;default:l=a.NONE}l!==a.NONE&&n.dispatchEvent(o)}(e))}function Q(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(en(e),l){case a.TOUCH_ROTATE:if(!1===n.enableRotate)return;X(e),n.update();break;case a.TOUCH_PAN:if(!1===n.enablePan)return;Z(e),n.update();break;case a.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&K(e),n.enablePan&&Z(e),n.update();break;case a.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&K(e),n.enableRotate&&X(e),n.update();break;default:l=a.NONE}}(e):function(e){if(!1!==n.enabled)switch(l){case a.ROTATE:let t;if(!1===n.enableRotate)return;E.set(e.clientX,e.clientY),w.subVectors(E,y).multiplyScalar(n.rotateSpeed),(t=n.domElement)&&(z(2*Math.PI*w.x/t.clientHeight),D(2*Math.PI*w.y/t.clientHeight)),y.copy(E),n.update();break;case a.DOLLY:var i,o;if(!1===n.enableZoom)return;(L.set(e.clientX,e.clientY),_.subVectors(L,O),_.y>0)?(i=U(),B(b/i)):_.y<0&&(o=U(),B(b*o)),O.copy(L),n.update();break;case a.PAN:if(!1===n.enablePan)return;x.set(e.clientX,e.clientY),A.subVectors(x,S).multiplyScalar(n.panSpeed),N(A.x,A.y),S.copy(x),n.update()}}(e))}function J(e){var t,i,o;(function(e){delete C[e.pointerId];for(let t=0;t<j.length;t++)if(j[t].pointerId==e.pointerId)return void j.splice(t,1)})(e),0===j.length&&(null==(t=n.domElement)||t.releasePointerCapture(e.pointerId),null==(i=n.domElement)||i.ownerDocument.removeEventListener("pointermove",Q),null==(o=n.domElement)||o.ownerDocument.removeEventListener("pointerup",J)),n.dispatchEvent(r),l=a.NONE}function $(e){if(!1!==n.enabled&&!1!==n.enableZoom&&(l===a.NONE||l===a.ROTATE)){var t,i;e.preventDefault(),n.dispatchEvent(o),(V(e),e.deltaY<0)?(t=U(),B(b*t)):e.deltaY>0&&(i=U(),B(b/i)),n.update(),n.dispatchEvent(r)}}function ee(e){if(!1!==n.enabled&&!1!==n.enablePan){let t=!1;switch(e.code){case n.keys.UP:N(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:N(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:N(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:N(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}}function et(e){!1!==n.enabled&&e.preventDefault()}function en(e){let t=C[e.pointerId];void 0===t&&(t=new s.Vector2,C[e.pointerId]=t),t.set(e.pageX,e.pageY)}function ei(e){return C[(e.pointerId===j[0].pointerId?j[1]:j[0]).pointerId]}this.dollyIn=(e=U())=>{B(b*e),n.update()},this.dollyOut=(e=U())=>{B(b/e),n.update()},this.getScale=()=>b,this.setScale=e=>{B(e),n.update()},this.getZoomScale=()=>U(),void 0!==t&&this.connect(t),this.update()}}let b=a.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:s,enableDamping:l=!0,keyEvents:c=!1,onChange:d,onStart:u,onEnd:f,...p},h)=>{let m=(0,o.C)(e=>e.invalidate),b=(0,o.C)(e=>e.camera),g=(0,o.C)(e=>e.gl),y=(0,o.C)(e=>e.events),E=(0,o.C)(e=>e.setEvents),w=(0,o.C)(e=>e.set),S=(0,o.C)(e=>e.get),x=(0,o.C)(e=>e.performance),A=t||b,O=s||y.connected||g.domElement,L=a.useMemo(()=>new v(A),[A]);return(0,r.useFrame)(()=>{L.enabled&&L.update()},-1),a.useEffect(()=>(c&&L.connect(!0===c?O:c),L.connect(O),()=>void L.dispose()),[c,O,n,L,m]),a.useEffect(()=>{let e=e=>{m(),n&&x.regress(),d&&d(e)},t=e=>{u&&u(e)},i=e=>{f&&f(e)};return L.addEventListener("change",e),L.addEventListener("start",t),L.addEventListener("end",i),()=>{L.removeEventListener("start",t),L.removeEventListener("end",i),L.removeEventListener("change",e)}},[d,u,f,L,m,E]),a.useEffect(()=>{if(e){let e=S().controls;return w({controls:L}),()=>w({controls:e})}},[e,L]),a.createElement("primitive",i({ref:h,object:L,enableDamping:l},p))});e.s(["OrbitControls",0,b],98276);var g=e.i(78007);e.s(["AmbientParticles",0,({count:e=300})=>{let t=(0,a.useRef)(null),n=(0,a.useMemo)(()=>{let t=new Float32Array(3*e);for(let n=0;n<e;n++)t[3*n]=(Math.random()-.5)*40,t[3*n+1]=(Math.random()-.5)*20,t[3*n+2]=(Math.random()-.5)*40;return t},[e]);return(0,r.useFrame)((e,n)=>{t.current&&(t.current.rotation.y+=.03*n,t.current.rotation.x+=.01*n)}),(0,g.jsxs)("points",{ref:t,children:[(0,g.jsx)("bufferGeometry",{children:(0,g.jsx)("bufferAttribute",{attach:"attributes-position",args:[n,3]})}),(0,g.jsx)("pointsMaterial",{size:.08,color:"#FFB800",transparent:!0,opacity:.6,blending:s.AdditiveBlending})]})}],99487);var o=o,y=s,E=s;let w=new E.Box3,S=new E.Vector3;class x extends E.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new E.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new E.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new E.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new E.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new E.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new E.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new E.InterleavedBufferAttribute(i,t,0)),this.setAttribute("instanceColorEnd",new E.InterleavedBufferAttribute(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new E.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new E.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),w.setFromBufferAttribute(t),this.boundingBox.union(w))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new E.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let o=0,r=e.count;o<r;o++)S.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(S)),S.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(S));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var A=s,O=e.i(72819);let L=parseInt(s.REVISION.replace(/\D+/g,""));class _ extends A.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:A.UniformsUtils.clone(A.UniformsUtils.merge([O.UniformsLib.common,O.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new A.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${L>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let M=L>=125?"uv1":"uv2",P=new y.Vector4,T=new y.Vector3,j=new y.Vector3,C=new y.Vector4,U=new y.Vector4,z=new y.Vector4,D=new y.Vector3,I=new y.Matrix4,R=new y.Line3,N=new y.Vector3,B=new y.Box3,V=new y.Sphere,H=new y.Vector4;function k(e,t,i){return H.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),H.multiplyScalar(1/H.w),H.x=n/i.width,H.y=n/i.height,H.applyMatrix4(e.projectionMatrixInverse),H.multiplyScalar(1/H.w),Math.abs(Math.max(H.x,H.y))}class F extends y.Mesh{constructor(e=new x,t=new _({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,o=0,r=t.count;e<r;e++,o+=2)T.fromBufferAttribute(t,e),j.fromBufferAttribute(n,e),i[o]=0===o?0:i[o-1],i[o+1]=i[o]+T.distanceTo(j);let o=new y.InstancedInterleavedBuffer(i,2,1);return e.setAttribute("instanceDistanceStart",new y.InterleavedBufferAttribute(o,1,0)),e.setAttribute("instanceDistanceEnd",new y.InterleavedBufferAttribute(o,1,1)),this}raycast(e,i){let o,r,a=this.material.worldUnits,s=e.camera;null!==s||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let c=this.matrixWorld,d=this.geometry,u=this.material;if(n=u.linewidth+l,null===d.boundingSphere&&d.computeBoundingSphere(),V.copy(d.boundingSphere).applyMatrix4(c),a)o=.5*n;else{let e=Math.max(s.near,V.distanceToPoint(t.origin));o=k(s,e,u.resolution)}if(V.radius+=o,!1!==t.intersectsSphere(V)){if(null===d.boundingBox&&d.computeBoundingBox(),B.copy(d.boundingBox).applyMatrix4(c),a)r=.5*n;else{let e=Math.max(s.near,B.distanceToPoint(t.origin));r=k(s,e,u.resolution)}B.expandByScalar(r),!1!==t.intersectsBox(B)&&(a?function(e,i){let o=e.matrixWorld,r=e.geometry,a=r.attributes.instanceStart,s=r.attributes.instanceEnd,l=Math.min(r.instanceCount,a.count);for(let r=0;r<l;r++){R.start.fromBufferAttribute(a,r),R.end.fromBufferAttribute(s,r),R.applyMatrix4(o);let l=new y.Vector3,c=new y.Vector3;t.distanceSqToSegment(R.start,R.end,c,l),c.distanceTo(l)<.5*n&&i.push({point:c,pointOnLine:l,distance:t.origin.distanceTo(c),object:e,face:null,faceIndex:r,uv:null,[M]:null})}}(this,i):function(e,i,o){let r=i.projectionMatrix,a=e.material.resolution,s=e.matrixWorld,l=e.geometry,c=l.attributes.instanceStart,d=l.attributes.instanceEnd,u=Math.min(l.instanceCount,c.count),f=-i.near;t.at(1,z),z.w=1,z.applyMatrix4(i.matrixWorldInverse),z.applyMatrix4(r),z.multiplyScalar(1/z.w),z.x*=a.x/2,z.y*=a.y/2,z.z=0,D.copy(z),I.multiplyMatrices(i.matrixWorldInverse,s);for(let i=0;i<u;i++){if(C.fromBufferAttribute(c,i),U.fromBufferAttribute(d,i),C.w=1,U.w=1,C.applyMatrix4(I),U.applyMatrix4(I),C.z>f&&U.z>f)continue;if(C.z>f){let e=C.z-U.z,t=(C.z-f)/e;C.lerp(U,t)}else if(U.z>f){let e=U.z-C.z,t=(U.z-f)/e;U.lerp(C,t)}C.applyMatrix4(r),U.applyMatrix4(r),C.multiplyScalar(1/C.w),U.multiplyScalar(1/U.w),C.x*=a.x/2,C.y*=a.y/2,U.x*=a.x/2,U.y*=a.y/2,R.start.copy(C),R.start.z=0,R.end.copy(U),R.end.z=0;let l=R.closestPointToPointParameter(D,!0);R.at(l,N);let u=y.MathUtils.lerp(C.z,U.z,l),p=u>=-1&&u<=1,h=D.distanceTo(N)<.5*n;if(p&&h){R.start.fromBufferAttribute(c,i),R.end.fromBufferAttribute(d,i),R.start.applyMatrix4(s),R.end.applyMatrix4(s);let n=new y.Vector3,r=new y.Vector3;t.distanceSqToSegment(R.start,R.end,r,n),o.push({point:r,pointOnLine:n,distance:t.origin.distanceTo(r),object:e,face:null,faceIndex:i,uv:null,[M]:null})}}}(this,s,i))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(P),this.material.uniforms.resolution.value.set(P.z,P.w))}}class Y extends x{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let o=0;o<n;o+=t)i[2*o]=e[o],i[2*o+1]=e[o+1],i[2*o+2]=e[o+2],i[2*o+3]=e[o+3],i[2*o+4]=e[o+4],i[2*o+5]=e[o+5];else for(let o=0;o<n;o+=t)i[2*o]=e[o],i[2*o+1]=e[o+1],i[2*o+2]=e[o+2],i[2*o+3]=e[o+3],i[2*o+4]=e[o+4],i[2*o+5]=e[o+5],i[2*o+6]=e[o+6],i[2*o+7]=e[o+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class G extends F{constructor(e=new Y,t=new _({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let W=a.forwardRef(function({points:e,color:t=0xffffff,vertexColors:n,linewidth:r,lineWidth:l,segments:c,dashed:d,...u},f){var p,h;let m=(0,o.C)(e=>e.size),v=a.useMemo(()=>c?new F:new G,[c]),[b]=a.useState(()=>new _),g=(null==n||null==(p=n[0])?void 0:p.length)===4?4:3,y=a.useMemo(()=>{let i=c?new x:new Y,o=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Vector3||e instanceof s.Vector4?[e.x,e.y,e.z]:e instanceof s.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(i.setPositions(o.flat()),n){t=0xffffff;let e=n.map(e=>e instanceof s.Color?e.toArray():e);i.setColors(e.flat(),g)}return i},[e,c,n,g]);return a.useLayoutEffect(()=>{v.computeLineDistances()},[e,v]),a.useLayoutEffect(()=>{d?b.defines.USE_DASH="":delete b.defines.USE_DASH,b.needsUpdate=!0},[d,b]),a.useEffect(()=>()=>{y.dispose(),b.dispose()},[y]),a.createElement("primitive",i({object:v,ref:f},u),a.createElement("primitive",{object:y,attach:"geometry"}),a.createElement("primitive",i({object:b,attach:"material",color:t,vertexColors:!!n,resolution:[m.width,m.height],linewidth:null!=(h=null!=r?r:l)?h:1,dashed:d,transparent:4===g},u)))}),X=a.forwardRef(({threshold:e=15,geometry:t,...n},o)=>{let r=a.useRef(null);a.useImperativeHandle(o,()=>r.current,[]);let l=a.useMemo(()=>[0,0,0,1,0,0],[]),c=a.useRef(null),d=a.useRef(null);return a.useLayoutEffect(()=>{let n=r.current.parent,i=null!=t?t:null==n?void 0:n.geometry;if(!i||c.current===i&&d.current===e)return;c.current=i,d.current=e;let o=new s.EdgesGeometry(i,e).attributes.position.array;r.current.geometry.setPositions(o),r.current.geometry.attributes.instanceStart.needsUpdate=!0,r.current.geometry.attributes.instanceEnd.needsUpdate=!0,r.current.computeLineDistances()}),a.createElement(W,i({segments:!0,points:l,ref:r,raycast:()=>null},n))});e.s(["Edges",0,X],8682)}]);