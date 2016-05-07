/**
 * ListeningTo constructor class
 * @param user
 * @param APIKey
 * @returns {ListeningTo}
 * @constructor
 */
function ListeningTo(user, APIKey){

    var self = this;
    this.user = user;
    this.APIKey = APIKey;

    /**
     * simple http GET request
     * @param url
     * @param resolve
     * @param reject
     * @returns {Promise}
     */
    function httpGet(url, resolve, reject) {
        return new Promise(function() {

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
     * @param resolve
     * @param reject
     * @returns {Promise}
     */
    this.getLatestSong = function (resolve, reject) {
        var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' +
                self.user +
                '&api_key=' +
                self.APIKey +
                '&format=json';

        return httpGet(
            url,
            function(songs) {
                songs = JSON.parse(songs);

                var latestSong = songs.recenttracks.track[0];
                var song = {};

                song.name = latestSong.name;
                song.artist = latestSong.artist['#text'];
                song.listening = latestSong['@attr'] && latestSong['@attr'].nowplaying == true ? true : false;

                resolve(song);
            },
            function(err) {
                reject(err);
            }
        );
    };
}