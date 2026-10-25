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
  const quizSets = [
    {id:'alphabet',title:'Tamil alphabet',items:[['Which group means “life letters”?',['Uyir','Mei','Uyirmei'],0],['Which letter is a mei consonant?',['ஆ','க்','கா'],1],['கா is an example of…',['Uyir','Mei','Uyirmei'],2],['Listen: choose the long “aa” sound',['அ','ஆ','இ'],1]],pairs:[['அ','a'],['க்','k'],['கா','kaa']],blank:'க் + அ = ___',answer:'க'},
    {id:'numbers',title:'Numbers 1–50',items:[['How do you say 2?',['ஒன்று · onru','இரண்டு · iraṇṭu','மூன்று · mūṉṟu'],1],['ஐம்பது (aimpatu) means…',['15','40','50'],2],['நான்கு (nāṉku) means…',['Four','Seven','Ten'],0],['Listen: choose “one”',['ஒன்று','இரண்டு','மூன்று'],0]],pairs:[['௧','one'],['௨','two'],['௩','three']],blank:'௫ represents the number ___',answer:'5'},
    {id:'greetings',title:'Greetings & introduction',items:[['வணக்கம் (vanakkam) means…',['Hello','Please','Good night'],0],['நன்றி (nandri) means…',['Welcome','Thank you','Yes'],1],['“My name is…” begins with…',['என் பெயர்','நான் போகிறேன்','நன்றி'],0],['Listen: choose “yes”',['இல்லை','ஆம்','வணக்கம்'],1]],pairs:[['வணக்கம்','hello'],['நன்றி','thank you'],['ஆம்','yes']],blank:'என் பெயர் = My ___ is',answer:'name'},
    {id:'family-colors',title:'Family & colors',items:[['அம்மா (ammā) means…',['Father','Mother','Sister'],1],['அப்பா (appā) means…',['Father','Brother','Grandmother'],0],['சிவப்பு (sivappu) is…',['Green','Blue','Red'],2],['Listen: choose “green”',['நீலம்','பச்சை','சிவப்பு'],1]],pairs:[['அம்மா','mother'],['அப்பா','father'],['பச்சை','green']],blank:'நீலம் (nīlam) means ___',answer:'blue'}
  ];
  const quizStoreKey = 'vasistraTamilQuizResults';
  function renderQuizSets() {
    const target = document.querySelector('#beginner-quizzes');
    if (!target) return;
    let results = {};
    try { results = JSON.parse(localStorage.getItem(quizStoreKey)) || {}; } catch { results = {}; }
    target.innerHTML = `<div class="quiz-library-heading"><div><p class="eyebrow">PRACTISE & PLAY</p><h2>Quick quizzes</h2><p>Try a few different ways to remember what you’ve learned.</p></div><span class="quiz-save-note">Scores saved on this device</span></div><div class="quiz-set-grid">${quizSets.map((set,i)=>`<article class="quiz-set-card"><div class="quiz-set-top"><span class="quiz-set-number">0${i+1}</span><span class="quiz-set-status">${results[set.id] ? `Best: ${results[set.id]}/8` : '8 questions'}</span></div><h3>${set.title}</h3><p>Choose, match, complete, and listen.</p><button class="button button-outline" data-open-quiz="${set.id}">${results[set.id] ? 'Practise again' : 'Start quiz'} →</button></article>`).join('')}</div><div id="active-quiz"></div>`;
    target.querySelectorAll('[data-open-quiz]').forEach(button => button.addEventListener('click', () => showQuiz(quizSets.find(set=>set.id===button.dataset.openQuiz))));
  }
  function showQuiz(set) {
    const host = document.querySelector('#active-quiz');
    let answers = Array(7).fill(null), matchChoices = set.pairs.map(pair=>pair[1]).sort(()=>Math.random()-.5), finished=false;
    const render = () => {
      host.innerHTML = `<div class="active-quiz-card"><div class="active-quiz-heading"><div><p class="mini-label">${set.title.toUpperCase()}</p><h3>Four ways to practise</h3></div><button class="quiz-close" aria-label="Close quiz">×</button></div><div class="quiz-step"><strong>1–4 · Choose an answer</strong>${set.items.map((item,i)=>`<fieldset class="quiz-question"><legend>${i===3?'🔊 Listen & choose · ':''}${item[0]} ${i===3?`<button type="button" class="speaker-button" data-speak="${item[1][item[2]]}" aria-label="Speak Tamil choice">🔊</button>`:''}</legend><div class="quiz-options">${item[1].map((option,j)=>`<button class="quiz-option ${answers[i]===j?'chosen':''}" data-q="${i}" data-a="${j}">${option}</button>`).join('')}</div></fieldset>`).join('')}</div><div class="quiz-step"><strong>5 · Match the following</strong><div class="match-grid">${set.pairs.map((pair,i)=>`<div class="match-row"><span class="match-prompt" lang="ta">${pair[0]} <button type="button" class="speaker-button" data-speak="${pair[0]}" aria-label="Speak Tamil word">🔊</button></span><select data-match="${i}" aria-label="Match ${pair[0]}"><option value="">Choose meaning…</option>${matchChoices.map(choice=>`<option ${answers[4+i]===choice?'selected':''}>${choice}</option>`).join('')}</select></div>`).join('')}</div></div><div class="quiz-step"><strong>6 · Fill in the blank</strong><label class="fill-question">${set.blank}<input data-fill type="text" value="${answers[7]||''}" placeholder="Your answer" autocomplete="off"></label></div><div class="quiz-result" aria-live="polite"></div><div class="quiz-actions"><button class="button button-primary" data-submit-quiz>Check my score</button><button class="button button-outline" data-retry-quiz hidden>Try again</button></div></div>`;
      host.querySelector('.quiz-close').addEventListener('click',()=>{host.innerHTML='';});
      host.querySelectorAll('[data-q]').forEach(button=>button.addEventListener('click',()=>{answers[Number(button.dataset.q)]=Number(button.dataset.a);render();}));
      host.querySelectorAll('[data-match]').forEach(select=>select.addEventListener('change',()=>{answers[4+Number(select.dataset.match)]=select.value;}));
      host.querySelector('[data-fill]').addEventListener('input',event=>{answers[7]=event.target.value;});
      host.querySelectorAll('.speaker-button').forEach(bindAudio);
      host.querySelector('[data-submit-quiz]').addEventListener('click',()=>{
        if(finished)return;
        if(answers.slice(0,4).some(value=>value===null)||set.pairs.some((_,i)=>!answers[4+i])||!answers[7]?.trim()){host.querySelector('.quiz-result').textContent='Answer each question, match the words, and fill in the blank to see your score.';return;}
        let score=0;set.items.forEach((item,i)=>{if(answers[i]===item[2])score++;});set.pairs.forEach((pair,i)=>{if(answers[4+i]===pair[1])score++;});if(String(answers[7]).trim().toLocaleLowerCase()===set.answer.toLocaleLowerCase())score++;
        let saved={};try{saved=JSON.parse(localStorage.getItem(quizStoreKey))||{};}catch{}saved[set.id]=Math.max(saved[set.id]||0,score);localStorage.setItem(quizStoreKey,JSON.stringify(saved));
        finished=true;host.querySelector('.quiz-result').innerHTML=`<strong>Your score: ${score}/8</strong> · ${score===8?'Perfect work!':'Nice practice—try again to improve your score.'}`;host.querySelector('[data-retry-quiz]').hidden=false;host.querySelector('[data-submit-quiz]').disabled=true;document.querySelector(`[data-open-quiz="${set.id}"]`).closest('.quiz-set-card').querySelector('.quiz-set-status').textContent=`Best: ${saved[set.id]}/8`;
      });
      host.querySelector('[data-retry-quiz]').addEventListener('click',()=>showQuiz(set));
    };
    render();host.scrollIntoView({behavior:'smooth',block:'start'});
  }
  let activeAudioButton = null;
  let activeUtterance = null;
  function showAudioToast(message) {
    let toast=document.querySelector('.audio-toast');
    if(!toast){toast=document.createElement('div');toast.className='audio-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.append(toast);}
    toast.textContent=message;
    clearTimeout(showAudioToast.timer);
    showAudioToast.timer=setTimeout(()=>{toast.textContent='';},2200);
  }
  function finishTamilAudio(button) {
    if(!button)return;
    button.disabled=false;
    button.classList.remove('audio-playing');
    button.innerHTML=button.dataset.originalLabel||'🔊';
    button.setAttribute('aria-label',`Speak Tamil: ${button.dataset.speak||'text'}`);
    if(activeAudioButton===button){activeAudioButton=null;activeUtterance=null;}
  }
  function playTamilAudio(text, button) {
    const cleanText=String(text||'').trim();
    if(!cleanText)return;
    if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){
      showAudioToast('Speech audio is not supported in this browser.');
      return;
    }
    if(activeAudioButton){const previous=activeAudioButton;speechSynthesis.cancel();finishTamilAudio(previous);}
    const voices=speechSynthesis.getVoices();
    const tamilVoice=voices.find(voice=>/^ta-IN$/i.test(voice.lang))||voices.find(voice=>/^ta(-|$)/i.test(voice.lang))||null;
    const utterance=new SpeechSynthesisUtterance(cleanText);
    if(tamilVoice){utterance.voice=tamilVoice;utterance.lang=tamilVoice.lang||'ta-IN';}
    else {
      const defaultVoice=voices.find(voice=>voice.default);
      if(defaultVoice){utterance.voice=defaultVoice;utterance.lang=defaultVoice.lang||'en-US';}
      else utterance.lang='ta-IN';
    }
    utterance.rate=0.82;
    utterance.onstart=()=>showAudioToast('Playing Tamil pronunciation…');
    utterance.onend=()=>finishTamilAudio(button);
    utterance.onerror=()=>{finishTamilAudio(button);showAudioToast('Could not play audio. Please try again.');};
    if(button){
      button.dataset.originalLabel=button.dataset.originalLabel||button.innerHTML;
      button.disabled=true;button.classList.add('audio-playing');button.innerHTML='<span class="speaker-playing">◌</span>';
      button.setAttribute('aria-label','Playing Tamil pronunciation');
      activeAudioButton=button;activeUtterance=utterance;
    }
    speechSynthesis.speak(utterance);
  }
  function bindAudio(button) {
    if(button.dataset.audioBound==='true')return;
    button.dataset.audioBound='true';
    if(!button.dataset.speak){
      const tamilContainer=button.closest('[lang="ta"]');
      const parent=button.closest('.story-card,.flashcard-wrap,.writing-card,.case-grid,.pair-examples');
      const source=tamilContainer||parent?.querySelector('.story-tamil,.flashcard-tamil,.flashcard-example,.dictation-prompt,.case-grid p,.pair-examples p');
      button.dataset.speak=(source?.textContent||'').replace(/🔊|◌/g,'').trim();
    }
    button.setAttribute('aria-label',`Speak Tamil: ${button.dataset.speak||'text'}`);
    button.addEventListener('click',()=>playTamilAudio(button.dataset.speak,button));
  }
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
  renderQuizSets();
  document.querySelectorAll('.audio-button,.speaker-button').forEach(bindAudio);
  const kurals = [
    {verse:'அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு',meaning:'As the letter A begins the alphabet, so the Eternal One is first in the world.',lesson:'Beginnings matter. Thiruvalluvar opens with the source from which all knowledge and life arise.',number:1},
    {verse:'அன்பிலார் எல்லாம் தமக்குரியர் அன்புடையார்\nஎன்பும் உரியர் பிறர்க்கு',meaning:'Those without love claim all for themselves; the loving consider even their bones to belong to others.',lesson:'Love expands our sense of responsibility: care reaches beyond the self.',number:72},
    {verse:'மனத்துக்கண் மாசிலன் ஆதல் அனைத்தறன்\nஆகுல நீர பிற',meaning:'To keep the mind free from stain is virtue; all else is empty display.',lesson:'Integrity begins within. A clear intention gives meaning to outward action.',number:34},
    {verse:'எண்ணென்ப ஏனை எழுத்தென்ப இவ்விரண்டும்\nகண்ணென்ப வாழும் உயிர்க்கு',meaning:'Number and letter are the two eyes of living beings.',lesson:'Numeracy and literacy help us see the world more fully and make thoughtful choices.',number:392},
    {verse:'கேடில் விழுச்செல்வம் கல்வி ஒருவற்கு\nமாடல்ல மற்றை யவை',meaning:'Learning is the lasting wealth a person can possess; other riches are not equal.',lesson:'Knowledge travels with us and keeps its value through changing circumstances.',number:400}
  ];
  const kuralContent=document.querySelector('#kural-content');
  if(kuralContent){let active=0;const renderKural=()=>{const k=kuralContent;document.querySelector('#kural-count').textContent=`${String(active+1).padStart(2,'0')} / ${String(kurals.length).padStart(2,'0')} · KURAL ${kurals[active].number}`;k.innerHTML=`<p class="kural-tamil" lang="ta">${kurals[active].verse.split('\n').map(line=>`${line} <button type="button" class="speaker-button" aria-label="Audio coming soon">🔊</button>`).join('<br>')}</p><div class="kural-translation"><span class="mini-label">MEANING</span><p>${kurals[active].meaning}</p></div><div class="kural-lesson"><span>✧</span><p><strong>A thought to carry</strong><br>${kurals[active].lesson}</p></div>`;k.querySelectorAll('.speaker-button').forEach(bindAudio);document.querySelectorAll('.kural-dot').forEach((dot,i)=>dot.classList.toggle('active',i===active));};document.querySelector('#kural-dots').innerHTML=kurals.map((_,i)=>`<button class="kural-dot ${i===active?'active':''}" aria-label="Kural ${i+1}" data-kural="${i}"></button>`).join('');document.querySelectorAll('.kural-dot').forEach(dot=>dot.addEventListener('click',()=>{active=Number(dot.dataset.kural);renderKural();}));document.querySelector('#kural-prev').addEventListener('click',()=>{active=(active+kurals.length-1)%kurals.length;renderKural();});document.querySelector('#kural-next').addEventListener('click',()=>{active=(active+1)%kurals.length;renderKural();});renderKural();}
  document.querySelectorAll('.reveal-words').forEach(button=>button.addEventListener('click',()=>{const words=button.parentElement.querySelector('.word-help');words.hidden=!words.hidden;button.innerHTML=words.hidden?'Show word help <span>＋</span>':'Hide word help <span>−</span>'; }));
  const dictationButton=document.querySelector('[data-reveal-dictation]');if(dictationButton)dictationButton.addEventListener('click',()=>{const model=document.querySelector('#dictation-model');model.hidden=!model.hidden;dictationButton.textContent=model.hidden?'Reveal model answer':'Hide model answer';});
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
    content.innerHTML = `<div class="lesson-card"><div class="lesson-meta"><span class="lesson-tag">${lesson.tag}</span><span class="lesson-index">LESSON ${String(current+1).padStart(2,'0')} / ${String(lessons.length).padStart(2,'0')}</span></div><h2>${lesson.title}</h2><p class="lesson-intro">${lesson.intro}</p><div class="objectives"><h3>By the end of this lesson, you can…</h3><ul>${lesson.objectives.map(o=>`<li>${o}</li>`).join('')}</ul></div><div class="lesson-divider"></div><div class="section-label-row"><div><p class="mini-label">LEARN & EXPLORE</p><h3>Say it, see it, remember it.</h3></div><button class="audio-button" type="button" data-speak="${lesson.cards[0][0]}" aria-label="Speak Tamil letter or word"><span>▶</span> Listen to the sounds</button></div><div class="flashcard-grid">${lesson.cards.map((card,i)=>`<div class="flashcard-wrap"><button class="flashcard" type="button" aria-pressed="false"><span class="flashcard-index">0${i+1}</span><span class="flashcard-tamil" lang="ta">${card[0]}</span><span class="flashcard-pronunciation">${card[1]}</span><span class="flashcard-example">${card[2]}</span><span class="flashcard-hint">Tap to flip</span></button><button class="speaker-button flashcard-audio" data-speak="${card[0]}" aria-label="Speak Tamil: ${card[0]}">🔊</button>${/[\u0B80-\u0BFF]/.test(card[2])?`<button class="speaker-button flashcard-example-audio" data-speak="${card[2].split(' · ')[0]}" aria-label="Speak Tamil example">🔊</button>`:''}</div>`).join('')}</div><p class="practice-note">${lesson.practice}</p><div class="quiz-box"><div class="quiz-heading"><span class="quiz-icon">?</span><div><p class="mini-label">QUICK CHECK</p><h3>${lesson.question}</h3></div></div><div class="quiz-options">${lesson.options.map((o,i)=>`<button class="quiz-option" data-option="${i}">${o}</button>`).join('')}</div><p class="quiz-feedback" aria-live="polite"></p></div><div class="lesson-actions"><button class="button button-outline" data-prev ${current===0?'disabled':''}>← Previous</button><button class="button ${isDone?'button-completed':'button-primary'}" data-complete>${isDone?'✓ Lesson completed':'Mark as complete'}</button><button class="button button-outline" data-next ${current===lessons.length-1?'disabled':''}>Next lesson →</button></div></div>`;
    content.querySelectorAll('.flashcard').forEach(card=>card.addEventListener('click',()=>{const flipped=card.classList.toggle('flipped');card.setAttribute('aria-pressed',String(flipped));card.querySelector('.flashcard-hint').textContent=flipped?'You’ve got this!':'Tap to flip';}));
    content.querySelectorAll('.quiz-option').forEach(option=>option.addEventListener('click',()=>{const correct=Number(option.dataset.option)===lesson.answer;content.querySelectorAll('.quiz-option').forEach(o=>{o.disabled=true;if(Number(o.dataset.option)===lesson.answer)o.classList.add('correct');});if(!correct)option.classList.add('incorrect');content.querySelector('.quiz-feedback').textContent=correct?'That’s right—well done!':'Not quite. The highlighted answer is the one to remember.';}));
    content.querySelector('[data-complete]').addEventListener('click',()=>{const data=read();data.beginner=Array.isArray(data.beginner)?data.beginner:[];if(!data.beginner.includes(current))data.beginner.push(current);write(data);render();});
    content.querySelector('[data-prev]').addEventListener('click',()=>{if(current>0){current--;render();window.scrollTo({top:0,behavior:'smooth'});}});
    content.querySelector('[data-next]').addEventListener('click',()=>{if(current<lessons.length-1){current++;render();window.scrollTo({top:0,behavior:'smooth'});}});
    const reveal=content.querySelector('.answer-reveal');if(reveal)reveal.addEventListener('click',()=>{reveal.textContent=reveal.dataset.answer;});
    content.querySelectorAll('.audio-button,.speaker-button').forEach(bindAudio);
  }
  render();
})();
