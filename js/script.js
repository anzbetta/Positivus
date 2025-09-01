document.addEventListener('DOMContentLoaded', () => {
    const menuBurger = document.querySelector(".menu__icon"),
          menu = document.querySelector(".menu-mobile");
    function openMenu (){
        menu.style.opacity = '1';
        menuBurger.classList.add("menu-open");
        document.body.classList.add("lock");  
    };
    function closeMenu (){
        menu.style.opacity = '0';
        menuBurger.classList.remove("menu-open");
        document.body.classList.remove("lock");  
    };
    menuBurger.addEventListener('click', ()=>{
        if (menuBurger.classList.contains('menu-open')){
            closeMenu();
        }else{
            openMenu();
        }
    });
    const swiper = new Swiper('.cases__items-mobile', {
        slidesPerView: 2.5,
        spaceBetween: 15,
        breakpoints: {
            0: {
              slidesPerView: 1.2,
            },
            425:{
                slidesPerView: 1.5,
            },
            670: {
              slidesPerView: 2.1,
            },

        }
    });
    const openAccordeon = document.querySelectorAll('.accordeon-head__bttn');
    
    openAccordeon.forEach(el => {
    	el.addEventListener('click', (e) => {
    		const accItem = el.closest('.accordeon__item'); 
    		accItem.classList.toggle('accordeon-open'); 
    	});
    });
    


    const teamCards = Array.from(document.querySelectorAll('.card')).slice(6);
    const teamShowMore = document.querySelector('.cards__show-more');

    teamCards.forEach((card ) => {
        card.classList.add('card__hidden');
        card.style.display = "none";
    });
        
    

    teamShowMore.addEventListener('click', ()=>{
        showMore();
    });

    function showMore() {
        const hidden = teamCards.some(card => card.classList.contains('card__visible'));
        if (hidden) {
            teamShowMore.textContent = 'See all team';
	    	[...teamCards].reverse().forEach((card, index) => {
	    		setTimeout(() => {
	    			card.classList.remove('card__visible');
	    			card.classList.add('card__hidden');
                    setTimeout(() => {
					    card.style.display = "none";
				    }, 100);
	    		}, index * 250);
	    	});
	    } else {
            teamShowMore.textContent = 'See less';
	    	teamCards.forEach((card, index) => {
                card.style.display = "block";
	    		setTimeout(() => {
	    			card.classList.remove('card__hidden');
	    			card.classList.add('card__visible');
	    		}, index * 150);
	    	});
	    };
    };
    const swiperTestimonials = new Swiper('.testimonials__items', {
        slidesPerView: 2.5,
        centeredSlides: true,
        grabCursor: true,
        loop: true,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
    
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            425:{
                slidesPerView: 1,
                spaceBetween: 0,
            },
            670: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            1024: {
                slidesPerView: 2.3,
                spaceBetween: 25,
            }

        }
    });

    const form = document.querySelector('.contact-form__body');
    const loaderContainer = document.querySelectorAll('.loader__container');

    form.addEventListener("submit", function(e){
        loaderContainer[0].style.display = "flex";
        e.preventDefault();
        sendMessage(form);
    });

    async function sendMessage(form){
        const formData = new FormData(form);
        formData.append("formName", form.getAttribute("id") || form.getAttribute("name") || "unknownForm");

        if (validate()){
            if (formData){
                const response = await fetch ('../Positivus/sendmessage.php', {
                    method: "POST",
                    body:formData,
                });
                if (response.ok){
                    loaderContainer[0].style.display = "none";
                    popupOverlay.style.display = "block";
                    popup.style.display = "block";
                    popup.querySelector(".popup__title").textContent = "Your message was sent successfully"
                }else{
                    loaderContainer[0].style.display = "none";
                    popupOverlay.style.display = "block";
                    popup.style.display = "block";
                    popup.querySelector(".popup__title").textContent = "Oooops... Something went wrong. Try again later";
                }
            };
            form.reset();
        }
        loaderContainer[0].style.display = "none";       
    };

    function validate() {
        let result = true;

        const nameInput = form.querySelector('[name="Name"]');
        const emailInput = form.querySelector('[name="Email"]');
        const messageInput = form.querySelector('[name="Message"]');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        const nameBlock = document.querySelector('.contact-form__name .wrong__text');
        const messageBlock = document.querySelector('.contact-form__message .wrong__text');
        const emailBlock = document.querySelector('.contact-form__email .wrong__text');


        nameBlock.style.display = "none";
        emailBlock.style.display = "none";
        messageBlock.style.display = "none";
        nameInput.classList.remove("wrong_input");
        emailInput.classList.remove("wrong_input");
        messageInput.classList.remove("wrong_input");

        if (name.length <= 1 || message.length <= 1) {
            

            if (name.length <= 1) {
                nameBlock.style.display = "block";
                nameInput.classList.add("wrong_input");
                result = false;
            }

            if (message.length <= 1) {
                messageBlock.style.display = "block";
                messageInput.classList.add("wrong_input");
                result = false;
            }
            
        }
        if (!isMailValid(email)) {
            emailBlock.style.display = "block";
            emailInput.classList.add("wrong_input");
            result = false;
        }

        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim().length > 1) {
                nameInput.classList.remove('wrong_input');
                nameBlock.style.display = 'none';
            }
        });

        messageInput.addEventListener('input', () => {
            if (messageInput.value.trim().length > 1) {
                messageInput.classList.remove('wrong_input');
                messageBlock.style.display = 'none';
            }
        });

        emailInput.addEventListener('input', () => {
            if (isMailValid(emailInput.value.trim())) {
                emailInput.classList.remove('wrong_input');
                emailBlock.style.display = 'none';
            }
        });

        return result;
    }

    var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    function isMailValid (email) {
        if (!email) return false;

        var emailParts = email.split('@');

        if (emailParts.length !== 2) return false;

        var account = emailParts[0];
        var address = emailParts[1];

        if (account.length > 64) return false;

        else if (address.length > 255) return false;

        var domainParts = address.split('.');
        
        if (domainParts.some(function (part) {
          return part.length > 63;
        })) return false;
    
        return tester.test(email);
    };





    const footerForm = document.querySelector(".footer-subscribe-form");
    const popup = document.querySelector(".popup");
    const popupBttn = document.querySelector('.popup__bttn');
    const popupOverlay = document.querySelector('.popup-overlay');
    const footerInput = document.querySelector(".footer-subscribe-input");
    const footerBlock = document.querySelector('.footer-contacts__form .wrong__text');



    footerForm.addEventListener("submit", function(e){
        loaderContainer[1].style.display = "flex";
        e.preventDefault();
        footerSend(footerForm);
    });
    async function footerSend(form) {
        const formData = new FormData(form);
        const email = form.querySelector('[name="Email"]').value.trim();

        footerBlock.style.display = "none";
        footerInput.classList.remove("wrong_input");

        if (isMailValid(email)) {
            if (formData) {
                const response = await fetch('../Positivus/sendmessage.php', {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {
                    loaderContainer[1].style.display = 'none';
                    popupOverlay.style.display = "block";
                    popup.style.display = "block";
                    popup.querySelector(".popup__title").textContent = "Your message was sent successfully"
                } else {
                    loaderContainer[1].style.display = 'none';
                    popupOverlay.style.display = "block";
                    popup.style.display = "block";
                    popup.querySelector(".popup__title").textContent = "Oooops... Something went wrong. Try again later";
                }
                footerForm.reset();
            }
        } else {
            footerBlock.style.display = "block";
            footerInput.classList.add("wrong_input");

            footerInput.addEventListener('input', () => {
                if (isMailValid(footerInput.value.trim())) {
                    footerInput.classList.remove('wrong_input');
                    footerBlock.style.display = 'none';
                }
            });
        }
        loaderContainer[1].style.display = 'none';
    }


    popupBttn.addEventListener('click', ()=>{
        popup.style.display = "none";
        popupOverlay.style.display = "none";
    });
    popupOverlay.addEventListener('click', ()=>{
        popup.style.display = "none";
        popupOverlay.style.display = "none";
    });


});


