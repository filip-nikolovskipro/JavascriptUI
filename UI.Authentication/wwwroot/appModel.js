if (!appModel) var appModel = {};

appModel.currentPage = 'index';
appModel.pagesLocation = 'AppPages';

appModel.apiUrl = 'http://localhost:5003';
//appModel.loginUrl = 'http://localhost:5003/#login;
//appModel.apiUrl = 'http://' + window.location.hostname;

appModel.domContent = $('#MainContentDom');
appModel.domNavigation = $('#navigation');
appModel.domLoading = $('#loading');
appModel.currentPage = 'home';
appModel.pagesLocation = 'Pages';

appModel.RNG_USER_COOKIE = "RNGCookie";
appModel.RNG_ROLE_COOKIE = "RNGRole";


appModel.UIModules = [

    {
        URL: 'home',
        Name: 'Home'
    },
    {
        URL: 'callback',
        Name: 'Call back'
    },
    {
        URL : 'inbox',
        Name: 'inbox'
    },
    {
        URL: 'login',
        Name: 'Login'
    }

]