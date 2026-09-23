(function(){
  var tip=document.getElementById('tip');
  function showTip(e,h){tip.innerHTML=h;tip.style.opacity=1;moveTip(e);}
  function moveTip(e){var x=e.clientX+14,y=e.clientY+14,w=tip.offsetWidth,h=tip.offsetHeight;
    if(x+w>innerWidth-8)x=e.clientX-w-14; if(y+h>innerHeight-8)y=e.clientY-h-14; tip.style.left=x+'px';tip.style.top=y+'px';}
  function hideTip(){tip.style.opacity=0;}
  function fmt(v,d){return v.toLocaleString(LOCALE,{minimumFractionDigits:d||0,maximumFractionDigits:d||0});}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function bind(root,sel){root.querySelectorAll(sel).forEach(function(b){
    b.addEventListener('mouseenter',function(e){showTip(e,b.getAttribute('data-t'));});
    b.addEventListener('mousemove',moveTip); b.addEventListener('mouseleave',hideTip);});}
  function dataTable(head,rows){
    var h='<details class="data"><summary>'+esc(C.ver_tabela)+'</summary><div class="tblwrap"><table><thead><tr>'+head.map(function(x,i){return '<th'+(i?' class="n"':'')+'>'+esc(x)+'</th>';}).join('')+'</tr></thead><tbody>';
    rows.forEach(function(r){h+='<tr>'+r.map(function(x,i){return '<td'+(i?' class="n"':'')+'>'+esc(x)+'</td>';}).join('')+'</tr>';});
    return h+'</tbody></table></div></details>';
  }
  // barras horizontais: series [{name,color}], rows [{label, values[], hl}]
  function hbar(id,o){
    var el=document.getElementById(id), multi=o.series.length>1;
    var h='<div class="ct">'+esc(o.title)+'</div><div class="cs">'+esc(o.sub)+'</div>';
    if(multi) h+='<div class="legend">'+o.series.map(function(s){return '<span><i style="background:'+s.color+'"></i>'+esc(s.name)+'</span>';}).join('')+'</div>';
    h+='<div class="hb'+(multi?'':' single')+'">';
    o.rows.forEach(function(r){
      h+='<div class="row"><div class="lab">'+(r.hl?'<b>'+esc(r.label)+'</b>':esc(r.label))+'</div><div class="bars">';
      r.values.forEach(function(v,i){
        var col=multi?o.series[i].color:(r.hl?'var(--s1)':'var(--neutral)');
        var nm=multi?o.series[i].name+' · '+r.label:r.label;
        h+='<div class="bar" data-t="'+esc(nm)+'<br><b>'+esc(o.fmt(v))+'</b>"><div class="fill" style="width:'+Math.max(0.4,v/o.max*86)+'%;background:'+col+'"></div><span class="val">'+esc(o.fmt(v))+'</span></div>';
      });
      h+='</div></div>';
    });
    h+='</div><p class="src">'+esc(o.src)+'</p>';
    h+=dataTable([C.item].concat(multi?o.series.map(function(s){return s.name;}):[o.col]),o.rows.map(function(r){return [r.label].concat(r.values.map(o.fmt));}));
    el.innerHTML=h; bind(el,'.bar[data-t]');
  }
  var usd=function(v){return 'US$ '+fmt(v,v<1?2:0);};
  var num=function(v){return fmt(v);};
  var pct=function(v){return fmt(v,1)+'%';};

  hbar('c-preco-out',{title:C.p_out_t,sub:C.p_out_s,max:50,fmt:usd,col:C.col_usd,series:[{name:''}],src:C.src_pr,
    rows:[{label:'Fable 5.1',values:[50]},{label:'Opus 5',values:[25]},{label:'Opus 4.8',values:[25]},{label:'Opus 5.5',values:[20],hl:true},{label:'Sonnet 5',values:[10]},{label:'Haiku 4.5',values:[5]}]});
  hbar('c-preco-cache',{title:C.p_cache_t,sub:C.p_cache_s,max:0.5,fmt:function(v){return 'US$ '+fmt(v,2);},col:C.col_usd,series:[{name:''}],src:C.src_pr,
    rows:[{label:'Opus 5',values:[0.5]},{label:'Opus 4.8',values:[0.5]},{label:'Fable 5.1',values:[0.25]},{label:'Opus 5.5',values:[0.2],hl:true},{label:'Sonnet 5',values:[0.2]},{label:'Haiku 4.5',values:[0.1]}]});
  hbar('c-bench',{title:C.b_t,sub:C.b_s,max:100,fmt:pct,src:C.b_src,
    series:[{name:'Opus 5.5',color:'var(--s1)'},{name:'Opus 5',color:'var(--s2)'},{name:'Fable 5.1',color:'var(--s3)'}],
    rows:[
      {label:'SWE-bench Pro',values:[89.9,79.2,81.2]},
      {label:'SWE-bench Multilingual',values:[93.9,89.5,89.1]},
      {label:'SWE-bench Multimodal',values:[61.4,59.4,54.7]},
      {label:'Terminal-Bench 4.0',values:[66.4,52.3,55.8]},
      {label:'Terminal-Bench-Science',values:[58.7,29.0,52.6]},
      {label:'FrontierCode v1.1',values:[54.4,48.0,50.3]},
      {label:C.hle,values:[67.7,63.6,65.6]},
      {label:'OSWorld 2.0 (partial)',values:[81.8,74.0,80.7]},
      {label:'HealthBench Professional',values:[65.6,59.8,62.1]},
      {label:'AutomationBench',values:[40.0,26.9,31.4]}]});
  hbar('c-aa',{title:C.aa_t,sub:C.aa_s,max:60,fmt:num,col:C.col_idx,series:[{name:''}],src:C.aa_src,
    rows:[
      {label:'Claude Opus 5.5 (max)',values:[58],hl:true},
      {label:'Claude Opus 5.5 (high)',values:[54],hl:true},
      {label:'Claude Fable 5.1 (max)',values:[53]},
      {label:'GPT-6 Astra (max)',values:[53]},
      {label:'Claude Opus 5.5 (medium)',values:[51],hl:true},
      {label:'Claude Opus 5 (max)',values:[51]},
      {label:'GPT-6 Sol (max)',values:[48]},
      {label:'Muse Spark 1.3 (max)',values:[48]},
      {label:'Grok 4.7 (xhigh)',values:[46]},
      {label:'Gemini 3.8 Flash (high)',values:[41]},
      {label:'Claude Sonnet 5 (max)',values:[38]}]});
  hbar('c-inv',{title:C.inv_t,sub:C.inv_s,max:30,fmt:num,col:C.col_pts,series:[{name:''}],src:C.inv_src,
    rows:[
      {label:'alias sonnet',values:[27]},
      {label:'claude-opus-4-6',values:[20]},
      {label:'claude-opus-5',values:[12]},
      {label:'claude-haiku-4-5',values:[8]},
      {label:'claude-sonnet-4-6',values:[6]},
      {label:'claude-opus-4-8',values:[5]},
      {label:'claude-fable-5',values:[5]},
      {label:'claude-sonnet-5',values:[4]},
      {label:'claude-sonnet-4-5',values:[3]},
      {label:C.alias_opus,values:[2],hl:true},
      {label:'claude-opus-4-5',values:[1]},
      {label:'claude-opus-5-5',values:[0],hl:true}]});

  // dispersão effort × custo
  (function(){
    var el=document.getElementById('c-effort');
    var line=[{e:'low',c:0.55,i:42},{e:'medium',c:1.34,i:51},{e:'high',c:1.82,i:54},{e:'xhigh',c:3.46,i:56},{e:'max',c:5.98,i:58}];
    var others=[{n:'Fable 5.1 (max)',c:7.63,i:53},{n:'GPT-6 Astra (max)',c:3.26,i:53},{n:'Opus 5 (max)',c:5.86,i:51},{n:'GPT-6 Sol (max)',c:1.06,i:48},{n:'Sonnet 5 (max)',c:5.09,i:38}];
    var W=640,H=320,L=44,R=16,T=14,B=38,xm=8,y0=35,y1=60;
    function X(c){return L+(c/xm)*(W-L-R);} function Y(i){return T+(1-(i-y0)/(y1-y0))*(H-T-B);}
    var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="'+esc(C.e_aria)+'">';
    [35,40,45,50,55,60].forEach(function(v){s+='<line class="axis" x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke-width="1"/><text x="'+(L-8)+'" y="'+(Y(v)+4)+'" text-anchor="end">'+v+'</text>';});
    [0,2,4,6,8].forEach(function(v){s+='<text x="'+X(v)+'" y="'+(H-B+18)+'" text-anchor="middle">US$ '+v+'</text>';});
    s+='<text x="'+((L+W-R)/2)+'" y="'+(H-4)+'" text-anchor="middle">'+esc(C.e_x)+'</text>';
    s+='<polyline fill="none" stroke="var(--s1)" stroke-width="2" points="'+line.map(function(p){return X(p.c)+','+Y(p.i);}).join(' ')+'"/>';
    others.forEach(function(p){var edge=p.c>6.5;
      s+='<circle class="pt" data-r="5" cx="'+X(p.c)+'" cy="'+Y(p.i)+'" r="5" fill="var(--s2)" stroke="var(--card)" stroke-width="2" data-t="'+esc(p.n)+'<br>'+esc(C.idx)+' <b>'+p.i+'</b> · US$ '+fmt(p.c,2)+esc(C.por_tarefa)+'"/>'
        +'<text x="'+(X(p.c)+(edge?-8:8))+'" y="'+(Y(p.i)-7)+'"'+(edge?' text-anchor="end"':'')+'>'+esc(p.n)+'</text>';});
    line.forEach(function(p){
      s+='<circle class="pt" data-r="5.5" cx="'+X(p.c)+'" cy="'+Y(p.i)+'" r="5.5" fill="var(--s1)" stroke="var(--card)" stroke-width="2" data-t="Opus 5.5 ('+p.e+')<br>'+esc(C.idx)+' <b>'+p.i+'</b> · US$ '+fmt(p.c,2)+esc(C.por_tarefa)+'"/>'
        +'<text x="'+(X(p.c)-7)+'" y="'+(Y(p.i)-9)+'" text-anchor="end">'+p.e+'</text>';});
    s+='</svg>';
    el.innerHTML='<div class="ct">'+esc(C.e_t)+'</div><div class="cs">'+esc(C.e_s)+'</div>'
      +'<div class="legend"><span><i style="background:var(--s1)"></i>'+esc(C.e_leg1)+'</span><span><i style="background:var(--s2);border-radius:50%"></i>'+esc(C.e_leg2)+'</span></div>'
      +s+'<p class="src">'+esc(C.e_src)+'</p>'
      +dataTable([C.e_col1,C.idx,C.e_col3],line.map(function(p){return ['Opus 5.5 ('+p.e+')',p.i,fmt(p.c,2)];}).concat(others.map(function(p){return [p.n,p.i,fmt(p.c,2)];})));
    el.querySelectorAll('.pt').forEach(function(c){
      c.addEventListener('mouseenter',function(e){showTip(e,c.getAttribute('data-t'));c.setAttribute('r',8);});
      c.addEventListener('mousemove',moveTip);
      c.addEventListener('mouseleave',function(){hideTip();c.setAttribute('r',c.getAttribute('data-r'));});
    });
  })();
})();
