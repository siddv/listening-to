# listening-to
Small component that renders an html element that shows what music you're currently listening to, using lastFM.

## Usage

### Config

```javascript
    var config = {
        user: 'LastFM username',
        APIKey: 'LastFM apikey'
        theme: 'dark' // optional, do not define for 'light' theme
    }
```

### Constructor

```javascript
    var listeningTo = new ListeningTo(config);
```

### Exposed Methods

```javascript
   listeningTo.getLatestSong(resolve, reject);
```
Returns a promise, accepts two callbacks.


```javascript
   listeningTo.show();
```
Renders the widget to the page.
