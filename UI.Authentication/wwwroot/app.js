var app = {};

function log() {

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        console.log(msg + ' ');
    });
}


log("app init...");



app.initMain = function (fn) {
    // OPEN URL PAGE

    if (window.location.hash !== '') appModel.currentPage = window.location.hash.substr(1);
    app.initNavigation(function () {
        app.initPage(appModel.currentPage, function () { console.log('Page ' + appModel.currentPage + ' id loaded!!!'); });
    }); // END INIT NAVIGATION

    if (fn) return fn();
}

app.initNavigation = function (fn) {

    var tempStringForLink = '',
        domMenuItems = appModel.domNavigation.find('#mainNavigationItems');

    domMenuItems.empty();

    var uiModules = authentication.UIModules;
    $.each(uiModules, function (i, item) {

        //rv-checkPageAccess
        tempStringForLink = '<li><a href="#' + item.URL + '" id="navItem' + item.URL + '">' + item.Name + '</a></li>';
        domMenuItems.append(tempStringForLink);
        // INIT MENU ITEM CLICK EVENT
        domMenuItems.find('#navItem' + item.URL).on('click', function () {
            app.initPage(item.URL, function () { console.log('Page ' + item.Name + ' id loaded!!!') });
        });
    });

    if (fn) return fn();
}

app.initPage = function (key, fn) {
    if (!fn) fn = function () { };
    var url = key;
    key = key.split('?')[0];

    authentication.checkLoggedUser();
    // authentication.checkViewAccess();
   

    appModel.domLoading.show();




    window.location.replace(appModel.apiUrl + '/#' + key);
    app.navigateToPage(key, url, fn);

    appModel.domLoading.hide();
}

app.navigateToPage = function (key, url, fn) {

    appModel.currentPage = key;
    appModel.domNavigation.find('.selected').removeClass('selected');
    appModel.domNavigation.find('#navItem' + key).addClass('selected');
    appModel.domContent.load(appModel.pagesLocation + '/' + key + '.html', function () {
        $.getScript(appModel.pagesLocation + '/' + key + '.js', function (data, textStatus, jqxhr) {
            console.log(textStatus + ' ' + jqxhr.status + " Load 1" + key + " was performed.");
            if (fn) return fn();
        });
    });
}

app._isStandalone = function () {

    if (sessionStorage.getItem("accessToken") !== null)
        return true;

    return false;
}
app.isStandalone = app._isStandalone();




//app.getCookies
app.getCookie = function (cookieName) {

    var CookieObj = null;
    var x = document.cookie;
    x = decodeURIComponent(x);

    var allCookies = x.split(";");

    for (var i = 0; i < allCookies.length; i++) {
        if (allCookies[i].toLowerCase().indexOf(cookieName.toLowerCase()) > -1) {
            var cookieValue = allCookies[i].trim().slice(cookieName.length + 1);
            CookieObj = JSON.parse(cookieValue);
        }
    }

    console.log("Cookie obj: ", CookieObj);
    return CookieObj;
}

app.setCookie = function (cookieObj, cookieName) {
    console.log("setting cookie...");
    var cookieStr = JSON.stringify(cookieObj);
    var urlEncodedCookie = encodeURIComponent(cookieStr);

    document.cookie = cookieName + '=' + urlEncodedCookie + ';domain=.wfmlive.monet-ts.com';
    //document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



app.destroy = function () {
    log("app destroying...");

    app = null;
    //sessionStorage.removeItem("accessToken");
    //sessionStorage.removeItem("RNGRole");
    localStorage.clear();
    log("app DESTROYED!!!");


    app.initPage("login", function () { console.log('Page ' + appModel.currentPage + ' id loaded!!!'); })


}