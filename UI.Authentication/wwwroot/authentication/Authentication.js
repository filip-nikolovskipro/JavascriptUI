if (!authentication) var authentication = {};


authentication.checkLoggedUser = function () {

    var token = authentication.getToken();
    if (token == null) {
        return false;
    } else {
        return true;
    }
}


authentication.getToken = function () {
    var token = null;

    if (app.isStandalone)
        token = sessionStorage.getItem("accessToken");

    else {
        if (authentication.getRNGUserCookie() !== null) {
            token = authentication.getRNGUserCookie().access_token;
        }
    }

    return "hcvalToken";//token;
}


// referenced --> in user.js
//INFO: Monet5 integration
authentication.getRNGUserCookie = function () {
    var RNGUser = app.getCookie(appModel.RNG_USER_COOKIE);

    return RNGUser;
}


authentication.GetRNGRoleModules = function (fn) {
    var role = null;
    var RoleModules = null;
    if (app.isStandalone) {
        console.log(("getting modules local storage (Standalone)..."));

        role = sessionStorage.getItem(appModel.RNG_ROLE_COOKIE)
        if (role !== null) {
            RoleModules = JSON.parse(window.atob(role));
            if (fn) return fn(RoleModules);
        }
    } else {
        console.log(("getting modules from cookie (Monet5 integration)..."));
        //todo: fnikolovski encode in m5 c# code
        RoleModules = app.getCookie(appModel.RNG_ROLE_COOKIE);
        if (RoleModules)
        if (fn) return fn(RoleModules);
    }


    if (RoleModules === null) {
        console.log("Get RoleModules from API");
        setTimeout(function () {
            RoleModules = appModel.UIModules;
            if (fn) return fn(RoleModules);
        }, 2000);
        //app.destroy();
    }
};


authentication.checkViewAccess = function () {

    
}


authentication.loggout = function(){
    authentication = null;
    app.destroy();
}


authentication.init = function (fn) {



    authentication.userLogged = authentication.checkLoggedUser();
    authentication.token = authentication.getToken();
    authentication.GetRNGRoleModules(function (response) {
        authentication.UIModules = response;
        if(fn) return fn();
    });

}

authentication.init();
