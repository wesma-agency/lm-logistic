document.addEventListener("DOMContentLoaded", function () {
	let burger = document.querySelector(".js-burger");
	let mobileMenu = document.querySelector(".js-mobile-menu");
	let closeMobileMenu = document.querySelector(".js-close-mobile-menu");

	function showMenu(menu, isOpen) {
		if (menu !== null) {
			if (isOpen === false) {
				menu.style.display = "block";

				document.querySelector("body").classList.add("lock");

				setTimeout(() => {
					menu.classList.add("active");
				}, 100);
			} else {
				menu.classList.remove("active");

				setTimeout(() => {
					menu.style.display = "none";
					document.querySelector("body").classList.remove("lock");
				}, 400);
			}
		}
	}

	if (burger !== null) {
		burger.addEventListener("click", function () {
			showMenu(mobileMenu, false);
		});
	}

	if (closeMobileMenu !== null) {
		closeMobileMenu.addEventListener("click", function () {
			showMenu(mobileMenu, true);
		});
	}

	let loopBaner = document.querySelectorAll(".banner__image").length > 1 ? true : false;

	let sliderBanner = new Swiper(".banner__slider-container", {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: loopBaner,

		navigation: {
			nextEl: ".banner__slider .slider-next",
			prevEl: ".banner__slider .slider-prev",
		},

		pagination: {
			el: ".banner__slider .swiper-pagination",
			type: "bullets",
			clickable: true,
		},

		on: {
			init(swiper) {
				swiper.slides.forEach((element) => {
					let imageBigSrc = element.querySelector(".banner__image").getAttribute("data-image-big");
					let imageSmallSrc = element.querySelector(".banner__image").getAttribute("data-image-small");
					let image = element.querySelector("img");

					if (document.documentElement.clientWidth >= 600) {
						if (image !== null) {
							image.setAttribute("src", imageBigSrc);
						}
					} else {
						if (image !== null) {
							image.setAttribute("src", imageSmallSrc);
						}
					}
				});
			},

			resize(swiper) {
				if (document.documentElement.clientWidth >= 600) {
					swiper.slides.forEach((element) => {
						let imageBigSrc = element.querySelector(".banner__image").getAttribute("data-image-big");
						let image = element.querySelector("img");

						if (image !== null) {
							image.setAttribute("src", imageBigSrc);
						}
					});
				} else {
					swiper.slides.forEach((element) => {
						let imageSmallSrc = element.querySelector(".banner__image").getAttribute("data-image-small");
						let image = element.querySelector("img");

						if (image !== null) {
							image.setAttribute("src", imageSmallSrc);
						}
					});
				}
			},
		},
	});

	let sliderGallWarehouse = new Swiper(".gallary-warehouse__container", {
		slidesPerView: "auto",
		spaceBetween: 8,

		navigation: {
			nextEl: ".gallary-warehouse__slider .slider-next",
			prevEl: ".gallary-warehouse__slider .slider-prev",
		},

		breakpoints: {
			768: {
				slidesPerView: 6,
				spaceBetween: 20,
			},
		},
	});

	let sldierWorkingUs = new Swiper(".working-us__slider-container", {
		slidesPerView: 1,
		spaceBetween: 20,

		pagination: {
			el: ".working-us__slider .swiper-pagination",
			type: "bullets",
			clickable: true,
		},

		breakpoints: {
			1000: {
				slidesPerView: 4,
				spaceBetween: 20,
			},

			768: {
				slidesPerView: 3,
				spaceBetween: 20,
			},

			500: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
	});

	let sldierCooperation = new Swiper(".cooperation__slider-container", {
		slidesPerView: 1,
		spaceBetween: 40,
		grid: {
			rows: 2,
			fill: "column",
		},

		breakpoints: {
			1170: {
				slidesPerView: 4,
				spaceBetween: 19,
				grid: {
					rows: 1,
					fill: "row",
				},
			},

			768: {
				slidesPerView: 3,
				spaceBetween: 19,
				grid: {
					rows: 1,
					fill: "row",
				},
			},

			550: {
				slidesPerView: 2,
				spaceBetween: 19,
				grid: {
					rows: 1,
					fill: "row",
				},
			},
		},

		pagination: {
			el: ".cooperation__slider .swiper-pagination",
			type: "bullets",
			clickable: true,
		},
	});

	let arrGallery = document.querySelectorAll(".lightgallery");

	if (arrGallery.length > 0) {
		arrGallery.forEach((element) => {
			lightGallery(element, {
				plugins: [lgVideo],
				selector: ".lightgallery-item",
				speed: 500,
				zoomFromOrigin: false,
				mobileSettings: {
					controls: true,
				},
			});
		});
	}

	let tabContainers = Array.prototype.slice.call(document.querySelectorAll(".js-tab-container"));

	if (tabContainers.length > 0) {
		tabContainers.forEach((element) => {
			let tabItem = Array.prototype.slice.call(element.querySelectorAll(".js-tab-control"));
			let tabContent = Array.prototype.slice.call(element.querySelectorAll(".js-tab-content"));

			tabItem.forEach((el, index, array) => {
				el.addEventListener("click", (e) => {
					if (!el.classList.contains("active")) {
						e.preventDefault();

						let dataId = el.dataset.tabItem;

						let tabContentItem = tabContent.find((item) => {
							if (item.dataset.tabContent == dataId) {
								return item;
							} else {
								return null;
							}
						});

						if (tabContentItem != null) {
							tabItem.forEach((el) => el.classList.remove("active"));
							tabContent.forEach((el) => el.classList.remove("active"));

							el.classList.add("active");

							tabContentItem.classList.add("active");
						}
					}
				});
			});
		});
	}

	Inputmask({
		mask: "8 (Z99) 999-99-99",
		definitions: {
			Z: {
				validator: "[0-6,9]",
			},
		},
	}).mask('[type="tel"]');

	let arrMaxSymbol = document.querySelectorAll(".js-max-symbol");

	if (arrMaxSymbol.length > 0) {
		arrMaxSymbol.forEach((element) => {
			let maxSize = element.getAttribute("data-max-symbol");
			let inputField = element.querySelector(".js-max-symbol-field");
			let valueField = element.querySelector(".js-max-symbol-value");

			function limitText() {
				if (parseInt(this.value.length) >= parseInt(maxSize)) {
					inputField.value = inputField.value.substring(0, parseInt(maxSize));
					valueField.textContent = parseInt(maxSize);
				} else {
					valueField.textContent = this.value.length;
				}
			}

			if (inputField !== null) {
				inputField.addEventListener("keyup", limitText);
				inputField.addEventListener("change", limitText);
			}
		});
	}

	const _slideDown = (target, duration = 500) => {
		if (!target.classList.contains("--slide")) {
			target.classList.add("--slide");
			if (target.hidden) {
				target.hidden = false;
			}
		}
		let height = target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");

		window.setTimeout(() => {
			target.style.removeProperty("height");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			target.classList.remove("--slide");
		}, duration);
	};

	const _slideUp = (target, duration = 500) => {
		if (!target.classList.contains("--slide")) {
			target.classList.add("--slide");
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = target.offsetHeight + "px";
			target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty("height");
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("--slide");
			}, duration);
		}
	};

	const _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	};

	let arrToggleEl = document.querySelectorAll(".js-toggle-container");

	if (arrToggleEl.length > 0) {
		arrToggleEl.forEach((element) => {
			let targetEl = element.querySelector(".js-toggle-target");
			let slideEl = element.querySelector(".js-toggle-slide");

			if (targetEl !== null && slideEl !== null) {
				targetEl.addEventListener("click", function () {
					element.classList.toggle("show");

					_slideToggle(slideEl, 300);
				});
			}
		});
	}

	// Открытие попапов МОЖНО УДАЛЯТЬ
	let popupAllElem = Array.prototype.slice.call(document.querySelectorAll(".modal"));
	let openButton = Array.prototype.slice.call(document.querySelectorAll(".js-modal-show"));
	let closeButton = Array.prototype.slice.call(document.querySelectorAll(".js-modal-close"));
	let body = document.querySelector("body");

	function openPopup(e) {
		e.preventDefault();
		let modal = document.querySelector(`#${e.target.dataset.popup}`);
		modal.classList.add("active");

		body.classList.add("lock");

		setTimeout(() => {
			modal.style.opacity = "1";
		}, 100);
	}

	function closePopup() {
		popupAllElem.forEach((element) => {
			if (element.classList.contains("active")) {
				let modal = element;

				setTimeout(() => {
					modal.classList.remove("active");
				}, 300);

				modal.style.opacity = "0";

				body.classList.remove("lock");
			}
		});
	}

	if (openButton != null) {
		openButton.forEach((element) => {
			element.addEventListener("click", (e) => {
				closePopup(e);

				openPopup(e);
			});
		});
	}

	if (closeButton != null) {
		closeButton.forEach((element) => {
			element.addEventListener("click", (e) => {
				closePopup();
			});
		});
	}

	if (popupAllElem != null) {
		popupAllElem.forEach((element) => {
			element.addEventListener("click", (e) => {
				if (e.target.parentNode.classList.contains("modal")) {
					closePopup();
				}
			});
		});
	}
});
