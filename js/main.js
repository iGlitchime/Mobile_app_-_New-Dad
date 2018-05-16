"use strict";

var datePicker;
var LN = "en";
var tabDay = "Today";
var Randomizer;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function refreshSyncData() {
    //calling function to refresh showing data
    UsersNote(tabDay);
}


function ready() {

    if (localStorage.getItem("TipsAnswer")) {
        setTimeout(function () {
            QuestionCards();
        }, 3400);
    }
    StorageTest();
    if (JSON.parse(localStorage.getItem("notifSW")) == "on") {
        notifs.createTest();
    }

    UsersNote("Today");
    if (localStorage.getItem("TipsAnswer") == null) {
        localStorage.setItem("TipsAnswer", JSON.stringify(new Array))
    }
    TipsAnswerShowCheck();

    datePicker = new Fdt('barrel_date', {
        mode: 'dateTime', // 'date' || 'time' || 'dateTime' by default - 'dateTime'
        startDate: new Date(),  // can be a string like '2026/02/13 15:56' or Date object by default - new Date();
        lang: 'en'
    });
    datePicker.change = function (params) {
        Tasks.takeDate();
    };

    setTimeout(function () {
        page.open("second");
    }, 2500);
    var pages = document.getElementsByClassName("page");

    for (var i = 0; i < pages.length; i++) {
        pages[i].addEventListener('webkitAnimationStart', function (e) {  //animation starts
            e.preventDefault();
            e.stopPropagation();
        }, false);
        pages[i].addEventListener('webkitAnimationEnd', function (e) { //animation ends
            e.preventDefault();
            e.stopPropagation();
            // after animation
            if ((this.classList.contains("moveLeft")) || (this.classList.contains("moveRight"))) {
                this.style.visibility = "hidden";
                this.classList.remove("hold");
            }
            else if ((this.classList.contains("moveFromLeft")) || (this.classList.contains("moveFromRight"))) {
                this.classList.add("hold");
            }
            this.classList.remove("moveLeft");
            this.classList.remove("moveRight");
            this.classList.remove("moveFromLeft");
            this.classList.remove("moveFromRight");
            page.busy = true;
        }, false);
    }
    // add note by main central utton
    new Tap("addNote").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('chosenActTxt').innerHTML = words.activities.chooseActivity;
        document.getElementById('chosenActIcon').className = "shrink img collapse";
        page.open("third");
    }, false);

    //add note - top button in the right
    new Tap("note").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('chosenActTxt').innerHTML = words.activities.chooseActivity;
        document.getElementById('chosenActIcon').className = "shrink img collapse";
        page.open("third");
    }, false);

    new Tap("goSettings").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        TipsAnswerShowCheck();
        page.open("nineth");
    }, false);

    //back to home screen
    new Tap("home").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        UsersNote(tabDay);
        page.open("second");
    }, false);

    new Tap("today").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        tabDay = "Today";
        UsersNote("Today");
        switcher.choose(this.id);
    }, false);

    new Tap("tomorrow").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        tabDay = "Tomorrow";
        UsersNote("Tomorrow");
        switcher.choose(this.id);
    }, false);

    new Tap("AllNotes").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        tabDay = "AllNotes";
        UsersNote("AllNotes");
        switcher.choose(this.id);
    }, false);

    new Tap("choose_activity").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        page.open("fourth");
    }, false);

    new Tap("done").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var activityData = document.getElementById('chosenActTxt');
        if (activityData.innerText == words.activities.chooseActivity) {
            document.getElementById('alertMessage').innerHTML = "Activity is required!";
            document.getElementById('alertActivity').style.display = "block";
            return;
        } else {
            Tasks.save(this);
            UsersNote(tabDay);
        }
    }, false);

    new Tap("alertYes").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('alertActivity').style.display = "none";
    }, false);

    new Tap("ActToNote").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        page.open("third");
    }, false);


    new Tap("NewToMain").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        page.open("second");
    }, false);
    new Tap("baby_hack").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        TipsAnswerShowCheck();
        page.open("fifth");
    }, false);

    new Tap("mommy_hack").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        TipsAnswerShowCheck();
        page.open("seventh");
    }, false);

    new Tap("BabyYes").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        //write data-adv as a key
        TipsAnswerAdd(e.target.dataset.adv);
        page.open("fifth");
    }, false);
    new Tap("BabyNo").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        // remove data-adv as a key
        TipsAnswerRemove(e.target.dataset.adv);
        page.open("fifth");
    }, false);
    new Tap("MommyYes").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        //write data-adv as a key
        TipsAnswerAdd(e.target.dataset.adv);
        page.open("seventh");
    }, false);
    new Tap("MommyNo").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        //remove data-adv as a key
        TipsAnswerRemove(e.target.dataset.adv);
        page.open("seventh");
    }, false);

    new Tap("divTap", "actButton").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!e.detail.cTarget.classList.contains("actButton")) {
            return;
        }
        activityObj.check(e.detail.cTarget);
    });

    new Tap("BabyAdviceList", "advice").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("BabyYes").dataset.adv = e.target.dataset.adv;
        document.getElementById("BabyNo").dataset.adv = e.target.dataset.adv;
        if (!e.detail.cTarget.classList.contains("advice")) {
            return;
        }
        advices.loadcontent(e.detail.cTarget);
        page.open("sixth");
    });


    new Tap("MommyAdviceList", "advice").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("MommyYes").dataset.adv = e.target.dataset.adv;
        document.getElementById("MommyNo").dataset.adv = e.target.dataset.adv;
        if (!e.detail.cTarget.classList.contains("advice")) {
            return;
        }
        advices.loadcontent(e.detail.cTarget);
        page.open("seventh");
    }, false);

    new Tap("CardYes").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        AnswerCard(this.dataset.answer);
    }, false);

    new Tap("CardNo").addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        AnswerCard(this.dataset.answer);
    }, false);

    var back_buttons = document.getElementsByClassName('leftNavButton');
    for (var i = 0; i < back_buttons.length; i++) {
        new Tap(back_buttons[i]).addEventListener('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();
            page.open(this.dataset.back);
        }, false);
    }


};

var Tasks = {
    takeDate: function () {
        var date = datePicker.getDate().human.slice(0, -6);
        var time = datePicker.getDate().human.slice(-5);
        document.getElementById('choose_date').innerHTML = date;
        document.getElementById('choose_time').innerHTML = time;
    },
    save: function (el) {

        var GtDate = datePicker.getDate().text;
        var K = new Date(GtDate).getTime();
        if (new Date().getTime() <= K) {
            var T = JSON.parse(localStorage.getItem("tasks"));

            var O = {
                time: GtDate,
                activity: el.dataset.activity,
                milisecs: K,
                checked: false
            };
            if (searchInLSarray(K)) {
                document.getElementById('alertMessage').innerHTML = "You’ve already have an action for this period of time!";
                document.getElementById('alertActivity').style.display = "block";
                return;


            } else {
                T.push(O);
                T.sort(sortByMilisecs);
                if (JSON.parse(localStorage.getItem("notifSW")) == "on") {
                    notifs.create(K, el.dataset.activity);
                }
                localStorage.setItem("tasks", JSON.stringify(T))
                page.open("second");

            }
        } else {
            document.getElementById('alertMessage').innerHTML = "You can’t make a note for the past period of time";
            document.getElementById('alertActivity').style.display = "block";
        }
    }
};

function searchInLSarray(K) {
    var T = JSON.parse(localStorage.getItem("tasks"));
    var F = false;

    T.forEach(function (item, i, a) {

        if (item.milisecs == K) {
            F = true;
        }
    });
    return F;
}

function sortByMilisecs(a, b) {
    return a.milisecs - b.milisecs;
}

var advices = {
    loadcontent: function (el) {
        if (el.dataset.adv * 1 <= 4) {
            document.getElementById('six_title').innerHTML = words.advices[el.dataset.adv * 1].title;
            document.getElementById('baby_advice').firstElementChild.style.background = "url(" + words.advices[el.dataset.adv * 1].img + ") no-repeat";
            document.getElementById('baby_advice').firstElementChild.style.backgroundPosition = "center";
            document.getElementById('baby_advice').firstElementChild.style.backgroundSize = "cover";
            document.getElementById('baby_advice').lastElementChild.innerHTML = words.advices[el.dataset.adv * 1].txt;
            page.open("sixth");
        } else {
            document.getElementById('eight_title').innerHTML = words.advices[el.dataset.adv * 1].title;
            document.getElementById('mommy_advice').firstElementChild.style.background = "url(" + words.advices[el.dataset.adv * 1].img + ") no-repeat"; // картинка
            document.getElementById('mommy_advice').firstElementChild.style.backgroundPosition = "center";
            document.getElementById('mommy_advice').firstElementChild.style.backgroundSize = "cover";
            document.getElementById('mommy_advice').lastElementChild.innerHTML = words.advices[el.dataset.adv * 1].txt;
            page.open("eighth");
        }
    }
};

function UsersNote(dayIndex) {

    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var DayTask = document.getElementById('DayTask');

    if (tasks.length > 0) {
        document.getElementById('addNote').style.visibility = "hidden";
        document.getElementById('note').style.visibility = "visible";

        var Today = [];
        var Tomorrow = [];
        var AllNotes = [];
        var AfterTomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).getTime();

        for (var i = 0; i < tasks.length; i++) {
            if (new Date().getDate() > new Date(tasks[i].milisecs).getDate()) {

                var RemoveTasks = JSON.parse(localStorage.getItem("tasks"));
                RemoveTasks.splice(RemoveTasks.indexOf(i), 1);
                localStorage.setItem("tasks", JSON.stringify(RemoveTasks));
                continue;
            } else if (new Date().getDate() <= new Date(tasks[i].milisecs).getDate()) {

                var dataSlice = tasks[i].time.split(' ');
                AllNotes.push(DrawDay(dataSlice[1], tasks[i].activity, tasks[i].milisecs, null, null));

                if (tasks[i].milisecs < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).getTime()) {
                    var dataSlice = tasks[i].time.split(' ');
                    Today.push(DrawDay(dataSlice[1], tasks[i].activity, tasks[i].milisecs, i, tasks[i].checked)); //берем дивку и вставляем в конец массива
                    continue;
                } else if (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).getTime() > tasks[i].milisecs) {
                    var dataSlice = tasks[i].time.split(' ');
                    Tomorrow.push(DrawDay(dataSlice[1], tasks[i].activity));
                }

            }
        }
        var DayRow = document.getElementById("dateRow");
        if (dayIndex == "Today") {

            DayTask.innerHTML = "";
            if (Today.length != 0) {
                Today.forEach(function (item, i, arr) {
                    DayTask.appendChild(item);
                });
                var realDate = new Date(new Date().getTime());
                DayRow.innerHTML = realDate.getDate() + ' ' + realDate.toString().split(' ')[1] + ' ' + realDate.getFullYear();
                ;
                document.getElementById("dateRow").style.display = "block";
                document.getElementById('addNote').style.visibility = "hidden";
                document.getElementById('note').style.visibility = "visible";
            } else {
                DayRow.innerHTML = "";
                document.getElementById("dateRow").style.display = "none";
                document.getElementById('addNote').style.visibility = "visible";
                document.getElementById('note').style.visibility = "hidden";
            }
        } else if (dayIndex == "Tomorrow") {
            DayTask.innerHTML = "";
            if (Tomorrow.length != 0) {
                Tomorrow.forEach(function (item, i, arr) {
                    DayTask.appendChild(item);
                });
                var realDate = new Date(new Date().getTime() + 86400000);
                DayRow.innerHTML = realDate.getDate() + ' ' + realDate.toString().split(' ')[1] + ' ' + realDate.getFullYear();
                document.getElementById("dateRow").style.display = "block";
                document.getElementById('addNote').style.visibility = "hidden";
                document.getElementById('note').style.visibility = "visible";
            } else {
                DayRow.innerHTML = "";
                document.getElementById("dateRow").style.display = "none";
                document.getElementById('addNote').style.visibility = "visible";
                document.getElementById('note').style.visibility = "hidden";
            }
        } else if (dayIndex == "AllNotes") {
            DayTask.innerHTML = "";
            DayRow.innerHTML = "";
            if (AllNotes.length != 0) {
                AllNotes.forEach(function (item, i, arr) {
                    DayTask.appendChild(item);
                });
                document.getElementById("dateRow").style.display = "block";
                document.getElementById('addNote').style.visibility = "hidden";
                document.getElementById('note').style.visibility = "visible";
            } else {
                document.getElementById("dateRow").style.display = "none";
                document.getElementById('addNote').style.visibility = "visible";
                document.getElementById('note').style.visibility = "hidden";
            }
        }
    } else {
        document.getElementById('addNote').style.visibility = "visible";
        document.getElementById('note').style.visibility = "hidden";
    }
}

function DrawDay(time, txt, date, N, checked) {

    var listItem = document.createElement('div');
    listItem.className = "parentElement";
    if (N != null) {
        listItem.innerHTML = '<div class="containRowNote"><div class="time">' + time + '</div><div class="notepic img ' + txt + '"></div><div class="title">' + words.activities[txt] + '</div><div class="Tocheck" id="checkNote"></div></div><div class="delCross" data-dely="' + date + '"></div>';
        listItem.firstElementChild.dataset.N = N;
        listItem.id = date;
        if (checked) {
            listItem.firstElementChild.className = "row listItem checked";
        } else {
            listItem.firstElementChild.className = "row listItem";
        }
        new Tap(listItem.firstElementChild).addEventListener('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.classList.contains('checked')) {
                this.classList.remove('checked');
                checkNotSave.remove(this.dataset.N);
            } else {
                checkNotSave.save(this.dataset.N);
                this.classList.add('checked');
            }
        }, false);

        new Tap(listItem.lastElementChild).addEventListener('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById(this.dataset.dely).style.height = "0";
            document.getElementById(this.dataset.dely).innerHTML = "";
            var objectLocStor = JSON.parse(localStorage.getItem('tasks'));
            for (var j = 0; j < objectLocStor.length; j++) {
                if (objectLocStor[j].milisecs == this.dataset.dely) {
                    objectLocStor.splice(j, 1);
                }
            }
            localStorage.setItem("tasks", JSON.stringify(objectLocStor));
        }, false);


        listItem.addEventListener("swipe", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.detail.direction == "left") {
                this.classList.add("swipeLeft");

            } else if (e.detail.direction == "right") {
                this.classList.remove("swipeLeft");

            }
        })
    } else if (date) {
        var DateTime = new Date(date).getDate() + " " + new Date(date).toString().split(' ')[1] + " " + new Date(date).getFullYear();

        listItem.innerHTML = '<div class="containRowNote"><div class="date">' + DateTime + '<div class="time">' + time + '</div></div><div class="notepic img ' + txt + '"></div><div class="title">' + words.activities[txt] + '</div></div><div class="delCross" data-dely="' + date + '"></div>';
        listItem.id = date;
        new Tap(listItem.lastElementChild).addEventListener('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById(this.dataset.dely).style.height = "0";
            document.getElementById(this.dataset.dely).innerHTML = "";
            var objectLocStor = JSON.parse(localStorage.getItem('tasks'));
            for (var j = 0; j < objectLocStor.length; j++) {
                if (objectLocStor[j].milisecs == this.dataset.dely) {
                    objectLocStor.splice(j, 1);
                }
            }
            localStorage.setItem("tasks", JSON.stringify(objectLocStor));
        }, false);

        new Tap(listItem);


        listItem.addEventListener("swipe", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.detail.direction == "left") {
                this.classList.add("swipeLeft");
            } else if (e.detail.direction == "right") {
                this.classList.remove("swipeLeft");
            }
        })
    } else {
        listItem.innerHTML = '<div class="containRowNote"><div class="time">' + time + '</div><div class="notepic img ' + txt + '"></div><div class="title">' + words.activities[txt] + '</div></div><div class="delCross" data-dely="' + date + '"></div>';
        listItem.id = date;
        new Tap(listItem.lastElementChild).addEventListener('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById(this.dataset.dely).style.height = "0";
            document.getElementById(this.dataset.dely).innerHTML = "";
            var objectLocStor = JSON.parse(localStorage.getItem('tasks'));
            for (var j = 0; j < objectLocStor.length; j++) {
                if (objectLocStor[j].milisecs == this.dataset.dely) {
                    objectLocStor.splice(j, 1);
                }
            }
            localStorage.setItem("tasks", JSON.stringify(objectLocStor));
        }, false);

        new Tap(listItem);


        listItem.addEventListener("swipe", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.detail.direction == "left") {
                this.classList.add("swipeLeft");
            } else if (e.detail.direction == "right") {
                this.classList.remove("swipeLeft");
            }
        })
    }
    return listItem;
}

function StorageTest() {
    if (localStorage.getItem("tasks") == null) {
        localStorage.setItem("tasks", JSON.stringify(new Array));
        localStorage.setItem('notifSW', JSON.stringify('on'));
    }
}
var checkNotSave = {
    save: function (N) {
        var z = JSON.parse(localStorage.getItem('tasks'));
        z[N * 1].checked = true;
        notifs.del(z[N * 1].milisecs);
        localStorage.setItem('tasks', JSON.stringify(z));
    },
    remove: function (N) {
        var z = JSON.parse(localStorage.getItem('tasks'));
        z[N * 1].checked = false;
        notifs.create(z[N * 1].milisecs, z[N * 1].activity);
        localStorage.setItem('tasks', JSON.stringify(z));
    }
};
function TipsAnswerAdd(id) {
    var AddTipAns = JSON.parse(localStorage.getItem("TipsAnswer"));
    if (AddTipAns.indexOf(id) == -1) {
        AddTipAns.push(id * 1);
        localStorage.setItem("TipsAnswer", JSON.stringify(AddTipAns));
        document.getElementById("tip_" + id).style.opacity = "1";
    }
}
function TipsAnswerRemove(id) {
    var RemoveTipAns = JSON.parse(localStorage.getItem("TipsAnswer"));
    if (RemoveTipAns.indexOf(id) != -1) {
        RemoveTipAns.splice(RemoveTipAns.indexOf(id * 1), 1);
        localStorage.setItem("TipsAnswer", JSON.stringify(RemoveTipAns));
        document.getElementById("tip_" + id).style.opacity = "0";
    }
}
function TipsAnswerShowCheck() {
    var ShowTipsCheck = JSON.parse(localStorage.getItem("TipsAnswer"));
    for (var i = 0; i < ShowTipsCheck.length; i++) {
        document.getElementById("tip_" + ShowTipsCheck[i]).style.opacity = "1";
    }
}
var activityObj = {
    check: function (el) {
        var activity = document.getElementsByClassName("actButton");
        for (var i = 0; i < activity.length; i++) {
            activity[i].classList.remove("checked");
        }
        el.classList.add("checked");
        document.getElementById('done').dataset.activity = el.dataset.pic;
        document.getElementById('chosenActIcon').classList.add(el.dataset.pic);
        document.getElementById('chosenActIcon').classList.remove("collapse");
        document.getElementById('chosenActTxt').innerHTML = words.activities[el.dataset.pic];
        page.open("third");
    }
};

var switcher = {
    choose: function (id) {
        if (id == 'tomorrow') {
            document.getElementById('tomorrow').classList.add('buttonUpperActive');
            document.getElementById('activeButtonLine').style.left = "33%";
            document.getElementById('today').classList.remove('buttonUpperActive');
            document.getElementById('AllNotes').classList.remove('buttonUpperActive');
        } else if (id == 'AllNotes') {
            document.getElementById('AllNotes').classList.add('buttonUpperActive');
            document.getElementById('activeButtonLine').style.left = "67%";
            document.getElementById('tomorrow').classList.remove('buttonUpperActive');
            document.getElementById('today').classList.remove('buttonUpperActive');
        } else {
            document.getElementById('today').classList.add('buttonUpperActive');
            document.getElementById('activeButtonLine').style.left = "0%";
            document.getElementById('tomorrow').classList.remove('buttonUpperActive');
            document.getElementById('AllNotes').classList.remove('buttonUpperActive');
        };
    }
};

var page = {
    busy: true,
    prevpage: 'first',
    curTap: 'home',
    open: function (id) {
        if (id == this.prevpage) {
            return false;
        } else if (this.busy) {
            this.busy = false;
            document.getElementById(this.curTap).classList.remove('active');
            switch (id) {
                case 'first':
                    break;
                case 'second':
                    document.getElementById("home").classList.add('active');
                    this.curTap = "home";
                    break;
                case 'third':
                    document.getElementById("home").classList.add('active');
                    setTimeout(function () {
                        Tasks.takeDate();
                    }, 300);
                    this.curTap = "home";
                    break;
                case 'fourth':
                    document.getElementById("home").classList.add('active');
                    this.curTap = "home";
                    break;
                case 'fifth':
                    document.getElementById("baby_hack").classList.add('active');
                    this.curTap = "baby_hack";
                    break;
                case 'sixth':
                    document.getElementById("baby_hack").classList.add('active');
                    this.curTap = "baby_hack";
                    break;
                case 'seventh':
                    document.getElementById("mommy_hack").classList.add('active');
                    this.curTap = "mommy_hack";
                    break;
                case 'eighth':
                    document.getElementById("mommy_hack").classList.add('active');
                    this.curTap = "mommy_hack";
                    break;
            }
            if (document.getElementById(this.prevpage)) {
                this.animationHandlerCall(id);
            }
            this.prevpage = id;
        }
    },
    animationHandlerCall: function (id) {
        document.getElementById(id).style.visibility = "visible";
        if (document.getElementById(id).dataset.n * 1 < document.getElementById(this.prevpage).dataset.n * 1) {
            document.getElementById(this.prevpage).classList.add('moveRight');
            document.getElementById(id).classList.add('moveFromLeft');
        } else {
            document.getElementById(this.prevpage).classList.add('moveLeft');
            document.getElementById(id).classList.add('moveFromRight');
        }
    }
}


function QuestionCards() {
    document.getElementById("QuestionCards").style.visibility = "visible";
    Randomizer = random(0, 14);
    document.getElementById('CardQ').innerHTML = words.advices[Randomizer].question;

    var rightAnswer = words.advices[Randomizer].answer;
    if (rightAnswer == 'true') {
        document.getElementById('CardYes').dataset.answer = "right";
        document.getElementById('CardNo').dataset.answer = "false";
    } else {
        document.getElementById('CardNo').dataset.answer = "right";
        document.getElementById('CardYes').dataset.answer = "false";
    }
}

function AnswerCard(answer) {
    document.getElementById('QuestionCards').style.visibility = "hidden";
    var TipsAnswer = JSON.parse(localStorage.getItem("TipsAnswer"));
    if (answer == "right") {
        if (TipsAnswer.indexOf(Randomizer) == -1) {
            TipsAnswer.push(Randomizer);
            document.getElementById('alertMessage').innerHTML = "Right";
            document.getElementById('alertActivity').style.display = "block";
        } else {
            document.getElementById('alertMessage').innerHTML = "Right";
            document.getElementById('alertActivity').style.display = "block";
        }
    } else {
        if (TipsAnswer.indexOf(Randomizer) != -1) {
            TipsAnswer.splice(TipsAnswer.indexOf(Randomizer), 1);
            document.getElementById('alertMessage').innerHTML = "Wrong";
            document.getElementById('alertActivity').style.display = "block";
        } else {
            document.getElementById('alertMessage').innerHTML = "Wrong";
            document.getElementById('alertActivity').style.display = "block";
        }
    }
    localStorage.setItem("TipsAnswer", JSON.stringify(TipsAnswer));
}
var notifs = {
    create: function (K, activity) {
        var str = "time to " + activity;
    },
    del: function (id) {
    },
    deleteAll: function () {
        var tasksArray = JSON.parse(localStorage.getItem('tasks'));
        tasksArray.forEach(function (item, i, a) {
            notifs.del(item.milisecs);
        });
    },
    createAll: function () {
        var tasksArray = JSON.parse(localStorage.getItem('tasks'));
        tasksArray.forEach(function (item, i, a) {
            notifs.create(item.milisecs, item.activity);
        })
    },
    createTest: function () {
        var K = (new Date().getTime() + 5 * 60000);
        this.create(K, "test");
        setTimeout(function () {
            notifs.del(K);
        }, 1000)
    }
};

document.addEventListener('DOMContentLoaded', ready, false);