// Run after changing the model manifests/weights: node scripts/bundle-file-models.cjs
const fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'../models'),models={};
for(const name of ['tiny_face_detector_model','face_landmark_68_model']){
  models[name]={manifest:JSON.parse(fs.readFileSync(path.join(dir,name+'-weights_manifest.json'),'utf8')),
    weights:fs.readFileSync(path.join(dir,name+'.b64.txt'),'utf8').trim()};
}
fs.writeFileSync(path.join(dir,'file-preview-models.js'),
  '// Same bundled face-api weights, packaged for browsers that block file:// fetch.\nwindow.SQUISHY_MODELS='+JSON.stringify(models)+';\n');
