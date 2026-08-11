const root = document.getElementById('root');

function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{ if(k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v); else if(k==='html') e.innerHTML = v; else e.setAttribute(k,v); });
  children.flat().forEach(c=>{ e.append(typeof c === 'string' ? document.createTextNode(c) : c) });
  return e;
}

function createOption(symbol){
  return el('button',{class:'btn', type:'button', onclick: ()=> handlePick(symbol)}, symbol);
}

let score = { me: 0, comp: 0 };

function getComputer(){
  const opts = ['Piedra','Papel','Tijera'];
  return opts[Math.floor(Math.random()*opts.length)];
}

function decide(a,b){
  if(a===b) return 'Empate';
  if((a==='Piedra' && b==='Tijera') || (a==='Papel' && b==='Piedra') || (a==='Tijera' && b==='Papel')) return 'Ganas';
  return 'Pierdes';
}

function handlePick(choice){
  const comp = getComputer();
  const res = decide(choice, comp);
  if(res==='Ganas') score.me++;
  else if(res==='Pierdes') score.comp++;
  renderResult(choice, comp, res);
  updateScore();
}

function updateScore(){
  const sMe = root.querySelector('#score-me');
  const sComp = root.querySelector('#score-comp');
  if(sMe) sMe.textContent = String(score.me);
  if(sComp) sComp.textContent = String(score.comp);
}

function renderResult(me, comp, res){
  const r = root.querySelector('.result');
  if(!r) return;
  r.textContent = `${res} — Tú: ${me} · CPU: ${comp}`;
}

function reset(){ score = {me:0, comp:0}; updateScore(); renderResult('-','-','Nuevo juego'); }

function render(){
  root.innerHTML = '';
  const card = el('div',{class:'card'},
    el('div',{class:'header'}, el('h1',{},'Piedra · Papel · Tijera'), el('div',{class:'score'}, el('div',{},'Yo: ', el('strong',{id:'score-me'},'0')), el('div',{},'CPU: ', el('strong',{id:'score-comp'},'0')))),
    el('div',{class:'board'}, createOption('Piedra'), createOption('Papel'), createOption('Tijera')),
    el('div',{class:'controls'}, el('button',{class:'btn', type:'button', onclick: reset}, 'Nueva partida')),
    el('div',{class:'result'}, 'Juega seleccionando una opción')
  );
  root.append(card);
}

render();
