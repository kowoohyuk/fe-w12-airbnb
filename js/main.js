const Calendar = require('./calendar');
const header = document.querySelector('header');
const modalItems = document.querySelectorAll('.modal');
const calendarTarget = document.querySelectorAll('.js-calendar');
const startDate = document.querySelectorAll('.js-start-date');
const endDate = document.querySelectorAll('.js-end-date');
const anchorTab = document.querySelector('.anchor-tab');
const toggleItems = document.querySelectorAll('.js-toggle');
const searchItems = document.querySelectorAll('.search-item');
const navList = document.querySelector('.nav__list');

const init = () => {
  const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
    {threshold: [1]}
  );
  observer.observe(header);

  window.addEventListener('click', ({ target }) => windowClickEvent(target));
  anchorTab.addEventListener('click', e => {
    e.stopPropagation();
    toggleCategory(e.target);
  });
  toggleItems.forEach((v, i) => v.addEventListener('click', e => {
    e.stopPropagation();
    toggleItem(e.target);
  }));
  calendarTarget.forEach((v, i) => new Calendar(v, new Date(), startDate[i], endDate[i]).init());
  navList.addEventListener('click', e => {
    e.stopPropagation();
  });
  const windowClickEvent = target => {
    for(let i = 0; i < modalItems.length; i++) {
      if(!modalItems[i].classList.contains('hidden')) {
        modalItems[i].classList.add('hidden');
        break;
      }
    }
  }

  const toggleItem = target => {
    const name = target.dataset.target || target.parentNode.dataset.target;
    const toggleTarget = document.querySelector(`[data-target_name="${name}"]`);
    if(toggleTarget.classList.contains('hidden')) {
      hideModal();
      toggleTarget.classList.remove('hidden');
    } else {
      hideModal();
    }
  };

  const hideModal = () => {
    modalItems.forEach(v => v.classList.add('hidden'));
  }

  const toggleCategory = target => {
    if(!target.classList.contains('anchor-tab__anchor')) return;
    searchItems.forEach(v => v.classList.add('hidden'));
    anchorTab.querySelectorAll('.anchor-tab__anchor').forEach(v => v.classList.remove('active'));
    target.classList.add('active');
    if(target.dataset.target_idx) searchItems[target.dataset.target_idx].classList.remove('hidden');
  };
}

window.addEventListener('load', init);