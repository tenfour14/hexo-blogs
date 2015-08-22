// var calendarArr = $('#calendar_text').html();

// function getEnglishMonth(m){
// 	return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1];
// }

// function setCalendar(date){
// 	var date = date && new Date(date) || new Date();
// 	iDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
// 	$('#calcendar_box i').html(iDate[0] + '/' + getEnglishMonth(iDate[1]) + '/' + iDate[1]);

// 	var nowMonthMaxDay = new Date(iDate[2],iDate[1],0).getDate();
// 	var nowMonthFirstDayWeek = new Date(iDate[2],iDate[1]-1,1).getDay();
	

// 	var oTbody = $('#calendar_table tbody').get(0);



// 	for(var i = 0;i<42;i++){
// 		if(i >= nowMonthFirstDayWeek && i - nowMonthFirstDayWeek < nowMonthMaxDay){
// 			var iDay = i-nowMonthFirstDayWeek+1;
// 			if(~calendarArr.indexOf(iDate[2]+'-'+('0'+iDate[1]).substr(-2)+'-'+('0'+iDay).substr(-2))){
// 				$(oTbody.rows[i/7>>>0].cells[i%7]).html('<a href="#">'+iDay+'</a>');
// 			}else{
// 				$(oTbody.rows[i/7>>>0].cells[i%7]).html(iDay);
// 			}
// 		}
// 	}
// }

// setCalendar();