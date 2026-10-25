/* Shared navigation and local progress for Learn Tamil with Vasistra. */
(() => {
  const KEY = 'vasistraTamilProgress';
  const lessonTitles = ['Meet the vowels', 'Consonants & their sounds', 'Build with combined letters', 'Numbers & everyday words', 'Greetings & introductions'];
  const lessons = [
    {title:lessonTitles[0],tag:'SCRIPT · 8 MIN',objectives:['Recognize the 12 Tamil vowels.','Say three vowel sounds with confidence.'],intro:'Tamil vowels are called <b>uyir ezhuthukkal</b>—“life letters.” Each vowel has its own sound and can stand on its own.',cards:[['அ','a','அம்மா · amma · mother'],['ஆ','aa','ஆடு · aadu · goat'],['இ','i','இலை · ilai · leaf'],['ஈ','ii','ஈட்டி · eetti · spear']],question:'Which letter makes the long “aa” sound?',options:['அ','ஆ','இ'],answer:1,practice:'Try saying அ (a), then stretch the sound for ஆ (aa). Tamil vowel length can change a word’s meaning.'},
    {title:lessonTitles[1],tag:'SCRIPT · 10 MIN',objectives:['Learn the idea of a consonant in Tamil.','Recognize a few of the 18 mei letters.'],intro:'Tamil consonants are called <b>mei ezhuthukkal</b>—“body letters.” Their small dot marks a consonant sound without a vowel. Start with these familiar sounds.',cards:[['க்','k','கல் · kal · stone'],['ச்','ch','சங்கு · sangu · conch'],['ட்','ṭ','பட்டு · paṭṭu · silk'],['ம்','m','மரம் · maram · tree']],question:'Which letter is the “m” consonant?',options:['க்','ச்','ம்'],answer:2,practice:'Listen for the final sound in மரம் (maram). The dotted letter ம் gives the word its final “m”.'},
    {title:lessonTitles[2],tag:'SCRIPT · 9 MIN',objectives:['See how consonants and vowels combine.','Read three uyirmei examples.'],intro:'When a consonant joins a vowel, they form an <b>uyirmei ezhuthu</b>—a combined letter. For example, க் + அ becomes க (ka).',cards:[['க','ka','கடல் · kaṭal · sea'],['கா','kaa','காகம் · kaagam · crow'],['கி','ki','கிளி · kiḷi · parrot'],['கு','ku','குடம் · kuṭam · pot']],question:'What sound does கா make?',options:['ka','kaa','ki'],answer:1,practice:'Spot the small vowel marks: க (ka), கா (kaa), கி (ki). A change in the mark changes the sound.'},
    {title:lessonTitles[3],tag:'VOCABULARY · 8 MIN',objectives:['Read your first Tamil numbers.','Learn useful everyday words for people and things.'],intro:'Let’s start counting. Tamil numbers have their own written forms; you’ll also see a familiar transliteration to help you pronounce them.',cards:[['௧','onru','ஒன்று · one'],['௨','iraṇṭu','இரண்டு · two'],['௩','munṟu','மூன்று · three'],['௪','nāṉku','நான்கு · four']],question:'How do you say “two” in Tamil?',options:['ஒன்று · onru','இரண்டு · iraṇṭu','மூன்று · munṟu'],answer:1,practice:'Everyday word: வீடு (veedu) means “home.” Which number is shown here? <span lang="ta" class="practice-tamil">௩</span> <button class="answer-reveal" data-answer="மூன்று · munṟu · three">Reveal answer</button>'},
    {title:lessonTitles[4],tag:'SPEAKING · 7 MIN',objectives:['Use a warm everyday greeting.','Introduce yourself with a simple sentence.'],intro:'A friendly <b>வணக்கம் (vanakkam)</b> works as hello or goodbye. Add your name to introduce yourself: <b>என் பெயர் … (en peyar …)</b> means “My name is …”',cards:[['வணக்கம்','vanakkam','Hello / greetings'],['நன்றி','nandri','Thank you'],['ஆம்','aam','Yes'],['இல்லை','illai','No']],question:'What does நன்றி (nandri) mean?',options:['Hello','Thank you','Goodbye'],answer:1,practice:'Complete the introduction: என் பெயர் ___ (en peyar ___) = My name is ___. Say it aloud with your own name.'}
  ];
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const write = value => localStorage.setItem(KEY, JSON.stringify(value));
  const completed = () => read().beginner || [];
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const progressMarkup = () => {
    const done = completed().length, percent = Math.round(done / lessons.length * 100);
    return `<div class="summary-copy"><span class="summary-number">${done}<small> / ${lessons.length}</small></span><span>lessons complete</span></div><div class="progress-track"><span style="width:${percent}%"></span></div><div class="summary-percent">${percent}% of the beginner level</div>`;
  };
  const homeProgress = document.querySelector('#home-progress');
  if (homeProgress) {
    const done = completed().length, percent = Math.round(done / lessons.length * 100);
    const completedLessons = completed();
    const nextLesson = lessons.findIndex((_, index) => !completedLessons.includes(index));
    const lessonHref = `beginner.html?lesson=${nextLesson < 0 ? 0 : nextLesson}`;
    homeProgress.innerHTML = `<div class="home-progress-top"><div><span class="mini-label">BEGINNER LEVEL</span><h3>${done ? 'Welcome back to your journey.' : 'Your first lesson is ready.'}</h3></div><span class="home-progress-percent">${percent}%</span></div><div class="progress-track"><span style="width:${percent}%"></span></div><div class="home-progress-bottom"><span>${done} of ${lessons.length} lessons complete</span><a class="text-link" href="${lessonHref}">${done ? 'Continue learning' : 'Start learning'} <span>→</span></a></div>`;
  }
  const menuButton = document.querySelector('.menu-toggle');
  if (menuButton) menuButton.addEventListener('click', () => { const expanded = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!expanded)); document.querySelector('#main-menu').classList.toggle('menu-open', !expanded); });
  const list = document.querySelector('#lesson-list'), content = document.querySelector('#lesson-content');
  if (!list || !content) return;
  let current = Math.max(0, Math.min(lessons.length - 1, Number(new URLSearchParams(location.search).get('lesson') || 0)));
  function renderList() {
    const done = completed();
    list.innerHTML = lessons.map((lesson,i) => `<button class="lesson-list-item ${i===current?'selected':''}" data-lesson="${i}"><span class="lesson-list-number">${done.includes(i)?'✓':String(i+1).padStart(2,'0')}</span><span class="lesson-list-title">${escapeHTML(lesson.title)}</span><span class="lesson-list-arrow">${i===current?'→':''}</span></button>`).join('');
    list.querySelectorAll('[data-lesson]').forEach(button => button.addEventListener('click', () => { current=Number(button.dataset.lesson); render(); }));
    document.querySelector('#beginner-summary').innerHTML = progressMarkup();
  }
  function render() {
    const lesson=lessons[current], done=completed(), isDone=done.includes(current);
    renderList();
    content.innerHTML = `<div class="lesson-card"><div class="lesson-meta"><span class="lesson-tag">${lesson.tag}</span><span class="lesson-index">LESSON ${String(current+1).padStart(2,'0')} / ${String(lessons.length).padStart(2,'0')}</span></div><h2>${lesson.title}</h2><p class="lesson-intro">${lesson.intro}</p><div class="objectives"><h3>By the end of this lesson, you can…</h3><ul>${lesson.objectives.map(o=>`<li>${o}</li>`).join('')}</ul></div><div class="lesson-divider"></div><div class="section-label-row"><div><p class="mini-label">LEARN & EXPLORE</p><h3>Say it, see it, remember it.</h3></div><button class="audio-button" type="button" aria-label="Audio pronunciation placeholder"><span>▶</span> Listen to the sounds</button></div><div class="flashcard-grid">${lesson.cards.map((card,i)=>`<button class="flashcard" type="button" aria-pressed="false"><span class="flashcard-index">0${i+1}</span><span class="flashcard-tamil" lang="ta">${card[0]}</span><span class="flashcard-pronunciation">${card[1]}</span><span class="flashcard-example" lang="ta">${card[2]}</span><span class="flashcard-hint">Tap to flip</span></button>`).join('')}</div><p class="practice-note">${lesson.practice}</p><div class="quiz-box"><div class="quiz-heading"><span class="quiz-icon">?</span><div><p class="mini-label">QUICK CHECK</p><h3>${lesson.question}</h3></div></div><div class="quiz-options">${lesson.options.map((o,i)=>`<button class="quiz-option" data-option="${i}">${o}</button>`).join('')}</div><p class="quiz-feedback" aria-live="polite"></p></div><div class="lesson-actions"><button class="button button-outline" data-prev ${current===0?'disabled':''}>← Previous</button><button class="button ${isDone?'button-completed':'button-primary'}" data-complete>${isDone?'✓ Lesson completed':'Mark as complete'}</button><button class="button button-outline" data-next ${current===lessons.length-1?'disabled':''}>Next lesson →</button></div></div>`;
    content.querySelectorAll('.flashcard').forEach(card=>card.addEventListener('click',()=>{const flipped=card.classList.toggle('flipped');card.setAttribute('aria-pressed',String(flipped));card.querySelector('.flashcard-hint').textContent=flipped?'You’ve got this!':'Tap to flip';}));
    content.querySelectorAll('.quiz-option').forEach(option=>option.addEventListener('click',()=>{const correct=Number(option.dataset.option)===lesson.answer;content.querySelectorAll('.quiz-option').forEach(o=>{o.disabled=true;if(Number(o.dataset.option)===lesson.answer)o.classList.add('correct');});if(!correct)option.classList.add('incorrect');content.querySelector('.quiz-feedback').textContent=correct?'That’s right—well done!':'Not quite. The highlighted answer is the one to remember.';}));
    content.querySelector('[data-complete]').addEventListener('click',()=>{const data=read();data.beginner=Array.isArray(data.beginner)?data.beginner:[];if(!data.beginner.includes(current))data.beginner.push(current);write(data);render();});
    content.querySelector('[data-prev]').addEventListener('click',()=>{if(current>0){current--;render();window.scrollTo({top:0,behavior:'smooth'});}});
    content.querySelector('[data-next]').addEventListener('click',()=>{if(current<lessons.length-1){current++;render();window.scrollTo({top:0,behavior:'smooth'});}});
    const reveal=content.querySelector('.answer-reveal');if(reveal)reveal.addEventListener('click',()=>{reveal.textContent=reveal.dataset.answer;});
  }
  render();
})();
