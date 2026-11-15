const routes = {
  dashboard: {label:'Pulpit', icon:'⌂', group:'Praca'},
  people: {label:'Użytkownicy', icon:'◎', group:'Zarządzanie'},
  form: {label:'Formularz', icon:'＋', group:'Zarządzanie'},
  employee: {label:'Employee', icon:'◇', group:'Akademia'},
  studio: {label:'Studio', icon:'▣', group:'Narzędzia'},
  components: {label:'Komponenty', icon:'◫', group:'Narzędzia'},
};

const themes = {
  hospromise: 'hospromise.',
  puro: 'PURO · demo',
  arche: 'Arche · demo',
  dark: 'Dark · accessibility',
};

const people = [
  ['AK','Anna Kowalska','anna.kowalska@example.test','Manager','F&B','Aktywny','success'],
  ['MN','Marek Nowak','marek.nowak@example.test','Employee','Recepcja','W trakcie','warning'],
  ['ZL','Zofia Lewandowska','zofia.lewandowska@example.test','GM','Hotel Centrum','Aktywny','success'],
  ['PW','Piotr Wiśniewski','piotr.wisniewski@example.test','Employee','Housekeeping','Zaproszony','info'],
  ['KS','Karolina Szymańska','karolina.szymanska@example.test','Manager','SPA','Nieaktywny','danger'],
];

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function button(label, variant='secondary', attrs='') {
  return `<button class="button button--${variant}" ${attrs}>${label}</button>`;
}

function pageHeader(eyebrow, title, description, actions='') {
  return `<header class="page-header"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div>${actions ? `<div class="page-header__actions">${actions}</div>` : ''}</header>`;
}

function shell(content, active) {
  const groups = [...new Set(Object.values(routes).map(route => route.group))];
  const navigation = groups.map(group => `<div class="side-nav__label">${group}</div>${Object.entries(routes).filter(([,route]) => route.group === group).map(([key,route]) => `<a href="#/${key}" ${active===key?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${route.icon}</span>${route.label}</a>`).join('')}`).join('');
  const options = Object.entries(themes).map(([key,label]) => `<option value="${key}">${label}</option>`).join('');
  return `<div class="app-shell">
    <aside class="sidebar" aria-label="Nawigacja główna">
      <a class="brand" href="#/dashboard"><span class="brand__mark">h.</span><span>hospromise.<small>Design System prototype</small></span></a>
      <nav class="side-nav">${navigation}</nav>
      <div class="sidebar__profile"><span class="avatar">MK</span><div><strong>Monika Krawiec</strong><span>AM · Baltic Hotels</span></div></div>
    </aside>
    <div class="workspace">
      <header class="topbar">
        <div class="cluster"><button class="icon-button mobile-menu" data-menu aria-label="Otwórz menu">☰</button><div class="topbar__context"><span>Organizacja</span><strong>Baltic Hotels</strong></div></div>
        <div class="topbar__actions"><label class="sr-only" for="theme-switcher">Motyw organizacji</label><select class="theme-select" id="theme-switcher">${options}</select><button class="icon-button" aria-label="Powiadomienia">◌</button><button class="icon-button" aria-label="Wiadomości">□</button></div>
      </header>
      <main class="main" id="main" tabindex="-1">${content}</main>
    </div>
  </div>`;
}

function dashboard() {
  const kpis = [['Obiekty','12','+2 w tym roku'],['Pracownicy','284','+8% vs. poprzedni miesiąc'],['Ukończenie szkoleń','86%','+4,2 pp'],['Wymaga uwagi','9','3 pilne']];
  return pageHeader('Pulpit zarządczy','Dzień dobry, Monika','Najważniejsze informacje i zadania dla Twojej organizacji — bez szukania ich w kilku modułach.',button('＋ Dodaj wydarzenie','secondary','data-toast="Otwarto kreator wydarzenia"')+button('Zobacz raport','primary','data-toast="Raport jest elementem prototypu"'))+
  `<section class="grid kpi-grid" aria-label="Kluczowe wskaźniki">${kpis.map(([label,value,trend])=>`<article class="card kpi"><span class="kpi__label">${label}</span><strong class="kpi__value numeric">${value}</strong><span class="kpi__trend">${trend}</span></article>`).join('')}</section>
  <div class="grid dashboard-grid" style="margin-top:16px">
    <div class="dashboard-column">
      <section class="card card--raised"><div class="card__header"><div><span class="eyebrow">Priorytety</span><h2>Wymaga Twojej uwagi</h2></div><span class="badge badge--warning">9 zadań</span></div><div class="attention-list">
        <div class="attention-item"><span class="attention-item__icon">!</span><div><strong>3 osoby bez obowiązkowego szkolenia BHP</strong><span>Termin upływa za 2 dni · Hotel Gdańsk</span></div><button class="button button--tertiary" data-toast="Pokazano osoby">Sprawdź</button></div>
        <div class="attention-item"><span class="attention-item__icon">↗</span><div><strong>4 wnioski o zatwierdzenie egzaminu</strong><span>Najstarszy oczekuje 18 godzin</span></div><button class="button button--tertiary" data-toast="Pokazano wnioski">Przejrzyj</button></div>
        <div class="attention-item"><span class="attention-item__icon">○</span><div><strong>2 nowe osoby czekają na przypisanie stanowiska</strong><span>Recepcja · Restauracja</span></div><button class="button button--tertiary" data-toast="Pokazano profile">Przypisz</button></div>
      </div></section>
      <section class="card"><div class="card__header"><div><span class="eyebrow">Aktywność</span><h2>Co ostatnio wydarzyło się w organizacji</h2></div><button class="button button--tertiary" data-toast="Pełny dziennik">Pełny dziennik</button></div><ol class="timeline">
        <li><div><strong>Anna Kowalska ukończyła „Standard obsługi gościa”</strong><span>Dzisiaj, 09:42 · wynik 94%</span></div></li>
        <li><div><strong>Marek Nowak został przypisany do Recepcji</strong><span>Wczoraj, 16:18 · przez Zofię Lewandowską</span></div></li>
        <li><div><strong>Opublikowano wydarzenie „Warsztat liderów”</strong><span>Wczoraj, 12:05 · 24 odbiorców</span></div></li>
      </ol></section>
    </div>
    <aside class="dashboard-column">
      <section class="card"><div class="card__header"><div><span class="eyebrow">Kalendarz</span><h2>Najbliższe wydarzenia</h2></div><span class="badge badge--info">Listopad</span></div>
        <div class="event"><div class="event__date"><strong>18</strong>lis</div><div><h3>Warsztat liderów</h3><p>10:00 · Hotel Gdańsk · 24 osoby</p></div></div>
        <div class="event"><div class="event__date"><strong>21</strong>lis</div><div><h3>Szkolenie z bezpieczeństwa</h3><p>09:00 · Online · wszyscy pracownicy</p></div></div>
        <div class="event"><div class="event__date"><strong>27</strong>lis</div><div><h3>Spotkanie GM</h3><p>13:30 · Hotel Sopot · 8 osób</p></div></div>
      </section>
      <section class="card"><div class="card__header"><div><span class="eyebrow">Postęp</span><h2>Obowiązkowe szkolenia</h2></div><strong>86%</strong></div><div class="progress" aria-label="86 procent"><span style="width:86%"></span></div><p class="muted" style="margin:12px 0 0;font-size:.76rem">244 z 284 osób ukończyło wszystkie wymagane materiały.</p></section>
    </aside>
  </div>`;
}

function peopleView() {
  const rows = people.map(person => `<tr><td><div class="person-cell"><span class="avatar">${person[0]}</span><div><strong>${person[1]}</strong><span>${person[2]}</span></div></div></td><td>${person[3]}</td><td>${person[4]}</td><td><span class="badge badge--${person[6]}">${person[5]}</span></td><td><div class="row-actions"><button class="icon-button" aria-label="Edytuj ${person[1]}" data-toast="Edycja rekordu">⋯</button></div></td></tr>`).join('');
  const cards = people.map(person => `<article class="mobile-record"><div class="mobile-record__top"><div class="person-cell"><span class="avatar">${person[0]}</span><div><strong>${person[1]}</strong><span>${person[2]}</span></div></div><span class="badge badge--${person[6]}">${person[5]}</span></div><dl><div><dt>Rola</dt><dd>${person[3]}</dd></div><div><dt>Zakres</dt><dd>${person[4]}</dd></div></dl>${button('Otwórz profil','secondary','data-toast="Profil użytkownika"')}</article>`).join('');
  return pageHeader('Zespół / Użytkownicy','Ludzie w organizacji','Przeglądaj zatrudnienie, role i dostęp w jednym, konsekwentnym widoku.',button('Eksportuj','secondary','data-toast="Eksport przygotowany"')+button('＋ Dodaj osobę','primary','onclick="location.hash=\'/form\'"'))+
  `<section class="filter-bar" aria-label="Filtry użytkowników"><label class="field search"><span>Szukaj</span><input type="search" placeholder="Imię, e-mail lub stanowisko" data-filter></label><label class="field"><span>Rola</span><select><option>Wszystkie role</option><option>Manager</option><option>Employee</option></select></label><label class="field"><span>Status</span><select><option>Wszystkie statusy</option><option>Aktywny</option><option>Zaproszony</option></select></label>${button('Wyczyść','tertiary','data-toast="Filtry wyczyszczone"')}</section>
  <div class="table-shell"><table class="data-table"><thead><tr><th>Osoba</th><th>Rola</th><th>Zakres</th><th>Status</th><th><span class="sr-only">Akcje</span></th></tr></thead><tbody>${rows}</tbody></table><div class="pagination"><span>1–5 z 284 osób</span><div class="pagination__pages"><button aria-current="page">1</button><button>2</button><button>3</button><button aria-label="Następna strona">→</button></div></div></div><div class="mobile-records">${cards}</div>`;
}

function formView() {
  return pageHeader('Zespół / Nowa osoba','Dodaj osobę','Zaproś pracownika i od razu nadaj mu właściwe miejsce w strukturze.',button('Wróć do listy','tertiary','onclick="location.hash=\'/people\'"'))+
  `<div class="form-layout"><form class="card form-card" data-demo-form novalidate>
    <section class="form-section"><h2>Dane podstawowe</h2><p>Użyj adresu, do którego osoba ma bezpieczny dostęp.</p><div class="form-grid"><label class="field"><span>Imię</span><input name="firstname" autocomplete="given-name" value="Aleksandra"></label><label class="field"><span>Nazwisko</span><input name="lastname" autocomplete="family-name" value="Maj"></label><label class="field span-2" data-email-field><span>Adres e-mail</span><input name="email" type="email" autocomplete="email" aria-describedby="email-help" placeholder="imie.nazwisko@firma.pl"><small class="field__help" id="email-help">Na ten adres wyślemy bezpieczne zaproszenie.</small></label></div></section>
    <section class="form-section"><h2>Miejsce w organizacji</h2><p>Zakres dostępu wynika z aktywnego zatrudnienia i roli.</p><div class="form-grid"><label class="field"><span>Obiekt</span><select><option>Hotel Gdańsk</option><option>Hotel Sopot</option></select></label><label class="field"><span>Dział</span><select><option>Recepcja</option><option>F&B</option><option>Housekeeping</option></select></label><label class="field"><span>Stanowisko</span><select><option>Recepcjonista / Recepcjonistka</option><option>Front Office Manager</option></select></label><label class="field"><span>Rola</span><select><option>Employee</option><option>Manager</option></select></label><label class="check span-2"><input type="checkbox" checked><span>Wyślij zaproszenie po utworzeniu profilu</span></label></div></section>
    <div class="sticky-actions">${button('Anuluj','tertiary','type="button" onclick="location.hash=\'/people\'"')}${button('Zapisz wersję roboczą','secondary','type="button" data-toast="Wersja robocza zapisana"')}${button('Dodaj i wyślij zaproszenie','primary','type="submit"')}</div>
  </form><aside class="stack form-aside"><div class="alert alert--info"><span>ⓘ</span><div><strong>Bezpieczny dostęp</strong><br>Użytkownik zobaczy wyłącznie dane organizacji i jednostek wynikające z przypisania.</div></div><div class="card"><span class="eyebrow">Podsumowanie</span><h2 class="card__title">Nowa osoba</h2><p class="muted" style="font-size:.78rem">Hotel Gdańsk<br>Recepcja · Employee</p></div></aside></div>`;
}

function employeeView() {
  return pageHeader('Employee experience','Twoja akademia w kieszeni','Ten sam język wizualny w odrębnym, mobilnym learning shellu. Poniżej prototyp w docelowej szerokości telefonu.')+
  `<section class="employee-shell" aria-label="Prototyp aplikacji pracownika"><header class="employee-top"><div class="employee-top__row"><strong>hospromise.</strong><span class="avatar">AM</span></div><h1>Cześć, Aleksandra</h1><p>Masz dziś jeden ważny krok do wykonania.</p></header><div class="employee-body">
    <article class="employee-card employee-card--hero"><div class="card__header"><div><span class="eyebrow">Twój priorytet</span><h2>Bezpieczeństwo w hotelu</h2></div><span class="badge badge--warning">2 dni</span></div><div class="progress"><span style="width:68%"></span></div><p class="muted" style="font-size:.72rem;margin:9px 0 14px">Ukończono 4 z 6 rozdziałów</p>${button('Kontynuuj szkolenie','primary','style="width:100%" data-toast="Wznowiono szkolenie"')}</article>
    <article class="employee-card"><div class="card__header"><div><span class="eyebrow">Obowiązkowe</span><h2>Twoje szkolenia</h2></div><strong>3</strong></div><div class="course-list"><div class="course"><span class="course__icon">◇</span><div><strong>Standard obsługi gościa</strong><span>Ukończone · 94%</span></div><span class="badge badge--success">✓</span></div><div class="course"><span class="course__icon">◇</span><div><strong>RODO w praktyce</strong><span>12 min · do 24 listopada</span></div><span>→</span></div></div></article>
    <article class="employee-card"><div class="card__header"><div><span class="eyebrow">Rozwój</span><h2>Ścieżka Front Office</h2></div><span>42%</span></div><div class="progress"><span style="width:42%"></span></div><p class="muted" style="font-size:.72rem;margin:10px 0 0">Następny etap: trudne sytuacje z gościem</p></article>
    <article class="employee-card"><div class="card__header"><div><span class="eyebrow">Wydarzenie</span><h2>Spotkanie zespołu recepcji</h2></div><div class="event__date"><strong>18</strong>lis</div></div><p class="muted" style="font-size:.75rem;margin:0">10:00 · Sala Baltic · Hotel Gdańsk</p></article>
  </div><nav class="employee-nav" aria-label="Nawigacja pracownika"><button>⌂<span>Pulpit</span></button><button>◇<span>Szkolenia</span></button><button>▤<span>Materiały</span></button><button>◎<span>Profil</span></button></nav></section>`;
}

function studioView() {
  const project = (title,type,date) => `<article class="card project-card"><div class="project-thumb"><div class="project-thumb__slide"><span></span><i></i><i></i><i style="width:64%"></i></div></div><div class="project-body"><span class="badge">${type}</span><h3>${title}</h3><p>Edytowano ${date}</p></div></article>`;
  return pageHeader('Narzędzia / Studio','Studio, które należy do tego samego produktu','Chrome edytora korzysta z hp-ds. Treść slajdu pozostaje odizolowana i nie dziedziczy motywu platformy.',button('＋ Nowy projekt','primary','data-toast="Kreator nowego projektu"'))+
  `<div class="tabs" role="tablist" aria-label="Widok Studio"><button role="tab" aria-selected="true" data-studio-tab="library">Biblioteka</button><button role="tab" aria-selected="false" data-studio-tab="editor">Edytor</button></div>
  <section data-studio-panel="library" style="margin-top:18px"><div class="filter-bar"><label class="field search"><span>Szukaj projektów</span><input placeholder="Nazwa projektu"></label><label class="field"><span>Typ</span><select><option>Wszystkie</option><option>Prezentacja</option><option>Quiz</option></select></label><label class="field"><span>Status</span><select><option>Aktywne</option><option>Wersje robocze</option></select></label>${button('Filtry','tertiary','data-toast="Filtry projektów"')}</div><div class="grid studio-library">${project('Standard obsługi gościa','Prezentacja','dzisiaj')}${project('Bezpieczeństwo w hotelu','Kurs','wczoraj')}${project('Quiz wiedzy produktowej','Quiz','12 listopada')}</div></section>
  <section data-studio-panel="editor" hidden style="margin-top:18px"><div class="studio-editor"><aside class="studio-pane"><h3>Struktura materiału</h3><div class="slide-thumb"><strong>01</strong><br>Standard obsługi</div><button class="studio-tool">＋ Dodaj slajd</button></aside><div class="studio-stage"><div class="studio-toolbar"><div class="cluster"><button class="icon-button" aria-label="Cofnij">↶</button><button class="icon-button" aria-label="Ponów">↷</button></div><div class="cluster"><span class="badge badge--success">Zapisano</span>${button('Podgląd','secondary','data-toast="Podgląd pracownika"')}${button('Zapisz','primary','data-toast="Projekt zapisany"')}</div></div><div class="studio-canvas"><span class="eyebrow">Witamy w zespole</span><h2>Standard obsługi, który goście zapamiętują</h2><p>To jest authored content. Kolory i typografia slajdu nie zmieniają się po przełączeniu motywu aplikacji.</p></div></div><aside class="studio-pane"><h3>Dodaj element</h3><div class="studio-tools"><button class="studio-tool">T Nagłówek</button><button class="studio-tool">¶ Tekst</button><button class="studio-tool">▧ Obraz</button><button class="studio-tool">◯ Kształt</button></div><hr style="border:0;border-top:1px solid var(--border);margin:18px 0"><div class="studio-inspector"><h3>Właściwości</h3><label class="field"><span>Układ</span><select><option>Swobodny</option></select></label><label class="field"><span>Tło slajdu</span><input value="#FFFFFF"></label></div></aside></div></section>`;
}

function componentsView() {
  return pageHeader('hp-ds / Katalog','Komponenty jednego produktu','Interaktywna próbka kontraktu: semantyczne warianty, stany, tokeny i zachowanie dostępności.',button('Otwórz modal','secondary','data-modal')+button('Pokaż komunikat','primary','data-toast="To jest komunikat hp-ds"'))+
  `<section class="component-section"><h2>Kolory semantyczne</h2><p>Kolor opisuje rolę. Canvas nie jest powierzchnią karty, a marka nie zastępuje statusu.</p><div class="grid swatches">${[['canvas','var(--canvas)'],['surface','var(--surface)'],['brand','var(--brand)'],['success','var(--success)'],['warning','var(--warning)'],['danger','var(--danger)']].map(([name,color])=>`<div class="swatch"><div class="swatch__colour" style="background:${color}"></div><code>--${name}</code></div>`).join('')}</div></section>
  <section class="component-section"><h2>Przyciski</h2><p>Jedna akcja główna na kontekst. Wszystkie warianty mają wspólny rozmiar i focus.</p><div class="component-demo cluster">${button('Primary','primary')}${button('Secondary','secondary')}${button('Tertiary','tertiary')}${button('Destructive','danger')}${button('Disabled','secondary','disabled')}<button class="button button--primary is-loading" disabled>Ładowanie</button></div></section>
  <section class="component-section"><h2>Formularze i komunikaty</h2><p>Pola zapewniają stałą ergonomię, pomoc kontekstową i jawny błąd.</p><div class="component-demo grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))"><label class="field"><span>Nazwa</span><input value="Hotel Gdańsk"><small class="field__help">Widoczna dla użytkowników.</small></label><label class="field"><span>Typ</span><select><option>Obiekt hotelowy</option></select></label><label class="field is-invalid"><span>Adres e-mail</span><input value="niepoprawny-adres" aria-invalid="true"><small class="field__error">Wpisz poprawny adres e-mail.</small></label><label class="check"><input type="checkbox" checked><span>Aktywny rekord</span></label></div><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin-top:12px"><div class="alert alert--info">ⓘ <span><strong>Informacja</strong><br>Zmiany zapisują się automatycznie.</span></div><div class="alert alert--danger">! <span><strong>Nie udało się zapisać</strong><br>Sprawdź wyróżnione pola.</span></div></div></section>
  <section class="component-section"><h2>Statusy, zakładki i progres</h2><p>Systemowe znaczenie statusu pozostaje stałe w każdym tenant theme.</p><div class="component-demo stack"><div class="cluster"><span class="badge badge--success">Aktywny</span><span class="badge badge--warning">Wymaga uwagi</span><span class="badge badge--danger">Nieaktywny</span><span class="badge badge--info">Zaproszony</span></div><div class="tabs"><button aria-selected="true">Przegląd</button><button aria-selected="false">Zatrudnienie</button><button aria-selected="false">Historia</button></div><div><div class="cluster" style="justify-content:space-between"><strong>Postęp szkolenia</strong><span>68%</span></div><div class="progress" style="margin-top:8px"><span style="width:68%"></span></div></div></div></section>
  <section class="component-section"><h2>Typografia i rytm</h2><p>Ograniczona skala buduje hierarchię bez przypadkowych rozmiarów.</p><div class="component-demo"><div class="type-sample"><span>Display / 48</span><strong style="font-size:clamp(2rem,4vw,3rem);letter-spacing:-.045em;line-height:1.05">Codzienna praca, jasno uporządkowana.</strong></div><div class="type-sample"><span>Heading / 24</span><strong style="font-size:1.5rem">Obowiązkowe szkolenia</strong></div><div class="type-sample"><span>Body / 15</span><p style="margin:0">Czytelny tekst do zadań, danych i komunikatów.</p></div><div class="type-sample"><span>Label / 11</span><span class="eyebrow">Organizacja / Obiekty</span></div></div></section>
  <section class="component-section"><h2>Pusty stan</h2><p>Wyjaśnia sytuację i prowadzi do następnego sensownego działania.</p><div class="empty-state"><div><span class="empty-state__icon">◇</span><h3>Nie ma jeszcze materiałów</h3><p>Utwórz pierwszy materiał szkoleniowy albo zmień aktywne filtry.</p>${button('Utwórz materiał','primary','data-toast="Kreator materiału"')}</div></div></section>`;
}

function currentRoute() {
  const key = location.hash.replace(/^#\/?/, '').split('/')[0];
  return routes[key] ? key : 'dashboard';
}

function render() {
  const route = currentRoute();
  const screens = {dashboard,people:peopleView,form:formView,employee:employeeView,studio:studioView,components:componentsView};
  document.getElementById('app').innerHTML = shell(screens[route](), route);
  document.body.classList.remove('nav-open');
  const select = document.getElementById('theme-switcher');
  select.value = localStorage.getItem('hp-ds-theme') || 'hospromise';
  document.documentElement.dataset.theme = select.value;
  select.addEventListener('change', () => {
    document.documentElement.dataset.theme = select.value;
    localStorage.setItem('hp-ds-theme', select.value);
    toast(`Motyw: ${themes[select.value]}`);
  });
  document.querySelector('[data-menu]')?.addEventListener('click', () => document.body.classList.toggle('nav-open'));
  bindInteractions();
  requestAnimationFrame(() => document.getElementById('main')?.focus({preventScroll:true}));
}

function toast(message) {
  const region = document.querySelector('.toast-region');
  const item = document.createElement('div');
  item.className = 'toast'; item.textContent = message; region.append(item);
  setTimeout(() => item.remove(), 2600);
}

function bindInteractions() {
  document.querySelectorAll('[data-toast]').forEach(item => item.addEventListener('click', () => toast(item.dataset.toast)));
  document.querySelector('[data-modal]')?.addEventListener('click', () => document.getElementById('demo-modal').showModal());
  document.querySelectorAll('[data-studio-tab]').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('[data-studio-tab]').forEach(other => other.setAttribute('aria-selected', String(other === tab)));
    document.querySelectorAll('[data-studio-panel]').forEach(panel => panel.hidden = panel.dataset.studioPanel !== tab.dataset.studioTab);
  }));
  document.querySelector('[data-demo-form]')?.addEventListener('submit', event => {
    event.preventDefault(); const field = document.querySelector('[data-email-field]'); const input = field.querySelector('input');
    field.querySelector('.field__error')?.remove(); field.classList.remove('is-invalid'); input.removeAttribute('aria-invalid');
    if (!input.value.includes('@')) { field.classList.add('is-invalid'); input.setAttribute('aria-invalid','true'); field.insertAdjacentHTML('beforeend','<small class="field__error">Wpisz poprawny adres e-mail.</small>'); input.focus(); return; }
    toast('Osoba została dodana — demonstracja');
  });
  document.querySelector('[data-filter]')?.addEventListener('input', event => {
    const term = event.target.value.toLowerCase();
    document.querySelectorAll('.data-table tbody tr,.mobile-record').forEach(row => row.hidden = !row.textContent.toLowerCase().includes(term));
  });
}

window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', render);
