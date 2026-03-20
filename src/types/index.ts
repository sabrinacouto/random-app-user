export type RootStackParamList = {
  List: undefined;
  Profile: { user: User };
  Chat: { user: User };
};

export interface User {
  login: { uuid: string; username: string };
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  cell: string;
  picture: { large: string; medium: string; thumbnail: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    timezone: { offset: string; description: string };
  };
  dob: { date: string; age: number };
  id: { name: string; value: string };
  nat: string;
}

export interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'me';
}