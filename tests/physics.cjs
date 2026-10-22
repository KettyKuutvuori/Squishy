// Run with node tests/physics.cjs. Uses the production integrator, no dependencies.
const fs=require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const section=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b,html.indexOf(a)));
function simulation(material,hz){
  const context=vm.createContext({Math,performance:{now:()=>0}});
  vm.runInContext(section('const MATS =','const HAIR_COLORS')+`
    const M=()=>MATS['${material}'];
    const body={x:0,y:1.5,vx:.04,vy:0,pvx:0,pvy:0,held:null};
    let gv=0,rotY=0,rotV=0,awake=0,clayBakeIn=0,spin=null,ticks=0;
    const xLim=10,yLim=10,thud=()=>{},haptic=()=>{};
    const group={rotation:{},position:{set(){}},updateMatrixWorld(){}};
    const key={position:{set(){}},target:{position:{set(){}}}};
    const step=()=>ticks++,updateHair=()=>{},renderContactShadow=()=>{},
      renderer={render(){}},scene={},camera={},requestAnimationFrame=()=>{};
  `+section('const GRAV=','/* Hold to squeeze:')+
  section('const FIXED_MS=','document.addEventListener(\'visibilitychange\''),context);
  // Start a common clock, then deliver the same duration at different refresh rates.
  vm.runInContext('lastFrame=0; accumulator=0;',context);
  for(let i=1;i<=hz*4;i++) vm.runInContext(`frame(${i*1000/hz+1e-7})`,context);
  return vm.runInContext('({x:body.x,y:body.y,vy:body.vy,ticks})',context);
}
for(const mat of ['squishy','foam','plastic','clay']){
  const expected=simulation(mat,60);
  for(const hz of [30,120,144]){
    const actual=simulation(mat,hz);
    assert.equal(actual.ticks,240);
    for(const k of ['x','y','vy']) assert.ok(Math.abs(actual[k]-expected[k])<1e-9,`${mat}: ${k} differs at ${hz}Hz`);
  }
  assert.ok(expected.y>=0 && expected.y<.01,`${mat} did not settle`);
}
assert.ok(simulation('plastic',60).x>simulation('foam',60).x,'Bouncy should slide further than foam');
console.log('PASS: 30/60/120/144Hz produce identical landings; all materials settle; friction differs.');
