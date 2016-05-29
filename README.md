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
   // Returns promise
   listeningTo.getLatestSong();
```
Returns a vanilla JS promise, which resolves to a song object.


```javascript
   listeningTo.show();
```
Renders the widget to the page.
