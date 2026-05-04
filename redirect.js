(function () {
    var redirectTo = 'https://semicolon.it.kr/';
    var redirectHosts = [
        'xn--6o2bt9dgzf03q.com',
        'www.xn--6o2bt9dgzf03q.com'
    ];
    var currentHost = window.location.hostname.toLowerCase().replace(/\.$/, '');

    if (redirectHosts.indexOf(currentHost) !== -1) {
        window.location.replace(redirectTo);
    }
}());
