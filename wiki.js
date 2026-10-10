'use strict';
function wikiLink(scene){return window.WIKI_LINKS?.scenes[scene.id]}
function setWikiAnchor(a,link,label){
  a.hidden=!link;
  if(!link){a.removeAttribute('href');return}
  a.href=link.url;a.target='_blank';a.rel='noopener noreferrer';
  a.textContent=label||(link.kind==='episode'?'关卡 Wiki ↗':'章节 Wiki ↗');
  a.title=label?'查看本章的灰机 Wiki':link.kind==='chapter'?'此片段未匹配独立页面，查看所属章节的灰机 Wiki':'查看此关卡的灰机 Wiki';
}
function syncWiki(scene){
  setWikiAnchor(document.querySelector('#scene-wiki'),wikiLink(scene));
  setWikiAnchor(document.querySelector('#chapter-wiki'),window.WIKI_LINKS?.chapters[scene.chapter],'本章灰机 Wiki ↗');
}
function addTimelineWiki(){
  const list=document.querySelector('#timeline-list');
  for(const [i,b] of [...list.children].entries()){
    const scene=episodes()[i],link=wikiLink(scene);if(!link)continue;
    const row=document.createElement('div');row.className='timeline-row';
    b.replaceWith(row);const a=document.createElement('a');setWikiAnchor(a,link);
    a.setAttribute('aria-label',scene.title+' · '+(link.kind==='episode'?'关卡':'章节')+'灰机 Wiki（新窗口）');
    row.append(b,a);
  }
}
