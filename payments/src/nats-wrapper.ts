import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();


//kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51IL4Y5BJrp2mymXIlXlulni3a4UrNRzKnq5CIUqBZvuJtcLRX56thUw02rpcMVLOg9W409g14ABOuv3iWnjMYdk500dj5tvIiE

