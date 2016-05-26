/**
 * ListeningTo constructor class
 * @param config {object}
 * @returns {ListeningTo}
 * @constructor
 */
function ListeningTo(config) {

    var self = this;
    this.user = config.user;
    this.APIKey = config.APIKey;
    this.theme = config.theme ? 'listening-to--' + config.theme : '';


    /**
     * simple http GET request
     * @param url
     * @returns {Promise}
     */
    function httpGet(url) {
        return new Promise(function (resolve, reject) {

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    xmlHttp.status == 200 ? resolve(xmlHttp.responseText) : reject(xmlHttp.status);
                }
            };
            xmlHttp.open("GET", url, true);
            xmlHttp.send(null);
        });
    }

    /**
     * gets last played song
     * @returns {Promise}
     */
    this.getLatestSong = function () {
        var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' +
            self.user +
            '&api_key=' +
            self.APIKey +
            '&format=json';

        return httpGet(url)
            .then(function (songs) {
                    songs = JSON.parse(songs);

                    var latestSong = songs.recenttracks.track[0];

                    return {
                        title: latestSong.name,
                        artist: latestSong.artist['#text'],
                        link: latestSong.url,
                        listening: latestSong['@attr'] && latestSong['@attr'].nowplaying == 'true' ? true : false
                    };
                },
                function (err) {
                    console.error('Could not get lastest song:', err);
                }
            );
    };


    /**
     * Renders the widget on the page
     */
    this.show = function () {

        self.getLatestSong()
            .then(function (song) {

                var listening = song.listening ? 'Currently listening to: ' : 'Last listened to: ';

                document.body.innerHTML +=
                    '<div class="listening-to ' + self.theme + '">' +
                    '<a href="http://www.last.fm/user/' + self.user + '" target="_blank" class="listening-to__listening">' + listening + '</a>' +
                    '<a href="' + song.link + '" target="_blank" class="listening-to__song">' + song.title + '</a>' +
                    '<div class="listening-to__artist">' + song.artist + '</div>' +
                    '</div>';
            });
    };
}
