$(document).on('ready', function(){
	var plans = {
		everyday: {
			name: 'everyday',
			months: 2,
			frequency: 'Every 2 months',
			image: "images/faces/everyday.png"
		},
		occasional: {
			name: 'occasional',
			months: 3,
			frequency: 'Every 3 months',
			image: "images/faces/occasional.png"
		},
		infrequent: {
			name: 'infrequent',
			months: 5,
			frequency: 'Every 5 months',
			image: "images/faces/occasional.png"
		}
	}

	var quantities = [
				{amount:0, selected:true},
				{amount:1, selected:false},
				{amount:2, selected:false},
				{amount:3, selected:false},
				{amount:4, selected:false}
	];

	var cart = {
		"blade-only" : {	
			slug: "blade-only",
			title: "Blade Only Plan",
			isRecurring: true,
			months: 2,
			exists:true,
			frequency: "Every 2 months",
			image: "images/cart/Blades-Group-2.jpg",
			price: 15,
			includes: ["1 x 8-pack Harry's Blades"],
			savings: 0
		},
		"essential" : {
			slug: "essential",
			title: "Essential Shave Plan",
			isRecurring: true,
			months: 2,
			exists:false,
			frequency: "Every 2 months",
			image: "images/cart/2x2-Redemption-Gel.jpg",
			price: 30,
			includes: ["1 x 8-pack Harry's Blades", "2 x Foaming Shave Gels"],
			savings: 9
		},
		"sensitive-skin" : {
			slug : "sensitive-skin",
			title : "Sensitive Skin Shave Plan",
			isRecurring: true,
			months: 2,
			exists: false,
			frequency: "Every 2 months",
			image: "images/cart/Blades-Gel-and-AfterShave-3.jpg",
			price: 40,
			includes: ["1 x 8-pack Harry's Blades", "2 x Foaming Shave Gels", "1 x After Shave Moisturizer"],
			savings: 9
		},
		'truman' : {
			slug: "truman",
			title: "Truman Handle",
			variant: "Color",
			options : [
				{name:'Total Orange',price:10, discount:10,selected:true,"cart-image": 'images/cart/truman-handle-total-orange.jpg'},
				{name:'Nautilus Blue',price:10, discount:10,selected:false,"cart-image": 'images/cart/truman-handle-nautilus-blue.jpg'},
				{name:'Olive 107',price:10, discount:10,selected:false,"cart-image": 'images/cart/truman-handle-olive-107.jpg'},
				{name:'Ivory',price:10, discount:10,selected:false,"cart-image": 'images/cart/truman-handle-ivory.jpg'}
			],
			quantities: [
				{amount:0, selected:false},
				{amount:1, selected:true},
				{amount:2, selected:false},
				{amount:3, selected:false},
				{amount:4, selected:false}
			],
			isRecurring: false,
			months: 2,
			exists:true,
			frequency: "Every 2 months"
		}
	};

	// var products = [
	// 	{
	// 		slug: "blades",
	// 		title : "Harry's Blades",
	// 		variant : "Pack Size",
	// 		options : [
	// 			{name:'4-pack',price:8},
	// 			{name:'8-pack',price:15},
	// 			{name:'12-pack',price:20},
	// 			{name:'16-pack',price:25}
	// 		],
	// 		"cart-image": 'images/cart/Blades-130x130.jpg'
	// 	},
	// 	{
	// 		slug: "truman",
	// 		title: "Truman Handle",
	// 		variant: "Color",
	// 		options : [
	// 			{name:'Total Orange',price:10, discount:10},
	// 			{name:'Nautilus Blue',price:10, discount:10},
	// 			{name:'Olive 107',price:10, discount:10},
	// 			{name:'Ivory',price:10, discount:10}
	// 		],
	// 		"cart-image": 'images/cart/Blades-130x130.jpg'
	// 	},
	// 	{
	// 		slug : "cream",
	// 		title : "Shave Cream",
	// 		variant : "Size",
	// 		options : [
	// 			{name:"3.4oz", price:8, discount:.5},
	// 			{name:"6.7oz", price:12}
	// 		],
	// 		"cart-image": 'images/cart/Blades-130x130.jpg'
	// 	},
	// 	{
	// 		slug: "gel",
	// 		title : "Foaming Shave Gel",
	// 		variant : "Size",
	// 		options : [
	// 			{name:"4.0oz", price:8, discount:.5},
	// 			{name:"6.7oz", price:12, discount:4.5}
	// 		],
	// 		"cart-image": 'images/cart/Blades-130x130.jpg'
	// 	},
	// 	{
	// 		slug: "aftershave",
	// 		title : "After Shave Moisturizer",
	// 		variant : "Size",
	// 		options : [
	// 			{name:"1.7oz", price:10},
	// 			{name:"4.0oz", price:16}
	// 		],
	// 		"cart-image": 'images/cart/Blades-130x130.jpg'
	// 	}
	// ];


	var getPlanLength = function(cart) {
		return cart[0].months
	}

	var makeDollars = function(num) {
		return '$' + num.toFixed(2);
	}

	var getActiveBundle = function(cart) {
		for (var key in cart) {
			if (cart[key].exists && cart[key].isRecurring) {
				return cart[key]
			}
		}
	}

	var getSelectedQuantity = function(quantities) {
		for (var i = quantities.length - 1; i >= 0; i--) {
			if (quantities[i].selected) {
				return quantities[i].amount
			}
		};
	}

	var getSelectedPrice = function(options) {
		for (var i = options.length - 1; i >= 0; i--) {
			if (options[i].selected) {
				var discount = options[i].discount ? options[i].discount : 0
				var price = options[i].price
				return {price:price, discount:discount}
			}
		};
	}

	var renderProduct = function(product){
		if (product.exists) {
			if (product.isRecurring) {
				var source = $('#bundleTemplate').html();
				var template = Handlebars.compile(source)
				$('.recurring-products').append(template(product));
			}
			else {
				var source = $('#productTemplate').html();
				var template = Handlebars.compile(source);
				$('.one-time-products').append(template(product));
				source = $('#modalTemplate').html();
				template = Handlebars.compile(source);
				$('body').append(template(product));
			}
		}
	};

	var renderTotal = function(cart) {
		var source = $('#totalTemplate').html();
		var template = Handlebars.compile(source);
		$('.total').empty()
		$('.total').append(template(cart));
	}

	var renderRecurringSubtotal = function(cart) {
		var source = $('#recurringSubtotalTemplate').html();
		var template = Handlebars.compile(source);
		$('.recurring-summary').empty();
		$('.recurring-summary').append(template(cart));
	}

	var renderOnetimeSubtotal = function(cart) {
		var source = $('#onetimeSubtotalTemplate').html();
		var template = Handlebars.compile(source);
		$('.onetime-summary').empty()
		$('.onetime-summary').append(template(cart));
	}

	var resetOptions = function(options) {
		for (var i = options.length - 1; i >= 0; i--) {
			options[i]['selected'] = false;
		};
		return options;
	};

	var resetQuantities = function(quantities) {
		for (var i = quantities.length - 1; i >= 0; i--) {
			quantities[i]['selected'] = false;
		};
		return quantities
	}

	var updateCart = function(cart, productUpdate) {
		for (var i = cart.length - 1; i >= 0; i--) {
			if(cart[i]['slug'] == productUpdate['slug']) {
				cart[i]['options'] = resetOptions(cart[i]['options']);
				cart[i]['options'][productUpdate['optionIndex']]['selected'] = true;
				cart[i]['quantities'] = resetQuantities(cart[i]['quantities']);
				cart[i]['quantities'][productUpdate['quantityIndex']]['selected'] = true;
				cart[i]['exists'] = productUpdate['quantityIndex'] == 0 ? false : true;
			}
		};
		return cart;
	}
	var renderCart = function(cart) {
		$('.recurring-products').empty();
		$('.one-time-products').empty();
		$('.total').empty();
		for (var key in cart) {
			console.log(key)
			renderProduct(cart[key]);
		};
		console.log(getActiveBundle(cart))
		renderTotal(getActiveBundle(cart));
		renderOnetimeSubtotal(cart);
		renderRecurringSubtotal(getActiveBundle(cart));
		$(document).foundation();
	}

	var capFirstLetter = function(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var lowFirstLetter = function(string) {
    	return string.charAt(0).toLowerCase() + string.slice(1);
	}

	Handlebars.registerHelper('isRecurring', function(product){
		return product.frequency != 'Once'
	});

	Handlebars.registerHelper('totalPrice', function(product){
		var option, quantity
		for (var i = product.options.length - 1; i >= 0; i--) {
			if (product.options[i].selected) {
				option = product.options[i]
			}
		};
		for (var i = product.quantities.length - 1; i >= 0; i--) {
			if (product.quantities[i].selected) {
				quantity = product.quantities[i]
			}
		};

		return makeDollars(option.price * quantity.amount)
	});

	Handlebars.registerHelper('bundlePrice', function(bundleObject){
		return makeDollars(bundleObject['price'])
	});

	Handlebars.registerHelper('bundleSavings', function(bundleObject){
		return makeDollars(bundleObject['savings'])
	});

	Handlebars.registerHelper('monthlyBundleTotal', function(bundleObject){
		return makeDollars(bundleObject['price']/bundleObject['months'])
	});

	Handlebars.registerHelper('discountedTotal', function(product){
		var quantity = getSelectedQuantity(product.quantities)
		var price = getSelectedPrice(product.options).price;
		var discount = getSelectedPrice(product.options).discount;
		return makeDollars((price-discount) * quantity)
	});

	Handlebars.registerHelper('discountedPrice', function(product){
		var price = getSelectedPrice(product.options).price;
		var discount = getSelectedPrice(product.options).discount;
		return makeDollars(price-discount)
	});

	Handlebars.registerHelper('normalPrice', function(product){
		var price = getSelectedPrice(product.options).price;
		var discount = getSelectedPrice(product.options).discount;
		console.log(price,discount)
		return makeDollars(price)
	})

	Handlebars.registerHelper('selectedQuantity', function(product){
		for (var i = product.quantities.length - 1; i >= 0; i--) {
			if (product.quantities[i].selected) {
				
				return product.quantities[i].amount
			}
		};
	});


	Handlebars.registerHelper('billedTotal', function(cart){
		for (key in cart) {
			if (key.exists && key.isRecurring) {
				return makeDollars(cart[key]['price'])
			}
		}
	});

	// Handlebars.registerHelper('recurringTotal', function(cart){
	// 	var recurringTotal = 0
	// 	for (var i = cart.length - 1; i >= 0; i--) {
	// 		if(cart[i].isRecurring){
	// 			var price = getSelectedPrice(cart[i].options).price
	// 			var discount = getSelectedPrice(cart[i].options).discount
	// 			var quantity = getSelectedQuantity(cart[i].quantities)
	// 			console.log(price,discount,quantity)
	// 			recurringTotal += (price-discount)*quantity
	// 		}
	// 	};
	// 	return makeDollars(recurringTotal)
	// });

	// Handlebars.registerHelper('recurringSubtotal', function(cart){
	// 	var recurringSubtotal = 0
	// 	for (var i = cart.length - 1; i >= 0; i--) {
	// 		if(cart[i].isRecurring){
	// 			var price = getSelectedPrice(cart[i].options).price
	// 			var discount = getSelectedPrice(cart[i].options).discount
	// 			var quantity = getSelectedQuantity(cart[i].quantities)
	// 			console.log(price,discount,quantity)
	// 			recurringSubtotal += price*quantity
	// 		}
	// 	};
	// 	return makeDollars(recurringSubtotal)
	// });

	Handlebars.registerHelper('monthlyTotal', function(cart){
		var recurringTotal = 0
		for (var i = cart.length - 1; i >= 0; i--) {
			if(cart[i].isRecurring){
				var price = getSelectedPrice(cart[i].options).price
				var discount = getSelectedPrice(cart[i].options).discount
				var quantity = getSelectedQuantity(cart[i].quantities)
				console.log(price,discount,quantity)
				recurringTotal += (price-discount)*quantity
			}
		};
		return makeDollars(recurringTotal / getPlanLength(cart));

	})

	Handlebars.registerHelper('recurringDiscount', function(cart){
		var recurringDiscount = 0
		for (var i = cart.length - 1; i >= 0; i--) {
			if(cart[i].isRecurring){
				var price = getSelectedPrice(cart[i].options).price
				var discount = getSelectedPrice(cart[i].options).discount
				var quantity = getSelectedQuantity(cart[i].quantities)
				recurringDiscount += discount*quantity
			}
		};
		return makeDollars(recurringDiscount)
	})

	Handlebars.registerHelper('oneTimeTotal', function(cart){
		var oneTimeTotal = 0
		for (var i = cart.length - 1; i >= 0; i--) {
			if(!cart[i].isRecurring){
				var price = getSelectedPrice(cart[i].options).price
				var discount = getSelectedPrice(cart[i].options).discount
				var quantity = getSelectedQuantity(cart[i].quantities)
				oneTimeTotal += (price-discount)*quantity
			}
		};
		return makeDollars(oneTimeTotal)
	});

	Handlebars.registerHelper('planMonths', function(cart){
		return getPlanLength(cart);
	})

	Handlebars.registerHelper('cartTotal', function(cart){
		var total = 0;
		for (var i = cart.length - 1; i >= 0; i--) {
			var option, quantity
			for (var j = cart[i].options.length - 1; j >= 0; j--) {
				if(cart[i].options[j].selected) {
					option = cart[i].options[j];
				}
			};
			for (var j = cart[i].quantities.length - 1; j >= 0; j--) {
				if(cart[i].quantities[j].selected) {
					quantity = cart[i].quantities[j].amount
				}
			};
			total += option.price * quantity
		};
		return makeDollars(total)
	});

	Handlebars.registerHelper('discountTotal', function(cart){
		var discounts = 0;
		for (var i = cart.length - 1; i >= 0; i--) {
			var option, quantity
			for (var j = cart[i].options.length - 1; j >= 0; j--) {
				if(cart[i].options[j].selected) {
					option = cart[i].options[j];
				}
			};
			for (var j = cart[i].quantities.length - 1; j >= 0; j--) {
				if(cart[i].quantities[j].selected) {
					quantity = cart[i].quantities[j].amount
				}
			};
			if(option.discount){
				discounts += option.discount*quantity
			}
		};
		return makeDollars(discounts)
	});

	Handlebars.registerHelper("log", function(something) {
	  console.log(something);
	});
	
	$(document).on('click', '.update-product', function(e){
		e.preventDefault();
		var slug = $(this).closest('div.reveal-modal').attr('id').slice(0,-5);
		var quantityIndex = parseInt($(this).closest('.medium-8').find('.quantity-select').val());
		var optionIndex = parseInt($(this).closest('.medium-8').find('.option-select').val());
		var productUpdate = {slug:slug,quantityIndex:quantityIndex,optionIndex:optionIndex};
		
		cart = updateCart(cart,productUpdate);
		renderCart(cart);
	});

	$(document).on('change', '.option-select', function(){
		var slug = $(this).closest('div.reveal-modal').attr('id').slice(0,-5);
		console.log(slug)
		var optionIndex = $(this).val();
		var newImg, newPrice
		for (var i = cart.length - 1; i >= 0; i--) {
			if (cart[i]['slug'] == slug) {
				newImg = cart[i]['options'][optionIndex]['cart-image']
				newPrice = '$'+cart[i]['options'][optionIndex]['price']+'.00'			
			}
		};
		console.log(newPrice)
		$(this).closest('.row').find('.img-div').find('img').attr('src', newImg);
		$(this).closest('.row').find('.price').empty().text(newPrice);

	});

	$(document).on('click', '.update-plan', function(e){
		e.preventDefault();
		console.log(plans)
		plan = plans[$(this).prev().attr('data-plan')];
		for (var key in cart) {
			cart[key].months = plan.months;
			cart[key].frequency = plan.frequency
		};
		$('.face-icon').attr('src', plan.image);
		$('.plan-name').text(capFirstLetter(plan.name)+' Shaver');
		$('.plan-ships').text('Ships '+lowFirstLetter(plan.frequency))
		renderCart(cart);
	});

	$(document).on('click', '.update-bundle', function(e){
		e.preventDefault();
		plan = $(this).prev().attr('data-bundle');
		console.log(plan)
		for (var key in cart) {
			if (cart[key].isRecurring) {
				cart[key].exists = false
			}
		}
		console.log(cart[plans])
		cart[plan].exists = true
		renderCart(cart);
	})

	$(document).on('click', '.enroll', function(e){
		$('div.face-landing').css({'display':'none'});
		plan = plans[$(this).attr('data-plan')];
		console.log(cart);
		for (var key in cart) {
			console.log(cart[key])
			cart[key].months = plan.months;
			cart[key].frequency = plan.frequency
		};
		$('.face-icon').attr('src', plan.image);
		$('.plan-name').text(capFirstLetter(plan.name)+' Shaver');
		$('.plan-ships').text('Ships '+lowFirstLetter(plan.frequency))
		renderCart(cart);
		$('div.bundle-choice').css({'display':'block'});
	});

	$(document).on('click', '.choose-bundle', function(e){
		e.preventDefault();
		$('div.bundle-choice').css({'display':'none'});
		plan = $(this).prev().attr('data-bundle');
		for (var key in cart) {
			if (cart[key].isRecurring) {
				cart[key].exists = false
			}
		}
		cart[plan].exists = true
		renderCart(cart);
		$('div.cart').css({'display':'block'});
	})

	$(document).foundation();

	renderCart(cart);

});