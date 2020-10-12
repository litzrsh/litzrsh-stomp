const SockJS = require("sockjs-client");
const Stomp = require("stompjs");

class Socket {

    constructor(url, debug) {
        this.url = url;
        this.debug = debug || false;
        this.client = undefined;

        console.assert(this.url, "URL can't be empty");
    }

    connect(headers) {
        return new Promise((resolve, reject) => {
            try {
                let socket = new SockJS(this.url);
                this.client = Stomp.over(socket);
                this.client.debug = this.debug;
                this.client.connect(headers, frame => {
                        resolve(frame);
                    }, error => {
                        reject(error);
                    });
            } catch (e) {
                reject(e);
            }
        });
    }

    disconnect() {
        try {
            this.client.disconnect();
        } catch (e) {
            console.error(e);
        } finally {
            this.client = undefined;
        }
    }

    subscribe(destination) {
        return new Promise((resolve, reject) => {
            try {
                this.client
                    .subscribe(destination, message => {
                        resolve(message);
                    });
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = Socket;