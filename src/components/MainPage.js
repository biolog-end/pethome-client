import React, { useEffect } from 'react';
import dog from './Assets/Img/dog.png';
import './MainPage.css';

const MainContent = () => {
  useEffect(() => {
    const animalsTopText = document.querySelector('.AnimalsTopText');
    const animalsTopTextPosition = animalsTopText.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if(animalsTopTextPosition < screenPosition) {
      animalsTopText.classList.add('visible');
    }
    const AnimalsCarousel = document.getElementById('AnimalsCarousel');
    const AnimalsMainImage = document.getElementById('AnimalsMainImage');
    const AnimalsCarouselItems = document.querySelectorAll('.AnimalsCarouselItem');
    const AnimalsNumberSlider = document.getElementById('AnimalsNumberSlider');
    const AnimalsTitleSlider = document.getElementById('AnimalsTitleSlider');
    let AnimalsCurrentRotation = 0;
    const AnimalsImages = [
      'https://img.freepik.com/premium-photo/tiny-kitten-finger-is-held-up-by-finger_727939-1176.jpg',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1',
      'https://static.tildacdn.com/tild3834-3839-4131-b564-633733303065/1615657997823.jpg',
      'https://aqua.laguna-land.ru/storage/app/media/uploaded-files/shutterstock_1915848625.jpg'
    ];
    let AnimalsCurrentImageIndex = 2; 

    function AnimalsPositionItems() {
      const a = 21; 
      const b = 43; 
      const centerX = 74.5; 
      const centerY = 81;

      AnimalsCarouselItems.forEach((item, index) => {
        const angle = (index / AnimalsCarouselItems.length) * 2 * Math.PI + AnimalsCurrentRotation;
        const x = centerX + a * Math.cos(angle) - 40; 
        const y = centerY + b * Math.sin(angle) - 40; 
        item.style.left = `${x}%`;
        item.style.top = `${y}%`;
      });
    }

    function AnimalsUpdateSliders() {
      const containerWidth = document.querySelector('.AnimalsBlock').offsetWidth;
      const scaleFactor = containerWidth / 1920;
      const numberSlideHeight = 91 * scaleFactor + 1.5;
      const titleSlideHeight = 125 * scaleFactor - 1;

      AnimalsNumberSlider.style.transform = `translateY(-${AnimalsCurrentImageIndex * numberSlideHeight}px)`;
      AnimalsTitleSlider.style.transform = `translateY(-${AnimalsCurrentImageIndex * titleSlideHeight}px)`;
    }

    AnimalsCarousel.addEventListener('click', () => {
      AnimalsCurrentRotation += Math.PI / 2; 
      AnimalsCurrentImageIndex = (AnimalsCurrentImageIndex + 1) % AnimalsImages.length;
      
      AnimalsPositionItems();
      
      AnimalsNumberSlider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
      AnimalsTitleSlider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
      AnimalsUpdateSliders();
      
      setTimeout(() => {
        AnimalsNumberSlider.style.transition = 'none';
        AnimalsTitleSlider.style.transition = 'none';
        if (AnimalsCurrentImageIndex === 0) {
          AnimalsNumberSlider.style.transform = 'translateY(0)';
          AnimalsTitleSlider.style.transform = 'translateY(0)';
        }
      }, 500);
      
      AnimalsMainImage.style.opacity = 0;
      
      setTimeout(() => {
        AnimalsMainImage.src = AnimalsImages[AnimalsCurrentImageIndex];
        AnimalsMainImage.style.opacity = 1;
      }, 250);
    });

    AnimalsPositionItems();
    AnimalsUpdateSliders();
    window.addEventListener('resize', () => {
      AnimalsPositionItems();
      AnimalsUpdateSliders();
    });

    // Corkboard JS
    const corkButtons = document.querySelectorAll('.corkButton');
    const corkNotes = document.querySelectorAll('.corkNote');
    const corkRotations = [
        { start: 377.5, end: 357.5 },
        { start: 22, end: 2 },
        { start: 22, end: 2 },
        { start: 371, end: 351 }
    ];

    const corkNoteTexts = [
        'У нас, ваши животные будут хапи-хапи',
        'Самые лучшие цены и отели на рынке (и в городе тоже, везде вообще)',
        'Только самые лучшие условия для вашего дорогого любимца',
        'Мяу-мяу ^^ ( •̀ ω •́ )✧'
    ];

    function corkShowButton(index) {
        corkButtons[index].style.animation = 'corkFadeIn 0.5s forwards';
        corkButtons[index].style.pointerEvents = 'auto';
    }

    function corkHideButton(index) {
        corkButtons[index].style.animation = 'corkFadeOut 0.5s forwards';
        corkButtons[index].style.pointerEvents = 'none';
    }

    function corkShowNote(index) {
        const note = corkNotes[index];
        const button = corkButtons[index];
        const corkboard = document.querySelector('.corkboard');
        const corkboardRect = corkboard.getBoundingClientRect();

        const buttonRect = button.getBoundingClientRect();
        const buttonLeftPercent = (buttonRect.left - corkboardRect.left) / corkboardRect.width * 100;
        const buttonTopPercent = (buttonRect.top - corkboardRect.top) / corkboardRect.height * 100;

        const noteLeftPercent = buttonLeftPercent - 8.68 + (button.offsetWidth / corkboardRect.width * 100 / 2.5);
        const noteTopPercent = buttonTopPercent - 2.3;

        note.style.left = `${noteLeftPercent}%`;
        note.style.top = `${noteTopPercent}%`;
        note.style.display = 'block';
        note.style.setProperty('--start-rotation', `${corkRotations[index].start}deg`);
        note.style.setProperty('--end-rotation', `${corkRotations[index].end}deg`);
        note.style.animation = 'corkPinned 0.5s ease-out forwards';

        const noteImage = note.querySelector('.corkNoteImage');
        noteImage.style.backgroundImage = `url(https://place.dog/200/${199 + index})`;

        const noteText = note.querySelector('.corkNoteText');
        noteText.textContent = corkNoteTexts[index];
    }

    corkButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            corkHideButton(index);
            corkShowNote(index);
            if (index < corkButtons.length - 1) {
                setTimeout(() => corkShowButton(index + 1), 500);
            }
        });
    });

    corkShowButton(0);

    window.addEventListener('resize', () => {
      AnimalsPositionItems();
      AnimalsUpdateSliders();
      corkNotes.forEach((note, index) => {
          if (note.style.display === 'block') {
              corkShowNote(index);
          }
      });
    });

    // Reviews JS
    const reviewTestimonials = [
      "Потрясающий сервис! Я в восторге от результатов.",
      "Нашла у вас необычный отель в чернобыле, как собачка вернулась, прям СВЕТИЛАСЬ от счастья",
      "Профессионализм на высшем уровне. Спасибо команде!",
      "Мряяяяу! `(*>﹏<*)′",
      "Превзошли все мои ожидания. Обязательно обращусь снова.",
      "Ужасный отель! Отказались взять мою собаку бесплатно, а я же мать!",
      "Индивидуальный подход к каждому клиенту. Это впечатляет!",
      "Чёртов капитализм....",
      "ГАВ-ГАВ, ПАКА!"
    ];

    const reviewCarousel = document.querySelector('.review-carousel');
    const reviewCarouselContainer = document.querySelector('.review-carousel-container');

    reviewTestimonials.forEach((testimonial, index) => {
      const card = document.createElement('div');
      card.className = 'review-testimonial-card';
      card.innerHTML = `
        <img src="https://place.dog/${298 + index}/${198 + index}" alt="Милая собака" class="review-testimonial-image">
        <p class="review-testimonial-content">"${testimonial}"</p>
      `;
      
      const baseRotation = index % 2 === 0 ? -5 : 5;
      const randomRotation = Math.random() * 4 - 2; 
      const totalRotation = baseRotation + randomRotation;
      card.style.transform = `rotate(${totalRotation}deg)`;
      
      reviewCarousel.appendChild(card);
    });

    let reviewIsDragging = false;
    let reviewStartPosition = 0;
    let reviewCurrentTranslate = 0;
    let reviewPrevTranslate = 0;
    let reviewAnimationID = 0;
    let reviewCurrentIndex = 0;
    let reviewIsMovingRight = true;
    let reviewAutoScrollInterval;

    function reviewDragStart(e) {
      e.preventDefault();
      reviewStopAutoScroll();
      reviewIsDragging = true;
      reviewStartPosition = reviewGetPositionX(e);
      reviewAnimationID = requestAnimationFrame(reviewAnimation);
      reviewCarousel.style.cursor = 'grabbing';
    }

    function reviewDrag(e) {
      if (reviewIsDragging) {
        const currentPosition = reviewGetPositionX(e);
        reviewCurrentTranslate = reviewPrevTranslate + currentPosition - reviewStartPosition;
      }
    }

    function reviewDragEnd() {
      reviewIsDragging = false;
      cancelAnimationFrame(reviewAnimationID);
      reviewCarousel.style.cursor = 'grab';

      const movedBy = reviewCurrentTranslate - reviewPrevTranslate;

      if (movedBy < -100 && reviewCurrentIndex < reviewGetMaxIndex()) {
        reviewCurrentIndex += 1;
      }

      if (movedBy > 100 && reviewCurrentIndex > 0) {
        reviewCurrentIndex -= 1;
      }

      reviewSetPositionByIndex();
      reviewStartAutoScroll();
    }

    function reviewGetPositionX(e) {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function reviewAnimation() {
      reviewSetCarouselPosition();
      if (reviewIsDragging) requestAnimationFrame(reviewAnimation);
    }

    function reviewSetCarouselPosition() {
      reviewCarousel.style.transform = `translateX(${reviewCurrentTranslate}px)`;
    }

    function reviewGetMaxIndex() {
      const containerWidth = reviewCarouselContainer.offsetWidth;
      const cardWidth = reviewCarousel.children[0].offsetWidth;
      const visibleCards = Math.floor(containerWidth / cardWidth);
      return Math.max(0, reviewCarousel.children.length - visibleCards);
    }

    function reviewSetPositionByIndex() {
      const cardWidth = reviewCarousel.children[0].offsetWidth;
      const maxIndex = reviewGetMaxIndex();
      reviewCurrentIndex = Math.max(0, Math.min(reviewCurrentIndex, maxIndex));
      reviewCurrentTranslate = reviewCurrentIndex * -cardWidth;
      reviewPrevTranslate = reviewCurrentTranslate;
      reviewSetCarouselPosition();
    }

    function reviewStartAutoScroll() {
      reviewStopAutoScroll();
      reviewAutoScrollInterval = setInterval(() => {
        const maxIndex = reviewGetMaxIndex();

        if (reviewIsMovingRight) {
          if (reviewCurrentIndex < maxIndex) {
            reviewCurrentIndex++;
          } else {
            reviewIsMovingRight = false;
            reviewCurrentIndex--;
          }
        } else {
          if (reviewCurrentIndex > 0) {
            reviewCurrentIndex--;
          } else {
            reviewIsMovingRight = true;
            reviewCurrentIndex++;
          }
        }

        reviewSetPositionByIndex();
      }, 3000);
    }

    function reviewStopAutoScroll() {
      clearInterval(reviewAutoScrollInterval);
    }

    reviewCarousel.addEventListener('mousedown', reviewDragStart);
    reviewCarousel.addEventListener('mousemove', reviewDrag);
    reviewCarousel.addEventListener('mouseup', reviewDragEnd);
    reviewCarousel.addEventListener('mouseleave', reviewDragEnd);

    reviewCarousel.addEventListener('touchstart', reviewDragStart);
    reviewCarousel.addEventListener('touchmove', reviewDrag);
    reviewCarousel.addEventListener('touchend', reviewDragEnd);

    reviewCarousel.addEventListener('contextmenu', (e) => e.preventDefault());

    window.addEventListener('resize', () => {
      reviewSetPositionByIndex();
      reviewStopAutoScroll();
      reviewStartAutoScroll();
    });

    reviewCarousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      reviewStopAutoScroll();
      const delta = Math.sign(e.deltaY);
      if (delta > 0 && reviewCurrentIndex < reviewGetMaxIndex()) {
        reviewCurrentIndex += 1;
      } else if (delta < 0 && reviewCurrentIndex > 0) {
        reviewCurrentIndex -= 1;
      }
      reviewSetPositionByIndex();
      reviewStartAutoScroll();
    });

    reviewSetPositionByIndex();
    reviewStartAutoScroll();

    function handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const introText = document.querySelector('.review-intro-text');
    const outroText = document.querySelector('.review-outro-text');

    observer.observe(introText);
    observer.observe(outroText);

    // Question Block JS
    const questionsNumBalls = 5;
    const questionsBalls = [];
    const questionsQuestionBlock = document.querySelector('.questions-QuestionBlock');
    const questionsContainer = document.querySelector('.questions-container');
    const questionsTitle = questionsContainer.querySelector('h1');
    const questionsParagraph = questionsContainer.querySelector('p');
    const questionsButton = questionsContainer.querySelector('.questions-book-now');

    let questionsAnimationTriggered = false;

    function questionsCreateBall() {
      const existingBalls = questionsQuestionBlock.querySelectorAll('.questions-tennis-ball');
      if (existingBalls.length >= questionsNumBalls) {
        return null;
      }
    
      const ball = document.createElement('div');
      ball.className = 'questions-tennis-ball';
      questionsQuestionBlock.appendChild(ball);
      
      const speed = 0.5 + Math.random() * 1;
      const angle = Math.random() * Math.PI * 2;
      
      return {
        element: ball,
        x: Math.random() * (questionsQuestionBlock.clientWidth - 60),
        y: Math.random() * (questionsQuestionBlock.clientHeight - 60),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
      };
    }

    function questionsUpdateBall(ball) {
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < 0 || ball.x > questionsQuestionBlock.clientWidth - 60) {
        ball.vx = -ball.vx;
        ball.x = Math.max(0, Math.min(ball.x, questionsQuestionBlock.clientWidth - 60));
      }
      if (ball.y < 0 || ball.y > questionsQuestionBlock.clientHeight - 60) {
        ball.vy = -ball.vy;
        ball.y = Math.max(0, Math.min(ball.y, questionsQuestionBlock.clientHeight - 60));
      }

      ball.element.style.left = `${ball.x}px`;
      ball.element.style.top = `${ball.y}px`;
    }

    function questionsAnimate() {
      questionsBalls.forEach(questionsUpdateBall);
      requestAnimationFrame(questionsAnimate);
    }

    function questionsInitBalls() {
      questionsBalls.forEach(ball => ball.element.remove());
      questionsBalls.length = 0;
      for (let i = 0; i < questionsNumBalls; i++) {
        const newBall = questionsCreateBall();
        if (newBall) {
          questionsBalls.push(newBall);
        } else {
          break;
        }
      }
    }

    function questionsIsElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function questionsHandleScroll() {
      if (!questionsAnimationTriggered && questionsIsElementInViewport(questionsContainer)) {
        questionsTitle.style.animation = 'questions-fadeInUp 1s ease forwards';
        questionsParagraph.style.animation = 'questions-fadeInUp 1s ease 0.5s forwards';
        questionsButton.style.animation = 'questions-fadeInScale 1s ease 1s forwards';
        questionsBalls.forEach(ball => {
          ball.element.style.opacity = '0.8';
        });
        questionsAnimationTriggered = true;
      }
    }

    function questionsHandleResize() {
      questionsInitBalls();
      if (questionsAnimationTriggered) {
        questionsBalls.forEach(ball => {
          ball.element.style.opacity = '0.8';
        });
      }
    }
    questionsInitBalls();
    questionsAnimate();

    window.addEventListener('scroll', questionsHandleScroll);
    window.addEventListener('resize', questionsHandleResize);

    questionsHandleScroll();

  }, []);

  return (
    <div>
      {/* Start */}
      <div className="StartContainer">
        <div className="content-top">
          <div className="top-left-text">Питомец в<br />тёплом<br />доме...</div>
          <div className="main-image-container">
            <img src={dog} alt="Счастливая собака" className="main-image" />
          </div>
          <div className="bottom-right-text">Это самая<br />счастливая<br />Собака!</div>
        </div>
        <div className="bottom-content">
          <div className="bottom-text">
            Хотите чтобы ваш питомец<br />
            был счастлив в ваше<br />
            отсутствие?
            <button className="cta-button">Арендовать Отель</button>
          </div>
        </div>
        <div className="AnimalsTopText">Вы можете нам прислать практически любой тип домашнего животного! От домашнего микроба, и до медведя! <br /> Например....</div>
      </div>

      {/* AnimalsBlock */}
      <div className="AnimalsBlock">
        <div className="AnimalsEllipse"></div>
        <div className="AnimalsMainContent">
          <div className="AnimalsTextCarousel">
            <div className="AnimalsNumberContainer">
              <div className="AnimalsNumberSlider" id="AnimalsNumberSlider">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
              </div>
            </div>
            <div className="AnimalsTitleContainer">
              <div className="AnimalsTitleSlider" id="AnimalsTitleSlider">
                <h2>CATS</h2>
                <h2>DOGS</h2>
                <h2>PARROTS</h2>
                <h2>FISH</h2>
              </div>
            </div>
          </div>
          <div className="AnimalsMainImageContainer">
            <div className="AnimalsImageBackground"></div>
            <img id="AnimalsMainImage" src="https://static.tildacdn.com/tild3834-3839-4131-b564-633733303065/1615657997823.jpg" alt="Sleeping dog" className="AnimalsMainImage" />
          </div>
          <br /><br />
        </div>
        <div className="AnimalsCarousel" id="AnimalsCarousel">
          <div className="AnimalsCarouselItem">
            <span className="AnimalsEmoji">🐱</span>
          </div>
          <div className="AnimalsCarouselItem">
            <span className="AnimalsEmoji">🐠</span>
          </div>
          <div className="AnimalsCarouselItem">
            <span className="AnimalsEmoji">🦜</span>
          </div>
          <div className="AnimalsCarouselItem">
            <span className="AnimalsEmoji">🐶</span>
          </div>
        </div>
      </div>

      {/* Corkboard */}
      <div className="corkboardBase">
        <div className="corkboard">
          <div id="corkButton1" className="corkButton">1</div>
          <div id="corkButton2" className="corkButton">2</div>
          <div id="corkButton3" className="corkButton">3</div>
          <div id="corkButton4" className="corkButton">4</div>
          <div id="corkNote1" className="corkNote">
            <div className="corkNoteImage"></div>
            <div className="corkNoteText"></div>
          </div>
          <div id="corkNote2" className="corkNote">
            <div className="corkNoteImage"></div>
            <div className="corkNoteText"></div>
          </div>
          <div id="corkNote3" className="corkNote">
            <div className="corkNoteImage"></div>
            <div className="corkNoteText"></div>
          </div>
          <div id="corkNote4" className="corkNote">
            <div className="corkNoteImage"></div>
            <div className="corkNoteText"></div>
          </div>
          <div className="corkTextBlock">
            А теперь посмотрите на услуги для наших любимых клиентов! Няяяяян!~ㅤㅤㅤφ(゜▽゜*)♪
          </div>
          <button className="corkActionButton">Дать нам свои деньги</button>
        </div>
      </div>

      {/* ReviewsBlock */}
      <div className="review-testimonials-section">
        <div className="review-intro-text">Вы нам не верите? Посмотрите на отзывы, что мы сами выбрали разместить на нашем сайте! Ведь как же можно не доверять нам ? （*＾-＾*）</div>
        <div className="review-carousel-container">
          <div className="review-carousel">
            {/* reviews */}
          </div>
        </div>
        <div className="review-outro-text">Все эти отзывы однозначно не выдуманные самими создателями сайта! Честно-честно ⨷</div>
      </div>

      {/* QuestionBlock */}
      <div className="questions-QuestionBlock" id="contacts">
        <div className="questions-container">
          <h1>ЕСТЬ<br />ВОПРОСЫ?</h1>
          <p>СВЯЖИТЕСЬ С НАМИ ПО ТЕЛЕФОНУ <span className="questions-phone-number">858-449-2691</span>.</p>
          <button className="questions-book-now">ЗАБРОНИРОВАТЬ СЕЙЧАС</button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
