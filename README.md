# **[_SEEKWMP_](https://seekwmp.vercel.app/?market=Portland&station=WPFO&title=DailyMailTV&snippet=be+taking+to+make+the+risks+are+worth+their+rewards+medical+staff+housekeeping+and+that+of+se+--+jesse:+jay+jacobs+the+ceo+of+the+timberlake+family+of+camps+is+talking+about+what+it+takes+to+operate+a+summer+camp+in+the+time+of+covid-19+before+the+recently+announced+new+york+ban+jacobs+had+planned+to+open+some+of+his&coder=eraab&url=covid/xWPFO_20200619_1100PM.mp4&id=4&seek=1357)**

#### **About**

##### An internal web tool to help human coders efficiently mark the region of interest within news outlet video clips. Clip start and stop times are used for training data purposes for the [Wesleyan Media Project](https://mediaproject.wesleyan.edu/)

##### This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<br />

#### **Getting Started**

##### Clone the project from Github

##### Install dependencies using `npm install`

<br />

#### **Documentation**

| Variable    | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `query`     | access query params passed through url                                            |
| `reference` | call instance methods on [react-player](https://github.com/cookpete/react-player) |
| `market`    | variable dereferenced from url parameter                                          |
| `station`   | variable dereferenced from url parameter                                          |
| `title`     | variable dereferenced from url parameter                                          |
| `snippet`   | variable dereferenced from url parameter                                          |
| `coder`     | variable dereferenced from url parameter                                          |
| `seek`      | variable dereferenced from url parameter                                          |
| `videourl`  | variable dereferenced from url parameter                                          |

### States

| State                         | Initial Value | Description                                                         |
| ----------------------------- | ------------- | ------------------------------------------------------------------- |
| `start`, `setStart()`         | 00:00:00      | user marked start time in HH:MM:SS                                  |
| `startSec`, `setStartSec()`   | 0             | user marked start time in seconds                                   |
| `stop`, `setStop()`           | 00:00:00      | user marked stop time in HH:MM:SS                                   |
| `stopSec`, `setStopSec()`     | 0             | user marked stop time in seconds                                    |
| `startFlag`, `setStartFlag()` | false         | user marked start time checker                                      |
| `stopFlag`, `setStopFlag()`   | false         | user marked stop time checker                                       |
| `success`, `setSuccess()`     | false         | flag is TRUE when clip times are successfully posted to server      |
| `error`, `setError()`         | false         | flag is TRUE when an error occurs when posting clip times to server |

### Methods

| Method           | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `handleSeek()`   | event handler function that seeks to suggested time within video     |
| `handleStart()`  | event handler function that updates `start` and `startSec` variables |
| `handleStop()`   | event handler function that updates `stop` and `stop` variables      |
| `handleSubmit()` | event handler function that verifies then sends clip data to server  |

# Getting Data

We pass in specific values through web parameters within the url. A sample url would be: https://seekwmp.vercel.app/?market=Portland&station=WPFO&title=DailyMailTV&snippet=be+taking+to+make+the+risks+are+worth+their+rewards+medical+staff+housekeeping+and+that+of+course+--+jesse:+jay+jacobs+the+ceo+of+the+timberlake+family+of+camps+is+talking+about+what+it+takes+to+operate+a+summer+camp+in+the+time+of+covid-19+before+the+recently+announced+new+york+ban+jacobs+had+planned+to+open+some+of+his&coder=eraab&url=covid/xWPFO_20200619_1100PM.mp4&id=4&seek=1357

Observe each query is organized in a key=value pairing like such:

### Sample

| Key     | Pair                                                   |
| ------- | ------------------------------------------------------ |
| market  | Portland                                               |
| station | WPFO                                                   |
| title   | DailyMailTV                                            |
| snippet | be+taking+to+make+the+risks+are+worth+their+rewards... |
| coder   | eraab                                                  |
| url     | covid/WXPFO_20200619_1100PM.mp4                        |
| id      | 4                                                      |
| seek    | 1357                                                   |

We are able to store each value with our `query.KEY` variable.

### Queries

| Query Key | Variable Name   | Description                                                                                        |
| --------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `market`  | {query.market}  | news market region of specific clip                                                                |
| `station` | {query.station} | news station name airing specific clip                                                             |
| `title`   | {query.title}   | video clip title                                                                                   |
| `snippet` | {query.snippet} | the specific phrase users should be looking to match with video clip and mark start and stop times |
| `coder`   | {query.coder}   | the username of the coder for that specific video assignment                                       |
| `url`     | {query.url}     | video clip url                                                                                     |
| `id`      | {query.id}      | unique video id                                                                                    |
| `seek`    | {query.seek}    | the suggested start time in seconds of where the snippet is said within the video clip             |

#### **Qualtrics**

##### When a coder submits their video assignment, the contents of the submission is stored as a schema with the following variables:

##### Clip Schema

| Schema Elements | Type   | Variable         | Source         |
| --------------- | ------ | ---------------- | -------------- |
| `market`        | String | `query.market`   | web url param  |
| `station`       | String | `query.station`  | web url param  |
| `title`         | String | `query.title`    | web url param  |
| `snippet`       | String | `query.snippet`  | web url param  |
| `coder`         | String | `query.coder`    | web url param  |
| `seek`          | String | `query.seek`     | web url param  |
| `dateSubmitted` | String | local variable   | user generated |
| `start`         | Number | `startSec` state | user generated |
| `stop`          | Number | `stopSec` state  | user generated |

##### handleSubmit()

```javascript
const handleSubmit = () => {
	let fields = {
		market: String(market),
		station: String(station),
		videoSrc: String(videourl),
		title: String(title),
		snippet: String(snippet),
		coder: String(coder),
		seek: String(seek),
		start: Number(startSec),
		stop: Number(stopSec),
		clipId: String(id),
	};

	//construct link to qualtrics
	let link = `https://wesleyan.qualtrics.com/jfe/form/SV_4G6wSx0ngBy6EIe?market=${String(
		market
	)}&station=${String(station)}&videoSrc=${String(videourl)}&title=${String(
		title
	)}&snippet=${snippet}&coder=${String(coder)}&seek=${String(
		seek
	)}&start=${String(startSec)}&stop=${String(stopSec)}&clipId=${String(id)}`;

	console.log(link);
	setQualLink(link);
};
```

#### **Qualtrics**
##### Handle submit constructs a qualtrics link with the data passed in through url params. From there Qualtrics will store the information with their database. I used [this link](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/standard-elements/passing-information-through-query-strings/) to pass information into qualtrics.




