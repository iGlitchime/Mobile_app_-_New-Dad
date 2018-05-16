/*
	Язык определяется переменной LN
	Инициализация, переинициализация:
	var dateSlider = new Fdt('elementIdOrHTMLDomElement',  { // параметры необязательны, если нет, то будут по умолчанию
		mode: 'dateTime', // 'date' || 'time' || 'dateTime' по умолчанию - 'dateTime'
		startDate: '2026/02/13 15:56',  // can be a string like '2026/02/13 15:56' or Date object по умолчанию - new Date();
		lang: 'ru' // язык, по умолчанию используется переменная LN
	});
	Установить дату/время 
	dateSlider.setDate(dt);  dt - '2026/02/13 15:56' || date object
	Получить дату/время 
	dateSlider.getDate(); - return object:{human: 13 Feb 2026 15:56, text: '2026/02/13 15:56', dateTime: obj.Date()}
*/
/*
<script src="fdt/fdt.js"></script>
<div id="elementIdOrHTMLDomElement" class="fdt"></div>


.fdt{
    position: relative;
    z-index: 100;
    padding: 10px 0;
    margin: 15px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    text-align: center;
    font-family: fl;

    user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}
.fdtLines{
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -16px;
    height: 30px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

    pointer-events: none
}
.fdt .swiper-container{
    display: inline-block;
    padding: 0 10px;
    height: 150px;
    font-size: 24px
}
.fdt .swiper-slide{
    line-height: 28px;
    color: #ccc
}
.fdt .swiper-slide-active{
    color: #000
}
.fdt.error .swiper-slide-active{
    color: red
}

*/

Date.prototype.daysInMonth = function(){
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
};

(function (window, document){
    'use strict';
	
	function Fdt(el, params, change){
		this.el = typeof el === 'object' ? el : document.getElementById(el);
		this.change = change || this.change;
		var params = (params) ? params : {};
		this.LN = (params.lang) ? params.lang : LN;
		this.mode = (params.mode) ? params.mode : 'dateTime';
		this.startDate = (params.startDate) ? params.startDate : new Date();
		if(typeof(this.startDate) == 'string') this.startDate = new Date(this.startDate);

		var that = this;

		var days = '';
			for(var i = this.startDate.daysInMonth()+1; --i > 0;) days = '<div class="swiper-slide">'+((i<10) ? '0'+i : i)+'</div>' + days;
		var months = '';
			for(var i = 12; --i >= 0;) months = '<div class="swiper-slide">'+fDates[this.LN].monthsShort[i]+'</div>' + months;
		var years = '';
		    for(var i = this.startDate.getFullYear()+20; --i >= this.startDate.getFullYear()-20;) years = '<div class="swiper-slide">'+i+'</div>' + years;

		this.el.innerHTML = '\
			<div class="fdtDay swiper-container">\
		        <div class="swiper-wrapper">\
		            '+days+'\
		        </div>\
		    </div>\
		    <div class="fdtMonth swiper-container">\
		        <div class="swiper-wrapper">\
		            '+months+'\
		        </div>\
		    </div>\
		    <div class="fdtYear swiper-container">\
		        <div class="swiper-wrapper">\
		            '+years+'\
		        </div>\
		    </div>\
		    <div class="fdtHour swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">00</div> <div class="swiper-slide">01</div> <div class="swiper-slide">02</div> <div class="swiper-slide">03</div> <div class="swiper-slide">04</div> <div class="swiper-slide">05</div> <div class="swiper-slide">06</div> <div class="swiper-slide">07</div> <div class="swiper-slide">08</div> <div class="swiper-slide">09</div> <div class="swiper-slide">10</div> <div class="swiper-slide">11</div> <div class="swiper-slide">12</div> <div class="swiper-slide">13</div> <div class="swiper-slide">14</div> <div class="swiper-slide">15</div> <div class="swiper-slide">16</div> <div class="swiper-slide">17</div> <div class="swiper-slide">18</div> <div class="swiper-slide">19</div> <div class="swiper-slide">20</div> <div class="swiper-slide">21</div> <div class="swiper-slide">22</div> <div class="swiper-slide">23</div> </div></div>\
		    <div class="fdtMinute swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">00</div> <div class="swiper-slide">01</div> <div class="swiper-slide">02</div> <div class="swiper-slide">03</div> <div class="swiper-slide">04</div> <div class="swiper-slide">05</div> <div class="swiper-slide">06</div> <div class="swiper-slide">07</div> <div class="swiper-slide">08</div> <div class="swiper-slide">09</div> <div class="swiper-slide">10</div> <div class="swiper-slide">11</div> <div class="swiper-slide">12</div> <div class="swiper-slide">13</div> <div class="swiper-slide">14</div> <div class="swiper-slide">15</div> <div class="swiper-slide">16</div> <div class="swiper-slide">17</div> <div class="swiper-slide">18</div> <div class="swiper-slide">19</div> <div class="swiper-slide">20</div> <div class="swiper-slide">21</div> <div class="swiper-slide">22</div> <div class="swiper-slide">23</div> <div class="swiper-slide">24</div> <div class="swiper-slide">25</div> <div class="swiper-slide">26</div> <div class="swiper-slide">27</div> <div class="swiper-slide">28</div> <div class="swiper-slide">29</div> <div class="swiper-slide">30</div> <div class="swiper-slide">31</div> <div class="swiper-slide">32</div> <div class="swiper-slide">33</div> <div class="swiper-slide">34</div> <div class="swiper-slide">35</div> <div class="swiper-slide">36</div> <div class="swiper-slide">37</div> <div class="swiper-slide">38</div> <div class="swiper-slide">39</div> <div class="swiper-slide">40</div> <div class="swiper-slide">41</div> <div class="swiper-slide">42</div> <div class="swiper-slide">43</div> <div class="swiper-slide">44</div> <div class="swiper-slide">45</div> <div class="swiper-slide">46</div> <div class="swiper-slide">47</div> <div class="swiper-slide">48</div> <div class="swiper-slide">49</div> <div class="swiper-slide">50</div> <div class="swiper-slide">51</div> <div class="swiper-slide">52</div> <div class="swiper-slide">53</div> <div class="swiper-slide">54</div> <div class="swiper-slide">55</div> <div class="swiper-slide">56</div> <div class="swiper-slide">57</div> <div class="swiper-slide">58</div> <div class="swiper-slide">59</div> </div></div>\
		    <div class="fdtLines"></div>\
		';

		switch(this.mode){
			case 'date':
				this.el.getElementsByClassName('fdtDay')[0].style.display = '';
				this.el.getElementsByClassName('fdtMonth')[0].style.display = '';
				this.el.getElementsByClassName('fdtYear')[0].style.display = '';
				this.el.getElementsByClassName('fdtHour')[0].style.display = 'none';
				this.el.getElementsByClassName('fdtMinute')[0].style.display = 'none';
			break;
			case 'time':
				this.el.getElementsByClassName('fdtDay')[0].style.display = 'none';
				this.el.getElementsByClassName('fdtMonth')[0].style.display = 'none';
				this.el.getElementsByClassName('fdtYear')[0].style.display = 'none';
				this.el.getElementsByClassName('fdtHour')[0].style.display = '';
				this.el.getElementsByClassName('fdtMinute')[0].style.display = '';
			break;
			case 'dateTime':
				this.el.getElementsByClassName('fdtDay')[0].style.display = '';
				this.el.getElementsByClassName('fdtMonth')[0].style.display = '';
				this.el.getElementsByClassName('fdtYear')[0].style.display = '';
				this.el.getElementsByClassName('fdtHour')[0].style.display = '';
				this.el.getElementsByClassName('fdtMinute')[0].style.display = '';
			break;
		}

		if(this.mode == 'date' || this.mode == 'dateTime'){
			this.daySl = new Swiper(this.el.getElementsByClassName('fdtDay')[0], {
			    direction: 'vertical',
			    slidesPerView: 5,
			    centeredSlides: true,
			    initialSlide: this.startDate.getDate()-1,
			    effect: 'coverflow',
			    coverflow: {
			        rotate: 20,
			        stretch: 0,
			        depth: 100,
			        modifier: 1,
			        slideShadows : false
			    },
			    onTransitionEnd: function(){
			    	that.change();
			    }
			});

			this.monthSl = new Swiper(this.el.getElementsByClassName('fdtMonth')[0], {
			    direction: 'vertical',
			    slidesPerView: 5,
			    centeredSlides: true,
			    initialSlide: this.startDate.getMonth(),
			    effect: 'coverflow',
			    coverflow: {
			        rotate: 20,
			        stretch: 0,
			        depth: 100,
			        modifier: 1,
			        slideShadows : false
			    },
			    onTransitionEnd: function(){
			    	var monthT = (that.monthSl) ? that.monthSl.activeIndex+1 : 1;
					var yearT = (that.yearSl) ? that.yearSl.slides[that.yearSl.activeIndex].innerText : 1970;
			    	
			    	var dt = new Date(yearT+'/'+monthT+'/01');

			    	var days = dt.daysInMonth();
			    	
			    	if(days < that.daySl.slides.length){
			    		for(var i = that.daySl.slides.length; i >= days; i--){
			    			that.daySl.removeSlide(i);
			    		}
			    	}
			    	if(days > that.daySl.slides.length){
			    		for(var i = that.daySl.slides.length; i < days; i++){
			    			that.daySl.appendSlide('<div class="swiper-slide">'+(i+1)+'</div>');
			    		}
			    	}
			    	that.change();
			    }
			});

			this.yearSl = new Swiper(this.el.getElementsByClassName('fdtYear')[0], {
			    direction: 'vertical',
			    slidesPerView: 5,
			    centeredSlides: true,
			    initialSlide: 20,
			    effect: 'coverflow',
			    coverflow: {
			        rotate: 20,
			        stretch: 0,
			        depth: 100,
			        modifier: 1,
			        slideShadows : false
			    },
			    //onSlideChangeEnd
			    onTransitionEnd: function(swiper){
			    	var curr = swiper.slides[swiper.activeIndex].innerText*1;
			    	if(curr > that.currentYear){
			    		var lastYear = swiper.slides[swiper.slides.length-1].innerText*1;

			    		if(curr+10 > lastYear){
				    		swiper.appendSlide([
				    			'<div class="swiper-slide">'+(lastYear+1)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+2)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+3)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+4)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+5)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+6)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+7)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+8)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+9)+'</div>',
				    			'<div class="swiper-slide">'+(lastYear+10)+'</div>'
				    		]);
			    		}
			    	}else{
			    		// add one more year
			    		var firstYear = swiper.slides[0].innerText*1;
			    		if(curr-10 < firstYear){
				    		swiper.prependSlide([
				    			'<div class="swiper-slide">'+(firstYear-1)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-2)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-3)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-4)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-5)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-6)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-7)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-8)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-9)+'</div>',
				    			'<div class="swiper-slide">'+(firstYear-10)+'</div>'
				    		]);
			    		}
			    	}

			    	that.currentYear = curr;

			    	var monthT = (that.monthSl) ? that.monthSl.activeIndex+1 : 1;
					var yearT = (that.yearSl) ? that.yearSl.slides[that.yearSl.activeIndex].innerText : 1970;
			    	
			    	var dt = new Date(yearT+'/'+monthT+'/01');

			    	var days = dt.daysInMonth();
			    	
			    	if(days < that.daySl.slides.length){
			    		for(var i = that.daySl.slides.length; i >= days; i--){
			    			that.daySl.removeSlide(i);
			    		}
			    	}
			    	if(days > that.daySl.slides.length){
			    		for(var i = that.daySl.slides.length; i < days; i++){
			    			that.daySl.appendSlide('<div class="swiper-slide">'+(i+1)+'</div>');
			    		}
			    	}

			    	that.change();
			    }
			});
		}
		if(this.mode == 'time' || this.mode == 'dateTime'){
			this.hourSl = new Swiper(this.el.getElementsByClassName('fdtHour')[0], {
			    direction: 'vertical',
			    slidesPerView: 5,
			    centeredSlides: true,
			    initialSlide: this.startDate.getHours(),
			    effect: 'coverflow',
			    coverflow: {
			        rotate: 20,
			        stretch: 0,
			        depth: 100,
			        modifier: 1,
			        slideShadows : false
			    },
			    onTransitionEnd: function(){
			    	that.change();
			    }
			});

			this.minuteSl = new Swiper(this.el.getElementsByClassName('fdtMinute')[0], {
			    direction: 'vertical',
			    slidesPerView: 5,
			    centeredSlides: true,
			    initialSlide: this.startDate.getMinutes(),
			    effect: 'coverflow',
			    coverflow: {
			        rotate: 20,
			        stretch: 0,
			        depth: 100,
			        modifier: 1,
			        slideShadows : false
			    },
			    onTransitionEnd: function(){
			    	that.change();
			    }
			});
		}
	}

	Fdt.prototype.change = function(){

	}

	Fdt.prototype.setDate = function(dt){
		if(typeof(dt) == 'string') dt = new Date(dt);
		
		if(this.daySl) this.daySl.slideTo(dt.getDate()-1, 0);

		if(this.monthSl) this.monthSl.slideTo(dt.getMonth(), 0);

		if(this.yearSl){
			var slides = this.el.getElementsByClassName('fdtYear')[0].getElementsByClassName('swiper-slide');
			var sLen = slides.length;

			var startY = slides[0].innerText*1;
			var endY = slides[sLen-1].innerText*1;
			var currentY = dt.getFullYear();

			if(currentY > endY){
				var additional = new Array();
				for(var i = 1; i <= currentY-endY; i++){
					additional.push('<div class="swiper-slide">'+(endY+i)+'</div>')
				};
				this.yearSl.appendSlide(additional);
			}

			if(currentY < startY){
				var additional = new Array();
				for(var i = 1; i <= startY-currentY; i++){
					additional.push('<div class="swiper-slide">'+(startY-i)+'</div>')
				};
				this.yearSl.prependSlide(additional);
			}

			slides = this.el.getElementsByClassName('fdtYear')[0].getElementsByClassName('swiper-slide');
			sLen = slides.length;

			var toYear = -1;
			for(var i = 0; i <= sLen; i++){
				if(slides[i]){
					if(slides[i].innerText == dt.getFullYear()){
						toYear = i;
						break;
					}
				}
			}
			if(toYear != -1) this.yearSl.slideTo(toYear, 0);
		}
		
		if(this.hourSl) this.hourSl.slideTo(dt.getHours(), 0);
		
		if(this.minuteSl) this.minuteSl.slideTo(dt.getMinutes(), 0);
	}

	Fdt.prototype.getDate = function(){
		var dayT = (this.daySl) ? this.daySl.slides[this.daySl.activeIndex].innerText : '01';
		
		if(this.monthSl){
			var i = this.monthSl.activeIndex+1;
			var monthT = ((i<10) ? '0'+i : i);
		}else var monthT = '01';

		var yearT = (this.yearSl) ? this.yearSl.slides[this.yearSl.activeIndex].innerText : '1970';
		var hourT = (this.hourSl) ? this.hourSl.slides[this.hourSl.activeIndex].innerText : '06';
		var minuteT = (this.minuteSl) ? this.minuteSl.slides[this.minuteSl.activeIndex].innerText : '00';

		
		if(this.mode == 'dateTime' || this.mode == 'time'){
			return {
				human: dayT+' '+fDates[LN].monthsShort[(monthT*1)-1]+' '+yearT+' '+hourT+':'+minuteT,
				text: yearT+'/'+monthT+'/'+dayT+' '+hourT+':'+minuteT,
				dateTime: new Date(yearT+'/'+monthT+'/'+dayT+' '+hourT+':'+minuteT)
			}
		}else if(this.mode == 'date'){
			return {
				human: dayT+' '+fDates[LN].monthsShort[(monthT*1)-1]+' '+yearT,
				text: yearT+'/'+monthT+'/'+dayT,
				dateTime: new Date(yearT+'/'+monthT+'/'+dayT+' '+hourT+':'+minuteT)
			}
		}
	}
	
	window.Fdt = Fdt;
}(window, document));