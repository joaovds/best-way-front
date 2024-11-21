import ky from 'ky';

export const apiAG = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_AG_API_URL,
});

export const apiACO = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_ACO_API_URL,
});
