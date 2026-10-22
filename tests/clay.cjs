const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const section=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b,html.indexOf(a)));
const ctx=vm.createContext({Math,performance:{now:()=>1000}});
vm.runInContext(section('const MATS =','const HAIR_COLORS')+`
const M=()=>MATS.clay, NV=6, minY=-1,midY=0,halfH=1;
const rest=new Float32Array([0,1,0,0,-1,0,-1,0,0,1,0,0,0,0,1,0,0,-1]);
const pos=rest.slice(),baseN=rest.slice(),vel=new Float32Array(18);
const pointers=new Map(),ghosts=[],fingers=[],ph=[0,0,0];
const body={x:0,y:0,vy:0,held:null},P={},geo={computeVertexNormals(){}};
const stepFingers=()=>{},fixSeams=()=>{};
let g=0,gv=0,awake=60,clayBakeIn=0,squeezing=false,sqT=30,pinch=null;
`+section('function bakeClay(){',"const sq=$('squeeze');")+
section('function step(acc){','const FIXED_MS='),ctx);
const run=code=>vm.runInContext(code,ctx);
// Repeated releases at rest must not bake another layer of gravity compression.
run('for(let cycle=0;cycle<30;cycle++){ awake=60;for(let n=0;n<60;n++)step([0,0,0]);bakeClay(); }');
assert.ok(Math.abs(run('rest[1]-rest[4]')-2)<1e-5,'Idle releases cumulatively flatten clay');
// A side press is retained, while overall height survives repeated shaping.
run(`for(let cycle=0;cycle<12;cycle++){
  fingers.push({w:new Float32Array([0,0,0,0,1,0]),n:[0,0,1],pull:[0,0,0],press:M().press});
  squeezing=true;awake=60;for(let n=0;n<20;n++)step([0,0,0]);
  squeezing=false;bakeClay();
}`);
assert.ok(run('rest[14]')<.9,'Clay did not retain the local dent');
assert.ok(run('rest[1]-rest[4]')>=1.98 && run('rest[1]-rest[4]')<2.12,'Side shaping caused excessive whole-body height change');
assert.equal(run('fingers.length+ghosts.length'),0,'Released forces remain after baking');
const saved=run('Array.from(rest)');run('for(let n=0;n<120;n++)step([0,0,0]);');
assert.ok(run('Array.from(pos)').every((v,i)=>Math.abs(v-saved[i])<1e-5),'Baked clay continues deforming after release');
console.log('PASS: 30 idle releases and 12 side-shaping cycles retain height; local dents persist without post-release creep.');
