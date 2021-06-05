import firebase from "firebase";
//import "firebase/database";

const firebaseConfig = {
  "type": "service_account",
  "project_id": "mobileapp-7db4e",
  "private_key_id": "0fc33bf55d79b94c0490170def5095ccda52f7e9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDlbpS3URB8P5Vg\nPwh/8pEzxpZsEa29vIHpY6PPUM8Md8a9hUUoLl3xzIyaQxg/ej0pDAVcWaHsA9Ne\nffqRjOjzy2iyaARUmo047sFBzud4jE9+Q8qsidGiy/H2Os40B6dNaZ1d++qsDbmT\n/6VOTrDAtm87lfDzhsczFu4HtTW948SRimU/aGwZpGEsPO0Mv4S71zCHOJ4SCV6L\nu+7KOL/tY6X+4MtHAGNyScFhAI0RCMwnd/k5nL6vqIUen3YB4G2x/yxodS0+NksW\nLdQPsDEeTDKT0roMb0xPSSi+4O9JbU9GN7MO0C3989+R9gyuGWIHhZy2TEt24xcv\nifsCwVKbAgMBAAECggEAAhhHcFaciPpVpVNFH4rWZHSTWHlfSyEKVREmOc36BuEr\n+zVZI1vWzMCPwvrRvXhp3m9auBClOY/zKGThTFAkVe33zs/gNj8Z5nHJ22LM2s76\nDNXPg4rJfg+mGKYQ6uzPoaPRLKICYM3mnETUdWYU3ryyzoaHH0vjWkmtll+mzsz6\ncpnxemAUM0JblmiXMsDkLUgtrM89tlGshefOBU7EyQADV2lc2h7AuVy/Vc5FoYpd\n2UkNGnSwpXtFZ8AelMqscJLWCxojZ9v1hnZ3hW88xFuiHHo7ZrRxGkEkbfLM932V\nIRzsLVU35j86LGrtTj9aER4vGpdn4QGNS/qwJAdRtQKBgQD4CJx7FPxPjPpirrm6\n0qwWxa4UTtT+e8yqU/KHqxDkXy4v45KxqSVVVGGyvvqMMD1QCGQ42Ma7ktlW2QX/\nFM3pX/lwyWirZvFUBCmMbs8nNzBVGARQq1bFXKc0EDOYLYC2i0G4INLTNZkVcqZv\nuJDN+hwOUaTVZK3kLTKubLIQPwKBgQDszQW+TBOXvAgbli2ijC2ahdmB5yPencvg\nM473XcEeUoUUPY/SxeIDrmCwHEkH+EEiSVTBd/SCewkII7hc8EpwG3oMdRGpUd9i\ndjNAU5JOQ9Iy86li3sY7NjfBTj+2k9WDuzM5TiBiNoKug4T4gh9R8a/ohUhnX3tZ\nqmJGpYympQKBgG1s1yRR6NJrvtckgJoUcYmGYrtg4AT5txx59qi15rjp6OWFv+UT\nW34ewQ9rw/tvGM2jNhwCPwLn0WzISCX2FrXb+p8wrDXaL6PCRlZHWKrTZUZVVyoD\nvT9LFhUZBLohcQSXwUGrcXdu0P+uWhE12uSUcCY9DLx8M19UNWTQXWpfAoGBAORJ\nv2i3FQhqKPLXdEVJmMloksluWSFLxPnvGrwVcZFXAp8Bvn73cK4V1XbSvgFl7v0r\n7v7ZMyr7jDiBn0JSEaFEjAQodI9ks9PLmhtAtkKnlaSzTTBZDoiU+2lrk3bjzKrD\ntV1gmU21uYSenHmrkKBCPVEP9T5bSaKm5TmwbglVAoGAPAfl+7O10tVSlRBa9o8+\nf+CdypOe7yH2gmQEc6dLJuLHVHzCQ4LnIHzIj1WjVJgxYppbhKf7dKJD3Ithbkl1\nkcGFOBJ9RXi6Tn89IFILxbCsaGvrI6CK2g+jN4lMYdJic8G7BOz44eUECEp98Azl\nmyLLui5mRstWmRyrKpc2MpI=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-hbic5@mobileapp-7db4e.iam.gserviceaccount.com",
  "client_id": "114092012474513178540",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hbic5%40mobileapp-7db4e.iam.gserviceaccount.com",
  "databaseURL": "https://mobileapp-7db4e-default-rtdb.firebaseio.com/",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
