/*
	2018.07.08. v0.1

	SimpleVideoController written in vanila JavaScript
	github : https://github.com/devDohyun/
*/

class simpleVideoCon{
	constructor(initData) {
		this.playList = initData.playList || [];
		this.playListIndex = 0;
		
		this.findAuto = initData.findAuto || false;
		this.useTogglePlayButton = initData.useTogglePlayButton || true;
		this.useNextButton = initData.useNextButton || false;

		if (this.findAuto) {
			this.container = initData.container;
			this.videoElement = this.container.querySelector(".simple-video");
			this.playButton = this.container.querySelector(".simple-play");
			this.stopButton = this.container.querySelector(".simple-stop");
			this.nextButton = this.container.querySelector(".simple-next");
		} else {
			this.videoElement = initData.videoElement;
			this.playButton = initData.playButton;
			this.stopButton = initData.stopButton;
			this.nextButton = initData.nextButton;
		}
		this.init();
	}

	init() { // init video source to first playlist and bind event to buttons
		this.videoSrcElement = document.createElement("source");
		this.videoSrcElement.setAttribute("src", this.playList[0]);
		this.videoElement.appendChild(this.videoSrcElement);

		this.setButton(this.playButton, this.playVideo);
		this.setButton(this.stopButton, this.stopVideo);
		if (this.useNextButton) {
			this.setButton(this.nextButton, this.nextVideo);
		}
	}

	setButton(element, eventFunction) {
		element.addEventListener("click", eventFunction.bind(this));
	}

	playVideo() {
		if (this.videoElement.paused) {
			this.videoElement.play();
		} else if (this.useTogglePlayButton) {
			this.videoElement.pause();
		}
	}

	stopVideo() {
		this.videoElement.pause();
	}

	nextVideo() {
		if (this.playList.length <= ++this.playListIndex) {
			this.playListIndex = 0;
		}
		this.changeVideoSrc(this.playListIndex);
	}
	
	changeVideoSrc(index) {
		this.videoSrcElement.setAttribute("src", this.playList[index]);
		this.videoElement.load();
	}

	addPlayList(videoSrc) {
		return this.playList.push(videoSrc);
	}
}
